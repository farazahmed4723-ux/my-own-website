import { ChatMessage, AIProviderName, AIProviderConfig } from "./types";
import { buildSystemPrompt } from "./systemPrompt";

export interface ActiveProviderStatus {
  provider: AIProviderName;
  model: string;
  hasKey: boolean;
  availableProviders: {
    gemini: boolean;
    openai: boolean;
    anthropic: boolean;
  };
}

/**
 * Detects available AI credentials and selects the active provider.
 * Priority: Gemini -> OpenAI -> Anthropic -> Fallback (or env AI_PROVIDER override)
 */
export function getActiveProviderConfig(): AIProviderConfig {
  const forced = process.env.AI_PROVIDER?.toLowerCase() as AIProviderName | undefined;

  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (forced === "gemini" && geminiKey) {
    return {
      provider: "gemini",
      apiKey: geminiKey,
      model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
    };
  }
  if (forced === "openai" && openaiKey) {
    return {
      provider: "openai",
      apiKey: openaiKey,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }
  if (forced === "anthropic" && anthropicKey) {
    return {
      provider: "anthropic",
      apiKey: anthropicKey,
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022",
    };
  }

  // Auto-detection by key presence
  if (geminiKey) {
    return {
      provider: "gemini",
      apiKey: geminiKey,
      model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
    };
  }
  if (openaiKey) {
    return {
      provider: "openai",
      apiKey: openaiKey,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }
  if (anthropicKey) {
    return {
      provider: "anthropic",
      apiKey: anthropicKey,
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022",
    };
  }

  return {
    provider: "fallback",
    model: "verified-knowledge-engine-v2",
  };
}

export function getProviderHealth(): ActiveProviderStatus {
  const config = getActiveProviderConfig();
  const geminiKey = Boolean(
    process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY
  );
  const openaiKey = Boolean(process.env.OPENAI_API_KEY);
  const anthropicKey = Boolean(process.env.ANTHROPIC_API_KEY);

  return {
    provider: config.provider,
    model: config.model || "default",
    hasKey: Boolean(config.apiKey),
    availableProviders: {
      gemini: geminiKey,
      openai: openaiKey,
      anthropic: anthropicKey,
    },
  };
}

/**
 * Universal Streaming Generator
 * Yields string text tokens from the active LLM provider.
 */
export async function* streamAIResponse(
  messages: ChatMessage[],
  knowledgeContext: string
): AsyncGenerator<string, void, unknown> {
  const config = getActiveProviderConfig();
  const systemPrompt = buildSystemPrompt(knowledgeContext);

  if (config.provider === "gemini" && config.apiKey) {
    try {
      yield* streamGemini(messages, systemPrompt, config.apiKey, config.model || "gemini-flash-lite-latest");
      return;
    } catch (err) {
      console.warn("[AI Provider] Gemini stream failed, falling back to Knowledge Engine:", err);
    }
  }

  if (config.provider === "openai" && config.apiKey) {
    try {
      yield* streamOpenAI(messages, systemPrompt, config.apiKey, config.model || "gpt-4o-mini");
      return;
    } catch (err) {
      console.warn("[AI Provider] OpenAI stream failed, falling back to Knowledge Engine:", err);
    }
  }

  if (config.provider === "anthropic" && config.apiKey) {
    try {
      yield* streamAnthropic(
        messages,
        systemPrompt,
        config.apiKey,
        config.model || "claude-3-5-haiku-20241022"
      );
      return;
    } catch (err) {
      console.warn("[AI Provider] Anthropic stream failed, falling back to Knowledge Engine:", err);
    }
  }

  // High-fidelity Knowledge Engine fallback stream
  yield* streamKnowledgeFallback(messages, knowledgeContext);
}

// ---------------------------------------------------------------------------
// 1. Google Gemini Streaming Implementation
// ---------------------------------------------------------------------------
async function* streamGemini(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string,
  model: string
): AsyncGenerator<string, void, unknown> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  // Map messages into Gemini's contents format
  const contents = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const payload = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 550,
      topP: 0.85,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data:")) continue;

      const jsonStr = trimmed.replace(/^data:\s*/, "").trim();
      if (jsonStr === "[DONE]") return;

      try {
        const parsed = JSON.parse(jsonStr);
        const parts = parsed?.candidates?.[0]?.content?.parts;
        if (Array.isArray(parts)) {
          for (const p of parts) {
            if (p.text) yield p.text;
          }
        }
      } catch {
        // partial chunk, continue
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 2. OpenAI Streaming Implementation
// ---------------------------------------------------------------------------
async function* streamOpenAI(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string,
  model: string
): AsyncGenerator<string, void, unknown> {
  const url = "https://api.openai.com/v1/chat/completions";

  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: apiMessages,
      temperature: 0.35,
      max_tokens: 500,
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    const errText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data:")) continue;

      const dataStr = trimmed.replace(/^data:\s*/, "").trim();
      if (dataStr === "[DONE]") return;

      try {
        const parsed = JSON.parse(dataStr);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // partial chunk, ignore
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Anthropic Claude Streaming Implementation
// ---------------------------------------------------------------------------
async function* streamAnthropic(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string,
  model: string
): AsyncGenerator<string, void, unknown> {
  const url = "https://api.anthropic.com/v1/messages";

  const apiMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      system: systemPrompt,
      messages: apiMessages,
      max_tokens: 500,
      temperature: 0.35,
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    const errText = await response.text();
    throw new Error(`Anthropic API Error (${response.status}): ${errText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const dataStr = trimmed.replace(/^data:\s*/, "").trim();
      try {
        const parsed = JSON.parse(dataStr);
        if (parsed.type === "content_block_delta" && parsed.delta?.text) {
          yield parsed.delta.text;
        }
      } catch {
        // ignore
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Deterministic Knowledge Engine Fallback Stream
// ---------------------------------------------------------------------------
async function* streamKnowledgeFallback(
  messages: ChatMessage[],
  knowledgeContext: string
): AsyncGenerator<string, void, unknown> {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const q = lastUserMsg.toLowerCase();

  let text = "";

  // Roman Urdu queries
  if (
    q.includes("kya kaam") ||
    q.includes("kya banate") ||
    q.includes("kon ho") ||
    q.includes("kaun ho") ||
    q.includes("faraz bhai")
  ) {
    text =
      "Faraz Ahmed AI by Faraz ke Founder aur Lead Full-Stack / AI Engineer hain, based in Toronto, Canada.\n\n" +
      "Faraz Ahmed ye digital solutions deliver karte hain:\n" +
      "1. 🌐 Next.js & Custom WordPress Websites (ultra-fast, SEO optimized)\n" +
      "2. 🤖 24/7 Custom RAG AI Chatbots (trained on your documents)\n" +
      "3. ⚡ AI Automation Pipelines (n8n, Make, Zapier CRM sync)\n" +
      "4. 🎬 Viral Video Editing (3D text behind subject, Roman Urdu captions)\n" +
      "5. 🛒 High-Converting Shopify & WooCommerce Stores\n\n" +
      "Aap apna email ya WhatsApp number yahan share kar sakte hain ya direct WhatsApp button click karke rabta kar sakte hain!";
  } else if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("paise") ||
    q.includes("kitne") ||
    q.includes("quote") ||
    q.includes("budget")
  ) {
    text =
      "Every project is quoted individually based on your exact goals, features, and timeline — we don't publish fixed price lists online.\n\n" +
      "Whether you need a Next.js or WordPress website, a Shopify store, a 24/7 AI chatbot, workflow automation, or video editing, simply share your requirements here or contact Faraz directly:\n\n" +
      "• WhatsApp: +1 (437) 434-8789\n" +
      "• Email: faraz.ahmed4723@gmail.com\n" +
      "• Contact Form: /contact\n\n" +
      "Aap apna project scope ya email/WhatsApp share karein — Faraz aapko tailored custom quote bhejenge!";
  } else if (q.includes("video") || q.includes("reel") || q.includes("tiktok") || q.includes("editing")) {
    text =
      "Faraz Ahmed viral video editing aur 3D motion graphics ke specialist hain!\n\n" +
      "• 3D Text Rotoscoping: Text subject ke peeche 3D space mein place kiya jata hai.\n" +
      "• Kinetic Roman Urdu & English Captions: Word-by-word dynamic highlighted subtitles.\n" +
      "• Saaf Studio Audio: Wind/room echo removal aur punchy SFX sound design.\n" +
      "• Rapid Sentence Pacing: Zero boring pauses taake retention high rahe.\n\n" +
      "Starter Reel, Pro Viral Reel, aur Monthly Growth Pack (10 Reels/month) available hain — custom quote aur showcase ke liye /video-editing visit karein ya WhatsApp karein!";
  } else if (q.includes("elite class limo") || q.includes("portfolio") || q.includes("project")) {
    text =
      "Faraz Ahmed has delivered live production websites including:\n\n" +
      "• Elite Class Limo (eliteclasslimo.ca): Luxury chauffeur & limousine website with instant ride quotation.\n" +
      "• STN Trucking Ltd. (infostntrucking.ca): Commercial trucking & freight website in BC.\n" +
      "• Tabreed & Takeef (Riyadh): Arabic RTL HVAC service & booking site.\n\n" +
      "View all projects at /portfolio or message Faraz on WhatsApp (+1 437-434-8789)!";
  } else {
    text =
      "Hello! Faraz Ahmed is a Toronto-based Full-Stack Web Developer, Custom WordPress Specialist, and AI Engineer with 50+ shipped projects.\n\n" +
      "Whether you need a high-speed Next.js website, a 24/7 RAG AI Chatbot, an automated CRM pipeline, or viral 3D video editing, Faraz can bring your vision to life with agency-level polish and milestone guarantees.\n\n" +
      "Feel free to share your email or WhatsApp number right here in chat and Faraz will personally review your project!";
  }

  // Simulate token stream by chunking words
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? "" : " ") + words[i];
    yield chunk;
    await new Promise((r) => setTimeout(r, 18));
  }
}

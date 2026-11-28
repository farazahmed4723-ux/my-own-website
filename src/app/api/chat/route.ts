import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, saveChatInteractionToSupabase } from "@/lib/supabase";
import {
  retrieveKnowledgeContext,
  extractLeadSignals,
  streamAIResponse,
  getActiveProviderConfig,
  BOT_CONFIG,
  ChatMessage,
  ChatAction,
} from "@/lib/ai";

/**
 * Contextual Action Generator
 * Attach helpful, 1-click action buttons to responses based on detected user intent.
 */
function buildContextualActions(query: string, isLeadCaptured: boolean): ChatAction[] {
  const q = query.toLowerCase();

  if (isLeadCaptured) {
    return [
      { label: "💬 Instant WhatsApp Chat", url: BOT_CONFIG.whatsappUrl, isExternal: true },
      { label: "📋 Submit Full Project Brief", url: BOT_CONFIG.contactUrl },
    ];
  }

  if (q.includes("video") || q.includes("reel") || q.includes("motion") || q.includes("caption")) {
    return [
      { label: "🎬 View Video Editing Showcase", url: BOT_CONFIG.videoEditingUrl },
      { label: "💬 Order Reel on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
    ];
  }

  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("kitne") || q.includes("paise")) {
    return [
      { label: "📋 Request Custom Quote", url: BOT_CONFIG.contactUrl },
      { label: "💬 Discuss on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
    ];
  }

  if (q.includes("portfolio") || q.includes("work") || q.includes("case study") || q.includes("client")) {
    return [
      { label: "🌐 View Full Portfolio", url: BOT_CONFIG.portfolioUrl },
      { label: "💬 Ask Faraz on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
    ];
  }

  if (q.includes("service") || q.includes("what do you do") || q.includes("kya kaam")) {
    return [
      { label: "🚀 Explore All 6 Services", url: BOT_CONFIG.servicesUrl },
      { label: "💼 Request a Custom Quote", preset: "How do I get a custom project quote?" },
      { label: "💬 WhatsApp Chat", url: BOT_CONFIG.whatsappUrl, isExternal: true },
    ];
  }

  // Default helpful actions
  return [
    { label: "💬 Chat on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
    { label: "📋 Project Inquiry Form", url: BOT_CONFIG.contactUrl },
    { label: "🌐 View Portfolio", url: BOT_CONFIG.portfolioUrl },
  ];
}

/**
 * Dispatches an automated email notification when a new lead is captured in chat.
 */
async function notifyFarazOfLead(leadSummary: string, userMessage: string, sessionId: string) {
  if (!process.env.RESEND_API_KEY && !process.env.EMAIL_TO) return;

  try {
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "AI by Faraz <onboarding@resend.dev>",
          to: process.env.EMAIL_TO || "faraz.ahmed4723@gmail.com",
          subject: `🔥 New Chat Lead: ${leadSummary.slice(0, 80)}`,
          text: `A new prospective client just shared their contact details via Faraz Ahmed AI Chatbot!\n\nLead Summary: ${leadSummary}\n\nUser Message: "${userMessage}"\nSession ID: ${sessionId}\nTimestamp: ${new Date().toISOString()}\n\nFollow up immediately on WhatsApp or Email!`,
        }),
      });
    }
  } catch (err) {
    console.warn("[Chat Lead Notification] Failed to send email alert:", err);
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`chat:${ip}`, BOT_CONFIG.rateLimit.maxRequests, BOT_CONFIG.rateLimit.windowMs);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit reached. Please message Faraz directly on WhatsApp (${BOT_CONFIG.whatsappNumber}).`,
          actions: [
            { label: "💬 Connect on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
            { label: "📋 Contact Form", url: BOT_CONFIG.contactUrl },
          ],
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const message = typeof body.message === "string" ? body.message.trim().slice(0, BOT_CONFIG.maxInputLength) : "";
    const sessionId =
      typeof body.sessionId === "string" && body.sessionId.trim().length > 0
        ? body.sessionId.trim().slice(0, 64)
        : `sess-${Date.now()}`;
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const wantsStream = body.stream !== false;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // 1. Lead Detection
    const { isLead, lead, summary: leadSummary } = extractLeadSignals(message);

    // 2. RAG Knowledge Retrieval
    const { context: knowledgeContext } = retrieveKnowledgeContext(message, 4);

    // 3. Format conversation history
    const conversationMessages: ChatMessage[] = [];
    for (const h of rawHistory.slice(-8)) {
      if ((h.role === "user" || h.role === "assistant") && typeof h.content === "string") {
        conversationMessages.push({
          role: h.role,
          content: h.content.slice(0, 800),
        });
      }
    }
    conversationMessages.push({ role: "user", content: message });

    const activeProvider = getActiveProviderConfig();
    const actions = buildContextualActions(message, isLead);

    // If client requested Streaming (SSE)
    if (wantsStream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          let fullReply = "";

          try {
            // Stream tokens from LLM / Knowledge Engine
            for await (const token of streamAIResponse(conversationMessages, knowledgeContext)) {
              fullReply += token;
              const payload = JSON.stringify({ token });
              controller.enqueue(encoder.encode(`event: delta\ndata: ${payload}\n\n`));
            }

            // Detect intent category
            let detectedIntent = "general";
            if (isLead) detectedIntent = "lead_captured";
            else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost"))
              detectedIntent = "pricing";
            else if (message.toLowerCase().includes("service")) detectedIntent = "services";
            else if (message.toLowerCase().includes("video")) detectedIntent = "video_editing";

            // Enqueue final metadata event
            const metaPayload = JSON.stringify({
              intent: detectedIntent,
              leadCaptured: isLead,
              lead,
              actions,
              provider: activeProvider.provider,
            });
            controller.enqueue(encoder.encode(`event: metadata\ndata: ${metaPayload}\n\n`));
            controller.enqueue(encoder.encode("event: done\ndata: [DONE]\n\n"));

            // Background tasks: save to Supabase & dispatch email
            saveChatInteractionToSupabase({
              sessionId,
              userMessage: message,
              botResponse: fullReply,
              intent: detectedIntent,
              capturedEmail: lead?.email,
              capturedPhone: lead?.phone,
              metadata: {
                provider: activeProvider.provider,
                model: activeProvider.model,
                leadData: lead,
                userAgent: request.headers.get("user-agent") || "unknown",
              },
            }).catch((e) => console.error("[Supabase Chat Save Error]", e));

            if (isLead && leadSummary) {
              notifyFarazOfLead(leadSummary, message, sessionId);
            }
          } catch (err) {
            console.error("[Stream Controller Error]", err);
            const errPayload = JSON.stringify({
              error: "Stream interrupted. Please connect with Faraz on WhatsApp.",
            });
            controller.enqueue(encoder.encode(`event: error\ndata: ${errPayload}\n\n`));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        },
      });
    }

    // Non-streaming fallback path (synchronous JSON response)
    let fullReply = "";
    for await (const token of streamAIResponse(conversationMessages, knowledgeContext)) {
      fullReply += token;
    }

    let detectedIntent = "general";
    if (isLead) detectedIntent = "lead_captured";
    else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost"))
      detectedIntent = "pricing";

    await saveChatInteractionToSupabase({
      sessionId,
      userMessage: message,
      botResponse: fullReply,
      intent: detectedIntent,
      capturedEmail: lead?.email,
      capturedPhone: lead?.phone,
      metadata: {
        provider: activeProvider.provider,
        leadData: lead,
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    if (isLead && leadSummary) {
      notifyFarazOfLead(leadSummary, message, sessionId);
    }

    return NextResponse.json({
      success: true,
      reply: fullReply,
      intent: detectedIntent,
      leadCaptured: isLead,
      lead,
      actions,
      provider: activeProvider.provider,
    });
  } catch (error) {
    console.error("Chat API Critical Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process message right now. Please connect directly on WhatsApp (+1 437-434-8789).",
        actions: [
          { label: "💬 Open WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
          { label: "📋 Contact Form", url: BOT_CONFIG.contactUrl },
        ],
      },
      { status: 500 }
    );
  }
}

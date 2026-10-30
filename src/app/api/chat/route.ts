import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  saveChatInteractionToSupabase,
} from "@/lib/supabase";

interface ChatAction {
  label: string;
  url?: string;
  preset?: string;
  isExternal?: boolean;
}

function extractContactSignals(message: string): {
  email: string | null;
  phone: string | null;
} {
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = message.match(/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/);
  return {
    email: emailMatch ? emailMatch[0].toLowerCase() : null,
    phone: phoneMatch ? phoneMatch[0].trim() : null,
  };
}

function generateKnowledgeReply(
  query: string,
  capturedEmail: string | null,
  capturedPhone: string | null
): { intent: string; text: string; actions: ChatAction[] } {
  const q = query.toLowerCase();

  // 1. Automatic Lead Capture acknowledgement if visitor shared email or phone
  if (capturedEmail || capturedPhone) {
    const contactSummary = [capturedEmail, capturedPhone].filter(Boolean).join(" / ");
    return {
      intent: "lead_captured",
      text: `Thank you! I have securely saved your contact details (${contactSummary}) directly to Faraz Ahmed's backend so he can follow up with you personally.\n\nIf you'd like an instant response right now, you can also open a 1-click WhatsApp chat below!`,
      actions: [
        { label: "💬 Instant WhatsApp Chat", url: "https://wa.me/14374348789", isExternal: true },
        { label: "📋 Submit Full Project Brief", url: "/contact" },
      ],
    };
  }

  // 2. Who is Faraz / Bio (English + Roman Urdu)
  if (
    q.includes("who is") ||
    q.includes("about faraz") ||
    q.includes("bio") ||
    q.includes("faraz ahmed") ||
    q.includes("kon hai") ||
    q.includes("kaun") ||
    q.includes("experience")
  ) {
    return {
      intent: "about_founder",
      text: "Faraz Ahmed is the Founder & Lead Full-Stack / AI Engineer behind AI by Faraz, with 2+ years of hands-on production experience, 50+ shipped projects, and 100% client satisfaction.\n\nHe builds blazing-fast Next.js & WordPress websites, custom RAG AI chatbots, autonomous AI agents, Shopify/WooCommerce stores, and end-to-end CRM automations (including Elite Class Limo at eliteclasslimo.ca).",
      actions: [
        { label: "Explore Services", url: "/services" },
        { label: "View Client Portfolio", url: "/portfolio" },
        { label: "Chat on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
      ],
    };
  }

  // 3. Services Overview
  if (
    q.includes("service") ||
    q.includes("what do you do") ||
    q.includes("offer") ||
    q.includes("capabilities") ||
    q.includes("kya kaam") ||
    q.includes("kya banate")
  ) {
    return {
      intent: "services_overview",
      text: "Faraz engineers 6 specialized digital solutions:\n\n1. ⚡ AI Automation — Workflow & CRM pipelines (n8n, Make, Zapier, Webhooks).\n2. 🤖 AI Chatbots — 24/7 custom RAG support & lead-capture assistants.\n3. 🌐 Website Development — High-speed Next.js apps & custom WordPress platforms.\n4. 🧠 AI Agents — Autonomous tool-calling agents & API integrations.\n5. 🛒 E-Commerce — High-converting Shopify & WooCommerce storefronts.\n6. 💻 Custom Software — SaaS MVPs, portals, and Supabase/PostgreSQL backends.",
      actions: [
        { label: "All 6 Services", url: "/services" },
        { label: "💰 Get Pricing Estimate", preset: "How much does a project cost?" },
        { label: "Discuss on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
      ],
    };
  }

  // 4. Pricing, Quotes & Timelines (English + Roman Urdu)
  if (
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("rate") ||
    q.includes("quote") ||
    q.includes("budget") ||
    q.includes("paise") ||
    q.includes("kitne") ||
    q.includes("charges")
  ) {
    return {
      intent: "pricing_inquiry",
      text: "Every project receives a transparent, fixed-price milestone quote tailored to your exact scope:\n\n• Business Website / High-Converting Landing Page: 1–2 weeks delivery\n• Custom AI Chatbot / RAG Knowledge Assistant: 1–2 weeks delivery\n• CRM & Workflow Automation Systems: ROI-focused custom packages\n• Full-Stack Web Apps, E-Commerce & SaaS MVPs: 2–4 weeks delivery\n\nTip: You can type your email or WhatsApp number right here in chat and Faraz will reach out with a custom estimate!",
      actions: [
        { label: "📋 Request Custom Quote", url: "/contact" },
        { label: "💬 Message on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
      ],
    };
  }

  // 5. WordPress / Next.js / SEO Websites
  if (
    q.includes("wordpress") ||
    q.includes("nextjs") ||
    q.includes("next.js") ||
    q.includes("website") ||
    q.includes("seo") ||
    q.includes("web")
  ) {
    return {
      intent: "website_development",
      text: "Faraz specializes in both Next.js (React, TypeScript, Tailwind CSS, Supabase) and Custom WordPress (Elementor Pro, Bricks, Gutenberg).\n\nEvery site is engineered with 95+ Core Web Vitals, technical Schema.org SEO, mobile-first responsiveness, and conversion-focused UI.",
      actions: [
        { label: "Website Development Details", url: "/services/website-development" },
        { label: "Start Website Inquiry", url: "/contact" },
      ],
    };
  }

  // 6. Shopify / WooCommerce / E-Commerce
  if (
    q.includes("shopify") ||
    q.includes("woocommerce") ||
    q.includes("store") ||
    q.includes("ecommerce") ||
    q.includes("e-commerce") ||
    q.includes("shop")
  ) {
    return {
      intent: "ecommerce_solutions",
      text: "Faraz builds high-converting Shopify and WooCommerce stores featuring custom product UX, Stripe/PayPal checkout optimization, automated order notifications, and 24/7 AI shopping assistants.",
      actions: [
        { label: "Explore E-Commerce Solutions", url: "/services/ecommerce-solutions" },
        { label: "Discuss Store Build", url: "https://wa.me/14374348789", isExternal: true },
      ],
    };
  }

  // 7. AI Chatbots / Agents / Automation
  if (
    q.includes("chatbot") ||
    q.includes("agent") ||
    q.includes("automation") ||
    q.includes("ai") ||
    q.includes("rag") ||
    q.includes("n8n") ||
    q.includes("zapier")
  ) {
    return {
      intent: "ai_solutions",
      text: "Faraz builds production AI systems powered by OpenAI, LangChain, vector databases, n8n/Make, and Supabase — from 24/7 website & WhatsApp RAG chatbots to autonomous CRM lead-routing workflows that save teams hours every day.",
      actions: [
        { label: "AI Chatbots", url: "/services/ai-chatbots" },
        { label: "AI Automation", url: "/services/ai-automation" },
        { label: "AI Agents", url: "/services/ai-agents" },
      ],
    };
  }

  // 8. Direct Contact / Hire
  if (
    q.includes("whatsapp") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("hire") ||
    q.includes("call") ||
    q.includes("rabta")
  ) {
    return {
      intent: "direct_contact",
      text: "You can connect with Faraz Ahmed directly anytime:\n\n📱 WhatsApp: +1 (437) 434-8789\n✉️ Email: faraz.ahmed4724@gmail.com\n\nOr simply drop your email / WhatsApp number right here in this chat and I'll log it straight to his inbox!",
      actions: [
        { label: "Open WhatsApp Now", url: "https://wa.me/14374348789", isExternal: true },
        { label: "Project Inquiry Form", url: "/contact" },
      ],
    };
  }

  // 9. Smart Default Fallback encouraging lead capture
  return {
    intent: "general_inquiry",
    text: "Great question! Faraz Ahmed engineers custom Next.js & WordPress websites, 24/7 AI chatbots, Shopify stores, and automated workflows.\n\nFeel free to share your email or WhatsApp number right here if you'd like Faraz to review your idea personally, or pick an option below:",
    actions: [
      { label: "📋 Send Project Inquiry", url: "/contact" },
      { label: "💬 Chat on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
      { label: "Explore All Services", url: "/services" },
    ],
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`chat:${ip}`, 25, 5 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit reached. Please message Faraz directly on WhatsApp (+1 437-434-8789).",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
    const sessionId =
      typeof body.sessionId === "string" && body.sessionId.trim().length > 0
        ? body.sessionId.trim().slice(0, 64)
        : `sess-${Date.now()}`;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    const { email: capturedEmail, phone: capturedPhone } = extractContactSignals(message);
    let result = generateKnowledgeReply(message, capturedEmail, capturedPhone);

    // Optional live OpenAI upgrade when OPENAI_API_KEY is configured
    if (process.env.OPENAI_API_KEY && !capturedEmail && !capturedPhone) {
      try {
        const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            max_tokens: 240,
            temperature: 0.4,
            messages: [
              {
                role: "system",
                content:
                  "You are the official AI Assistant for AI by Faraz (aibyfaraz.com), founded by Faraz Ahmed — a Full-Stack Web Developer & AI Solutions Specialist (Next.js, WordPress, Shopify, AI Chatbots, AI Agents, CRM Automation). Contact: WhatsApp +1 (437) 434-8789, Email faraz.ahmed4724@gmail.com. Keep replies concise, helpful, and invite visitors to share their email/WhatsApp or book a free consultation.",
              },
              { role: "user", content: message },
            ],
          }),
        });
        if (aiRes.ok) {
          const aiJson = await aiRes.json();
          const llmText = aiJson?.choices?.[0]?.message?.content?.trim();
          if (llmText) {
            result = { ...result, text: llmText };
          }
        }
      } catch {
        // Fallback smoothly to deterministic knowledge reply
      }
    }

    // Persist chat interaction & any captured lead to Supabase
    await saveChatInteractionToSupabase({
      sessionId,
      userMessage: message,
      botResponse: result.text,
      intent: result.intent,
      capturedEmail,
      capturedPhone,
      metadata: {
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json({
      success: true,
      intent: result.intent,
      leadCaptured: Boolean(capturedEmail || capturedPhone),
      reply: result.text,
      actions: result.actions,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process message right now. Please connect on WhatsApp (+1 437-434-8789).",
      },
      { status: 500 }
    );
  }
}


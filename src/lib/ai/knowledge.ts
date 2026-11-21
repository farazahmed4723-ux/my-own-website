import { KnowledgeChunk } from "./types";

/**
 * AI by Faraz - Comprehensive Structured Knowledge Base
 * Easy to update, covers all pages, services, pricing, portfolio, FAQs, and policies.
 */
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ---------------------------------------------------------------------------
  // 1. FOUNDER & BIO
  // ---------------------------------------------------------------------------
  {
    id: "bio_founder",
    title: "Faraz Ahmed — Founder & Lead Engineer",
    category: "bio",
    keywords: [
      "who is",
      "about faraz",
      "bio",
      "founder",
      "experience",
      "faraz ahmed",
      "location",
      "toronto",
      "canada",
      "background",
      "kon hai",
      "kaun hai",
      "who are you",
    ],
    priority: 10,
    content: `
Faraz Ahmed is the Founder & Lead AI / Full-Stack Engineer behind AI by Faraz (aibyfaraz.com), based in Toronto, Ontario, Canada.
• Hands-on production experience with 50+ shipped projects and 100% verified client satisfaction.
• Core expertise: Blazing-fast Next.js React web apps, custom headless WordPress (Elementor Pro/Bricks/Gutenberg), 24/7 custom RAG AI chatbots, autonomous AI agents, Shopify/WooCommerce e-commerce stores, and end-to-end CRM workflow automation pipelines (n8n, Make, Zapier).
• Also specializes in high-retention viral video editing & 3D motion graphics for founders and personal brands.
• Location: Based in Toronto, Canada. Works with ambitious clients worldwide across Canada, the United States, the UK, Europe, UAE/Middle East, and Pakistan.
• Core philosophy: Agency-level visual elegance paired with clean, scalable code architecture, transparent milestone pricing, and rapid delivery.
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 2. SERVICES
  // ---------------------------------------------------------------------------
  {
    id: "service_ai_automation",
    title: "AI Automation & Workflow Pipelines",
    category: "service",
    keywords: [
      "automation",
      "ai automation",
      "workflow",
      "n8n",
      "make",
      "zapier",
      "pipeline",
      "crm",
      "lead routing",
      "hubspot",
      "airtable",
    ],
    priority: 8,
    content: `
Service: AI Automation & Workflow Pipelines (Page: /services/ai-automation)
• What it is: Self-operating business workflows that eliminate repetitive manual data entry, automate lead qualification, sync CRMs, and route client alerts 24/7.
• Capabilities: n8n, Make.com, Zapier, custom webhooks, Supabase triggers, Slack/WhatsApp notifications, automatic invoice generation, AI email draft responses.
• Business Benefits: Saves 15–30+ hours of team labor per week, zero manual data entry errors, instant 10-second response time to high-value leads.
• Typical Timeline: 1 to 2 weeks for full setup, testing, and team training.
    `.trim(),
  },
  {
    id: "service_ai_chatbots",
    title: "Custom RAG AI Chatbots",
    category: "service",
    keywords: [
      "chatbot",
      "chatbots",
      "rag",
      "ai chat",
      "customer support",
      "lead capture bot",
      "supabase vector",
      "smart bot",
      "chat",
    ],
    priority: 9,
    content: `
Service: Custom AI Chatbots & RAG Assistants (Page: /services/ai-chatbots)
• What it is: Intelligent 24/7 conversational agents trained exclusively on your company's documents, PDFs, products, and website pages using Retrieval-Augmented Generation (RAG).
• Capabilities: Natural multilingual understanding (English, Urdu, Roman Urdu, Hindi, Spanish, French), automatic lead qualification & contact capture, instant human handover (WhatsApp, Call, Email), zero hallucination boundaries.
• Tech Stack: OpenAI GPT-4o, Google Gemini, Anthropic Claude, Supabase pgvector, Next.js streaming API, Tailwind CSS glassmorphic widgets.
• Deployment: Embeddable on any website (Next.js, WordPress, Shopify, Webflow) or integrated into WhatsApp / Telegram.
• Typical Timeline: 1 to 2 weeks for ingest, training, UI polish, and production deployment.
    `.trim(),
  },
  {
    id: "service_website_dev",
    title: "High-Performance Website Development",
    category: "service",
    keywords: [
      "website",
      "web development",
      "nextjs",
      "next.js",
      "react",
      "wordpress",
      "landing page",
      "frontend",
      "full stack",
      "seo",
      "speed",
    ],
    priority: 9,
    content: `
Service: High-Performance Website Development (Page: /services/website-development)
• What it is: Modern, conversion-focused websites engineered for speed, technical SEO supremacy, and sleek visual luxury.
• Options:
  1. Next.js 14 App Router: React, TypeScript, Tailwind CSS, Framer Motion, dynamic serverless APIs, 95+ Core Web Vitals score.
  2. Custom WordPress: Elementor Pro, Bricks Builder, custom ACF fields, blazing fast caching, easy client CMS editor.
• Inclusions: 100% mobile-first responsive design, dark/light mode toggle, technical Schema.org SEO, OpenGraph tags, SSL, contact forms with spam protection.
• Typical Timeline: 1 to 2 weeks for landing pages; 2 to 3 weeks for full multi-page business websites.
    `.trim(),
  },
  {
    id: "service_ai_agents",
    title: "Autonomous AI Agents",
    category: "service",
    keywords: [
      "ai agent",
      "agents",
      "autonomous",
      "tool calling",
      "function calling",
      "langchain",
      "multi agent",
      "research agent",
    ],
    priority: 8,
    content: `
Service: Autonomous AI Agents (Page: /services/ai-agents)
• What it is: Multi-step AI agents that execute complex workflows autonomously: searching web databases, calling external APIs, extracting structured data, analyzing competitive market data, and drafting comprehensive reports.
• Capabilities: Tool-use / function calling, self-healing retries, human-in-the-loop approvals, scheduled autonomous execution.
• Tech Stack: LangChain, LangGraph, Python / Node.js, Vercel Serverless, Supabase, OpenAI / Claude function calling.
• Typical Timeline: 2 to 4 weeks depending on the complexity of external tools and database logic.
    `.trim(),
  },
  {
    id: "service_ecommerce",
    title: "High-Converting E-Commerce Stores",
    category: "service",
    keywords: [
      "ecommerce",
      "e-commerce",
      "shopify",
      "woocommerce",
      "online store",
      "shop",
      "store build",
      "stripe",
      "paypal",
    ],
    priority: 8,
    content: `
Service: E-Commerce Storefronts (Page: /services/ecommerce-solutions)
• What it is: High-converting Shopify and WooCommerce online stores with custom UX, 1-click checkout optimization, and automated inventory sync.
• Features: Custom Liquid themes, upsell & cross-sell popups, Stripe / PayPal / Apple Pay integration, automated abandoned cart recovery, 24/7 AI shopping assistant.
• Case Study: Lumina Boutique fashion store achieved a 3.2x conversion rate increase and sub-2-second mobile load time.
• Typical Timeline: 2 to 3 weeks.
    `.trim(),
  },
  {
    id: "service_custom_software",
    title: "Custom Software & SaaS MVP Development",
    category: "service",
    keywords: [
      "software",
      "saas",
      "mvp",
      "custom portal",
      "backend",
      "database",
      "postgresql",
      "supabase",
      "api development",
    ],
    priority: 7,
    content: `
Service: Custom Software & SaaS MVPs (Page: /services/custom-software)
• What it is: Tailor-made web applications, client portals, internal team dashboards, and investor-ready SaaS MVPs.
• Stack: Next.js, TypeScript, Supabase PostgreSQL, Firebase Auth, Stripe billing subscriptions, REST / GraphQL APIs.
• Security & Architecture: Row-Level Security (RLS), role-based access control (RBAC), encrypted storage vaults, automated CI/CD deployment on Vercel or AWS.
• Typical Timeline: 3 to 6 weeks for standard MVP release.
    `.trim(),
  },
  {
    id: "service_video_editing",
    title: "Viral Video Editing & 3D Motion Graphics",
    category: "video_editing",
    keywords: [
      "video editing",
      "video",
      "reels",
      "shorts",
      "tiktok",
      "motion graphics",
      "3d rotoscoping",
      "roman urdu captions",
      "sfx",
      "b-roll",
      "vfx",
    ],
    priority: 9,
    content: `
Service: Viral Video Editing & Motion Graphics (Page: /video-editing)
• What it is: Turning raw phone camera recordings into scroll-stopping Instagram Reels, TikToks, and YouTube Shorts for founders and creators.
• Distinctive Techniques:
  1. 3D Text Behind Subject: Rotoscope typography placed inside the environment behind the speaker for 3D depth.
  2. Kinetic Typography: Bold Roman Urdu and English highlighted captions timed word-for-word (for the 80% of viewers watching without audio).
  3. Rapid Sentence Pacing: All dead pauses and awkward breaths excised.
  4. Dynamic Camera Punch-Ins: Punch-in cuts and angle transitions so the footage never feels static.
  5. Studio SFX & Audio Clean: Wind and background room echo removed, voice mastered, punchy sound design.
• Showcase Reels: "Canada vs Pakistan" 3D VFX reel, "Asal Kamyabi" Urdu storytelling reel, "Self-Reliance" neon animated reel.
• Packages:
  • Starter Pack: $150 CAD / 3 Reels (ideal for testing styles).
  • Growth Pack: $350 CAD / 8 Reels (bi-weekly batch, full 3D VFX, motion B-roll).
  • Authority Pack: $650 CAD / 15 Reels (daily month domination, priority 24h turnaround, custom thumbnails).
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 3. PRICING & ESTIMATES
  // ---------------------------------------------------------------------------
  {
    id: "pricing_guide",
    title: "Pricing Guidelines & Estimation Policy",
    category: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "how much",
      "rate",
      "quote",
      "budget",
      "charges",
      "paise",
      "kitne",
      "fees",
      "expensive",
      "affordable",
    ],
    priority: 10,
    content: `
Pricing Guidelines & Estimates:
Every client project is scoped with a 100% transparent, fixed-price milestone quote so there are never surprise fees or hourly overages.

Starting Benchmarks (in CAD / USD equivalent):
• High-Converting Landing Page / Business Website: $750 – $1,500 CAD (1–2 weeks delivery).
• Custom RAG AI Chatbot / Lead Generation Assistant: $600 – $1,200 CAD (1–2 weeks delivery).
• E-Commerce Storefront (Shopify or WooCommerce): $1,200 – $2,500 CAD (2–3 weeks delivery).
• End-to-End AI Automation Pipeline (n8n/Make/CRM): $500 – $1,500 CAD depending on workflow complexity.
• Full-Stack SaaS MVP / Custom Software Portal: $2,000 – $5,000+ CAD (3–5 weeks delivery).
• Video Editing Bundles: $150 Starter (3 reels) | $350 Growth (8 reels) | $650 Authority (15 reels).

Payment Terms & Guarantee:
• Standard payment structure: 50% milestone upon kickoff & architecture approval, 50% upon final production launch & testing.
• 100% Client Satisfaction Guarantee: Unlimited revisions during the project phase until you are thrilled with the outcome.
• Free 30-day post-launch warranty support included for all custom websites and software builds.
• To get an exact milestone quote for your project, share your requirements or drop your email/WhatsApp in chat!
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 4. PORTFOLIO & VERIFIED CLIENTS
  // ---------------------------------------------------------------------------
  {
    id: "portfolio_cases",
    title: "Portfolio, Case Studies & Verified Work",
    category: "portfolio",
    keywords: [
      "portfolio",
      "work",
      "projects",
      "case study",
      "clients",
      "reviews",
      "elite class limo",
      "lumina",
      "testimonials",
      "proof",
    ],
    priority: 9,
    content: `
Verified Case Studies & Portfolio (Page: /portfolio):
1. Elite Class Limo (eliteclasslimo.ca):
   • Client: Premier luxury chauffeur & executive limousine service in Ontario & Toronto.
   • Result: High-converting luxury Next.js website with instant ride quotation system, dynamic fleet showcase, and 98+ PageSpeed score. Client saw a notable surge in organic bookings within weeks of launch.
2. Lumina Boutique:
   • Client: Modern boutique fashion & lifestyle apparel brand.
   • Result: Custom e-commerce storefront with 1-click cart slide-out, size guides, and 3.2x higher checkout completion.
3. RAG AI Support Assistant:
   • Built custom vector-indexed chatbot for business customer support that lowered tier-1 support tickets by 65%.
4. Viral Personal Brand Video Editing:
   • Crafted 3D rotoscoped vertical reels with kinetic Roman Urdu subtitles, exceeding 100k+ organic views on Instagram.
• All projects come with 5-star verified client feedback and 100% on-time delivery track record.
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 5. CONTACT & HANDOVER
  // ---------------------------------------------------------------------------
  {
    id: "contact_details",
    title: "Direct Contact Channels & Availability",
    category: "contact",
    keywords: [
      "contact",
      "whatsapp",
      "email",
      "phone",
      "call",
      "hire",
      "reach out",
      "book consultation",
      "rabta",
      "number",
      "how to hire",
    ],
    priority: 10,
    content: `
Direct Contact Channels for Faraz Ahmed:
• WhatsApp: +1 (437) 434-8789 (Fastest response — 1-click chat: https://wa.me/14374348789)
• Email: faraz.ahmed4723@gmail.com
• Phone: +1 (437) 434-8789
• Project Brief & Quote Form: https://aibyfaraz.com/contact
• Location: Toronto, Ontario, Canada (Available across North American & International time zones).
• Consultation: Free 30-minute discovery call available to assess your website, AI workflow, or video editing vision.
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 6. POLICIES & GUARANTEES
  // ---------------------------------------------------------------------------
  {
    id: "policies_guarantees",
    title: "Business Policies, Quality Guarantee & IP Ownership",
    category: "policy",
    keywords: [
      "guarantee",
      "policy",
      "satisfaction",
      "ownership",
      "code",
      "refund",
      "maintenance",
      "revisions",
      "terms",
    ],
    priority: 7,
    content: `
Client Policies & Commitments:
• 100% Client Satisfaction Guarantee: Revisions are made until the solution matches the agreed specifications.
• 100% IP & Code Ownership: Upon final payment, the client receives 100% full rights to all source code, Figma designs, assets, and deployment environments. No vendor lock-in.
• Confidentiality & NDAs: Your business data, proprietary workflows, and customer lists are kept strictly confidential under mutual NDA standards.
• Post-Launch Support: Every website and custom software build comes with 30 days of free bug-fix warranty and handover documentation.
    `.trim(),
  },

  // ---------------------------------------------------------------------------
  // 7. FREQUENTLY ASKED QUESTIONS
  // ---------------------------------------------------------------------------
  {
    id: "faqs_general",
    title: "Frequently Asked Questions",
    category: "faq",
    keywords: [
      "faq",
      "faqs",
      "questions",
      "how does it work",
      "process",
      "start",
      "payment",
      "technology",
      "support",
    ],
    priority: 8,
    content: `
Common Frequently Asked Questions:
Q: How quickly can we start my project?
A: Usually within 24 to 48 hours of initial consultation and scope sign-off.

Q: Do you work with clients outside Canada?
A: Yes! Over 60% of Faraz's clients are located across the United States, UK, UAE, Pakistan, and Europe. All meetings and updates are handled smoothly via Zoom, Google Meet, and WhatsApp.

Q: Can I update content myself after launch?
A: Absolutely. WordPress sites are configured with intuitive visual page builders, and Next.js / SaaS projects are delivered with headless CMS or Supabase management panels.

Q: What makes your AI chatbots different from basic bots?
A: Unlike generic rule-based widgets that show rigid multiple-choice menus, Faraz builds context-aware RAG systems powered by real LLMs (OpenAI GPT-4o, Gemini, Claude) connected to your actual company documentation with instant lead-saving to Supabase and 1-click WhatsApp escalation.
    `.trim(),
  },
];

/**
 * Intelligent Retrieval Engine:
 * Scores and extracts the most relevant knowledge chunks for any user query.
 */
export function retrieveKnowledgeContext(query: string, maxChunks = 4): {
  context: string;
  matchedChunks: KnowledgeChunk[];
} {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;

    // Check keywords
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 8;
      }
      for (const token of queryTokens) {
        if (kw.includes(token)) {
          score += 2;
        }
      }
    }

    // Check title match
    const titleLower = chunk.title.toLowerCase();
    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 4;
    }

    // Content match
    const contentLower = chunk.content.toLowerCase();
    for (const token of queryTokens) {
      if (contentLower.includes(token)) score += 1;
    }

    // Base priority bonus
    score += chunk.priority || 0;

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Take top chunks with positive score, or fallback to bio + services if no specific match
  let topChunks = scored.filter((s) => s.score > 2).slice(0, maxChunks).map((s) => s.chunk);

  if (topChunks.length === 0) {
    topChunks = KNOWLEDGE_BASE.filter(
      (c) => c.id === "bio_founder" || c.id === "pricing_guide" || c.id === "contact_details"
    );
  }

  const contextText = topChunks
    .map((c) => `=== [KNOWLEDGE: ${c.title.toUpperCase()}] ===\n${c.content}`)
    .join("\n\n");

  return {
    context: contextText,
    matchedChunks: topChunks,
  };
}

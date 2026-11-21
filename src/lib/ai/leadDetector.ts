import { LeadData } from "./types";

/**
 * Smart Lead Detection & Extraction
 * Automatically identifies user contact details, budget, service intent, and project description.
 */
export function extractLeadSignals(text: string): {
  isLead: boolean;
  lead: LeadData | null;
  summary: string | null;
} {
  if (!text || typeof text !== "string") {
    return { isLead: false, lead: null, summary: null };
  }

  const trimmed = text.trim();

  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = trimmed.match(emailRegex);
  const email = emailMatch ? emailMatch[1].toLowerCase() : undefined;

  // 2. Phone extraction (international & North American formats)
  // Matches formats like +1 437 434 8789, (437) 434-8789, +92 300 1234567, 03001234567, 4374348789
  const phoneRegex = /(?:(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{0,4})/;
  let phone: string | undefined = undefined;
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    const rawMatch = trimmed.match(phoneRegex);
    if (rawMatch && rawMatch[0].replace(/\D/g, "").length >= 10) {
      phone = rawMatch[0].trim();
    }
  }

  // 3. Name extraction heuristic (e.g., "my name is Alex", "I am John", "mera naam Farhan", "call me Dave")
  let name: string | undefined = undefined;
  const namePatterns = [
    /(?:my name is|i am|i'm|name is|call me|mera naam|mera name)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:this is)\s+([A-Z][a-z]+)/i,
  ];
  for (const pat of namePatterns) {
    const match = trimmed.match(pat);
    if (match && match[1]) {
      name = match[1].trim();
      break;
    }
  }

  // 4. Budget extraction
  let budget: string | undefined = undefined;
  const budgetMatch = trimmed.match(
    /(?:budget|cost|price|around|approx|approximately)?\s*(?:[\$£€]|cad|usd|pkr|rs\.?)?\s*(\d{2,6}(?:,\d{3})*|\d+k|\d+\s*lakh)\s*(?:[\$£€]|cad|usd|pkr|dollars?)?/i
  );
  if (budgetMatch && budgetMatch[0].length < 30 && /\d/.test(budgetMatch[0])) {
    const rawVal = budgetMatch[0].trim();
    if (rawVal.toLowerCase().includes("budget") || rawVal.includes("$") || rawVal.toLowerCase().includes("cad") || rawVal.toLowerCase().includes("usd")) {
      budget = rawVal;
    }
  }

  // 5. Service detection
  let service: string | undefined = undefined;
  const lower = trimmed.toLowerCase();
  if (lower.includes("video") || lower.includes("reel") || lower.includes("editing") || lower.includes("tiktok")) {
    service = "Viral Video Editing & Motion Graphics";
  } else if (lower.includes("chatbot") || lower.includes("bot") || lower.includes("rag")) {
    service = "Custom AI Chatbots & RAG Assistants";
  } else if (lower.includes("automation") || lower.includes("n8n") || lower.includes("make") || lower.includes("zapier")) {
    service = "AI Automation & CRM Workflows";
  } else if (lower.includes("shopify") || lower.includes("store") || lower.includes("ecommerce") || lower.includes("woocommerce")) {
    service = "E-Commerce Solutions";
  } else if (lower.includes("wordpress") || lower.includes("elementor") || lower.includes("bricks")) {
    service = "Custom WordPress Development";
  } else if (lower.includes("saas") || lower.includes("software") || lower.includes("mvp") || lower.includes("portal")) {
    service = "Custom Software & SaaS MVP";
  } else if (lower.includes("website") || lower.includes("nextjs") || lower.includes("next.js") || lower.includes("web app")) {
    service = "Next.js High-Performance Website";
  }

  const isLead = Boolean(email || phone);

  let summary: string | null = null;
  if (isLead) {
    const parts = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      phone ? `Phone: ${phone}` : null,
      service ? `Service: ${service}` : null,
      budget ? `Budget: ${budget}` : null,
    ].filter(Boolean);
    summary = parts.join(" | ");
  }

  return {
    isLead,
    lead: isLead
      ? {
          name,
          email,
          phone,
          service,
          budget,
          description: trimmed,
          rawSnippet: trimmed.slice(0, 300),
        }
      : null,
    summary,
  };
}

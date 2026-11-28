import { ChatAction } from "./types";

/**
 * Chatbot UI & Business Brand Configuration
 */
export const BOT_CONFIG = {
  name: "Faraz Ahmed AI",
  tagline: "Online • AI Solutions Specialist & Full-Stack Engineer",
  avatarUrl: "/images/logo.jpg",
  founderName: "Faraz Ahmed",
  agencyName: "AI by Faraz",
  location: "Toronto, Ontario, Canada",
  whatsappNumber: "+1 (437) 434-8789",
  whatsappUrl: "https://wa.me/14374348789",
  email: "faraz.ahmed4723@gmail.com",
  phone: "+14374348789",
  contactUrl: "/contact",
  servicesUrl: "/services",
  portfolioUrl: "/portfolio",
  videoEditingUrl: "/video-editing",
  maxInputLength: 1200,
  rateLimit: {
    maxRequests: 30,
    windowMs: 5 * 60 * 1000, // 5 minutes
  },
};

export const INITIAL_SUGGESTIONS: ChatAction[] = [
  { label: "👤 Who is Faraz Ahmed?", preset: "Who is Faraz Ahmed and what is your experience?" },
  { label: "🚀 What services do you offer?", preset: "What services do you offer?" },
  { label: "💼 Request a Custom Quote", preset: "How do I get a custom project quote?" },
  { label: "🎬 Viral Video Editing", preset: "Tell me about your video editing and motion graphics packages." },
  { label: "💼 View Portfolio & Case Studies", preset: "What projects have you completed? Show me case studies." },
  { label: "💬 Chat on WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
];

export const DIRECT_HANDOVER_ACTIONS: ChatAction[] = [
  { label: "💬 1-Click WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
  { label: "📋 Request a Project Quote", url: BOT_CONFIG.contactUrl },
  { label: "✉️ Email Faraz Directly", url: `mailto:${BOT_CONFIG.email}`, isExternal: true },
  { label: "📞 Call (+1 437-434-8789)", url: `tel:${BOT_CONFIG.phone}`, isExternal: true },
];

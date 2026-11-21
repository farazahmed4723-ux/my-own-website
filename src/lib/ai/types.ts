/**
 * AI by Faraz - Conversational AI Architecture Types
 */

export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  role: Role;
  content: string;
  timestamp?: string;
}

export interface ChatAction {
  label: string;
  url?: string;
  preset?: string;
  isExternal?: boolean;
  type?: "contact" | "whatsapp" | "call" | "preset" | "portfolio" | "link";
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  description?: string;
  preferredContact?: "whatsapp" | "email" | "phone";
  rawSnippet?: string;
}

export type KnowledgeCategory =
  | "bio"
  | "service"
  | "pricing"
  | "portfolio"
  | "faq"
  | "contact"
  | "policy"
  | "video_editing";

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  keywords: string[];
  priority?: number;
}

export type AIProviderName = "gemini" | "openai" | "anthropic" | "fallback";

export interface AIProviderConfig {
  provider: AIProviderName;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponsePayload {
  success: boolean;
  reply: string;
  intent: string;
  leadCaptured: boolean;
  lead?: LeadData | null;
  actions?: ChatAction[];
  provider: AIProviderName;
  error?: string;
}

export interface ChatInteractionRecord {
  id?: string;
  createdAt?: string;
  sessionId: string;
  userMessage: string;
  botResponse: string;
  intent: string;
  capturedEmail?: string | null;
  capturedPhone?: string | null;
  capturedName?: string | null;
  isHotLead: boolean;
  provider: string;
  metadata?: Record<string, unknown>;
}

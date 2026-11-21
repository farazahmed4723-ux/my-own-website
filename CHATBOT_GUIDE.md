# AI by Faraz — Production Conversational AI Chatbot Guide

Welcome to the official documentation for the **AI by Faraz Conversational Sales & Support System**. This production-ready intelligent AI assistant was engineered to deliver agency-level visual luxury, real multilingual LLM intelligence, automatic lead generation, and provider-independent flexibility.

---

## 1. How to Configure the AI API Key

The chatbot utilizes a **Provider-Independent Architecture**. It works out of the box with:
1. **Google Gemini** (Gemini 1.5 Flash / Gemini 2.0 Flash) — *Recommended for speed and cost-effectiveness*
2. **OpenAI** (GPT-4o / GPT-4o-mini)
3. **Anthropic** (Claude 3.5 Haiku / Sonnet)
4. **Deterministic Verified RAG Knowledge Engine** (Active if no API key is set)

### Adding your API Key in `.env.local`:
Open `.env.local` in the project root and add your preferred provider:

```env
# Option A: Google Gemini (Recommended)
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...your_gemini_key
GEMINI_MODEL=gemini-1.5-flash

# Option B: OpenAI
# AI_PROVIDER=openai
# OPENAI_API_KEY=sk-proj-...your_openai_key
# OPENAI_MODEL=gpt-4o-mini

# Option C: Anthropic Claude
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-...your_anthropic_key
# ANTHROPIC_MODEL=claude-3-5-haiku-20241022
```

> **Note:** If no external key is present, the chatbot gracefully operates using its built-in **Verified Knowledge Engine (v2)**, answering questions accurately based on Faraz's real services, pricing, and portfolio without ever hallucinating or breaking.

---

## 2. How to Update the Chatbot Knowledge Base

All business facts, service capabilities, pricing guidelines, portfolio case studies, and contact details are stored centrally in:
👉 `src/lib/ai/knowledge.ts`

### Adding a New Service or Updating Prices:
1. Open `src/lib/ai/knowledge.ts`.
2. Locate or add a chunk in `KNOWLEDGE_BASE`:

```typescript
{
  id: "service_new_capability",
  title: "New AI Workflow Service",
  category: "service",
  keywords: ["keyword1", "keyword2", "workflow"],
  priority: 8,
  content: `
Service: New AI Workflow Service
• What it is: Describe the service clearly.
• Capabilities: Features, tools, and tech stack.
• Starting Price: Starting at $1,000 CAD.
• Delivery Timeline: 1 to 2 weeks.
  `.trim(),
}
```
3. The semantic retrieval engine automatically indexes the new chunk and supplies it to the LLM context.

---

## 3. How to Change the Chatbot's Appearance

All visual branding and configuration settings reside in:
👉 `src/lib/ai/config.ts` and `src/components/AIChatBot.tsx`

### Modifying Avatar, Name, or Welcome Questions:
In `src/lib/ai/config.ts`:
```typescript
export const BOT_CONFIG = {
  name: "Faraz Ahmed AI",
  tagline: "Online • AI Solutions Consultant",
  avatarUrl: "/images/logo.jpg",
  whatsappNumber: "+1 (437) 434-8789",
  whatsappUrl: "https://wa.me/14374348789",
  email: "faraz.ahmed4723@gmail.com",
};
```

### Customizing Colors & Glassmorphism:
In `src/components/AIChatBot.tsx`:
- **Dark Mode Card**: Styled with `#090D24`/95 cosmic glass, purple border glow (`border-purple-500/30`), and neon purple accents.
- **Light Mode Card**: Styled with `bg-white/95 text-slate-900 border-slate-200/90 shadow-2xl`, with dark slate text in assistant bubbles.
- **Accent Gradients**: `from-purple-600 to-indigo-600` for primary action buttons and user speech bubbles.

---

## 4. How to Manage Captured Leads

The chatbot features **Smart Lead Extraction** (`src/lib/ai/leadDetector.ts`). When a user mentions their email, phone number, name, or budget:
1. **PostgreSQL Relational DB**: Saved immediately to the `chat_leads` table in Supabase.
2. **Encrypted Storage Vault**: Saved to the private Supabase Storage bucket (`backend-vault`) to ensure zero lead loss.
3. **Instant Email Alert**: If `RESEND_API_KEY` is configured, an instant notification is dispatched to Faraz (`EMAIL_TO`).

### Accessing the Admin Management Console:
Visit your live website at:
🔗 **`/admin/chatbot`**
Enter your `ADMIN_SECRET_KEY` (default: `faraz-ai-admin-2026`).

Inside the dashboard, you can:
- View all captured **Hot Leads** with email and WhatsApp links.
- Filter conversations and export leads directly to **CSV**.
- View **Conversation Analytics** and popular user topics.
- Run real-time **Knowledge Base Retrieval Tests**.
- Check live **AI Provider Health**.
- Enforce data retention policies by deleting older chat logs.

---

## 5. How to Deploy the Chatbot

Since the chatbot is built natively within Next.js 14:
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: integrate production AI chatbot"
   git push origin main
   ```
2. In your Vercel project settings:
   - Go to **Settings** -> **Environment Variables**.
   - Add `GEMINI_API_KEY` (or `OPENAI_API_KEY`).
   - Add `ADMIN_SECRET_KEY=faraz-ai-admin-2026`.
   - Verify Supabase credentials are set.
3. Deploy! Vercel serverless Edge & Node functions support the SSE streaming response natively without additional server configuration.

---

## 6. How to Integrate into Another Client Website

The modular architecture was specifically designed for rapid re-use across client projects.

### Step-by-Step Porting:
1. Copy the folder `src/lib/ai/` into the new Next.js project.
2. Copy `src/components/AIChatBot.tsx` into the new project's `components/` directory.
3. Copy `src/app/api/chat/route.ts` into the new project's `app/api/chat/` directory.
4. Update `src/lib/ai/config.ts` with the new client's name, WhatsApp, phone, email, and avatar.
5. Replace the knowledge chunks in `src/lib/ai/knowledge.ts` with the new client's business offerings, services, and FAQ items.
6. Add `<AIChatBot />` to the new project's root `layout.tsx`.
7. Done! The client now has a full-featured, multilingual, streaming AI sales assistant.

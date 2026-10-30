-- ============================================================================
-- AI BY FARAZ — PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- Project Ref: txvrsgbyckpluptkbtwk (https://txvrsgbyckpluptkbtwk.supabase.co)
-- Run this file once in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROJECT INQUIRIES & CONTACT SUBMISSIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2),
    email TEXT NOT NULL CHECK (char_length(trim(email)) >= 5),
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT DEFAULT 'Not specified',
    description TEXT NOT NULL CHECK (char_length(trim(description)) >= 10),
    source TEXT NOT NULL DEFAULT 'website_contact_form',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);

-- ----------------------------------------------------------------------------
-- 2. AI ASSISTANT CONVERSATIONS & CAPTURED CHAT LEADS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    intent TEXT NOT NULL DEFAULT 'general',
    captured_email TEXT,
    captured_phone TEXT,
    is_hot_lead BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_chat_leads_created_at ON public.chat_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session_id ON public.chat_leads (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_leads_hot ON public.chat_leads (is_hot_lead) WHERE is_hot_lead = TRUE;

-- ----------------------------------------------------------------------------
-- 3. VERIFIED CLIENT REVIEWS & TESTIMONIALS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    client_name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    company_url TEXT,
    avatar_url TEXT,
    initials TEXT NOT NULL,
    project_type TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    highlight TEXT,
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    approved BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 100
);

CREATE INDEX IF NOT EXISTS idx_reviews_approved_order ON public.reviews (approved, sort_order ASC);

-- Seed the 4 verified client reviews (idempotent)
INSERT INTO public.reviews (
    id, client_name, role, company, company_url, avatar_url, initials,
    project_type, quote, rating, highlight, verified, approved, sort_order
) VALUES
(
    'elite-class-limo',
    'Executive Chauffeur Team',
    'Leadership & Operations',
    'Elite Class Limo',
    'https://eliteclasslimo.ca/',
    NULL,
    'EC',
    'Luxury Chauffeur Website Development',
    'Faraz engineered a stunning luxury website for Elite Class Limo that truly represents our premier brand. The site is fast, looks incredible across mobile and desktop, and has helped our client bookings grow consistently. His attention to detail, modern design flair, and ongoing technical reliability are top-notch.',
    5,
    'Bookings increased noticeably within weeks of launch',
    TRUE,
    TRUE,
    1
),
(
    'saima-review',
    'Saima',
    'Founder & Creative Director',
    'Lumina Boutique & E-Commerce',
    NULL,
    '/images/reviews/saima-dp.webp',
    'SA',
    'E-Commerce Storefront & AI Support Chatbot',
    'Faraz transformed our online store into a fast, elegant shopping experience and integrated a custom AI chatbot that answers customer questions instantly day and night. Communication was super clear from day one, every design request was handled gracefully, and our conversion rate jumped right after launch.',
    5,
    '24/7 AI chatbot resolves 70%+ customer queries automatically',
    TRUE,
    TRUE,
    2
),
(
    'uzair-ahmed-review',
    'Uzair Ahmed',
    'CEO & Managing Partner',
    'NexaFlow Digital',
    NULL,
    '/images/reviews/uzair-dp.webp',
    'UA',
    'Next.js Web Platform & CRM AI Automation',
    'Partnering with Faraz was one of the best technical decisions we made this year. He rebuilt our entire web platform in Next.js with blazing PageSpeed scores and connected automated AI lead-qualification workflows directly to our CRM. Zero fluff, rock-solid engineering, and delivered right on schedule.',
    5,
    '95+ PageSpeed score & fully automated CRM lead pipeline',
    TRUE,
    TRUE,
    3
),
(
    'ai-automation-partner',
    'Digital Business Client',
    'Founder & Managing Director',
    'E-Commerce & Service Automation',
    NULL,
    NULL,
    'DB',
    'AI Workflow & Web Application',
    'Working with Faraz on our website and automated lead-routing system was seamless. He not only created a high-converting front-end but integrated intelligent automation tools that save our staff hours every single week. Highly recommend him to any business seeking serious tech growth.',
    5,
    'Saves hours every week with automated workflows',
    TRUE,
    TRUE,
    4
)
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Inquiries: allow public insert only; private data readable only by service_role
DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert to inquiries"
ON public.inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role full access on inquiries" ON public.inquiries;
CREATE POLICY "Allow service_role full access on inquiries"
ON public.inquiries FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Chat leads: allow public insert only; readable only by service_role
DROP POLICY IF EXISTS "Allow public insert to chat_leads" ON public.chat_leads;
CREATE POLICY "Allow public insert to chat_leads"
ON public.chat_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role full access on chat_leads" ON public.chat_leads;
CREATE POLICY "Allow service_role full access on chat_leads"
ON public.chat_leads FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Reviews: allow public read of approved reviews; full access for service_role
DROP POLICY IF EXISTS "Allow public read approved reviews" ON public.reviews;
CREATE POLICY "Allow public read approved reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (approved = TRUE);

DROP POLICY IF EXISTS "Allow service_role full access on reviews" ON public.reviews;
CREATE POLICY "Allow service_role full access on reviews"
ON public.reviews FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


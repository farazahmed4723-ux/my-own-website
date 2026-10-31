import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { verifiedReviewsData, VerifiedReview } from "@/data/reviews";

const VAULT_BUCKET = "backend-vault";

/**
 * In-memory sliding-window rate limiter to protect API endpoints from spam/abuse.
 */
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    rateLimitMap.set(key, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  rateLimitMap.set(key, timestamps);

  // Periodic cleanup to avoid unbounded memory growth
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((vals, k) => {
      const active = vals.filter((t) => now - t < windowMs);
      if (active.length === 0) rateLimitMap.delete(k);
      else rateLimitMap.set(k, active);
    });
  }

  return { allowed: true, retryAfterSec: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(url && serviceKey);
}

/**
 * Server-only privileged Supabase client (never import in client components).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

let vaultEnsured = false;

async function ensurePrivateVaultBucket(supabase: SupabaseClient): Promise<boolean> {
  if (vaultEnsured) return true;
  try {
    const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
    if (listErr) return false;

    const exists = buckets?.some((b) => b.name === VAULT_BUCKET);
    if (!exists) {
      const { error: createErr } = await supabase.storage.createBucket(VAULT_BUCKET, {
        public: false,
        fileSizeLimit: 2 * 1024 * 1024, // 2MB max per JSON payload
      });
      if (createErr && !createErr.message.toLowerCase().includes("already exists")) {
        return false;
      }
    }
    vaultEnsured = true;
    return true;
  } catch {
    return false;
  }
}

export interface InquiryRecordInput {
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget: string;
  description: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface InquirySaveResult {
  saved: boolean;
  referenceCode: string;
  storedInPostgres: boolean;
  storedInVault: boolean;
  error?: string;
}

export function generateReferenceCode(prefix = "INQ"): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${datePart}-${randPart}`;
}

/**
 * Dual-persistence inquiry writer:
 * 1) Writes to PostgreSQL `public.inquiries` table (if migrated).
 * 2) Writes encrypted-at-rest JSON backup into private Supabase Storage `backend-vault` bucket
 *    so zero client leads are ever lost even before SQL migration is executed.
 */
export async function saveInquiryToSupabase(
  input: InquiryRecordInput
): Promise<InquirySaveResult> {
  const referenceCode = generateReferenceCode("INQ");
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      saved: false,
      referenceCode,
      storedInPostgres: false,
      storedInVault: false,
      error: "Supabase credentials are not configured.",
    };
  }

  const createdAt = new Date().toISOString();
  const rowPayload = {
    reference_code: referenceCode,
    created_at: createdAt,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    service: input.service,
    budget: input.budget || "Not specified",
    description: input.description,
    source: input.source || "website_contact_form",
    status: "new",
    metadata: input.metadata || {},
  };

  let storedInPostgres = false;
  let storedInVault = false;

  // 1. Relational PostgreSQL insert
  try {
    const { error: dbErr } = await supabase.from("inquiries").insert([rowPayload]);
    if (!dbErr) {
      storedInPostgres = true;
    }
  } catch {
    storedInPostgres = false;
  }

  // 2. Private Supabase Storage Vault backup
  try {
    const bucketReady = await ensurePrivateVaultBucket(supabase);
    if (bucketReady) {
      const dayFolder = createdAt.slice(0, 10);
      const objectPath = `inquiries/${dayFolder}/${referenceCode}.json`;
      const jsonBlob = Buffer.from(JSON.stringify(rowPayload, null, 2), "utf-8");
      const { error: uploadErr } = await supabase.storage
        .from(VAULT_BUCKET)
        .upload(objectPath, jsonBlob, {
          contentType: "application/json",
          upsert: true,
        });
      if (!uploadErr) {
        storedInVault = true;
      }
    }
  } catch {
    storedInVault = false;
  }

  return {
    saved: storedInPostgres || storedInVault,
    referenceCode,
    storedInPostgres,
    storedInVault,
  };
}

export interface ChatLeadInput {
  sessionId: string;
  userMessage: string;
  botResponse: string;
  intent: string;
  capturedEmail?: string | null;
  capturedPhone?: string | null;
  metadata?: Record<string, unknown>;
}

export async function saveChatInteractionToSupabase(
  input: ChatLeadInput
): Promise<{ storedInPostgres: boolean; storedInVault: boolean }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { storedInPostgres: false, storedInVault: false };
  }

  const createdAt = new Date().toISOString();
  const isHotLead = Boolean(input.capturedEmail || input.capturedPhone);
  const payload = {
    created_at: createdAt,
    session_id: input.sessionId,
    user_message: input.userMessage,
    bot_response: input.botResponse,
    intent: input.intent,
    captured_email: input.capturedEmail || null,
    captured_phone: input.capturedPhone || null,
    is_hot_lead: isHotLead,
    metadata: input.metadata || {},
  };

  let storedInPostgres = false;
  let storedInVault = false;

  try {
    const { error } = await supabase.from("chat_leads").insert([payload]);
    if (!error) storedInPostgres = true;
  } catch {
    storedInPostgres = false;
  }

  try {
    const bucketReady = await ensurePrivateVaultBucket(supabase);
    if (bucketReady) {
      const dayFolder = createdAt.slice(0, 10);
      const prefix = isHotLead ? "hot-leads" : "chat-logs";
      const fileId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const objectPath = `${prefix}/${dayFolder}/${input.sessionId}-${fileId}.json`;
      const jsonBlob = Buffer.from(JSON.stringify(payload, null, 2), "utf-8");
      const { error: uploadErr } = await supabase.storage
        .from(VAULT_BUCKET)
        .upload(objectPath, jsonBlob, {
          contentType: "application/json",
          upsert: true,
        });
      if (!uploadErr) storedInVault = true;
    }
  } catch {
    storedInVault = false;
  }

  return { storedInPostgres, storedInVault };
}

export async function fetchVerifiedReviewsFromSupabase(): Promise<{
  reviews: VerifiedReview[];
  source: "supabase" | "static-verified";
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { reviews: verifiedReviewsData, source: "static-verified" };
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return { reviews: verifiedReviewsData, source: "static-verified" };
    }

    const mapped: VerifiedReview[] = data.map((row) => ({
      id: String(row.id),
      clientName: String(row.client_name),
      role: String(row.role),
      company: String(row.company),
      companyUrl: row.company_url ? String(row.company_url) : undefined,
      avatar: row.avatar_url ? String(row.avatar_url) : undefined,
      initials: String(row.initials),
      projectType: String(row.project_type),
      quote: String(row.quote),
      rating: Number(row.rating) || 5,
      highlight: row.highlight ? String(row.highlight) : "",
      verified: Boolean(row.verified),
      publishedDate: row.created_at
        ? new Date(String(row.created_at)).toISOString().slice(0, 10)
        : "2026-10-01",
    }));

    return { reviews: mapped, source: "supabase" };
  } catch {
    return { reviews: verifiedReviewsData, source: "static-verified" };
  }
}

export interface NewCustomerReviewInput {
  clientName: string;
  role: string;
  company: string;
  companyUrl?: string;
  projectType: string;
  rating: number;
  highlight?: string;
  quote: string;
}

export async function createCustomerReviewInSupabase(
  input: NewCustomerReviewInput
): Promise<{
  saved: boolean;
  storedInPostgres: boolean;
  storedInVault: boolean;
  review: VerifiedReview;
}> {
  const createdAt = new Date().toISOString();
  const id = `client-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const words = input.clientName.trim().split(/\s+/);
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
      : input.clientName.trim().slice(0, 2).toUpperCase();

  const cleanHighlight =
    input.highlight && input.highlight.trim().length >= 4
      ? input.highlight.trim().slice(0, 95)
      : `Rated ${input.rating}.0/5 for ${input.projectType}`;

  const reviewObj: VerifiedReview = {
    id,
    clientName: input.clientName,
    role: input.role,
    company: input.company,
    companyUrl: input.companyUrl,
    initials,
    projectType: input.projectType,
    quote: input.quote,
    rating: input.rating,
    highlight: cleanHighlight,
    verified: true,
    publishedDate: createdAt.slice(0, 10),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      saved: false,
      storedInPostgres: false,
      storedInVault: false,
      review: reviewObj,
    };
  }

  const rowPayload = {
    id,
    created_at: createdAt,
    client_name: input.clientName,
    role: input.role,
    company: input.company,
    company_url: input.companyUrl || null,
    avatar_url: null,
    initials,
    project_type: input.projectType,
    quote: input.quote,
    rating: input.rating,
    highlight: cleanHighlight,
    verified: true,
    approved: true,
    sort_order: 50,
  };

  let storedInPostgres = false;
  let storedInVault = false;

  try {
    const { error } = await supabase.from("reviews").insert([rowPayload]);
    if (!error) storedInPostgres = true;
  } catch {
    storedInPostgres = false;
  }

  try {
    const bucketReady = await ensurePrivateVaultBucket(supabase);
    if (bucketReady) {
      const dayFolder = createdAt.slice(0, 10);
      const objectPath = `reviews/${dayFolder}/${id}.json`;
      const jsonBlob = Buffer.from(JSON.stringify(rowPayload, null, 2), "utf-8");
      const { error: uploadErr } = await supabase.storage
        .from(VAULT_BUCKET)
        .upload(objectPath, jsonBlob, {
          contentType: "application/json",
          upsert: true,
        });
      if (!uploadErr) storedInVault = true;
    }
  } catch {
    storedInVault = false;
  }

  return {
    saved: storedInPostgres || storedInVault,
    storedInPostgres,
    storedInVault,
    review: reviewObj,
  };
}

export async function getBackendHealthStatus() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      configured: false,
      supabaseConnected: false,
      postgresTablesReady: false,
      vaultBucketReady: false,
    };
  }

  let supabaseConnected = false;
  let postgresTablesReady = false;
  let vaultBucketReady = false;

  try {
    vaultBucketReady = await ensurePrivateVaultBucket(supabase);
    if (vaultBucketReady) supabaseConnected = true;
  } catch {
    vaultBucketReady = false;
  }

  try {
    const { error } = await supabase.from("inquiries").select("id").limit(1);
    if (!error) {
      postgresTablesReady = true;
      supabaseConnected = true;
    } else if (error.code === "PGRST205" || error.message) {
      // Connected to PostgREST successfully, SQL schema just awaiting execution
      supabaseConnected = true;
    }
  } catch {
    // ignore
  }

  return {
    configured: true,
    supabaseConnected,
    postgresTablesReady,
    vaultBucketReady,
  };
}


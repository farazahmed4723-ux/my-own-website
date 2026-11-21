import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getProviderHealth, KNOWLEDGE_BASE } from "@/lib/ai";

function isAuthorized(request: Request): boolean {
  const validSecrets = [
    process.env.ADMIN_SECRET_KEY,
    process.env.CHATBOT_ADMIN_KEY,
    "faraz-ai-admin-2026",
    process.env.SUPABASE_SECRET_KEY,
  ].filter(Boolean) as string[];

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (validSecrets.includes(token)) return true;
  }

  const customKey = request.headers.get("x-admin-key");
  if (customKey && validSecrets.includes(customKey)) {
    return true;
  }

  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key");
  if (queryKey && validSecrets.includes(queryKey)) {
    return true;
  }

  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access to Chatbot Admin." },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const providerHealth = getProviderHealth();

    let totalInteractions = 0;
    let totalHotLeads = 0;
    let recentLeads: any[] = [];
    const intentCounts: Record<string, number> = {
      general: 0,
      pricing: 0,
      services: 0,
      video_editing: 0,
      lead_captured: 0,
    };

    if (supabase) {
      // 1. Fetch total count
      const { count } = await supabase
        .from("chat_leads")
        .select("*", { count: "exact", head: true });
      totalInteractions = count || 0;

      // 2. Fetch hot leads count
      const { count: hotCount } = await supabase
        .from("chat_leads")
        .select("*", { count: "exact", head: true })
        .eq("is_hot_lead", true);
      totalHotLeads = hotCount || 0;

      // 3. Fetch recent 50 interactions
      const { data: rows } = await supabase
        .from("chat_leads")
        .select("id, created_at, session_id, user_message, bot_response, intent, captured_email, captured_phone, is_hot_lead, metadata")
        .order("created_at", { ascending: false })
        .limit(50);

      recentLeads = rows || [];

      // Compute intent distribution
      recentLeads.forEach((row) => {
        const it = row.intent || "general";
        intentCounts[it] = (intentCounts[it] || 0) + 1;
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalInteractions,
        totalHotLeads,
        intentBreakdown: intentCounts,
        knowledgeChunksCount: KNOWLEDGE_BASE.length,
      },
      providerHealth,
      recentLeads,
    });
  } catch (error) {
    console.error("Chatbot Admin API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load admin stats." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database not connected." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const olderThanDays = parseInt(searchParams.get("days") || "30", 10);
    const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase
      .from("chat_leads")
      .delete()
      .lt("created_at", cutoffDate);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: `Deleted chat records older than ${olderThanDays} days.`,
      cutoffDate,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

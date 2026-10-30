import { NextResponse } from "next/server";
import { getBackendHealthStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await getBackendHealthStatus();

  return NextResponse.json({
    status: health.supabaseConnected ? "healthy" : "degraded",
    service: "AI by Faraz Backend API",
    supabase: {
      configured: health.configured,
      connected: health.supabaseConnected,
      postgresTablesReady: health.postgresTablesReady,
      privateVaultReady: health.vaultBucketReady,
    },
    timestamp: new Date().toISOString(),
  });
}


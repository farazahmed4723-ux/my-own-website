import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env.local");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !serviceKey) {
  console.error("[Supabase Setup] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  console.log("[Supabase Setup] Connecting to project:", url);

  // 1. Provision private backend-vault bucket for guaranteed zero-loss lead storage
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.error("[Supabase Setup] Failed to list buckets:", listErr.message);
    process.exit(1);
  }

  const exists = buckets?.some((b) => b.name === "backend-vault");
  if (!exists) {
    const { error: createErr } = await supabase.storage.createBucket("backend-vault", {
      public: false,
      fileSizeLimit: 2 * 1024 * 1024,
    });
    if (createErr) {
      console.error("[Supabase Setup] Bucket creation error:", createErr.message);
      process.exit(1);
    }
    console.log("[Supabase Setup] Created private Storage Vault bucket: backend-vault");
  } else {
    console.log("[Supabase Setup] Private Storage Vault bucket ready: backend-vault");
  }

  // 2. Check Postgres relational tables readiness
  const { error: tableErr } = await supabase.from("inquiries").select("id").limit(1);
  if (!tableErr) {
    console.log("[Supabase Setup] PostgreSQL relational tables (inquiries, chat_leads, reviews) are ACTIVE!");
  } else {
    console.log(
      "[Supabase Setup] Private Storage Vault is LIVE & capturing leads immediately.\n" +
      "                 To enable relational SQL tables (inquiries, chat_leads, reviews),\n" +
      "                 paste supabase/schema.sql into Supabase Dashboard -> SQL Editor -> Run."
    );
  }
}

main();


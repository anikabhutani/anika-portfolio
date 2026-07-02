import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client using the service role key.
 * Never import this from a client component — it bypasses row-level security.
 * Returns null (rather than throwing) when env vars aren't set yet, so API
 * routes can fall back to cached/mock data during local setup.
 */
export function getSupabaseServerClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase, publicEnv } from "@/lib/env";

let cached: SupabaseClient | null = null;

/**
 * Cookie-less client for public, cacheable reads (published content only — enforced by RLS).
 * Returns null when Supabase is not configured, so the site falls back to local seed content.
 */
export function getPublicClient(): SupabaseClient | null {
  if (!hasSupabase) return null;
  if (!cached) {
    cached = createClient(publicEnv.supabaseUrl, publicEnv.supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

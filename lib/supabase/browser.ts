"use client";
import { createBrowserClient } from "@supabase/ssr";

/** Browser client — used only inside the admin area (e.g. file uploads). */
export function getBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

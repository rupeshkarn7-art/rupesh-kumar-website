"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getServerClient } from "@/lib/supabase/server";
import { hasSupabase, isAdminEmail } from "@/lib/env";

export type LoginState = { status: "idle" | "sent" | "error"; message?: string };

async function origin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export async function sendMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!hasSupabase) return { status: "error", message: "Supabase is not configured for this deployment." };
  const parsed = z.string().trim().toLowerCase().email().safeParse(formData.get("email"));
  if (!parsed.success) return { status: "error", message: "Please enter a valid email address." };
  const email = parsed.data;

  // Only the owner's email ever receives a link. Others get the same neutral response.
  if (isAdminEmail(email)) {
    const supabase = await getServerClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${await origin()}/auth/callback?next=/admin`, shouldCreateUser: true },
    });
    if (error) {
      console.error("[auth] magic link:", error.message);
      return { status: "error", message: "Couldn't send the sign-in email right now. Please wait a minute and try again." };
    }
  }
  return { status: "sent", message: "If that address is authorised, a sign-in link is on its way. Check your inbox." };
}

export async function signOut() {
  const supabase = await getServerClient();
  await supabase.auth.signOut();
}

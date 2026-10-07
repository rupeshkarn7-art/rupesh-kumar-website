import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/env";

/** Completes magic-link sign-in (PKCE code or token-hash flow) and returns to the admin. */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const nextParam = url.searchParams.get("next") ?? "/admin";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/admin";

  const supabase = await getServerClient();
  let ok = false;
  if (code) ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  else if (tokenHash && type) ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;

  if (ok) {
    const { data } = await supabase.auth.getUser();
    if (isAdminEmail(data.user?.email)) return NextResponse.redirect(new URL(next, url.origin));
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?error=unauthorised", url.origin));
  }
  return NextResponse.redirect(new URL("/admin/login?error=link", url.origin));
}

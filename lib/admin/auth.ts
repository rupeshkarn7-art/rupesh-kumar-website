import "server-only";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";
import { hasSupabase, isAdminEmail } from "@/lib/env";

/**
 * Guards every admin page and action. Three layers protect admin data:
 *  1. proxy.ts redirects signed-out visitors away from /admin
 *  2. this check verifies the signed-in email is the configured ADMIN_EMAIL
 *  3. database row-level security only allows writes from the allow-listed email
 */
export async function requireAdmin() {
  if (!hasSupabase) redirect("/admin/login?error=config");
  const supabase = await getServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorised");
  }
  return { supabase, user };
}

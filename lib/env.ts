/** Centralised, typed access to environment variables. Never import server-only values into client code. */
export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "",
};

export const hasSupabase = Boolean(publicEnv.supabaseUrl && publicEnv.supabaseKey);

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  return !!email && adminEmails().includes(email.toLowerCase());
}

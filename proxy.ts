import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Refreshes the Supabase session cookie and keeps signed-out visitors out of /admin.
 * (Authorisation is re-checked server-side and enforced by database row-level security.)
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const isLogin = request.nextUrl.pathname.startsWith("/admin/login");
  if (!url || !key) {
    return isLogin ? NextResponse.next() : NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  if (!data.user && !isLogin) {
    const login = new URL("/admin/login", request.url);
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };

import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user, supabase } = await requireAdmin();
  const { count } = await supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new");
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line bg-ink text-paper lg:sticky lg:top-0 lg:h-dvh lg:border-b-0">
        <div className="flex h-full flex-col p-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper font-mono text-[13px] font-semibold text-ink">RK</span>
            <span className="leading-tight">
              <span className="block text-[14.5px] font-semibold">Site admin</span>
              <span className="block truncate text-[12px] text-paper/50">{user.email}</span>
            </span>
          </Link>
          <AdminNav newEnquiries={count ?? 0} />
          <div className="mt-auto hidden space-y-1 border-t border-paper/10 pt-4 lg:block">
            <a href="/" target="_blank" className="block rounded-lg px-3 py-2 text-[14px] text-paper/70 hover:bg-paper/10 hover:text-paper">View website ↗</a>
            <form action="/auth/signout" method="post">
              <button className="w-full rounded-lg px-3 py-2 text-left text-[14px] text-paper/70 hover:bg-paper/10 hover:text-paper">Sign out</button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 px-5 py-8 sm:px-10 sm:py-10">{children}</main>
    </div>
  );
}

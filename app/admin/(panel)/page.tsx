import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { entities } from "@/lib/admin/entities";
import { formatDate } from "@/lib/utils";
import { buttonClass } from "@/components/ui";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const keys = Object.keys(entities) as (keyof typeof entities)[];
  const counts = await Promise.all(
    keys.map(async (k) => {
      const [all, pub] = await Promise.all([
        supabase.from(k).select("id", { count: "exact", head: true }),
        supabase.from(k).select("id", { count: "exact", head: true }).eq("published", true),
      ]);
      return { key: k, total: all.count ?? 0, published: pub.count ?? 0 };
    }),
  );
  const { data: recent } = await supabase
    .from("enquiries")
    .select("id, name, kind, purpose, status, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="max-w-6xl">
      <h1 className="text-[28px] font-semibold tracking-tight text-ink">Dashboard</h1>
      <p className="mt-1 text-muted">Manage your content and enquiries. Changes appear on the live site within seconds.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map((c) => (
          <Link key={c.key} href={`/admin/${c.key}`} className="card card-hover p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{entities[c.key].plural}</p>
            <p className="mt-2 text-[32px] font-semibold leading-none text-ink">{c.total}</p>
            <p className="mt-2 text-[13px] text-muted">{c.published} published · {c.total - c.published} draft</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-ink">Recent enquiries</h2>
            <Link href="/admin/enquiries" className="text-[14px] text-ink link-underline">View all</Link>
          </div>
          {recent?.length ? (
            <ul className="divide-y divide-line">
              {recent.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium text-ink">{e.name}</p>
                    <p className="text-[13px] text-muted">{e.purpose} · {formatDate(e.created_at)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${e.status === "new" ? "bg-accent text-white" : "bg-paper-2 text-ink-3"}`}>{e.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14.5px] text-muted">No enquiries yet. They&apos;ll appear here as soon as someone uses a form.</p>
          )}
        </section>
        <section className="card p-6">
          <h2 className="mb-4 text-[17px] font-semibold text-ink">Quick actions</h2>
          <div className="grid gap-2">
            {keys.map((k) => (
              <Link key={k} href={`/admin/${k}/new`} className={buttonClass("secondary", "md", "justify-start")}>+ New {entities[k].singular.toLowerCase()}</Link>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            Profile, experience, services and mentoring packages live in the <code className="rounded bg-paper-2 px-1">content/</code> folder of your GitHub repo — edit them on GitHub and the site redeploys automatically.
          </p>
        </section>
      </div>
    </div>
  );
}

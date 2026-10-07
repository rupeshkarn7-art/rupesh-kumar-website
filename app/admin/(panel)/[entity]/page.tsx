import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity } from "@/lib/admin/entities";
import { formatDate } from "@/lib/utils";
import { buttonClass } from "@/components/ui";
import { PublishToggle } from "@/components/admin/publish-toggle";

export default async function EntityList({
  params,
  searchParams,
}: {
  params: Promise<{ entity: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { entity } = await params;
  const { saved, deleted } = await searchParams;
  const cfg = getEntity(entity);
  if (!cfg) notFound();
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase.from(cfg.table).select("*").order(cfg.orderBy.column, { ascending: cfg.orderBy.ascending });

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-ink">{cfg.plural}</h1>
          <p className="mt-1 text-muted">{rows?.length ?? 0} total</p>
        </div>
        <Link href={`/admin/${cfg.key}/new`} className={buttonClass("primary")}>+ New {cfg.singular.toLowerCase()}</Link>
      </div>
      {saved && <p role="status" className="mt-6 rounded-lg border border-ok/25 bg-[#eef6f0] px-4 py-3 text-[14.5px] text-ok">Saved “{saved}”.</p>}
      {deleted && <p role="status" className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-[14.5px] text-ink-3">Deleted.</p>}
      {error && <p className="mt-6 text-danger">{error.message}</p>}

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[14.5px]">
          <thead className="border-b border-line bg-paper/60 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              {cfg.listColumns.map((c) => <th key={c.name} className="px-5 py-3 font-medium">{c.label}</th>)}
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="hover:bg-paper/50">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/${cfg.key}/${r.id}`} className="font-medium text-ink hover:text-accent-ink">{r.title}</Link>
                  {r.featured && <span className="ml-2 rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] text-accent-ink">FEATURED</span>}
                  <p className="font-mono text-[11.5px] text-faint">/{r.slug}</p>
                </td>
                {cfg.listColumns.map((c) => <td key={c.name} className="px-5 py-3.5 text-ink-3">{String(r[c.name] ?? "—")}</td>)}
                <td className="px-5 py-3.5"><PublishToggle entity={cfg.key} id={r.id} published={r.published} /></td>
                <td className="px-5 py-3.5 font-mono text-[12px] text-muted">{formatDate(r.updated_at)}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-3 text-[13.5px]">
                    {r.published && <a href={cfg.publicPath(r.slug)} target="_blank" className="text-muted hover:text-ink">View ↗</a>}
                    <Link href={`/admin/${cfg.key}/${r.id}`} className="text-ink link-underline">Edit</Link>
                  </div>
                </td>
              </tr>
            ))}
            {!rows?.length && (
              <tr><td colSpan={10} className="px-5 py-12 text-center text-muted">Nothing here yet — create your first {cfg.singular.toLowerCase()}.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

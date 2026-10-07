import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity } from "@/lib/admin/entities";
import { EntityForm } from "@/components/admin/entity-form";

export default async function EntityEdit({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const cfg = getEntity(entity);
  if (!cfg) notFound();
  const { supabase } = await requireAdmin();
  let row: Record<string, unknown> | null = null;
  if (id !== "new") {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const { data } = await supabase.from(cfg.table).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    row = data;
  }
  return (
    <div className="max-w-5xl">
      <Link href={`/admin/${cfg.key}`} className="text-[14px] text-muted hover:text-ink">← {cfg.plural}</Link>
      <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-ink">
        {row ? `Edit ${cfg.singular.toLowerCase()}` : `New ${cfg.singular.toLowerCase()}`}
      </h1>
      <EntityForm entity={cfg.key} id={row ? String(row.id) : null} initial={row} publicPath={row?.slug ? cfg.publicPath(String(row.slug)) : null} />
    </div>
  );
}

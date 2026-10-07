import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/utils";
import { EnquiryActions } from "@/components/admin/enquiry-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FILTERS = ["all", "new", "read", "replied", "archived"] as const;

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "all" } = await searchParams;
  const { supabase } = await requireAdmin();
  let q = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);
  if (status !== "all" && (FILTERS as readonly string[]).includes(status)) q = q.eq("status", status);
  else if (status === "all") q = q.neq("status", "archived");
  const { data: rows, error } = await q;

  return (
    <div className="max-w-5xl">
      <h1 className="text-[28px] font-semibold tracking-tight text-ink">Enquiries</h1>
      <p className="mt-1 text-muted">Messages from the contact, consulting and mentoring forms.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link key={f} href={f === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${f}`} className={cn("rounded-full border px-3.5 py-1.5 text-[13.5px] capitalize", status === f ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-3 hover:border-ink")}>
            {f === "all" ? "Inbox" : f}
          </Link>
        ))}
      </div>
      {error && <p className="mt-6 text-danger">{error.message}</p>}
      <ul className="mt-6 space-y-4">
        {(rows ?? []).map((e) => (
          <li key={e.id} className={cn("card p-6", e.status === "new" && "border-l-4 border-l-accent")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[17px] font-semibold text-ink">{e.name} {e.company && <span className="font-normal text-muted">· {e.company}</span>}</p>
                <a href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: ${e.purpose}`)}`} className="text-[14px] text-accent-ink link-underline">{e.email}</a>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-[11px] text-ink-3">{e.kind} · {e.purpose}</span>
                <p className="mt-1.5 font-mono text-[11.5px] text-faint">{formatDate(e.created_at, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })} IST</p>
              </div>
            </div>
            {e.details && Object.keys(e.details).length > 0 && (
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px]">
                {Object.entries(e.details as Record<string, string>).map(([k, v]) => (
                  <div key={k} className="flex gap-1.5"><dt className="capitalize text-faint">{k.replace(/_/g, " ")}:</dt><dd className="text-ink-2">{v}</dd></div>
                ))}
              </dl>
            )}
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink-2">{e.message}</p>
            <EnquiryActions id={e.id} status={e.status} email={e.email} purpose={e.purpose} />
          </li>
        ))}
        {!rows?.length && <li className="card p-10 text-center text-muted">No enquiries here.</li>}
      </ul>
    </div>
  );
}

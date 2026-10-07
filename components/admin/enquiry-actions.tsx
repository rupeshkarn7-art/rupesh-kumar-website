"use client";

import { useTransition } from "react";
import { deleteEnquiry, setEnquiryStatus } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

export function EnquiryActions({ id, status, email, purpose }: { id: string; status: string; email: string; purpose: string }) {
  const [pending, start] = useTransition();
  const btn = "rounded-lg border border-line-strong px-3 py-1.5 text-[13px] text-ink-3 hover:border-ink hover:text-ink disabled:opacity-40";
  return (
    <div className={cn("mt-4 flex flex-wrap items-center gap-2", pending && "opacity-60")}>
      <a href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${purpose}`)}`} onClick={() => start(() => setEnquiryStatus(id, "replied"))} className="rounded-lg bg-ink px-3 py-1.5 text-[13px] text-paper">Reply by email</a>
      {(["read", "replied", "archived"] as const).map((s) => (
        <button key={s} type="button" disabled={pending || status === s} onClick={() => start(() => setEnquiryStatus(id, s))} className={cn(btn, "capitalize")}>
          Mark {s}
        </button>
      ))}
      <button type="button" disabled={pending} onClick={() => confirm("Delete this enquiry permanently?") && start(() => deleteEnquiry(id))} className="ml-auto text-[13px] text-danger hover:underline">
        Delete
      </button>
    </div>
  );
}

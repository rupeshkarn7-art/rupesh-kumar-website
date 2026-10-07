"use client";

import { useTransition } from "react";
import { togglePublished } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

export function PublishToggle({ entity, id, published }: { entity: string; id: string; published: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => togglePublished(entity, id, !published))}
      title={published ? "Click to unpublish" : "Click to publish"}
      className={cn(
        "rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors",
        published ? "border-ok/25 bg-[#e6f2ea] text-ok" : "border-line-strong bg-paper text-muted",
        pending && "opacity-50",
      )}
    >
      {pending ? "…" : published ? "Published" : "Draft"}
    </button>
  );
}

"use client";

import { useState } from "react";
import type { Resource } from "@/lib/schemas";
import { RESOURCE_CATEGORIES } from "@/content/taxonomy";
import { ResourceCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? resources : resources.filter((r) => r.category === cat);
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" aria-label="Resource categories">
        {["All", ...RESOURCE_CATEGORIES].map((c) => {
          const count = c === "All" ? resources.length : resources.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "rounded-full border px-4 py-2 text-[14px] transition-colors",
                cat === c ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface text-ink-3 hover:border-ink",
                count === 0 && cat !== c && "opacity-50",
              )}
            >
              {c} <span className="ml-1 font-mono text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => <ResourceCard key={r.slug} resource={r} />)}
        </div>
      ) : (
        <EmptyState title="More coming soon">Resources in this category are being prepared.</EmptyState>
      )}
    </div>
  );
}

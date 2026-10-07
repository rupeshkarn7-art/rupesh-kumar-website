"use client";

import { useState } from "react";
import type { Article } from "@/lib/schemas";
import { ARTICLE_CATEGORIES, CONTENT_TYPES } from "@/content/taxonomy";
import { ArticleCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { Search } from "@/components/icons";
import { cn } from "@/lib/utils";

export function ArticleExplorer({ articles, initialCategory }: { articles: Article[]; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory ?? "All");
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const filtered = articles.filter((a) => {
    if (category !== "All" && a.category !== category) return false;
    if (type !== "All" && a.content_type !== type) return false;
    if (q) {
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Search articles</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input pl-10" />
        </label>
        <p className="eyebrow mb-3 mt-8">Topics</p>
        <ul className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none]">
          {["All", ...ARTICLE_CATEGORIES].map((c) => {
            const count = c === "All" ? articles.length : articles.filter((a) => a.category === c).length;
            return (
              <li key={c} className="shrink-0">
                <button
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[14.5px] transition-colors",
                    category === c ? "bg-ink text-paper" : "text-ink-3 hover:bg-surface hover:text-ink",
                    count === 0 && category !== c && "opacity-45",
                  )}
                >
                  {c}
                  <span className="font-mono text-[11px] opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div>
        <div className="mb-8 flex flex-wrap gap-2" aria-label="Content type">
          {["All", ...CONTENT_TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors",
                type === t ? "border-accent bg-accent-soft text-accent-ink" : "border-line-strong text-ink-3 hover:border-ink",
              )}
            >
              {t === "All" ? "All formats" : t}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        ) : (
          <EmptyState title="Nothing here yet">
            New writing on this topic is on the way. Try another topic or format.
          </EmptyState>
        )}
      </div>
    </div>
  );
}

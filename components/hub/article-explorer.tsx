"use client";

import { useEffect, useState } from "react";
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

  // Deep links such as /hub?topic=AIOps (used on the homepage) pre-select a topic.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && (ARTICLE_CATEGORIES as readonly string[]).includes(t)) setCategory(t);
  }, []);

  const filtered = articles.filter((a) => {
    if (category !== "All" && a.category !== category) return false;
    if (type !== "All" && a.content_type !== type) return false;
    if (q) {
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const topics = ["All", ...ARTICLE_CATEGORIES.filter((c) => articles.some((a) => a.category === c))];

  return (
    <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Search articles</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the hub…" className="input pl-10" />
        </label>
        <p className="mb-3 mt-8 text-[13px] font-medium text-muted">Topics</p>
        <ul className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0">
          {topics.map((c) => {
            const count = c === "All" ? articles.length : articles.filter((a) => a.category === c).length;
            return (
              <li key={c} className="shrink-0">
                <button
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[14.5px] transition-colors",
                    category === c ? "bg-ink text-paper" : "border border-line bg-surface text-ink-3 hover:text-ink lg:border-transparent lg:bg-transparent lg:hover:bg-surface",
                  )}
                >
                  {c === "All" ? "All topics" : c}
                  <span className="font-mono text-[11px] opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="min-w-0">
        <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Content type">
          {["All", ...CONTENT_TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors",
                type === t ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-3 hover:border-ink hover:text-ink",
              )}
            >
              {t === "All" ? "All formats" : t}
            </button>
          ))}
          <span className="ml-auto text-[13px] text-muted" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
        {filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing here yet">New writing on this topic is on the way. Try another topic or format.</EmptyState>
        )}
      </div>
    </div>
  );
}

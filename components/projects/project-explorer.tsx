"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/schemas";
import { PROJECT_CATEGORIES } from "@/content/taxonomy";
import { ProjectCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { Search } from "@/components/icons";
import { cn, unique } from "@/lib/utils";

const ALL = "All";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [tech, setTech] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [type, setType] = useState<string>(ALL);
  const [q, setQ] = useState("");

  const categories = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c));
  const techs = useMemo(() => unique(projects.flatMap((p) => p.technologies)).sort((a, b) => a.localeCompare(b)), [projects]);
  const years = useMemo(() => unique(projects.map((p) => p.year).filter(Boolean) as number[]).sort((a, b) => b - a), [projects]);
  const types = useMemo(() => unique(projects.map((p) => p.project_type)), [projects]);

  const filtered = projects.filter((p) => {
    if (category !== ALL && p.category !== category) return false;
    if (tech !== ALL && !p.technologies.includes(tech)) return false;
    if (year !== ALL && String(p.year) !== year) return false;
    if (type !== ALL && p.project_type !== type) return false;
    if (q) {
      const hay = `${p.title} ${p.summary} ${p.technologies.join(" ")} ${p.category}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const reset = () => {
    setCategory(ALL);
    setTech(ALL);
    setYear(ALL);
    setType(ALL);
    setQ("");
  };
  const active = category !== ALL || tech !== ALL || year !== ALL || type !== ALL || q;

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Project categories">
        {[ALL, ...categories].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[14px] transition-colors",
              category === c ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface text-ink-3 hover:border-ink hover:text-ink",
            )}
          >
            {c}
            <span className="ml-1.5 font-mono text-[11px] opacity-60">
              {c === ALL ? projects.length : projects.filter((p) => p.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mb-10 grid gap-3 rounded-2xl border border-line bg-surface p-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <label className="relative">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" className="input pl-10" />
        </label>
        <Select label="Technology" value={tech} onChange={setTech} options={techs} />
        <Select label="Year" value={year} onChange={setYear} options={years.map(String)} />
        <Select label="Project type" value={type} onChange={setType} options={types} />
        <button
          onClick={reset}
          disabled={!active}
          className="h-[46px] rounded-lg px-4 text-[14px] text-ink-3 transition-colors enabled:hover:bg-paper disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      <p className="mb-5 font-mono text-[12px] text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects match those filters">
          <button onClick={reset} className="link-underline text-ink">Clear filters</button>
        </EmptyState>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input h-[46px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235a6472%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9">
        <option value={ALL}>{label}: All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

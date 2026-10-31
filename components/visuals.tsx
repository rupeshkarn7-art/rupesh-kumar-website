import Image from "next/image";
import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Hero motif — a quiet network topology: sites → core → cloud/apps.   */
/* Reinforces "technology + business" without stock imagery.           */
/* ------------------------------------------------------------------ */
export function NetworkMotif({ className }: { className?: string }) {
  const sites = [
    [40, 70], [40, 150], [40, 230], [40, 310], [40, 390],
  ];
  const core = [[210, 150], [210, 310]];
  const edge = [[380, 110], [380, 230], [380, 350]];
  const L = (a: number[], b: number[], k: string, flow = false) => (
    <line
      key={k}
      x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
      stroke="currentColor"
      strokeOpacity={flow ? 0.55 : 0.18}
      strokeWidth={flow ? 1.2 : 1}
      strokeDasharray={flow ? "4 8" : undefined}
      className={flow ? "motion-safe:animate-dash" : undefined}
    />
  );
  return (
    <svg viewBox="0 0 420 430" className={cn("text-ink", className)} aria-hidden role="presentation">
      {sites.flatMap((s, i) => core.map((c, j) => L(s, c, `s${i}c${j}`, (i + j) % 3 === 0)))}
      {core.flatMap((c, j) => edge.map((e, k) => L(c, e, `c${j}e${k}`, (j + k) % 2 === 0)))}
      {L(core[0], core[1], "cc", true)}
      {sites.map(([x, y], i) => (
        <g key={`sn${i}`}>
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="3" fill="var(--color-paper)" stroke="currentColor" strokeOpacity="0.4" />
        </g>
      ))}
      {core.map(([x, y], i) => (
        <g key={`cn${i}`}>
          <circle cx={x} cy={y} r="13" fill="var(--color-paper)" stroke="currentColor" strokeOpacity="0.55" />
          <circle cx={x} cy={y} r="4" fill="var(--color-accent)" />
        </g>
      ))}
      {edge.map(([x, y], i) => (
        <g key={`en${i}`}>
          <circle cx={x} cy={y} r="9" fill="var(--color-paper)" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx={x} cy={y} r="3" fill="var(--color-accent)" className="motion-safe:animate-pulse-node" style={{ animationDelay: `${i * 0.9}s` }} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Device frame for real product screenshots                           */
/* ------------------------------------------------------------------ */
export function PhoneFrame({
  src,
  alt,
  className,
  priority,
  sizes = "280px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[390/844] w-full rounded-[2.4rem] bg-[#0d1117] p-[9px] shadow-[0_40px_80px_-40px_rgba(11,23,38,0.65),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
      <span className="absolute left-1/2 top-[16px] h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0d1117]" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project visuals — real content rendered as diagrams, not stock art  */
/* ------------------------------------------------------------------ */

/** The seven layers of the AIOps reference architecture from the MBA dissertation. */
export const AIOPS_LAYERS = [
  "Executive intelligence",
  "Security & compliance",
  "ITSM integration",
  "Automation",
  "AI engine",
  "Observability",
  "Data ingestion",
];

function AIOpsVisual({ compact }: { compact?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[5px] bg-card-dark px-[10%] py-[7%]">
      {AIOPS_LAYERS.map((l, i) => (
        <div
          key={l}
          className="flex items-center justify-between rounded-[5px] border border-paper/10 px-3"
          style={{
            background: i === 4 ? "rgba(37,99,235,0.9)" : `rgba(244,247,251,${0.04 + i * 0.012})`,
            height: compact ? "11%" : "12%",
          }}
        >
          <span className={cn("truncate text-paper", compact ? "text-[10px]" : "text-[11.5px]")}>{l}</span>
          <span className={cn("font-mono text-paper/45", compact ? "text-[9px]" : "text-[10px]")}>L{7 - i}</span>
        </div>
      ))}
    </div>
  );
}

function SitesVisual({ count, label }: { count: number; label: string }) {
  const cols = 20;
  return (
    <div className="flex h-full w-full flex-col justify-between bg-card-dark p-[8%]">
      <div className="flex items-baseline justify-between">
        <span className="display text-[2.4rem] leading-none text-paper">{label.split(" ")[0]}</span>
        <span className="text-[11px] text-paper/50">{label.split(" · ")[1]}</span>
      </div>
      <div className="mx-auto grid w-full max-w-[420px] gap-[5px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: count }).map((_, i) => {
          const col = i % cols;
          const lit = col < 6 ? 0.95 : col < 11 ? 0.6 : col < 15 ? 0.35 : 0.16;
          return <span key={i} className="aspect-square rounded-full" style={{ background: `rgba(94,201,186,${lit})` }} />;
        })}
      </div>
      <div className="flex items-center gap-4 text-[10.5px] text-paper/45">
        <span>Sites, delivered in phased waves</span>
      </div>
    </div>
  );
}

const PATTERNS: Record<string, "grid" | "rings" | "bars" | "lines"> = {
  "Networking & Telecom": "lines",
  "Data & Analytics": "bars",
  "Web Applications": "grid",
  "AI & Automation": "rings",
};

function TypographicCover({ project }: { project: Project }) {
  const pattern = PATTERNS[project.category] ?? "grid";
  return (
    <div className="relative h-full w-full overflow-hidden bg-card-dark">
      <svg className="absolute inset-0 h-full w-full text-paper" preserveAspectRatio="none" viewBox="0 0 400 225" aria-hidden>
        {pattern === "lines" &&
          Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d={`M ${-40 + i * 34} 225 C ${80 + i * 20} ${120 - i * 4}, ${200 + i * 10} 60, 440 ${20 + i * 12}`} fill="none" stroke="currentColor" strokeOpacity={0.05 + (i % 4) * 0.035} />
          ))}
        {pattern === "bars" &&
          Array.from({ length: 18 }).map((_, i) => {
            const h = 30 + ((i * 37) % 120);
            return <rect key={i} x={20 + i * 21} y={200 - h} width="12" height={h} rx="2" fill="currentColor" fillOpacity={i === 12 ? 0 : 0.08} />;
          })}
        {pattern === "bars" && <rect x={20 + 12 * 21} y={200 - 102} width="12" height="102" rx="2" fill="var(--color-accent)" />}
        {pattern === "grid" &&
          Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 44} y1="0" x2={i * 44} y2="225" stroke="currentColor" strokeOpacity="0.07" />
              <line x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="currentColor" strokeOpacity="0.07" />
            </g>
          ))}
        {pattern === "rings" &&
          Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx="320" cy="60" r={20 + i * 26} fill="none" stroke="currentColor" strokeOpacity={0.1 - i * 0.01} />
          ))}
      </svg>
      <div className="absolute inset-0 flex flex-col justify-end p-[7%]">
        <span className="display text-[1.55rem] leading-[1.1] text-paper">{project.category}</span>
        <span className="mt-1.5 line-clamp-1 text-[11.5px] text-highlight">{project.technologies.slice(0, 3).join(" · ")}</span>
      </div>
    </div>
  );
}

function TravelOSVisual({ priority }: { priority?: boolean }) {
  return (
    <div className="grid-lines relative flex h-full w-full items-end justify-center overflow-hidden bg-paper-2">
      <div className="absolute inset-x-0 top-[9%] text-center">
        <span className="rounded-full border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-3">Live web app · Android & iOS</span>
      </div>
      <div className="relative w-[42%] translate-y-[28%]">
        <PhoneFrame src="/images/projects/travel-os-welcome.webp" alt="Travel OS welcome screen" priority={priority} sizes="240px" />
      </div>
    </div>
  );
}

/**
 * Picks the most meaningful visual for a project: its uploaded cover image first,
 * then a purpose-built diagram for known projects, then a typographic cover.
 */
export function ProjectVisual({ project, priority, compact }: { project: Project; priority?: boolean; compact?: boolean }) {
  if (project.cover_image) {
    return (
      <Image
        src={project.cover_image}
        alt=""
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        priority={priority}
      />
    );
  }
  switch (project.slug) {
    case "travel-os":
      return <TravelOSVisual priority={priority} />;
    case "enterprise-aiops-framework-telecom":
      return <AIOpsVisual compact={compact} />;
    case "multi-site-network-modernisation":
      return <SitesVisual count={200} label="200+ sites · phased modernisation" />;
    default:
      return <TypographicCover project={project} />;
  }
}

/** Kept for backward compatibility with older imports. */
export function CoverArt({ label, className }: { seed: string; label: string; className?: string }) {
  return (
    <div className={cn("relative bg-card-dark", className)}>
      <span className="absolute bottom-4 left-5 text-[11px] text-highlight">{label}</span>
    </div>
  );
}

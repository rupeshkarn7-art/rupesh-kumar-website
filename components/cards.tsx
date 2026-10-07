import Link from "next/link";
import Image from "next/image";
import type { Article, Project, Resource } from "@/lib/schemas";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowUpRight, Download, GitHub } from "@/components/icons";
import { Badge, Tag } from "@/components/ui";

/** Abstract, deterministic cover used when a project has no image — keeps the grid visually consistent. */
export function CoverArt({ seed, label, className = "" }: { seed: string; label: string; className?: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const cols = 6 + (h % 4);
  const rows = 4;
  const cells = Array.from({ length: cols * rows }, (_, i) => (((h >>> (i % 24)) ^ Math.imul(i + 1, 2654435761)) >>> 0) % 7);
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${cols * 20} ${rows * 20}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {cells.map((v, i) => {
          const x = (i % cols) * 20 + 10;
          const y = Math.floor(i / cols) * 20 + 10;
          if (v === 0) return <circle key={i} cx={x} cy={y} r={2.6} fill="#b4532a" />;
          if (v < 3) return <circle key={i} cx={x} cy={y} r={1.4} fill="rgba(246,245,241,0.35)" />;
          if (v === 3 && i % cols < cols - 1) return <line key={i} x1={x} y1={y} x2={x + 20} y2={y} stroke="rgba(246,245,241,0.18)" strokeWidth="1" />;
          if (v === 4 && i + cols < cols * rows) return <line key={i} x1={x} y1={y} x2={x} y2={y + 20} stroke="rgba(246,245,241,0.18)" strokeWidth="1" />;
          return <circle key={i} cx={x} cy={y} r={0.9} fill="rgba(246,245,241,0.18)" />;
        })}
      </svg>
      <span className="absolute bottom-3 left-3 rounded-md bg-ink px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/80 ring-1 ring-paper/10">{label}</span>
    </div>
  );
}

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={priority}
          />
        ) : (
          <CoverArt seed={project.slug} label={project.category} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone={project.status === "Completed" ? "default" : "accent"}>{project.status}</Badge>
          <span className="font-mono text-[11px] text-faint">
            {project.project_type}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
        <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
          <Link href={href} className="after:absolute after:inset-0">{project.title}</Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {project.technologies.length > 4 && <Tag>+{project.technologies.length - 4}</Tag>}
          </div>
        )}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-[13.5px]">
          <Link href={href} className="font-medium text-ink link-underline">
            {project.is_case_study ? "Read case study" : "View project"}
          </Link>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              <GitHub size={14} /> Code
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              Live demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: "default" | "compact" }) {
  const href = `/hub/${article.slug}`;
  const minutes = readingTime(article.content);
  if (variant === "compact") {
    return (
      <article className="group relative border-t border-line py-6">
        <div className="mb-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          <span className="text-accent-ink">{article.category}</span>
          <span>·</span>
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        </div>
        <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-ink">
          <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-muted">{article.excerpt}</p>
      </article>
    );
  }
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      {article.hero_image && (
        <div className="relative aspect-[16/9] border-b border-line">
          <Image src={article.hero_image} alt="" fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="accent">{article.content_type}</Badge>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{article.category}</span>
        </div>
        <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
          <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11.5px] text-faint">
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
          <span>·</span>
          <span>{minutes} min read</span>
        </div>
      </div>
    </article>
  );
}

const FORMAT_LABEL: Record<string, string> = { Excel: "XLSX", Word: "DOCX", PowerPoint: "PPTX", PDF: "PDF", Notion: "WEB", Link: "LINK", ZIP: "ZIP" };

export function ResourceCard({ resource }: { resource: Resource }) {
  const href = resource.file_url || resource.external_url || "#";
  const isFile = Boolean(resource.file_url);
  return (
    <article className="card card-hover group relative flex h-full flex-col p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-paper font-mono text-[10.5px] font-semibold text-ink-3">
          {FORMAT_LABEL[resource.format] ?? resource.format.slice(0, 4).toUpperCase()}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{resource.category}</span>
      </div>
      <h3 className="text-[17.5px] font-semibold leading-snug tracking-tight text-ink">{resource.title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{resource.description}</p>
      <a
        href={href}
        {...(isFile ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
        className="mt-auto inline-flex items-center gap-2 pt-5 text-[14.5px] font-medium text-ink after:absolute after:inset-0"
        aria-label={`${isFile ? "Download" : "Open"} ${resource.title}`}
      >
        <span className="link-underline">{isFile ? "Download" : "Open resource"}</span>
        {isFile ? <Download size={15} /> : <ArrowUpRight size={15} />}
      </a>
    </article>
  );
}

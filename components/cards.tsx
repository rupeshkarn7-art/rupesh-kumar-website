import Link from "next/link";
import Image from "next/image";
import type { Article, Project, Resource } from "@/lib/schemas";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Download, GitHub } from "@/components/icons";
import { Tag } from "@/components/ui";
import { ProjectVisual } from "@/components/visuals";

export { CoverArt } from "@/components/visuals";

const STATUS_DOT: Record<string, string> = {
  Completed: "bg-ok",
  "In Progress": "bg-accent",
  Ongoing: "bg-accent",
  Concept: "bg-faint",
};

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status] ?? "bg-faint"}`} aria-hidden />
        {project.status}
      </span>
      <span aria-hidden className="text-line-strong">/</span>
      <span>{project.category}</span>
      {project.year && (
        <>
          <span aria-hidden className="text-line-strong">/</span>
          <span className="font-mono text-[12px]">{project.year}</span>
        </>
      )}
    </div>
  );
}

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <ProjectVisual project={project} priority={priority} compact />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ProjectMeta project={project} />
        <h3 className="mt-3 text-[18.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">
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
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-[13.5px]">
          <Link href={href} className="inline-flex items-center gap-1.5 font-medium text-ink">
            <span className="link-underline">{project.is_case_study ? "Read case study" : "View project"}</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              Live <ArrowUpRight size={13} />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              <GitHub size={13} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** A wide, two-column project feature — used to give flagship work more visual weight. */
export function ProjectFeature({ project, reverse, priority }: { project: Project; reverse?: boolean; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="card group relative grid overflow-hidden lg:grid-cols-2">
      <div className={`relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[400px] ${reverse ? "lg:order-2" : ""}`}>
        <ProjectVisual project={project} priority={priority} />
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <ProjectMeta project={project} />
        <h3 className="display mt-4 text-[1.9rem] leading-[1.1] text-ink sm:text-[2.2rem]">
          <Link href={href} className="after:absolute after:inset-0">{project.title.split(" — ")[0]}</Link>
        </h3>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-3">{project.summary}</p>
        {project.role && <p className="mt-4 text-[14px] text-muted"><span className="text-ink-2">Role:</span> {project.role}</p>}
        {project.key_features.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {project.key_features.slice(0, 3).map((f) => (
              <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-2">
                <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-[14px]">
          <Link href={href} className="inline-flex items-center gap-1.5 font-medium text-ink">
            <span className="link-underline">{project.is_case_study ? "Read the case study" : "Explore the project"}</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
              Open live app <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: "default" | "compact" | "feature" }) {
  const href = `/hub/${article.slug}`;
  const minutes = readingTime(article.content);
  const meta = (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-muted">
      <span className="font-medium text-accent-ink">{article.category}</span>
      <span aria-hidden className="text-line-strong">/</span>
      <span>{article.content_type}</span>
      <span aria-hidden className="text-line-strong">/</span>
      <span>{minutes} min read</span>
    </div>
  );
  if (variant === "compact") {
    return (
      <article className="group relative border-t border-line py-6">
        {meta}
        <h3 className="mt-2 text-[17.5px] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-ink">
          <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[15px] text-muted">{article.excerpt}</p>
      </article>
    );
  }
  if (variant === "feature") {
    return (
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card-dark p-7 text-paper sm:p-9">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.15] invert" aria-hidden />
        <div className="relative">
          <span className="text-[12.5px] font-medium text-highlight">{article.category} · {article.content_type}</span>
          <h3 className="display mt-4 text-[1.9rem] leading-[1.1] sm:text-[2.3rem]">
            <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
          </h3>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-paper/65">{article.excerpt}</p>
        </div>
        <div className="relative mt-10 flex items-center justify-between text-[13px] text-paper/55">
          <span><time dateTime={article.published_at}>{formatDate(article.published_at)}</time> · {minutes} min read</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-paper">
            Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
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
        {meta}
        <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[12.5px] text-faint">
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
          <ArrowRight size={15} className="text-ink transition-transform group-hover:translate-x-0.5" />
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
      <div className="mb-6 flex items-start justify-between gap-3">
        <FileGlyph label={FORMAT_LABEL[resource.format] ?? resource.format.slice(0, 4).toUpperCase()} />
        <span className="text-[12.5px] text-muted">{resource.category}</span>
      </div>
      <h3 className="text-[17.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">{resource.title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{resource.description}</p>
      <a
        href={href}
        {...(isFile ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-medium text-ink after:absolute after:inset-0"
        aria-label={`${isFile ? "Download" : "Open"} ${resource.title}`}
      >
        <span className="link-underline">{isFile ? "Download" : "Open resource"}</span>
        {isFile ? <Download size={15} /> : <ArrowUpRight size={15} />}
      </a>
    </article>
  );
}

/** A compact row used in lists (homepage, sidebars). */
export function ResourceRow({ resource }: { resource: Resource }) {
  const href = resource.file_url || resource.external_url || "#";
  const isFile = Boolean(resource.file_url);
  return (
    <a
      href={href}
      {...(isFile ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex items-center gap-5 border-t border-line py-5 transition-colors hover:bg-surface/60 sm:px-2"
    >
      <FileGlyph label={FORMAT_LABEL[resource.format] ?? resource.format.slice(0, 4).toUpperCase()} />
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold tracking-[-0.01em] text-ink group-hover:text-accent-ink">{resource.title}</span>
        <span className="mt-0.5 block truncate text-[14px] text-muted">{resource.description}</span>
      </span>
      <span className="hidden text-[13px] text-muted sm:block">{resource.category}</span>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-ink transition-colors group-hover:border-ink">
        {isFile ? <Download size={15} /> : <ArrowUpRight size={15} />}
      </span>
    </a>
  );
}

function FileGlyph({ label }: { label: string }) {
  return (
    <span className="relative grid h-12 w-10 shrink-0 place-items-end rounded-[5px] border border-line-strong bg-paper pb-1.5 font-mono text-[9.5px] font-semibold tracking-tight text-ink-3">
      <span className="absolute right-[-1px] top-[-1px] h-3 w-3 rounded-bl-[4px] border-b border-l border-line-strong bg-paper-2" aria-hidden />
      <span className="w-full text-center">{label}</span>
    </span>
  );
}

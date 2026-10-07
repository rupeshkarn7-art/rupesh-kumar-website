import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getProjects } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getEmbed } from "@/lib/video";
import { Markdown } from "@/components/markdown";
import { Badge, ButtonLink, Tag } from "@/components/ui";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, GitHub } from "@/components/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactBand } from "@/components/contact-band";
import { VideoEmbed } from "@/components/video-embed";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.cover_image,
    type: "article",
  });
}

const SECTIONS = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["objectives", "Objectives"],
  ["solution", "Approach & solution"],
  ["architecture", "Architecture"],
  ["workflow", "Workflow"],
  ["implementation", "Implementation"],
  ["impact", "Results & impact"],
  ["challenges", "Challenges"],
  ["lessons", "Lessons learned"],
  ["future", "Future improvements"],
] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const sections = SECTIONS.filter(([key]) => (project[key] ?? "").trim().length > 0);
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[(idx + 1) % all.length];
  const video = project.demo_video_url ? getEmbed("youtube", project.demo_video_url) : null;

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: absoluteUrl(`/projects/${project.slug}`),
            author: { "@id": absoluteUrl("/#person") },
            keywords: project.technologies.join(", "),
            ...(project.year ? { dateCreated: String(project.year) } : {}),
          },
        ]}
      />

      <header className="border-b border-line">
        <div className="container-x pb-12 pt-10 sm:pt-14">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
            <ArrowLeft size={15} /> All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{project.category}</Badge>
            <Badge>{project.status}</Badge>
            {project.is_case_study && <Badge tone="ink">Case study</Badge>}
          </div>
          <h1 className="display mt-5 max-w-4xl text-[2.4rem] leading-[1.06] text-ink sm:text-[3.4rem]">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-[18.5px] leading-relaxed text-ink-3">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demo_url && <ButtonLink href={project.demo_url}>Live demo <ArrowUpRight size={15} /></ButtonLink>}
            {project.github_url && (
              <ButtonLink href={project.github_url} variant="secondary"><GitHub size={16} /> View code</ButtonLink>
            )}
          </div>
        </div>
        {project.cover_image && (
          <div className="container-x pb-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[24px] border border-line">
              <Image src={project.cover_image} alt={`${project.title} cover`} fill priority sizes="(min-width: 1200px) 1140px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </header>

      <div className="container-x grid gap-14 py-16 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="min-w-0">
          {sections.map(([key, label], i) => (
            <section key={key} id={key} className="scroll-mt-24 border-b border-line pb-12 pt-2 [&+section]:pt-12 last:border-0">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{String(i + 1).padStart(2, "0")} · {label}</p>
              <Markdown>{project[key] as string}</Markdown>
            </section>
          ))}

          {project.key_features.length > 0 && (
            <section className="pt-12">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Key features</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.key_features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-[15px] text-ink-2">
                    <Check size={17} className="mt-0.5 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {video?.embedUrl && (
            <section className="pt-12">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Demo</p>
              <VideoEmbed embedUrl={video.embedUrl} thumbnail={video.thumbnail} title={`${project.title} demo`} />
            </section>
          )}

          {project.screenshots.length > 0 && (
            <section className="pt-12">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Screenshots</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((src, i) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                    <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:pt-2">
          <div className="sticky top-24 space-y-6">
            <dl className="card divide-y divide-line">
              {[
                ["My role", project.role],
                ["Type", project.project_type],
                ["Year", project.year ? String(project.year) : ""],
                ["Status", project.status],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="px-5 py-3.5">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">{k}</dt>
                    <dd className="mt-1 text-[15px] text-ink">{v}</dd>
                  </div>
                ))}
              {project.technologies.length > 0 && (
                <div className="px-5 py-4">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Technology stack</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => <Tag key={t}>{t}</Tag>)}
                  </dd>
                </div>
              )}
            </dl>
            {sections.length > 3 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="eyebrow mb-3">On this page</p>
                <ul className="space-y-1.5 border-l border-line">
                  {sections.map(([key, label]) => (
                    <li key={key}>
                      <a href={`#${key}`} className="-ml-px block border-l border-transparent pl-4 text-[14px] text-muted hover:border-ink hover:text-ink">{label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="rounded-2xl bg-ink p-6 text-paper">
              <p className="text-[16px] font-medium">Facing a similar challenge?</p>
              <p className="mt-1.5 text-[14px] text-paper/65">I&apos;m happy to compare notes.</p>
              <ButtonLink href="/consulting#enquire" variant="light" size="sm" className="mt-4" arrow>Discuss your project</ButtonLink>
            </div>
          </div>
        </aside>
      </div>

      {next && next.slug !== project.slug && (
        <div className="border-t border-line">
          <Link href={`/projects/${next.slug}`} className="container-x group flex items-center justify-between gap-6 py-10">
            <span>
              <span className="eyebrow">Next project</span>
              <span className="mt-2 block text-[22px] font-semibold tracking-tight text-ink group-hover:text-accent-ink">{next.title}</span>
            </span>
            <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
      <ContactBand />
    </article>
  );
}

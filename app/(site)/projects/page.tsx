import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { getRepos } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { PageHero, Section, SectionHeader, ButtonLink } from "@/components/ui";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { GitHub, Star } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";
import { ProjectFeature } from "@/components/cards";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects and programmes by Rupesh Kumar — network and infrastructure transformation, AIOps research, data analysis, web applications and personal experiments.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, repos] = await Promise.all([getProjects(), getRepos(6)]);
  const featured = ["travel-os", "multi-site-network-modernisation"]
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean) as typeof projects;
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Programmes I've led, products I've built, research I've done"
        intro="Enterprise programmes delivered at BT and HCLTech, products I design and ship myself, and the research behind my work. Client names are kept confidential."
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {[
              [String(projects.length), "projects"],
              [String(projects.filter((p) => p.is_case_study).length), "case studies"],
              [String(projects.filter((p) => p.demo_url).length), "live builds"],
            ].map(([v, l]) => (
              <div key={l} className="bg-surface p-5">
                <dt className="sr-only">{l}</dt>
                <dd className="display text-[2rem] leading-none text-ink">{v}</dd>
                <dd aria-hidden className="mt-2 text-[13px] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        }
      />
      {featured.length > 0 && (
        <Section tone="paper-2" className="!pb-0 !pt-14 sm:!pt-16">
          <p className="eyebrow mb-6">Featured</p>
          <div className="space-y-6">
            {featured.map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectFeature project={p} reverse={i % 2 === 1} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
      <Section tone="paper-2" className="!pt-14">
        <p className="eyebrow mb-6">All projects</p>
        <ProjectExplorer projects={projects} />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Open source"
          title="On GitHub"
          intro="Public repositories, pulled automatically from my GitHub profile."
          action={
            <ButtonLink href={siteConfig.socials.github} variant="secondary">
              <GitHub size={16} /> {siteConfig.githubUsername}
            </ButtonLink>
          }
        />
        {repos.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" className="card card-hover flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[14px] font-medium text-ink">{r.name}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[12px] text-muted"><Star size={13} />{r.stargazers_count}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-[14.5px] text-muted">{r.description || "No description yet."}</p>
                {r.topics?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.topics.slice(0, 4).map((t) => <span key={t} className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] text-accent-ink">{t}</span>)}
                  </div>
                )}
                <div className="mt-auto flex items-center gap-3 pt-4 font-mono text-[11.5px] text-faint">
                  {r.language && <span>{r.language}</span>}
                  <span>Updated {formatDate(r.updated_at)}</span>
                  {r.homepage && <span className="text-ink">Live demo ↗</span>}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-center text-muted">
            Public repositories will appear here automatically as I publish them.{" "}
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">Follow on GitHub</a>
          </div>
        )}
      </Section>
      <ContactBand title="Working on something similar?" />
    </>
  );
}

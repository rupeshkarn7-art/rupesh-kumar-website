import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Section, EmptyState, Badge } from "@/components/ui";
import { ArticleCard, CoverArt } from "@/components/cards";
import { ArrowRight } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Case studies from network modernisation, infrastructure transformation and AIOps research — the problem, the approach, the trade-offs and what was learned.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const { projects, articles } = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="The problem, the approach, and what I learned"
        intro="Deeper write-ups of selected programmes and research. Client names are withheld; figures are as reported in my professional roles."
      />
      <Section>
        {projects.length === 0 && articles.length === 0 && <EmptyState title="Case studies coming soon" />}
        <div className="space-y-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover group grid overflow-hidden md:grid-cols-[1fr_1.3fr]">
              <CoverArt seed={p.slug} label={p.category} className="min-h-[220px]" />
              <div className="flex flex-col p-7 sm:p-10">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="accent">{p.category}</Badge>
                  {p.year && <Badge>{String(p.year)}</Badge>}
                </div>
                <h2 className="mt-5 text-[24px] font-semibold leading-tight tracking-tight text-ink group-hover:text-accent-ink sm:text-[28px]">{p.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.summary}</p>
                {p.role && <p className="mt-4 font-mono text-[12px] text-faint">Role: {p.role}</p>}
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-ink">
                  Read the case study <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {articles.length > 0 && (
          <div className="mt-16">
            <h2 className="display mb-8 text-[2rem] text-ink">Written case studies</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </div>
        )}
      </Section>
      <ContactBand title="Have a programme that needs this kind of structure?" />
    </>
  );
}

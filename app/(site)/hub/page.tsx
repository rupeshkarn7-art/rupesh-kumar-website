import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getResources } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { hubNav } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";
import { ArticleExplorer } from "@/components/hub/article-explorer";
import { ArrowRight, Download } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";
import { Reveal } from "@/components/motion/reveal";
import { readingTime } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Tech Hub",
  description:
    "Technology explainers, research, guides and cheat sheets on networking, SD-WAN, cloud, AI and AIOps, project management, Agile and technology careers.",
  path: "/hub",
});

const SERIES_TAG = "Enterprise Network Vendors 2026";

export default async function HubPage() {
  const [articles, resources] = await Promise.all([getArticles(), getResources()]);
  const series = articles
    .filter((a) => a.tags.includes(SERIES_TAG))
    .sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));
  const report = resources.find((r) => r.slug === "enterprise-network-vendor-analysis-2026");
  const topics = new Set(articles.map((a) => a.category)).size;
  const totalMinutes = articles.reduce((n, a) => n + readingTime(a.content), 0);

  return (
    <>
      <PageHero
        eyebrow="Tech Hub"
        title="A practical knowledge base for technology leaders and practitioners"
        intro="Research, explainers and field notes on networking and SD-WAN, cloud, AI and AIOps, programme delivery and technology careers — written from real programmes, not press releases."
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {[
              [String(articles.length), "pieces"],
              [String(topics), "topics"],
              [`${Math.round(totalMinutes / 6) * 6}+`, "min of reading"],
            ].map(([v, l]) => (
              <div key={l} className="bg-surface p-5">
                <dt className="sr-only">{l}</dt>
                <dd className="display text-[2rem] leading-none text-ink">{v}</dd>
                <dd aria-hidden className="mt-2 text-[13px] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <nav aria-label="Tech Hub sections" className="flex flex-wrap gap-2">
          {hubNav
            .filter((s) => s.href !== "/hub")
            .map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-[14px] text-ink transition-colors hover:border-ink"
              >
                {s.label}
                <ArrowRight size={14} className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            ))}
        </nav>
      </PageHero>

      {series.length > 0 && (
        <section className="bg-brand-hero text-paper">
          <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow eyebrow-dark mb-5">Featured research · {series.length}-part series</p>
              <h2 className="display text-[2.1rem] leading-[1.08] sm:text-[2.6rem]">Enterprise Network Vendors 2026</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-paper/65">
                A vendor-neutral study of 19 networking and security vendors benchmarked against Cisco — products, licensing, real
                prices, five-year TCO and fit for India, Europe and the US.
              </p>
              {report?.file_url && (
                <a
                  href={report.file_url}
                  download=""
                  className="mt-7 inline-flex items-center gap-2 rounded-lg border border-line-dark px-4 py-2.5 text-[14.5px] text-paper transition-colors hover:border-highlight"
                >
                  <Download size={16} /> Download the full report (PDF)
                </a>
              )}
            </Reveal>
            <Reveal delay={100}>
              <ol className="border-b border-paper/10">
                {series.map((a, i) => (
                  <li key={a.slug}>
                    <Link href={`/hub/${a.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-paper/10 py-4">
                      <span className="font-mono text-[12.5px] text-highlight">Part {i + 1}</span>
                      <span className="text-[16px] leading-snug text-paper transition-colors group-hover:text-highlight">{a.title}</span>
                      <span className="hidden text-[12.5px] text-paper/45 sm:block">{readingTime(a.content)} min</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      <Section>
        <ArticleExplorer articles={articles} />
      </Section>
      <ContactBand
        title="Want a topic covered?"
        intro="Suggest a question or topic you'd like explained — networking, programme delivery, AI or careers."
      />
    </>
  );
}

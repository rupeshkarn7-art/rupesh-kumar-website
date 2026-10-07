import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";
import { PageHero, Section, EmptyState } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Latest writing by Rupesh Kumar on technology transformation, project management, AI and technology careers.",
  path: "/blog",
});

export default async function BlogPage() {
  const articles = await getArticles();
  const byYear = articles.reduce<Record<string, typeof articles>>((acc, a) => {
    const y = new Date(a.published_at).getFullYear().toString();
    (acc[y] ||= []).push(a);
    return acc;
  }, {});
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes from the field" intro="Everything I publish, newest first. For browsing by topic, visit the Tech Hub." />
      <Section>
        {articles.length === 0 && <EmptyState title="First posts coming soon" />}
        {Object.entries(byYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, posts]) => (
            <div key={year} className="grid gap-6 border-t border-line pt-8 first:border-0 first:pt-0 lg:grid-cols-[160px_1fr] [&+div]:mt-12">
              <h2 className="display text-[2rem] text-faint">{year}</h2>
              <ul className="divide-y divide-line">
                {posts.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/hub/${a.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
                      <span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink">{a.category} · {a.content_type}</span>
                        <span className="mt-1.5 block text-[20px] font-semibold tracking-tight text-ink group-hover:text-accent-ink">{a.title}</span>
                        <span className="mt-1.5 block max-w-2xl text-[15px] text-muted">{a.excerpt}</span>
                      </span>
                      <span className="flex items-center gap-3 font-mono text-[12px] text-faint">
                        <time dateTime={a.published_at}>{formatDate(a.published_at, { day: "numeric", month: "short" })}</time>
                        <span>{readingTime(a.content)} min</span>
                        <ArrowRight size={15} className="text-ink transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </Section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GithubSlugger from "github-slugger";
import { getArticle, getArticles, relatedArticles } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui";
import { ArrowLeft } from "@/components/icons";
import { ArticleCard } from "@/components/cards";
import { ShareButtons } from "@/components/share-buttons";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return { title: "Article not found" };
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/hub/${article.slug}`,
    image: article.hero_image,
    type: "article",
    publishedTime: article.published_at,
    modifiedTime: article.updated_at,
    tags: article.tags,
  });
}

function toc(markdown: string) {
  const slugger = new GithubSlugger();
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
      return { text, id: slugger.slug(text) };
    });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, all] = await Promise.all([getArticle(slug), getArticles()]);
  if (!article) notFound();
  const url = absoluteUrl(`/hub/${article.slug}`);
  const related = relatedArticles(all, article, 3);
  const headings = toc(article.content);

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tech Hub", path: "/hub" },
            { name: article.title, path: `/hub/${article.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": article.content_type === "Tutorial" ? "TechArticle" : "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.published_at,
            dateModified: article.updated_at ?? article.published_at,
            author: { "@type": "Person", name: article.author, url: siteConfig.url },
            publisher: { "@id": absoluteUrl("/#person") },
            mainEntityOfPage: url,
            keywords: article.tags.join(", "),
            articleSection: article.category,
            ...(article.hero_image ? { image: article.hero_image.startsWith("http") ? article.hero_image : absoluteUrl(article.hero_image) } : {}),
          },
        ]}
      />
      <header className="border-b border-line">
        <div className="container-x grid max-w-[1180px] xl:grid-cols-[1fr_220px] xl:gap-12"><div className="mx-auto w-full max-w-[740px] pb-12 pt-10 sm:pt-14">
          <Link href="/hub" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
            <ArrowLeft size={15} /> Tech Hub
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{article.content_type}</Badge>
            <Badge>{article.category}</Badge>
          </div>
          <h1 className="display mt-5 text-[2.3rem] leading-[1.08] text-ink sm:text-[3.1rem]">{article.title}</h1>
          <p className="mt-5 text-[19px] leading-relaxed text-ink-3">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <Image src={siteConfig.portraitSquare} alt="" width={44} height={44} className="rounded-full border border-line" />
              <div className="text-[14px]">
                <p className="font-medium text-ink">{article.author}</p>
                <p className="font-mono text-[12px] text-muted">
                  <time dateTime={article.published_at}>{formatDate(article.published_at)}</time> · {readingTime(article.content)} min read
                </p>
              </div>
            </div>
            <ShareButtons url={url} title={article.title} />
          </div>
        </div></div>
        {article.hero_image && (
          <div className="container-x max-w-[1040px] pb-12">
            <div className="relative aspect-[2/1] overflow-hidden rounded-[22px] border border-line">
              <Image src={article.hero_image} alt="" fill priority sizes="(min-width: 1040px) 1000px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </header>

      <div className="container-x grid max-w-[1180px] gap-12 py-14 xl:grid-cols-[1fr_220px]">
        <div className="mx-auto w-full max-w-[740px] min-w-0">
          <Markdown>{article.content}</Markdown>
          {article.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {article.tags.map((t) => (
                <li key={t} className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-3">#{t}</li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
            <Image src={siteConfig.portraitSquare} alt="" width={64} height={64} className="rounded-full border border-line" />
            <div className="flex-1">
              <p className="font-medium text-ink">Written by Rupesh Kumar</p>
              <p className="mt-1 text-[14.5px] text-muted">
                Technology transformation & project management professional, MBA (IIM Lucknow). Writing about networks, delivery, AI and technology careers.
              </p>
            </div>
            <ShareButtons url={url} title={article.title} />
          </div>
        </div>
        {headings.length > 2 && (
          <aside className="hidden xl:block">
            <nav aria-label="Table of contents" className="sticky top-24">
              <p className="eyebrow mb-3">Contents</p>
              <ul className="space-y-1.5 border-l border-line">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13.5px] leading-snug text-muted hover:border-ink hover:text-ink">{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface py-16">
          <div className="container-x">
            <h2 className="display mb-8 text-[2rem] text-ink">Related reading</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </div>
        </section>
      )}
      <ContactBand />
    </article>
  );
}

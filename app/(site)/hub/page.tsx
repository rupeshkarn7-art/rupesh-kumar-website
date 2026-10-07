import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { hubNav } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";
import { ArticleExplorer } from "@/components/hub/article-explorer";
import { ArrowRight } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Tech Hub",
  description:
    "Technology explainers, tutorials, guides and cheat sheets on networking, SD-WAN, cloud, AI and AIOps, project management, Agile and technology careers.",
  path: "/hub",
});

export default async function HubPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="Tech Hub"
        title="A practical knowledge hub for technology professionals"
        intro="Explainers, tutorials and guides from the field — networking and SD-WAN, cloud, AI and AIOps, project management, and building a technology career."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hubNav.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="card card-hover group flex h-full flex-col p-5">
                <span className="flex items-center justify-between text-[16px] font-semibold text-ink">
                  {s.label}
                  <ArrowRight size={16} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </span>
                <span className="mt-1 text-[13.5px] text-muted">{s.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>
      <Section>
        <ArticleExplorer articles={articles} />
      </Section>
      <ContactBand title="Want a topic covered?" intro="Suggest a question or topic you'd like explained — networking, project management, AI or careers." />
    </>
  );
}

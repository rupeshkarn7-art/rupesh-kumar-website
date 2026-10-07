import type { Metadata } from "next";
import { getVideos } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { VIDEO_SERIES } from "@/content/taxonomy";
import { getEmbed } from "@/lib/video";
import { formatDate } from "@/lib/utils";
import { PageHero, Section, SectionHeader, ButtonLink, Badge } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";
import { ArrowUpRight, YouTube, LinkedIn } from "@/components/icons";
import type { Video } from "@/lib/schemas";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Vlogs",
  description: "Videos by Rupesh Kumar — technology tutorials, project build logs, career talks and technology explained.",
  path: "/vlogs",
});

const seriesBlurb: Record<string, string> = {
  "Technology Tutorials": "Step-by-step walkthroughs of tools and techniques.",
  "Project Build Logs": "Building projects in public, decisions included.",
  "Career Talks": "Honest conversations about growing a technology career.",
  "Technology Explained": "Complex topics — SD-WAN, AIOps, cloud — made clear.",
  "Behind the Project": "What really happened on real programmes.",
};

function VideoCard({ video, large }: { video: Video; large?: boolean }) {
  const { embedUrl, thumbnail } = getEmbed(video.platform, video.video_url);
  const thumb = video.thumbnail || thumbnail;
  return (
    <article className="flex flex-col">
      {embedUrl ? (
        <VideoEmbed embedUrl={embedUrl} thumbnail={thumb} title={video.title} />
      ) : (
        <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="grid aspect-video place-items-center rounded-2xl border border-line bg-ink text-paper">
          <span className="inline-flex items-center gap-2 text-[15px]">Watch on {video.platform === "other" ? "external site" : video.platform} <ArrowUpRight size={16} /></span>
        </a>
      )}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{video.series}</Badge>
          <span className="font-mono text-[11.5px] text-faint">{formatDate(video.published_at)}{video.duration ? ` · ${video.duration}` : ""}</span>
        </div>
        <h3 className={`${large ? "text-[22px]" : "text-[17.5px]"} mt-2.5 font-semibold leading-snug tracking-tight text-ink`}>{video.title}</h3>
        {video.description && <p className="mt-1.5 line-clamp-2 text-[15px] text-muted">{video.description}</p>}
      </div>
    </article>
  );
}

export default async function VlogsPage() {
  const videos = await getVideos();
  const latest = videos[0];
  return (
    <>
      <PageHero
        eyebrow="Vlogs"
        title="Technology, projects and careers — on video"
        intro="Tutorials, build logs, career talks and plain-English explainers. Videos are embedded from YouTube and LinkedIn and only load when you press play."
      >
        <div className="flex flex-wrap gap-3">
          {siteConfig.socials.youtube && (
            <ButtonLink href={siteConfig.socials.youtube}><YouTube size={16} /> Subscribe on YouTube</ButtonLink>
          )}
          <ButtonLink href={siteConfig.socials.linkedin} variant="secondary"><LinkedIn size={16} /> Follow on LinkedIn</ButtonLink>
        </div>
      </PageHero>

      {latest ? (
        <>
          <Section>
            <SectionHeader eyebrow="Latest" title="Latest video" />
            <div className="max-w-4xl"><VideoCard video={latest} large /></div>
          </Section>
          {VIDEO_SERIES.map((s) => {
            const list = videos.filter((v) => v.series === s && v.slug !== latest.slug);
            if (!list.length) return null;
            return (
              <Section key={s} tone="surface" className="!py-16">
                <SectionHeader eyebrow="Series" title={s} intro={seriesBlurb[s]} />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((v) => <VideoCard key={v.slug} video={v} />)}
                </div>
              </Section>
            );
          })}
        </>
      ) : (
        <Section>
          <div className="rounded-[24px] border border-line bg-surface p-8 sm:p-12">
            <p className="eyebrow mb-3">Coming soon</p>
            <h2 className="display text-[2rem] text-ink">The first videos are in production.</h2>
            <p className="mt-3 max-w-xl text-muted">Here&apos;s what the channel will cover. Follow on LinkedIn to catch the first episode.</p>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {VIDEO_SERIES.map((s, i) => (
                <li key={s} className="bg-paper p-5">
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  <p className="mt-2 font-semibold text-ink">{s}</p>
                  <p className="mt-1 text-[13.5px] text-muted">{seriesBlurb[s]}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </>
  );
}

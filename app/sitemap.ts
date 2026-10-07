import type { MetadataRoute } from "next";
import { getArticles, getProjects } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  const now = new Date();
  const statics = [
    ["/", 1],
    ["/about", 0.9],
    ["/projects", 0.9],
    ["/consulting", 0.9],
    ["/mentoring", 0.8],
    ["/hub", 0.8],
    ["/blog", 0.7],
    ["/case-studies", 0.7],
    ["/vlogs", 0.6],
    ["/resources", 0.7],
    ["/resume", 0.6],
    ["/contact", 0.6],
    ["/privacy", 0.2],
  ] as const;
  return [
    ...statics.map(([path, priority]) => ({ url: absoluteUrl(path), lastModified: now, priority })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified: p.updated_at ? new Date(p.updated_at) : now, priority: 0.7 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/hub/${a.slug}`), lastModified: new Date(a.updated_at ?? a.published_at), priority: 0.7 })),
  ];
}

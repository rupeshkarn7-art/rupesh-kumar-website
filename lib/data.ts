import "server-only";
import { cache } from "react";
import { getPublicClient } from "@/lib/supabase/public";
import type { Article, Project, Resource, Video } from "@/lib/schemas";
import { seedProjects } from "@/content/seed/projects";
import { seedArticles } from "@/content/seed/articles";
import { seedResources, seedVideos } from "@/content/seed/media";

/**
 * Content repository. Pages only talk to these functions — never to the database directly —
 * so the backing store (Supabase today, a headless CMS tomorrow) can change without touching UI.
 *
 * If Supabase isn't configured or a query fails, local seed content is served instead,
 * so the site never renders empty.
 */

async function fromTable<T>(table: string, orderBy: string, ascending: boolean, fallback: T[]): Promise<T[]> {
  const db = getPublicClient();
  if (!db) return fallback;
  const { data, error } = await db.from(table).select("*").eq("published", true).order(orderBy, { ascending });
  if (error) {
    console.error(`[data] ${table}:`, error.message);
    return fallback;
  }
  return (data ?? []) as T[];
}

const published = <T extends { published: boolean }>(rows: T[]) => rows.filter((r) => r.published);

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await fromTable<Project>("projects", "sort_order", true, published(seedProjects));
  return [...rows].sort((a, b) => a.sort_order - b.sort_order || (b.year ?? 0) - (a.year ?? 0));
});

export const getProject = cache(async (slug: string) => (await getProjects()).find((p) => p.slug === slug) ?? null);

export const getArticles = cache(async (): Promise<Article[]> => {
  const rows = await fromTable<Article>("articles", "published_at", false, published(seedArticles));
  return [...rows].sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));
});

export const getArticle = cache(async (slug: string) => (await getArticles()).find((a) => a.slug === slug) ?? null);

export const getVideos = cache(async (): Promise<Video[]> => {
  const rows = await fromTable<Video>("videos", "published_at", false, published(seedVideos));
  return [...rows].sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));
});

export const getResources = cache(async (): Promise<Resource[]> => {
  const rows = await fromTable<Resource>("resources", "sort_order", true, published(seedResources));
  return [...rows].sort((a, b) => a.sort_order - b.sort_order);
});

/** Case studies = projects flagged as case studies + articles of type "Case Study". */
export const getCaseStudies = cache(async () => {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  return {
    projects: projects.filter((p) => p.is_case_study),
    articles: articles.filter((a) => a.content_type === "Case Study"),
  };
});

export function relatedArticles(all: Article[], current: Article, n = 3) {
  return all
    .filter((a) => a.slug !== current.slug)
    .map((a) => ({
      a,
      score: (a.category === current.category ? 3 : 0) + a.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score || +new Date(y.a.published_at) - +new Date(x.a.published_at))
    .slice(0, n)
    .map((x) => x.a);
}

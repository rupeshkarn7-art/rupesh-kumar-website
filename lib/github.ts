import "server-only";
import { siteConfig } from "@/lib/site";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
  size: number;
};

/**
 * Public repositories for the configured GitHub user (GITHUB_USERNAME).
 * GITHUB_TOKEN (optional, server-only) raises the API rate limit. Private repos are never requested.
 * Cached for one hour.
 */
export async function getRepos(limit = 6): Promise<Repo[]> {
  const user = siteConfig.githubUsername;
  if (!user) return [];
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=50`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const repos = (await res.json()) as Repo[];
    return repos
      .filter((r) => !r.fork && !r.archived && r.size > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
      .slice(0, limit);
  } catch {
    return [];
  }
}

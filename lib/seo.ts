import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { profile } from "@/content/profile";

/** Consistent per-page metadata: title, description, canonical, Open Graph and X/Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image.startsWith("http") ? image : absoluteUrl(image) }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [siteConfig.name], tags } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.portraitSquare),
    email: `mailto:${siteConfig.email}`,
    jobTitle: profile.currentRole,
    worksFor: { "@type": "Organization", name: profile.currentCompany },
    description: siteConfig.description,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Indian Institute of Management Lucknow" },
      { "@type": "CollegeOrUniversity", name: "Maharaja Agrasen Institute of Technology" },
      { "@type": "CollegeOrUniversity", name: "IÉSEG School of Management" },
    ],
    knowsAbout: [
      "IT project management", "Technology program management", "Network transformation", "SD-WAN", "MPLS",
      "Data center migration", "Network security", "AIOps", "AI transformation", "Technology strategy",
      "Technology consulting", "Career mentoring",
    ],
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github, siteConfig.socials.youtube].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": absoluteUrl("/#person") },
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

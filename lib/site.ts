/**
 * Global site configuration.
 * Values that differ between environments come from env vars (see .env.example).
 */
export const siteConfig = {
  name: "Rupesh Kumar",
  shortTitle: "Technology, Projects, AI & Careers",
  title: "Rupesh Kumar — Technology Transformation, Project Management & AI",
  description:
    "Rupesh Kumar is a technology transformation and project management professional (MBA, IIM Lucknow) working across enterprise infrastructure, network transformation, AIOps and technology strategy — and mentoring professionals building technology careers.",
  // Set NEXT_PUBLIC_SITE_URL once you have a custom domain. On Vercel the production URL is used automatically.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  locale: "en_IN",
  email: "rupeshkarn7@gmail.com",
  location: "India",
  socials: {
    linkedin: "https://www.linkedin.com/in/rupeshkumar-tech/",
    github: "https://github.com/rupeshkarn7-art",
    // Add your channel URL here (or via NEXT_PUBLIC_YOUTUBE_URL) when it is live.
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },
  githubUsername: process.env.GITHUB_USERNAME || "rupeshkarn7-art",
  resumePath: "/resume/Rupesh_Kumar_Resume.pdf",
  portrait: "/images/rupesh-kumar.jpg",
  portraitSquare: "/images/rupesh-kumar-square.jpg",
};

export type NavItem = { label: string; href: string; description?: string };

/** Primary navigation — kept to eight items; secondary items live in menus/footer. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Tech Hub", href: "/hub" },
  { label: "Consulting", href: "/consulting" },
  { label: "Mentoring", href: "/mentoring" },
  { label: "Resources", href: "/resources" },
];

/** Sub-items revealed under "Tech Hub" and in the footer. */
export const hubNav: NavItem[] = [
  { label: "Knowledge Hub", href: "/hub", description: "Explainers, guides and cheat sheets by topic" },
  { label: "Blog", href: "/blog", description: "Latest writing, newest first" },
  { label: "Vlogs", href: "/vlogs", description: "Videos, build logs and career talks" },
  { label: "Case Studies", href: "/case-studies", description: "How real programmes were run" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { label: "Tech Hub", href: "/hub" },
      { label: "Blog", href: "/blog" },
      { label: "Vlogs", href: "/vlogs" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Work with me",
    items: [
      { label: "Consulting", href: "/consulting" },
      { label: "Career Mentoring", href: "/mentoring" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

import {
  ARTICLE_CATEGORIES,
  CONTENT_TYPES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  RESOURCE_CATEGORIES,
  RESOURCE_FORMATS,
  VIDEO_PLATFORMS,
  VIDEO_SERIES,
} from "@/content/taxonomy";

/**
 * Admin form configuration. Adding a field here (plus a DB column + schema entry)
 * is all it takes to make it editable in the dashboard.
 */
export type FieldType =
  | "text"
  | "slug"
  | "textarea"
  | "markdown"
  | "select"
  | "list"
  | "checkbox"
  | "number"
  | "datetime"
  | "url"
  | "image"
  | "file"
  | "images";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: readonly string[];
  help?: string;
  required?: boolean;
  group?: string;
  rows?: number;
  /** For "list" fields: split on new lines instead of commas. */
  perLine?: boolean;
};

export type EntityKey = "projects" | "articles" | "videos" | "resources";

export type EntityConfig = {
  key: EntityKey;
  table: EntityKey;
  singular: string;
  plural: string;
  publicPath: (slug: string) => string;
  revalidate: string[];
  listColumns: { name: string; label: string }[];
  orderBy: { column: string; ascending: boolean };
  fields: Field[];
};

const publishing: Field[] = [
  { name: "published", label: "Published (visible on the website)", type: "checkbox", group: "Publishing" },
  { name: "featured", label: "Featured on the homepage", type: "checkbox", group: "Publishing" },
];

export const entities: Record<EntityKey, EntityConfig> = {
  projects: {
    key: "projects",
    table: "projects",
    singular: "Project",
    plural: "Projects",
    publicPath: (s) => `/projects/${s}`,
    revalidate: ["/", "/projects", "/case-studies", "/sitemap.xml"],
    listColumns: [
      { name: "category", label: "Category" },
      { name: "year", label: "Year" },
    ],
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, group: "Basics" },
      { name: "slug", label: "URL slug", type: "slug", required: true, group: "Basics", help: "Used in the address: /projects/your-slug" },
      { name: "summary", label: "Short description", type: "textarea", rows: 3, group: "Basics", help: "1–2 sentences shown on cards and in search results." },
      { name: "category", label: "Category", type: "select", options: PROJECT_CATEGORIES, required: true, group: "Basics" },
      { name: "project_type", label: "Project type", type: "select", options: PROJECT_TYPES, group: "Basics" },
      { name: "status", label: "Status", type: "select", options: PROJECT_STATUSES, group: "Basics" },
      { name: "year", label: "Year", type: "number", group: "Basics" },
      { name: "role", label: "My role", type: "text", group: "Basics" },
      { name: "technologies", label: "Technology stack", type: "list", group: "Basics", help: "Comma-separated, e.g. Python, Azure, SD-WAN" },
      { name: "cover_image", label: "Cover image", type: "image", group: "Media" },
      { name: "screenshots", label: "Screenshots", type: "images", group: "Media" },
      { name: "github_url", label: "GitHub repository URL", type: "url", group: "Links" },
      { name: "demo_url", label: "Live demo URL", type: "url", group: "Links" },
      { name: "demo_video_url", label: "Demo video (YouTube URL)", type: "url", group: "Links" },
      { name: "overview", label: "Overview", type: "markdown", group: "Case study" },
      { name: "problem", label: "Problem / business need", type: "markdown", group: "Case study" },
      { name: "objectives", label: "Objectives", type: "markdown", group: "Case study" },
      { name: "solution", label: "Approach & solution", type: "markdown", group: "Case study" },
      { name: "architecture", label: "Architecture", type: "markdown", group: "Case study", help: "Markdown — tip: paste an architecture diagram image URL or a ```text``` diagram." },
      { name: "workflow", label: "Workflow", type: "markdown", group: "Case study" },
      { name: "implementation", label: "Implementation", type: "markdown", group: "Case study" },
      { name: "key_features", label: "Key features", type: "list", perLine: true, group: "Case study", help: "One per line." },
      { name: "impact", label: "Results & business impact", type: "markdown", group: "Case study" },
      { name: "challenges", label: "Challenges", type: "markdown", group: "Case study" },
      { name: "lessons", label: "Lessons learned", type: "markdown", group: "Case study" },
      { name: "future", label: "Future improvements", type: "markdown", group: "Case study" },
      { name: "is_case_study", label: "Show as a case study", type: "checkbox", group: "Publishing" },
      ...publishing,
      { name: "sort_order", label: "Sort order (lower = first)", type: "number", group: "Publishing" },
    ],
  },
  articles: {
    key: "articles",
    table: "articles",
    singular: "Article",
    plural: "Articles",
    publicPath: (s) => `/hub/${s}`,
    revalidate: ["/", "/hub", "/blog", "/case-studies", "/sitemap.xml"],
    listColumns: [
      { name: "category", label: "Category" },
      { name: "content_type", label: "Type" },
    ],
    orderBy: { column: "published_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, group: "Basics" },
      { name: "slug", label: "URL slug", type: "slug", required: true, group: "Basics", help: "Used in the address: /hub/your-slug" },
      { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3, group: "Basics", help: "Shown on cards and as the search-engine description." },
      { name: "category", label: "Category", type: "select", options: ARTICLE_CATEGORIES, required: true, group: "Basics" },
      { name: "content_type", label: "Content type", type: "select", options: CONTENT_TYPES, group: "Basics" },
      { name: "tags", label: "Tags", type: "list", group: "Basics", help: "Comma-separated." },
      { name: "published_at", label: "Publish date", type: "datetime", group: "Basics" },
      { name: "author", label: "Author", type: "text", group: "Basics" },
      { name: "hero_image", label: "Hero image", type: "image", group: "Media" },
      { name: "content", label: "Content", type: "markdown", rows: 26, group: "Content", help: "Markdown: ## headings, **bold**, lists, tables, ```code``` blocks, ![alt](image-url) for diagrams." },
      ...publishing,
    ],
  },
  videos: {
    key: "videos",
    table: "videos",
    singular: "Video",
    plural: "Videos",
    publicPath: () => `/vlogs`,
    revalidate: ["/vlogs", "/hub"],
    listColumns: [
      { name: "series", label: "Series" },
      { name: "platform", label: "Platform" },
    ],
    orderBy: { column: "published_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, group: "Basics" },
      { name: "slug", label: "Slug", type: "slug", required: true, group: "Basics" },
      { name: "video_url", label: "Video URL", type: "url", required: true, group: "Basics", help: "Paste a YouTube link, or a LinkedIn post/embed link. Nothing is uploaded." },
      { name: "platform", label: "Platform", type: "select", options: VIDEO_PLATFORMS, group: "Basics" },
      { name: "series", label: "Series", type: "select", options: VIDEO_SERIES, group: "Basics" },
      { name: "description", label: "Description", type: "textarea", rows: 4, group: "Basics" },
      { name: "duration", label: "Duration (e.g. 12:30)", type: "text", group: "Basics" },
      { name: "published_at", label: "Publish date", type: "datetime", group: "Basics" },
      { name: "thumbnail", label: "Custom thumbnail (optional)", type: "image", group: "Media", help: "YouTube thumbnails are fetched automatically." },
      ...publishing,
    ],
  },
  resources: {
    key: "resources",
    table: "resources",
    singular: "Resource",
    plural: "Resources",
    publicPath: () => `/resources`,
    revalidate: ["/", "/resources"],
    listColumns: [
      { name: "category", label: "Category" },
      { name: "format", label: "Format" },
    ],
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, group: "Basics" },
      { name: "slug", label: "Slug", type: "slug", required: true, group: "Basics" },
      { name: "description", label: "Description", type: "textarea", rows: 3, group: "Basics" },
      { name: "category", label: "Category", type: "select", options: RESOURCE_CATEGORIES, required: true, group: "Basics" },
      { name: "format", label: "Format", type: "select", options: RESOURCE_FORMATS, group: "Basics" },
      { name: "file_url", label: "File to download", type: "file", group: "File", help: "Upload a PDF, Excel, Word, PowerPoint or ZIP (max 25 MB)." },
      { name: "external_url", label: "…or external link", type: "url", group: "File", help: "Use instead of a file, e.g. a Notion or Google Drive link." },
      ...publishing,
      { name: "sort_order", label: "Sort order (lower = first)", type: "number", group: "Publishing" },
    ],
  },
};

export function getEntity(key: string): EntityConfig | null {
  return (entities as Record<string, EntityConfig>)[key] ?? null;
}

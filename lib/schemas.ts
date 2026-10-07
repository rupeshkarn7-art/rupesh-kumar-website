import { z } from "zod";
import {
  ARTICLE_CATEGORIES,
  CONTENT_TYPES,
  ENQUIRY_PURPOSES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  RESOURCE_CATEGORIES,
  RESOURCE_FORMATS,
  VIDEO_PLATFORMS,
  VIDEO_SERIES,
} from "@/content/taxonomy";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

export const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only");

/** Accepts absolute http(s) URLs or site-relative paths ("/resources/x.pdf"). Empty → null. */
export const optionalUrl = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), "Must be a URL or a /path")
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .optional();

const text = (max = 20000) => z.string().max(max).default("");
const list = z.array(z.string().trim().min(1).max(200)).max(60).default([]);

/* ------------------------------------------------------------------ */
/* Content models — mirror the Supabase tables 1:1                     */
/* ------------------------------------------------------------------ */

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(160),
  summary: text(400),
  category: z.enum(PROJECT_CATEGORIES),
  project_type: z.enum(PROJECT_TYPES).default("Professional"),
  status: z.enum(PROJECT_STATUSES).default("Completed"),
  year: z.coerce.number().int().min(2000).max(2100).nullable().optional(),
  role: text(300),
  technologies: list,
  key_features: list,
  cover_image: optionalUrl,
  screenshots: z.array(z.string().max(1000)).max(20).default([]),
  github_url: optionalUrl,
  demo_url: optionalUrl,
  demo_video_url: optionalUrl,
  overview: text(),
  problem: text(),
  objectives: text(),
  solution: text(),
  architecture: text(),
  workflow: text(),
  implementation: text(),
  impact: text(),
  challenges: text(),
  lessons: text(),
  future: text(),
  is_case_study: z.boolean().default(false),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).max(10000).default(100),
});

export const articleSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  excerpt: text(500),
  content: text(200000),
  category: z.enum(ARTICLE_CATEGORIES),
  content_type: z.enum(CONTENT_TYPES).default("Article"),
  tags: list,
  hero_image: optionalUrl,
  author: z.string().trim().max(120).default("Rupesh Kumar"),
  published_at: z.string().min(8).max(40),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export const videoSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  description: text(2000),
  platform: z.enum(VIDEO_PLATFORMS).default("youtube"),
  video_url: z.string().trim().url().max(1000),
  series: z.enum(VIDEO_SERIES).default("Technology Explained"),
  thumbnail: optionalUrl,
  duration: z.string().trim().max(20).nullable().optional(),
  published_at: z.string().min(8).max(40),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export const resourceSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  description: text(1000),
  category: z.enum(RESOURCE_CATEGORIES),
  format: z.enum(RESOURCE_FORMATS).default("PDF"),
  file_url: optionalUrl,
  external_url: optionalUrl,
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).max(10000).default(100),
});

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema> & { id?: string; updated_at?: string };
export type Article = z.output<typeof articleSchema> & { id?: string; updated_at?: string };
export type Video = z.output<typeof videoSchema> & { id?: string };
export type Resource = z.output<typeof resourceSchema> & { id?: string };

/* ------------------------------------------------------------------ */
/* Enquiry forms                                                       */
/* ------------------------------------------------------------------ */

export const enquirySchema = z.object({
  kind: z.enum(["contact", "consulting", "mentoring"]),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(200),
  company: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((v) => (v ? v : null)),
  purpose: z.enum(ENQUIRY_PURPOSES, { message: "Please choose a purpose" }),
  message: z.string().trim().min(10, "A few more words would help (10+ characters)").max(5000),
  // Optional structured extras per form (service, package, timeline, budget range…)
  details: z.record(z.string(), z.string().trim().max(300)).default({}),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

/* ------------------------------------------------------------------ */
/* Static-data models (content/*.ts)                                   */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  title: string;
  short: string;
  problem: string;
  help: string[];
  deliverables: string[];
  engagement: string[];
};

export type MentoringService = { title: string; description: string };

export type MentoringPackage = {
  name: string;
  duration: string;
  bestFor: string;
  includes: string[];
  /** Leave as null until you configure pricing. */
  price: string | null;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  highlights: string[];
  recognition?: string[];
};

export type Certification = { name: string; issuer: string; year?: string; credentialUrl?: string };

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company?: string;
  source?: "LinkedIn" | "Client" | "Colleague" | "Mentee";
};

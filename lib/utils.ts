import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  const d = new Date(iso);
  return Number.isNaN(+d) ? "" : d.toLocaleDateString("en-GB", { ...opts, timeZone: "Asia/Kolkata" });
}

export function readingTime(markdown: string) {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

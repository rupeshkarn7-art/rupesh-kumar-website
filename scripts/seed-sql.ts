/**
 * Prints SQL that loads the starter content (content/seed/*) into Supabase.
 * Usage:  node scripts/seed-sql.ts > seed.sql   then run it in the Supabase SQL editor.
 * Re-running is safe: existing rows (matched by slug) are left untouched.
 */
import { seedProjects } from "../content/seed/projects.ts";
import { seedArticles } from "../content/seed/articles.ts";
import { seedResources, seedVideos } from "../content/seed/media.ts";

const lit = (v: unknown): string => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return `array[${v.map(lit).join(",")}]::text[]`;
  return `$q$${String(v)}$q$`;
};

function insert(table: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const values = rows.map((r) => `(${cols.map((c) => {
    const v = r[c];
    return Array.isArray(v) && v.length === 0 ? "'{}'::text[]" : lit(v);
  }).join(", ")})`).join(",\n");
  return `insert into public.${table} (${cols.join(", ")}) values\n${values}\non conflict (slug) do nothing;\n`;
}

console.log([
  insert("projects", seedProjects as never),
  insert("articles", seedArticles as never),
  insert("resources", seedResources as never),
  insert("videos", seedVideos as never),
].join("\n"));

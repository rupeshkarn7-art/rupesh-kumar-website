"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity, type EntityConfig } from "@/lib/admin/entities";
import { articleSchema, projectSchema, resourceSchema, videoSchema } from "@/lib/schemas";

export type SaveState = { status: "idle" | "error"; message?: string; fieldErrors?: Record<string, string> };

const schemas = { projects: projectSchema, articles: articleSchema, videos: videoSchema, resources: resourceSchema } as const;

function toIsoIST(local: string) {
  if (!local) return new Date().toISOString();
  if (/[zZ]|[+-]\d\d:\d\d$/.test(local)) return new Date(local).toISOString();
  const d = new Date(`${local.length === 16 ? `${local}:00` : local}+05:30`);
  return Number.isNaN(+d) ? new Date().toISOString() : d.toISOString();
}

function readForm(cfg: EntityConfig, fd: FormData) {
  const out: Record<string, unknown> = {};
  for (const f of cfg.fields) {
    const raw = fd.get(f.name);
    const str = typeof raw === "string" ? raw.trim() : "";
    switch (f.type) {
      case "checkbox":
        out[f.name] = raw === "on" || raw === "true";
        break;
      case "number":
        out[f.name] = str === "" ? (f.name === "sort_order" ? 100 : null) : Number(str);
        break;
      case "list":
        out[f.name] = str
          .split(f.perLine ? /\n/ : /[\n,]/)
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      case "images":
        try {
          const arr = JSON.parse(str || "[]");
          out[f.name] = Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
        } catch {
          out[f.name] = [];
        }
        break;
      case "datetime":
        out[f.name] = toIsoIST(str);
        break;
      default:
        out[f.name] = str;
    }
  }
  return out;
}

export async function saveEntity(entityKey: string, id: string | null, _prev: SaveState, fd: FormData): Promise<SaveState> {
  const cfg = getEntity(entityKey);
  if (!cfg) return { status: "error", message: "Unknown content type." };
  const { supabase } = await requireAdmin();

  const parsed = schemas[cfg.key].safeParse(readForm(cfg, fd));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const row = parsed.data as Record<string, unknown>;
  const query = id
    ? supabase.from(cfg.table).update(row).eq("id", z.string().uuid().parse(id))
    : supabase.from(cfg.table).insert(row);
  const { error } = await query;
  if (error) {
    if (error.code === "23505") return { status: "error", message: "That slug is already used.", fieldErrors: { slug: "Already in use — choose another" } };
    console.error("[admin] save", error);
    return { status: "error", message: `Save failed: ${error.message}` };
  }

  revalidatePath("/", "layout");
  redirect(`/admin/${cfg.key}?saved=${encodeURIComponent(parsed.data.title)}`);
}

export async function deleteEntity(entityKey: string, id: string) {
  const cfg = getEntity(entityKey);
  if (!cfg) return;
  const { supabase } = await requireAdmin();
  await supabase.from(cfg.table).delete().eq("id", z.string().uuid().parse(id));
  revalidatePath("/", "layout");
  redirect(`/admin/${cfg.key}?deleted=1`);
}

export async function togglePublished(entityKey: string, id: string, published: boolean) {
  const cfg = getEntity(entityKey);
  if (!cfg) return;
  const { supabase } = await requireAdmin();
  await supabase.from(cfg.table).update({ published }).eq("id", z.string().uuid().parse(id));
  revalidatePath("/", "layout");
}

const STATUSES = ["new", "read", "replied", "archived"] as const;

export async function setEnquiryStatus(id: string, status: string) {
  const { supabase } = await requireAdmin();
  const s = z.enum(STATUSES).parse(status);
  await supabase.from("enquiries").update({ status: s }).eq("id", z.string().uuid().parse(id));
  revalidatePath("/admin", "layout");
}

export async function deleteEnquiry(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("enquiries").delete().eq("id", z.string().uuid().parse(id));
  revalidatePath("/admin", "layout");
}

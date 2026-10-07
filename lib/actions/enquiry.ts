"use server";

import { headers } from "next/headers";
import { enquirySchema } from "@/lib/schemas";
import { getPublicClient } from "@/lib/supabase/public";
import { notifyNewEnquiry } from "@/lib/notify";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  /** Echoed back on error so the form can be re-filled. */
  values?: Record<string, string>;
  attempt?: number;
};

// Best-effort, per-instance throttle (the database also enforces a per-email limit).
const hits = new Map<string, number[]>();
function throttled(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

const DETAIL_KEYS = ["service", "engagement", "timeline", "package", "stage", "preferred_time", "source_page"];

export async function submitEnquiry(prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const attempt = (prev.attempt ?? 0) + 1;
  const values: Record<string, string> = {};
  for (const k of ["name", "email", "company", "purpose", "message", ...DETAIL_KEYS]) {
    const v = formData.get(k);
    if (typeof v === "string") values[k] = v.slice(0, 5000);
  }
  const fail = (message: string, fieldErrors?: Record<string, string>): EnquiryState => ({ status: "error", message, fieldErrors, values, attempt });

  // Honeypot + minimum fill-time checks (bots). Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "").trim() !== "") return { status: "success" };
  const started = Number(formData.get("_t") ?? 0);
  if (started && Date.now() - started < 2500) return { status: "success" };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (throttled(ip)) {
    return fail("Too many messages in a short time. Please try again in a few minutes.");
  }

  const details: Record<string, string> = {};
  for (const k of DETAIL_KEYS) {
    const v = String(formData.get(k) ?? "").trim();
    if (v) details[k] = v.slice(0, 300);
  }

  const parsed = enquirySchema.safeParse({
    kind: formData.get("kind"),
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    purpose: formData.get("purpose"),
    message: formData.get("message"),
    details,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      fieldErrors[k] ??= issue.message;
    }
    return fail("Please check the highlighted fields.", fieldErrors);
  }

  const db = getPublicClient();
  if (!db) {
    return fail("The form isn't connected yet. Please email me directly instead.");
  }

  // Insert only; the public role cannot read enquiries back (row-level security).
  const { error } = await db.from("enquiries").insert(parsed.data);
  if (error) {
    console.error("[enquiry] insert failed:", error.message);
    const rate = /rate_limited/.test(error.message);
    return fail(
      rate
        ? "You've sent a few messages already — I'll be in touch soon."
        : "Something went wrong sending your message. Please try again or email me directly.",
    );
  }

  await notifyNewEnquiry(parsed.data);
  return { status: "success", message: "Thanks — your message is on its way. I'll reply within two working days." };
}

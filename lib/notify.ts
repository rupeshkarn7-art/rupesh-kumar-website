import "server-only";
import { adminEmails } from "@/lib/env";
import type { EnquiryInput } from "@/lib/schemas";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Optional email notification for new enquiries via Resend (https://resend.com).
 * Enabled only when RESEND_API_KEY is set. Enquiries are always stored in the database regardless.
 */
export async function notifyNewEnquiry(e: EnquiryInput) {
  const key = process.env.RESEND_API_KEY;
  const to = adminEmails();
  if (!key || !to.length) return;
  const from = process.env.RESEND_FROM || "Website <onboarding@resend.dev>";
  const details = Object.entries(e.details)
    .map(([k, v]) => `<tr><td style="color:#5a6472;padding:2px 12px 2px 0">${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join("");
  const html = `<div style="font-family:system-ui,sans-serif;color:#0d1b2a">
    <h2 style="margin:0 0 8px">New ${esc(e.kind)} enquiry — ${esc(e.purpose)}</h2>
    <p><b>${esc(e.name)}</b> &lt;${esc(e.email)}&gt;${e.company ? ` · ${esc(e.company)}` : ""}</p>
    ${details ? `<table style="font-size:14px;margin:8px 0">${details}</table>` : ""}
    <p style="white-space:pre-wrap;border-left:3px solid #b4532a;padding-left:12px">${esc(e.message)}</p>
    <p style="color:#5a6472;font-size:13px">Manage enquiries in your admin dashboard.</p></div>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: e.email, subject: `New enquiry: ${e.purpose} — ${e.name}`, html }),
    });
  } catch (err) {
    console.error("[notify] failed", err);
  }
}

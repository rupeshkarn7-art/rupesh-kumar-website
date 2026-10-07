"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/lib/actions/enquiry";
import { ENQUIRY_PURPOSES } from "@/content/taxonomy";
import { buttonClass } from "@/components/ui";
import { Check } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ExtraField = {
  name: string;
  label: string;
  options?: readonly string[];
  placeholder?: string;
  optional?: boolean;
};

export function EnquiryForm({
  kind,
  defaultPurpose = "General enquiry",
  purposes = ENQUIRY_PURPOSES,
  extraFields = [],
  messageLabel = "Message",
  messagePlaceholder = "A few lines about what you have in mind…",
  submitLabel = "Send message",
  sourcePage,
}: {
  kind: "contact" | "consulting" | "mentoring";
  defaultPurpose?: (typeof ENQUIRY_PURPOSES)[number];
  purposes?: readonly (typeof ENQUIRY_PURPOSES)[number][];
  extraFields?: ExtraField[];
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  sourcePage?: string;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const err = (k: string) => state.fieldErrors?.[k];
  const val = (k: string) => state.values?.[k] ?? "";

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-ok/25 bg-[#eef6f0] p-8 outline-none">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ok text-white"><Check size={20} /></span>
        <p className="mt-5 text-[20px] font-semibold text-ink">Message received</p>
        <p className="mt-2 text-[15.5px] text-ink-3">{state.message ?? "Thanks — I'll be in touch soon."}</p>
      </div>
    );
  }

  return (
    <form key={state.attempt ?? 0} ref={formRef} action={action} noValidate className="space-y-5">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="_t" value={startedAt} />
      {sourcePage && <input type="hidden" name="source_page" value={sourcePage} />}
      {/* Honeypot — hidden from people, tempting for bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={err("name")}>
          <input id="name" name="name" defaultValue={val("name")} required autoComplete="name" maxLength={120} className={cn("input", err("name") && "border-danger")} aria-invalid={!!err("name")} aria-describedby={err("name") ? "name-error" : undefined} />
        </Field>
        <Field label="Email" name="email" error={err("email")}>
          <input id="email" name="email" defaultValue={val("email")} type="email" required autoComplete="email" maxLength={200} className={cn("input", err("email") && "border-danger")} aria-invalid={!!err("email")} aria-describedby={err("email") ? "email-error" : undefined} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" optional>
          <input id="company" name="company" defaultValue={val("company")} autoComplete="organization" maxLength={160} className="input" />
        </Field>
        <Field label="Purpose" name="purpose" error={err("purpose")}>
          <select id="purpose" name="purpose" defaultValue={val("purpose") || defaultPurpose} className="input cursor-pointer">
            {purposes.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
      </div>

      {extraFields.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {extraFields.map((f) => (
            <Field key={f.name} label={f.label} name={f.name} optional={f.optional}>
              {f.options ? (
                <select id={f.name} name={f.name} defaultValue={val(f.name)} className="input cursor-pointer">
                  <option value="">Select…</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={f.name} name={f.name} defaultValue={val(f.name)} placeholder={f.placeholder} maxLength={300} className="input" />
              )}
            </Field>
          ))}
        </div>
      )}

      <Field label={messageLabel} name="message" error={err("message")}>
        <textarea
          id="message"
          name="message"
          defaultValue={val("message")}
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          placeholder={messagePlaceholder}
          className={cn("input resize-y", err("message") && "border-danger")}
          aria-invalid={!!err("message")}
          aria-describedby={err("message") ? "message-error" : undefined}
        />
      </Field>

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {state.status === "error" && state.message && (
          <p role="alert" className="rounded-lg border border-danger/25 bg-[#fbeceb] px-4 py-3 text-[14.5px] text-danger">{state.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">
          Your details are used only to reply to you. See the <a href="/privacy" className="link-underline">privacy note</a>.
        </p>
        <button type="submit" disabled={pending} className={buttonClass("primary", "lg", "shrink-0")}>
          {pending ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label} {optional && <span className="font-normal text-faint">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${name}-error`} className="mt-1.5 text-[13px] text-danger">{error}</p>}
    </div>
  );
}

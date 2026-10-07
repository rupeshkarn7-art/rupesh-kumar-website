"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import { entities, type EntityKey, type Field } from "@/lib/admin/entities";
import { deleteEntity, saveEntity, type SaveState } from "@/lib/actions/admin";
import { getBrowserClient } from "@/lib/supabase/browser";
import { Markdown } from "@/components/markdown";
import { buttonClass } from "@/components/ui";
import { cn, slugify } from "@/lib/utils";

type Row = Record<string, unknown> | null;

function toLocalIST(iso?: unknown) {
  const d = iso ? new Date(String(iso)) : new Date();
  if (Number.isNaN(+d)) return "";
  const ist = new Date(d.getTime() + 330 * 60 * 1000);
  return ist.toISOString().slice(0, 16);
}

export function EntityForm({ entity, id, initial, publicPath }: { entity: EntityKey; id: string | null; initial: Row; publicPath: string | null }) {
  const cfg = entities[entity];
  const [state, action, pending] = useActionState<SaveState, FormData>(saveEntity.bind(null, entity, id), { status: "idle" });
  const [title, setTitle] = useState(String(initial?.title ?? ""));
  const [slug, setSlug] = useState(String(initial?.slug ?? ""));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const groups = useMemo(() => Array.from(new Set(cfg.fields.map((f) => f.group ?? "Details"))), [cfg]);
  const [tab, setTab] = useState(groups[0]);
  const err = (n: string) => state.fieldErrors?.[n];
  const errorGroups = new Set(cfg.fields.filter((f) => err(f.name)).map((f) => f.group ?? "Details"));

  const defaults: Record<string, unknown> = {
    published: false,
    featured: false,
    author: "Rupesh Kumar",
    project_type: "Professional",
    status: "Completed",
    content_type: "Article",
    platform: "youtube",
    sort_order: 100,
    year: new Date().getFullYear(),
  };
  const value = (f: Field) => (initial ? initial[f.name] : defaults[f.name]);

  return (
    <form action={action} className="mt-6" noValidate>
      <div className="sticky top-0 z-20 -mx-5 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur sm:-mx-10 sm:px-10">
        <div className="flex gap-1 overflow-x-auto" role="tablist">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={tab === g}
              onClick={() => setTab(g)}
              className={cn(
                "relative shrink-0 rounded-lg px-3 py-1.5 text-[14px] transition-colors",
                tab === g ? "bg-ink text-paper" : "text-ink-3 hover:bg-surface",
              )}
            >
              {g}
              {errorGroups.has(g) && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {publicPath && <a href={publicPath} target="_blank" className={buttonClass("ghost", "sm")}>View ↗</a>}
          <button type="submit" disabled={pending} className={buttonClass("primary", "sm")}>{pending ? "Saving…" : "Save"}</button>
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mb-6 rounded-lg border border-danger/25 bg-[#fbeceb] px-4 py-3 text-[14.5px] text-danger">{state.message}</p>
      )}

      {groups.map((g) => (
        <fieldset key={g} hidden={tab !== g} className="card space-y-6 p-6 sm:p-8">
          <legend className="sr-only">{g}</legend>
          {cfg.fields
            .filter((f) => (f.group ?? "Details") === g)
            .map((f) => {
              const common = { id: f.name, name: f.name, "aria-invalid": !!err(f.name) };
              let control: React.ReactNode;
              switch (f.type) {
                case "text":
                  control =
                    f.name === "title" ? (
                      <input {...common} className="input" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                        if (!slugTouched) setSlug(slugify(e.target.value));
                      }} />
                    ) : (
                      <input {...common} className="input" defaultValue={String(value(f) ?? "")} />
                    );
                  break;
                case "slug":
                  control = (
                    <div className="flex gap-2">
                      <input {...common} className="input font-mono text-[14px]" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} />
                      <button type="button" onClick={() => { setSlug(slugify(title)); setSlugTouched(false); }} className={buttonClass("secondary", "md", "shrink-0 rounded-lg")}>From title</button>
                    </div>
                  );
                  break;
                case "textarea":
                  control = <textarea {...common} rows={f.rows ?? 4} className="input" defaultValue={String(value(f) ?? "")} />;
                  break;
                case "markdown":
                  control = <MarkdownField field={f} initial={String(value(f) ?? "")} />;
                  break;
                case "select":
                  control = (
                    <select {...common} className="input cursor-pointer" defaultValue={String(value(f) ?? f.options?.[0] ?? "")}>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  );
                  break;
                case "list": {
                  const arr = (value(f) as string[] | undefined) ?? [];
                  control = f.perLine ? (
                    <textarea {...common} rows={5} className="input" defaultValue={arr.join("\n")} />
                  ) : (
                    <input {...common} className="input" defaultValue={arr.join(", ")} />
                  );
                  break;
                }
                case "checkbox":
                  control = (
                    <label className="flex cursor-pointer items-center gap-3">
                      <input type="checkbox" name={f.name} defaultChecked={Boolean(value(f))} className="h-5 w-5 accent-[var(--color-ink)]" />
                      <span className="text-[15px] text-ink">{f.label}</span>
                    </label>
                  );
                  break;
                case "number":
                  control = <input {...common} type="number" className="input max-w-[200px]" defaultValue={value(f) == null ? "" : String(value(f))} />;
                  break;
                case "datetime":
                  control = <input {...common} type="datetime-local" className="input max-w-[280px]" defaultValue={toLocalIST(value(f))} />;
                  break;
                case "url":
                  control = <input {...common} type="url" placeholder="https://…" className="input" defaultValue={String(value(f) ?? "")} />;
                  break;
                case "image":
                case "file":
                  control = <UploadField field={f} entity={entity} initial={String(value(f) ?? "")} kind={f.type} />;
                  break;
                case "images":
                  control = <MultiImageField field={f} entity={entity} initial={(value(f) as string[] | undefined) ?? []} />;
                  break;
              }
              return (
                <div key={f.name}>
                  {f.type !== "checkbox" && (
                    <label htmlFor={f.name} className="label">
                      {f.label} {f.required && <span className="text-accent">*</span>}
                    </label>
                  )}
                  {control}
                  {f.help && <p className="mt-1.5 text-[13px] text-muted">{f.help}</p>}
                  {err(f.name) && <p className="mt-1.5 text-[13px] text-danger">{err(f.name)}</p>}
                </div>
              );
            })}
        </fieldset>
      ))}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button type="submit" disabled={pending} className={buttonClass("primary", "lg")}>{pending ? "Saving…" : `Save ${cfg.singular.toLowerCase()}`}</button>
        {id && (
          <button
            type="submit"
            formAction={async () => {
              if (confirm(`Delete this ${cfg.singular.toLowerCase()} permanently? This cannot be undone.`)) await deleteEntity(entity, id);
            }}
            formNoValidate
            className="text-[14px] text-danger hover:underline"
          >
            Delete {cfg.singular.toLowerCase()}
          </button>
        )}
      </div>
    </form>
  );
}

function MarkdownField({ field, initial }: { field: Field; initial: string }) {
  const [text, setText] = useState(initial);
  const [preview, setPreview] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-line-strong">
      <div className="flex items-center gap-1 border-b border-line bg-paper px-2 py-1.5">
        {["Write", "Preview"].map((m) => (
          <button key={m} type="button" onClick={() => setPreview(m === "Preview")} className={cn("rounded-md px-2.5 py-1 text-[13px]", (m === "Preview") === preview ? "bg-surface text-ink shadow-sm" : "text-muted")}>
            {m}
          </button>
        ))}
        <span className="ml-auto pr-1 font-mono text-[11px] text-faint">Markdown</span>
      </div>
      <textarea id={field.name} name={field.name} value={text} onChange={(e) => setText(e.target.value)} rows={field.rows ?? 8} hidden={preview} className="block w-full resize-y bg-surface px-3.5 py-3 font-mono text-[13.5px] leading-relaxed text-ink focus:outline-none" />
      {preview && <div className="max-h-[600px] overflow-auto bg-surface px-5 py-4">{text ? <Markdown className="prose-base">{text}</Markdown> : <p className="text-muted">Nothing to preview.</p>}</div>}
    </div>
  );
}

async function uploadToStorage(entity: string, file: File) {
  const supabase = getBrowserClient();
  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "bin";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const path = `${entity}/${Date.now()}-${base}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw error;
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

function UploadField({ field, entity, initial, kind }: { field: Field; entity: string; initial: string; kind: "image" | "file" }) {
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const accept = kind === "image" ? "image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml" : ".pdf,.xlsx,.xls,.docx,.doc,.pptx,.zip,.csv";
  return (
    <div className="space-y-3">
      {kind === "image" && url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="max-h-48 rounded-lg border border-line object-contain" />
      )}
      <div className="flex flex-wrap gap-2">
        <input id={field.name} name={field.name} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Upload, or paste a URL / /path" className="input flex-1 font-mono text-[13px]" />
        <input ref={inputRef} type="file" accept={accept} hidden onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > 25 * 1024 * 1024) return setError("File is larger than 25 MB.");
          setBusy(true); setError("");
          try { setUrl(await uploadToStorage(entity, f)); } catch (er) { setError((er as Error).message); }
          setBusy(false);
          e.target.value = "";
        }} />
        <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className={buttonClass("secondary", "md", "rounded-lg")}>{busy ? "Uploading…" : "Upload"}</button>
        {url && <button type="button" onClick={() => setUrl("")} className={buttonClass("ghost", "md", "rounded-lg")}>Remove</button>}
      </div>
      {error && <p className="text-[13px] text-danger">{error}</p>}
    </div>
  );
}

function MultiImageField({ field, entity, initial }: { field: Field; entity: string; initial: string[] }) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="hidden" id={field.name} name={field.name} value={JSON.stringify(urls)} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {urls.map((u, i) => (
          <div key={u} className="group relative overflow-hidden rounded-lg border border-line bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/80 px-2 py-1 text-[12px] text-paper opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" disabled={i === 0} onClick={() => setUrls((a) => { const b = [...a]; [b[i - 1], b[i]] = [b[i], b[i - 1]]; return b; })}>←</button>
              <button type="button" onClick={() => setUrls((a) => a.filter((x) => x !== u))}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-line-strong text-[13px] text-muted hover:border-ink hover:text-ink">
          {busy ? "Uploading…" : "+ Add images"}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={async (e) => {
        const files = Array.from(e.target.files ?? []);
        setBusy(true); setError("");
        try {
          for (const f of files) {
            const u = await uploadToStorage(entity, f);
            setUrls((a) => [...a, u]);
          }
        } catch (er) { setError((er as Error).message); }
        setBusy(false);
        e.target.value = "";
      }} />
      {error && <p className="mt-2 text-[13px] text-danger">{error}</p>}
    </div>
  );
}

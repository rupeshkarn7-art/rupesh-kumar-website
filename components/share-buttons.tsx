"use client";

import { useState } from "react";
import { Check, Link as LinkIcon, LinkedIn, Mail, XTwitter } from "@/components/icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "grid h-9 w-9 place-items-center rounded-full border border-line-strong text-ink-3 transition-colors hover:border-ink hover:text-ink";
  return (
    <div className="flex items-center gap-2">
      <span className="eyebrow mr-1">Share</span>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <LinkedIn size={15} />
      </a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <XTwitter size={14} />
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Mail size={15} />
      </a>
      <button
        type="button"
        className={btn}
        aria-label="Copy link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {}
        }}
      >
        {copied ? <Check size={15} /> : <LinkIcon size={15} />}
      </button>
    </div>
  );
}

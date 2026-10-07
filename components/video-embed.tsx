"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@/components/icons";

/**
 * Click-to-load video embed. The third-party iframe only loads after the visitor clicks play,
 * keeping pages fast (Core Web Vitals) and avoiding tracking until the user opts in.
 */
export function VideoEmbed({ embedUrl, thumbnail, title }: { embedUrl: string; thumbnail?: string | null; title: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink">
      {active ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
          {thumbnail && <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover opacity-90 transition-opacity group-hover:opacity-100" />}
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-xl transition-transform group-hover:scale-105">
            <Play size={22} className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}

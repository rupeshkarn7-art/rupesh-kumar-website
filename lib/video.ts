/** Turns a pasted video URL into an embeddable URL + thumbnail. No video files are hosted on the site. */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com") || u.hostname.endsWith("youtube-nocookie.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]{6,})/);
      if (m) return m[2];
    }
  } catch {}
  return null;
}

export function getEmbed(platform: string, url: string): { embedUrl: string | null; thumbnail: string | null } {
  if (platform === "youtube") {
    const id = youtubeId(url);
    return id
      ? { embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }
      : { embedUrl: null, thumbnail: null };
  }
  if (platform === "linkedin") {
    // Accepts an embed URL (…/embed/feed/update/urn:li:…) or a post URL containing a urn
    try {
      const u = new URL(url);
      if (u.hostname.endsWith("linkedin.com")) {
        if (u.pathname.startsWith("/embed/")) return { embedUrl: u.toString(), thumbnail: null };
        const urn = decodeURIComponent(u.pathname).match(/urn:li:(activity|ugcPost|share):\d+/);
        if (urn) return { embedUrl: `https://www.linkedin.com/embed/feed/update/${urn[0]}`, thumbnail: null };
      }
    } catch {}
    return { embedUrl: null, thumbnail: null };
  }
  return { embedUrl: null, thumbnail: null };
}

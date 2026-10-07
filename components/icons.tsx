import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 18, props: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowLeft = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Download = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
);
export const Check = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Play = ({ size, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);
export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const ChevronDown = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const Search = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Star = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /></svg>
);
export const Link = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
);
export const MapPin = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const FileText = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
);

/* Domain icons for expertise cards */
export const Network = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></svg>
);
export const Compass = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
);
export const Layers = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
);
export const Spark = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
);
export const Chart = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" /></svg>
);
export const People = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5 5 0 0 1 3.5 5" /></svg>
);

/* Brand marks (filled) */
export const LinkedIn = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" />
  </svg>
);
export const GitHub = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
export const YouTube = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12z" />
  </svg>
);
export const XTwitter = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.2h1.7L7.4 4.73H5.58z" />
  </svg>
);

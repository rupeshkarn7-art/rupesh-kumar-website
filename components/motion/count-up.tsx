"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a figure like "20,000+" or "30%" when it enters the viewport.
 * The final value is rendered on the server (good for SEO and no-JS); reduced-motion users see it immediately.
 */
export function CountUp({ value, duration = 1400, className }: { value: string; duration?: number; className?: string }) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : NaN;
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const [, pre, num, post] = match;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const fmt = (n: number) =>
      pre + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + post;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(fmt(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        setDisplay(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}

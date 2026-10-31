"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";

/**
 * Fades content up once when it scrolls into view. Lightweight (one shared observer per element),
 * no layout shift, and fully visible without JS or with prefers-reduced-motion.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  children,
  className,
  ...rest
}: { as?: T; delay?: number; children: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, "as" | "children">) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-visible", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ ["--reveal-delay" as string]: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

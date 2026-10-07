"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { hubNav, primaryNav } from "@/lib/site";
import { ChevronDown, Close, Menu } from "@/components/icons";
import { buttonClass } from "@/components/ui";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Rupesh Kumar — home">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-mono text-[13px] font-semibold tracking-tight text-paper transition-colors group-hover:bg-accent">
        RK
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-tight text-ink">Rupesh Kumar</span>
        <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:block">Technology · Projects · AI</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hubRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHubOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) setHubOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setHubOpen(false), setOpen(false));
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const hubActive = hubNav.some((i) => isActive(i.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-paper",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.href === "/hub" ? (
                <li key={item.href} ref={hubRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={hubOpen}
                    aria-haspopup="true"
                    onClick={() => setHubOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] transition-colors hover:text-ink",
                      hubActive ? "text-ink font-medium" : "text-ink-3",
                    )}
                  >
                    Tech Hub <ChevronDown size={14} className={cn("transition-transform", hubOpen && "rotate-180")} />
                  </button>
                  {hubOpen && (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-28px_rgba(13,27,42,0.45)] animate-rise">
                      {hubNav.map((s) => (
                        <Link key={s.href} href={s.href} className="block rounded-xl px-3.5 py-3 transition-colors hover:bg-paper">
                          <span className="block text-[14.5px] font-medium text-ink">{s.label}</span>
                          <span className="mt-0.5 block text-[13px] text-muted">{s.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[14.5px] transition-colors hover:text-ink",
                      isActive(item.href) ? "font-medium text-ink" : "text-ink-3",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={buttonClass("primary", "sm")}>
            Contact
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <div className="container-x py-6">
            <ul className="divide-y divide-line">
              {[{ label: "Home", href: "/" }, ...primaryNav.filter((i) => i.href !== "/hub")].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center justify-between py-4 text-xl text-ink display">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-2 mt-8">Tech Hub</p>
            <ul className="grid grid-cols-2 gap-2">
              {hubNav.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="block rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className={buttonClass("primary", "lg")}>Contact</Link>
              <Link href="/resume" className={buttonClass("secondary", "lg")}>Resume</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { hubNav, primaryNav, siteConfig } from "@/lib/site";
import { ArrowRight, ChevronDown, Close, Menu } from "@/components/icons";
import { buttonClass } from "@/components/ui";

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="Rupesh Kumar — home">
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-[9px] font-serif text-[17px] italic leading-none transition-colors",
          tone === "dark" ? "bg-ink text-paper group-hover:bg-accent-ink" : "bg-paper text-ink",
        )}
        style={{ fontFamily: "var(--font-serif)" }}
        aria-hidden
      >
        rk
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-paper bg-accent" />
      </span>
      <span className="leading-none">
        <span className={cn("block text-[15px] font-semibold tracking-[-0.01em]", tone === "dark" ? "text-ink" : "text-paper")}>Rupesh Kumar</span>
        <span className={cn("mt-1 hidden text-[12px] sm:block", tone === "dark" ? "text-muted" : "text-paper/55")}>
          Technology · Programmes · AI
        </span>
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) setHubOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHubOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const hubActive = hubNav.some((i) => isActive(i.href));

  // Hover intent for the Tech Hub menu on pointer devices; click/keyboard still toggles it.
  const openHub = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHubOpen(true);
  };
  const closeHubSoon = () => {
    closeTimer.current = setTimeout(() => setHubOpen(false), 140);
  };

  const navLink = (active: boolean) =>
    cn(
      "relative flex items-center gap-1 rounded-md px-3 py-2 text-[14.5px] transition-colors",
      "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[2px] after:rounded-full after:transition-colors",
      active ? "font-medium text-ink after:bg-accent" : "text-ink-3 hover:text-ink after:bg-transparent",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-line bg-paper/85 shadow-[0_8px_24px_-20px_rgba(11,23,38,0.5)] backdrop-blur-md backdrop-saturate-150"
          : "border-b border-transparent bg-paper",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) =>
              item.href === "/hub" ? (
                <li key={item.href} ref={hubRef} className="relative" onMouseEnter={openHub} onMouseLeave={closeHubSoon}>
                  <button
                    type="button"
                    aria-expanded={hubOpen}
                    aria-controls="hub-menu"
                    onClick={() => setHubOpen((v) => !v)}
                    className={navLink(hubActive)}
                  >
                    Tech Hub
                    <ChevronDown size={14} className={cn("transition-transform duration-200", hubOpen && "rotate-180")} />
                  </button>
                  <div
                    id="hub-menu"
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200",
                      hubOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="grid grid-cols-[1.15fr_1fr] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(11,23,38,0.45)]">
                      <ul className="p-2">
                        {hubNav.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              tabIndex={hubOpen ? 0 : -1}
                              className={cn(
                                "block rounded-lg px-3.5 py-3 transition-colors hover:bg-paper",
                                isActive(s.href) && "bg-paper",
                              )}
                            >
                              <span className="block text-[14.5px] font-medium text-ink">{s.label}</span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/hub/enterprise-network-vendors-2026-market-landscape"
                        tabIndex={hubOpen ? 0 : -1}
                        className="group flex flex-col justify-between bg-night p-5 text-paper"
                      >
                        <span className="text-[12px] font-medium text-[#e9a989]">Featured series · 6 parts</span>
                        <span>
                          <span className="display block text-[1.35rem] leading-[1.15]">Enterprise Network Vendors 2026</span>
                          <span className="mt-2 block text-[13px] leading-snug text-paper/60">
                            19 vendors benchmarked against Cisco — products, licensing, 5-year TCO and regional fit.
                          </span>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium">
                            Start with Part 1 <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navLink(isActive(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={cn(buttonClass("primary", "sm"), "hidden sm:inline-flex")}>
            Get in touch
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong text-ink transition-colors hover:border-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — a designed sheet, not a squashed desktop menu */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col py-6">
          <ul>
            {[{ label: "Home", href: "/" }, ...primaryNav.filter((i) => i.href !== "/hub"), { label: "Contact", href: "/contact" }].map(
              (item, i) => (
                <li key={item.href} className="border-b border-line animate-rise" style={{ animationDelay: `${i * 35}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4"
                  >
                    <span className={cn("display text-[1.7rem] leading-none", isActive(item.href) ? "text-accent-ink" : "text-ink")}>
                      {item.label}
                    </span>
                    <ArrowRight size={18} className="text-faint" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <p className="mb-3 mt-8 text-[13px] font-medium text-muted">Tech Hub</p>
          <ul className="grid grid-cols-2 gap-2">
            {hubNav.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className={cn(
                    "block rounded-lg border bg-surface px-4 py-3 text-[15px]",
                    isActive(s.href) ? "border-ink text-ink" : "border-line text-ink-2",
                  )}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link href="/contact" className={buttonClass("primary", "lg")}>Get in touch</Link>
            <a href={`mailto:${siteConfig.email}`} className="text-center text-[14px] text-muted">{siteConfig.email}</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "secondary" | "ghost" | "accent" | "light" | "outline-light";
const variants: Record<Variant, string> = {
  primary: "bg-brand-cta text-white border border-transparent shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_18px_-12px_rgba(37,99,235,0.7)] hover:brightness-[0.92]",
  accent: "bg-accent text-white border border-accent hover:bg-accent-ink",
  secondary: "bg-surface text-ink border border-line-strong hover:border-accent hover:text-accent-ink",
  ghost: "text-ink border border-transparent hover:bg-accent-soft hover:text-accent-ink",
  light: "bg-white text-ink border border-white hover:bg-accent-soft",
  "outline-light": "bg-transparent text-paper border border-line-dark hover:border-highlight hover:bg-white/5",
};
const sizes = {
  sm: "h-9 px-3.5 text-[13.5px] gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,transform,filter] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  arrow,
  ...rest
}: ComponentProps<typeof NextLink> & { variant?: Variant; size?: keyof typeof sizes; arrow?: boolean }) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  const plain = typeof href === "string" && (/^(mailto:|tel:)/.test(href) || /\.(pdf|xlsx|docx|pptx|zip|csv)$/i.test(href));
  if (external || plain) {
    const { prefetch: _p, replace: _r, scroll: _s, ...anchorRest } = rest as Record<string, unknown>;
    return (
      <a
        href={href as string}
        className={cn(buttonClass(variant, size, className), "group")}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(anchorRest as ComponentProps<"a">)}
      >
        {children}
        {arrow && <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
      </a>
    );
  }
  return (
    <NextLink
      href={href}
      className={cn(buttonClass(variant, size, className), "group")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </NextLink>
  );
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  className,
  children,
  tone = "paper",
  ...rest
}: { id?: string; className?: string; children: ReactNode; tone?: "paper" | "surface" | "ink" | "paper-2" } & ComponentProps<"section">) {
  const tones = {
    paper: "bg-paper",
    "paper-2": "bg-paper-2",
    surface: "bg-surface border-y border-line",
    ink: "bg-night text-paper",
  };
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-32", tones[tone], className)} {...rest}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  dark,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-16",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("eyebrow mb-5", dark && "eyebrow-dark")}>{eyebrow}</p>
        )}
        <h2 className={cn("display text-[2.15rem] leading-[1.06] sm:text-[2.9rem]", dark ? "text-paper" : "text-ink")}>{title}</h2>
        {intro && <p className={cn("mt-5 max-w-xl text-[17px] leading-relaxed", dark ? "text-paper/65" : "text-muted")}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  tint = "blue",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** Optional right-hand column (facts, image, CTA) on large screens */
  aside?: ReactNode;
  /** Subtle background wash: blue by default, teal for mentoring */
  tint?: "blue" | "teal";
}) {
  return (
    <header className={cn("relative overflow-hidden border-b border-line", tint === "teal" ? "bg-tint-teal" : "bg-tint-blue")}>
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" aria-hidden />
      <div className={cn("container-x relative pb-14 pt-14 sm:pb-20 sm:pt-20", aside && "grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end")}>
        <div>
          <p className="eyebrow mb-6 animate-rise">{eyebrow}</p>
          <h1 className="display max-w-4xl text-[2.55rem] leading-[1.04] text-ink animate-rise sm:text-[3.5rem] lg:text-[3.9rem]">{title}</h1>
          {intro && <p className="lede mt-6 max-w-2xl animate-rise [animation-delay:80ms]">{intro}</p>}
          {children && <div className="mt-9 animate-rise [animation-delay:140ms]">{children}</div>}
        </div>
        {aside && <div className="animate-rise [animation-delay:160ms]">{aside}</div>}
      </div>
    </header>
  );
}

export function Badge({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "accent" | "ink" | "ok"; className?: string }) {
  const tones = {
    default: "border-line bg-paper text-ink-3",
    accent: "border-accent/25 bg-accent-soft text-accent-ink",
    ink: "border-ink bg-ink text-paper",
    ok: "border-ok/20 bg-[#e6f2ea] text-ok",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[12px] font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md border border-line bg-paper px-2 py-0.5 text-[12.5px] text-ink-3">{children}</span>;
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <NextLink href={href} className={cn("group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink", className)}>
      <span className="link-underline">{children}</span>
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </NextLink>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center">
      <p className="display text-2xl text-ink">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-md text-muted">{children}</div>}
    </div>
  );
}

/** Clearly-marked placeholder for content that must be supplied/verified by the site owner. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-accent/40 bg-accent-soft/40 px-4 py-3 font-mono text-[12.5px] text-accent-ink">
      {children}
    </div>
  );
}

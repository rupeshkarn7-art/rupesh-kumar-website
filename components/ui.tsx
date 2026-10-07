import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "secondary" | "ghost" | "accent" | "light";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2 border border-ink",
  accent: "bg-accent text-white hover:bg-accent-ink border border-accent",
  secondary: "bg-surface text-ink border border-line-strong hover:border-ink",
  ghost: "text-ink hover:bg-paper-2 border border-transparent",
  light: "bg-paper text-ink border border-paper hover:bg-white",
};
const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
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
    ink: "bg-ink text-paper",
  };
  return (
    <section id={id} className={cn("py-20 sm:py-28", tones[tone], className)} {...rest}>
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
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-4 flex items-center gap-2", dark && "text-paper/60", align === "center" && "justify-center")}>
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </p>}
        <h2 className={cn("display text-[2.1rem] leading-[1.08] sm:text-[2.75rem]", dark ? "text-paper" : "text-ink")}>{title}</h2>
        {intro && <p className={cn("mt-4 text-[17px] leading-relaxed", dark ? "text-paper/70" : "text-muted")}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-paper">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
      <div className="container-x relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="eyebrow mb-5 flex items-center gap-2 animate-rise">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="display max-w-4xl text-[2.6rem] leading-[1.04] text-ink animate-rise sm:text-[3.6rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-rise [animation-delay:80ms]">{intro}</p>}
        {children && <div className="mt-8 animate-rise [animation-delay:140ms]">{children}</div>}
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
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-paper-2 px-2 py-0.5 text-[12.5px] text-ink-3">{children}</span>;
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
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center">
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

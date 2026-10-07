import { siteConfig } from "@/lib/site";
import { GitHub, LinkedIn, YouTube } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SocialLinks({ className, dark, labels }: { className?: string; dark?: boolean; labels?: boolean }) {
  const items = [
    { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedIn },
    { href: siteConfig.socials.github, label: "GitHub", Icon: GitHub },
    { href: siteConfig.socials.youtube, label: "YouTube", Icon: YouTube },
  ].filter((i) => i.href);
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={labels ? undefined : `${label} (opens in a new tab)`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border transition-colors",
              labels ? "h-9 px-3.5 text-sm" : "h-9 w-9 justify-center",
              dark
                ? "border-paper/15 text-paper/80 hover:border-paper/40 hover:text-paper"
                : "border-line-strong text-ink-3 hover:border-ink hover:text-ink",
            )}
          >
            <Icon size={16} />
            {labels && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

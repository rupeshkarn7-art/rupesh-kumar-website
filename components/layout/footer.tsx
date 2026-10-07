import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper font-mono text-[13px] font-semibold text-ink">RK</span>
              <span className="text-[15px] font-semibold">Rupesh Kumar</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper/65">
              Technology transformation, project management and AI — with a business lens. Writing, building and mentoring along the way.
            </p>
            <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-block text-[15px] text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-accent">
              {siteConfig.email}
            </a>
            <SocialLinks className="mt-6" dark />
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-[15px] text-paper/80 transition-colors hover:text-paper">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Rupesh Kumar. All rights reserved.</p>
          <p>Views are my own and do not represent any employer.</p>
        </div>
      </div>
    </footer>
  );
}

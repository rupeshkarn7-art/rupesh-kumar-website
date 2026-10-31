import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/layout/header";
import { ArrowRight } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-paper">
      <div className="container-x">
        {/* Sign-off */}
        <div className="flex flex-col gap-8 border-b border-paper/10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <p className="display max-w-2xl text-[2.1rem] leading-[1.1] text-paper sm:text-[2.8rem]">
            Technology change, delivered with <span className="italic text-[#e9a989]">business discipline.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start border-b border-paper/30 pb-1.5 text-[17px] text-paper transition-colors hover:border-[#e9a989] lg:self-auto"
          >
            Start a conversation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-paper/60">
              Technology transformation and programme management with a business lens — plus writing, building and mentoring along the way.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-block text-[15px] text-paper underline decoration-paper/30 underline-offset-[5px] transition-colors hover:decoration-[#e9a989]"
            >
              {siteConfig.email}
            </a>
            <SocialLinks className="mt-6" dark />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] font-medium text-paper/45">{col.heading}</p>
                <ul className="mt-4 space-y-3">
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
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-6 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Rupesh Kumar · {siteConfig.location}</p>
          <p>Views are my own and do not represent any employer.</p>
        </div>
      </div>
    </footer>
  );
}

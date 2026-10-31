import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ArrowRight, Mail } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

const routes = [
  { label: "Consulting", detail: "A technology or programme initiative", href: "/consulting#enquire" },
  { label: "Career mentoring", detail: "A one-to-one session", href: "/mentoring#book" },
  { label: "Anything else", detail: "Collaboration, speaking, a question", href: "/contact" },
];

export function ContactBand({
  title = "Have a technology initiative, a project, or a career question?",
  intro = "Tell me a little about it. I read every message and usually reply within two working days.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="border-t border-line bg-paper">
      <div className="container-x py-20 sm:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Let&apos;s talk</p>
            <h2 className="display text-[2.2rem] leading-[1.06] text-ink sm:text-[3rem]">{title}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{intro}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex items-center gap-2.5 text-[16px] font-medium text-ink"
            >
              <Mail size={18} className="text-accent" />
              <span className="link-underline">{siteConfig.email}</span>
            </a>
          </div>
          <ul className="border-b border-line">
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="group flex items-center justify-between gap-6 border-t border-line py-5">
                  <span>
                    <span className="block text-[18px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-ink">
                      {r.label}
                    </span>
                    <span className="mt-0.5 block text-[14.5px] text-muted">{r.detail}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong text-ink transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

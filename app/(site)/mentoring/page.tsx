import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { mentoringAudiences, mentoringPackages, mentoringServices } from "@/content/services";
import { ButtonLink, PageHero, Section, SectionHeader } from "@/components/ui";
import { Check } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = pageMetadata({
  title: "Career Mentoring — IT & Technology Careers",
  description:
    "Career mentoring for IT and technology professionals: resume review, interview preparation, career roadmaps, moving into IT project management, technology career transitions, LinkedIn and MBA guidance.",
  path: "/mentoring",
});

export default function MentoringPage() {
  return (
    <>
      <PageHero
        eyebrow="Career mentoring"
        title="Build a Better Technology Career"
        intro="Practical, honest guidance from someone who moved from engineering into project management, through an MBA and into technology leadership — and remembers what was confusing along the way."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#book" size="lg" arrow>Book a session</ButtonLink>
          <ButtonLink href="#packages" size="lg" variant="secondary">See packages</ButtonLink>
        </div>
      </PageHero>

      <Section className="!py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow mb-3">Who this is for</p>
            <h2 className="display text-[2rem] leading-tight text-ink">If you&apos;re at a career crossroads in tech</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mentoringAudiences.map((a) => (
              <li key={a} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-[15px] text-ink-2">
                <Check size={17} className="mt-0.5 shrink-0 text-accent" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Services" title="What we can work on" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentoringServices.map((s, i) => (
            <div key={s.title} className="card card-hover p-6">
              <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="packages" className="scroll-mt-16">
        <SectionHeader eyebrow="Packages" title="Choose a format" intro="Every session is one-to-one over video. Pricing is being finalised — send a request and I'll confirm details." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mentoringPackages.map((p, i) => (
            <article key={p.name} className={`card flex flex-col p-7 ${i === 1 ? "border-ink ring-1 ring-ink" : ""}`}>
              {i === 1 && <span className="mb-3 self-start rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-paper">Good place to start</span>}
              <h3 className="text-[19px] font-semibold tracking-tight text-ink">{p.name}</h3>
              <p className="mt-1 font-mono text-[12px] text-muted">{p.duration}</p>
              <p className="display mt-5 text-[1.45rem] text-ink">{p.price ?? <span className="text-[1.05rem] italic text-faint">Price to be configured</span>}</p>
              <p className="mt-3 text-[14.5px] text-muted"><span className="text-ink-2">Best for:</span> {p.bestFor}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex gap-2.5 text-[14.5px] text-ink-2"><Check size={15} className="mt-0.5 shrink-0 text-accent" /> {inc}</li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <ButtonLink href="#book" variant={i === 1 ? "primary" : "secondary"} className="w-full">
                  Book a session
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="!py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            ["1 · Request", "Pick a package and share a little about where you are and what you want."],
            ["2 · Confirm", "I'll reply to confirm fit, timing and details — usually within two working days."],
            ["3 · Session", "We meet on video. You leave with clear next steps and a short written summary."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{t}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-paper/75">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="book" className="scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2"><span className="inline-block h-px w-6 bg-accent" />Book a session</p>
            <h2 className="display text-[2.2rem] leading-[1.1] text-ink sm:text-[2.6rem]">Request a mentoring session</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-3">
              Tell me where you are in your career and what you&apos;d like to get out of the session. I&apos;ll confirm availability and next steps by email.
            </p>
            <p className="mt-8 text-[14px] text-muted">
              Questions first? <a href={`mailto:${siteConfig.email}`} className="link-underline text-ink">{siteConfig.email}</a>
            </p>
          </div>
          <div className="card p-6 sm:p-9">
            <EnquiryForm
              kind="mentoring"
              defaultPurpose="Career mentoring"
              purposes={["Career mentoring", "General enquiry"]}
              extraFields={[
                { name: "package", label: "Package", options: mentoringPackages.map((p) => p.name), optional: true },
                { name: "stage", label: "Career stage", options: ["Student / graduate", "0–3 years", "3–7 years", "7–12 years", "12+ years"], optional: true },
                { name: "preferred_time", label: "Preferred days / times (IST)", placeholder: "e.g. weekday evenings", optional: true },
              ]}
              messageLabel="What would you like help with?"
              messagePlaceholder="Your current role, the role you're aiming for, and the main question on your mind."
              submitLabel="Request session"
              sourcePage="/mentoring"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

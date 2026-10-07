import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { certifications, education, experience, journey, profile, skillGroups } from "@/content/profile";
import { Badge, ButtonLink, PageHero, Section, SectionHeader } from "@/components/ui";
import { Download, Check } from "@/components/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactBand } from "@/components/contact-band";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Rupesh Kumar's professional journey — from electrical engineering and enterprise network projects to technical project management, an MBA at IIM Lucknow, and AI-driven technology transformation.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  const recognition = experience.flatMap((e) => (e.recognition ?? []).map((r) => ({ r, company: e.company })));
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About"
        title={<>Engineer by training. Project leader by practice. <span className="italic text-accent-ink">Business-minded</span> by choice.</>}
        intro="I'm Rupesh Kumar — a technology transformation and project management professional working across enterprise infrastructure, technology operations and AI-enabled operating models."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.resumePath} download variant="primary">
            <Download size={16} /> Download resume
          </ButtonLink>
          <ButtonLink href="/resume" variant="secondary">View resume online</ButtonLink>
        </div>
      </PageHero>

      {/* Story */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="space-y-6 text-[17.5px] leading-[1.75] text-ink-2">
            <h2 className="display text-[2rem] leading-tight text-ink">My story</h2>
            {profile.longBio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="lg:pt-2">
            <div className="sticky top-24 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-line bg-[#f7f8f9]">
                <Image src={siteConfig.portraitSquare} alt="Rupesh Kumar" width={600} height={600} className="h-auto w-full" sizes="(min-width:1024px) 400px, 100vw" />
              </div>
              <dl className="card divide-y divide-line">
                {[
                  ["Current role", `${profile.currentRole}, ${profile.currentCompany}`],
                  ["Direction", profile.direction],
                  ["Experience", `${profile.yearsExperience} years · IT & Telecom`],
                  ["Education", "MBA, IIM Lucknow · B.Tech, MAIT"],
                  ["Based in", siteConfig.location],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3.5">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">{k}</dt>
                    <dd className="mt-1 text-[15px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="surface">
        <SectionHeader eyebrow="Journey" title="How the pieces came together" />
        <ol className="relative ml-2 border-l border-line-strong">
          {journey.map((j, i) => (
            <li key={j.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
              <span
                className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${i === journey.length - 1 ? "border-accent bg-accent" : "border-ink bg-surface"}`}
                aria-hidden
              />
              <div className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-8">
                <p className="font-mono text-[12.5px] text-muted sm:pt-1">{j.period}</p>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-tight text-ink">{j.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[15.5px] leading-relaxed text-muted">{j.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <SectionHeader eyebrow="Experience" title="Leadership & delivery experience" />
        <div className="space-y-6">
          {experience.map((e) => (
            <article key={e.company} className="card grid gap-6 p-7 sm:p-9 lg:grid-cols-[260px_1fr] lg:gap-12">
              <div>
                <p className="font-mono text-[12px] text-muted">{e.start} — {e.end}</p>
                <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-ink">{e.company}</h3>
                <p className="mt-1 text-[15px] text-ink-3">{e.role}</p>
                {e.recognition && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.recognition.map((r) => <Badge key={r} tone="accent">{r}</Badge>)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[16px] leading-relaxed text-ink-2">{e.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <Check size={16} className="mt-1 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Education + certifications */}
      <Section tone="paper-2">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Education" title="Education" />
            <ul className="space-y-4">
              {education.map((ed) => (
                <li key={ed.school} className="card p-6">
                  <p className="font-mono text-[12px] text-muted">{ed.period}</p>
                  <p className="mt-1.5 text-[17.5px] font-semibold tracking-tight text-ink">{ed.credential}</p>
                  <p className="text-[15px] text-ink-3">{ed.school}</p>
                  {ed.detail && <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{ed.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div id="certifications">
            <SectionHeader eyebrow="Certifications" title="Certifications" />
            <ul className="card divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="text-[16px] font-medium text-ink">{c.name}</p>
                    {c.issuer && <p className="text-[14px] text-muted">{c.issuer}</p>}
                  </div>
                  {c.credentialUrl ? (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[13px] text-ink link-underline">Verify</a>
                  ) : c.year ? (
                    <span className="font-mono text-[12px] text-faint">{c.year}</span>
                  ) : null}
                </li>
              ))}
            </ul>
            {recognition.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-4">Recognition</p>
                <ul className="space-y-2.5">
                  {recognition.map(({ r, company }) => (
                    <li key={r} className="flex items-center gap-3 text-[15.5px] text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {r} <span className="text-muted">· {company}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader eyebrow="Skills" title="Skills & technology expertise" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-paper px-2.5 py-1 text-[13.5px] text-ink-3">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <h3 className="display text-[1.8rem] leading-tight text-ink">What I&apos;m exploring now</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.interests.map((i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-[15px] text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Resume */}
      <Section tone="ink" id="resume">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow mb-3 text-paper/55">Resume</p>
            <h2 className="display text-[2.2rem] leading-tight text-paper">The full picture, on two pages.</h2>
            <p className="mt-3 max-w-xl text-paper/65">Experience, education, certifications and selected projects — in a format ready to share with your team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.resumePath} download variant="light" size="lg">
              <Download size={16} /> Download PDF
            </ButtonLink>
            <ButtonLink href="/resume" size="lg" className="border-paper/20 bg-transparent text-paper hover:bg-paper/10">View online</ButtonLink>
          </div>
        </div>
      </Section>
      <ContactBand />
    </>
  );
}

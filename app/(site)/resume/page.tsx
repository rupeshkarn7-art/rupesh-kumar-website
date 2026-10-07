import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { certifications, education, experience, profile, skillGroups } from "@/content/profile";
import { ButtonLink } from "@/components/ui";
import { Download } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Resume of Rupesh Kumar — technology transformation, IT project management and technology operations; MBA, IIM Lucknow.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="container-x max-w-[920px] py-14 sm:py-20">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">Resume</p>
        <ButtonLink href={siteConfig.resumePath} download><Download size={16} /> Download PDF</ButtonLink>
      </div>
      <article className="card p-7 sm:p-12">
        <header className="border-b border-line pb-8">
          <h1 className="display text-[2.6rem] leading-none text-ink">{profile.name}</h1>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-ink">Technology Transformation &amp; Consulting Professional</p>
          <p className="mt-4 text-[15px] text-muted">
            <a href={`mailto:${siteConfig.email}`} className="link-underline">{siteConfig.email}</a> ·{" "}
            <a href={siteConfig.socials.linkedin} className="link-underline" target="_blank" rel="noopener noreferrer">LinkedIn</a> · {siteConfig.location}
          </p>
        </header>

        <section className="border-b border-line py-8">
          <h2 className="eyebrow mb-3">Summary</h2>
          <p className="text-[15.5px] leading-relaxed text-ink-2">{profile.shortBio}</p>
        </section>

        <section className="border-b border-line py-8">
          <h2 className="eyebrow mb-5">Experience</h2>
          <div className="space-y-8">
            {experience.map((e) => (
              <div key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[17px] font-semibold text-ink">{e.role} · {e.company}</h3>
                  <span className="font-mono text-[12px] text-muted">{e.start} – {e.end}</span>
                </div>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink-2 marker:text-accent">
                  {e.highlights.map((h) => <li key={h}>{h}</li>)}
                  {e.recognition?.map((r) => <li key={r}>Recognition: {r}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-line py-8 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow mb-4">Education</h2>
            <ul className="space-y-3">
              {education.map((ed) => (
                <li key={ed.school}>
                  <p className="text-[15px] font-medium text-ink">{ed.credential}</p>
                  <p className="text-[14px] text-muted">{ed.school} · {ed.period}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Certifications</h2>
            <ul className="space-y-1.5 text-[14.5px] text-ink-2">
              {certifications.map((c) => <li key={c.name}>{c.name}</li>)}
            </ul>
          </div>
        </section>

        <section className="pt-8">
          <h2 className="eyebrow mb-4">Capabilities</h2>
          <dl className="space-y-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="grid gap-1 sm:grid-cols-[200px_1fr]">
                <dt className="text-[14px] font-medium text-ink">{g.title}</dt>
                <dd className="text-[14px] text-muted">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </div>
  );
}

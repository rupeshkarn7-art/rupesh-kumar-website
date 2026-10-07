import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { consultingProcess, consultingServices, engagementModels } from "@/content/services";
import { ButtonLink, PageHero, Section, SectionHeader } from "@/components/ui";
import { Check } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Consulting — Technology & Project Management",
  description:
    "IT project and programme management, network and SD-WAN advisory, infrastructure transformation, AIOps, technology governance, PMO setup and technology strategy consulting by Rupesh Kumar.",
  path: "/consulting",
});

export default function ConsultingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${siteConfig.name} — Technology & Project Management Consulting`,
          url: absoluteUrl("/consulting"),
          provider: { "@id": absoluteUrl("/#person") },
          areaServed: "Worldwide",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Consulting services",
            itemListElement: consultingServices.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.short },
            })),
          },
        }}
      />
      <PageHero
        eyebrow="Consulting"
        title="Technology & Project Management Solutions"
        intro="I help organisations understand, plan and execute technology initiatives — bringing hands-on delivery experience from enterprise infrastructure programmes together with a business and financial lens."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#enquire" size="lg" arrow>Discuss your project</ButtonLink>
          <ButtonLink href="#services" size="lg" variant="secondary">Explore services</ButtonLink>
        </div>
      </PageHero>

      {/* Why */}
      <Section className="!py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Delivery-first", "I've run multi-site network and infrastructure programmes, so advice is grounded in what actually happens at cutover."],
            ["Business lens", "MBA training in finance and strategy means recommendations come with cost, risk and value — not just architecture."],
            ["Vendor-neutral", "No reseller agenda. The goal is the right decision for your organisation, whichever vendor that involves."],
          ].map(([t, d]) => (
            <div key={t} className="border-t-2 border-ink pt-5">
              <p className="text-[18px] font-semibold tracking-tight text-ink">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section tone="surface" id="services">
        <SectionHeader
          eyebrow="Services"
          title="How I can help"
          intro="Each engagement is scoped to your situation. These are the areas where I can add the most value."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {consultingServices.map((s, i) => (
            <article key={s.slug} id={s.slug} className="card scroll-mt-28 p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[21px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <span className="font-mono text-[12px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-1.5 text-[15px] text-muted">{s.short}</p>

              <div className="mt-6 rounded-xl bg-paper px-4 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-ink">The problem</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{s.problem}</p>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">How I can help</p>
                  <ul className="mt-2.5 space-y-2">
                    {s.help.map((h) => (
                      <li key={h} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-accent" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Typical deliverables</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="rounded-md border border-line px-2 py-1 text-[13px] text-ink-3">{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Engagement</span>
                {s.engagement.map((e) => (
                  <span key={e} className="rounded-full bg-ink px-2.5 py-0.5 text-[12.5px] text-paper">{e}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section>
        <SectionHeader eyebrow="Engagement models" title="Ways to work together" intro="Start small with a discovery session, or bring me in for a defined piece of work." />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
          {engagementModels.map((m, i) => (
            <li key={m.name} className="bg-surface p-6">
              <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
              <p className="mt-2 text-[16.5px] font-semibold tracking-tight text-ink">{m.name}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{m.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h3 className="display text-[2rem] leading-tight text-ink">How an engagement runs</h3>
          <ol className="grid gap-6 sm:grid-cols-2">
            {consultingProcess.map((p) => (
              <li key={p.step} className="flex gap-4">
                <span className="display text-[2.2rem] leading-none text-line-strong">{p.step}</span>
                <div>
                  <p className="text-[17px] font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-[15px] text-muted">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Proof points — figures from the resume */}
      <Section tone="paper-2" className="!py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <p className="eyebrow">Experience behind the advice</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {[
              ["200+ sites", "Network modernisation programme led at BT"],
              ["20,000+ devices", "Security remediation governed across LAN/WAN/WLAN/SD-WAN"],
              ["~$240k / year", "Savings identified through Data & Voice rightsizing"],
            ].map(([k, v]) => (
              <li key={k} className="rounded-xl border border-line bg-surface p-5">
                <p className="display text-[1.7rem] leading-none text-ink">{k}</p>
                <p className="mt-2 text-[13.5px] text-muted">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquire" className="scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2"><span className="inline-block h-px w-6 bg-accent" />Discuss your project</p>
            <h2 className="display text-[2.2rem] leading-[1.1] text-ink sm:text-[2.6rem]">Tell me about your initiative</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-3">
              Share a little context — what you&apos;re trying to achieve, where things are today and any timelines. I&apos;ll reply with a few questions or a suggested next step, usually within two working days.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-ink-2">
              {["No obligation first conversation", "Confidential — details are never shared", "Independent, vendor-neutral perspective"].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><Check size={16} className="text-accent" /> {t}</li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-muted">
              Prefer email? <a href={`mailto:${siteConfig.email}`} className="link-underline text-ink">{siteConfig.email}</a>
            </p>
          </div>
          <div className="card p-6 sm:p-9">
            <EnquiryForm
              kind="consulting"
              defaultPurpose="Consulting"
              purposes={["Consulting", "Work with me", "Project collaboration", "Speaking", "General enquiry"]}
              extraFields={[
                { name: "service", label: "Area of interest", options: consultingServices.map((s) => s.title), optional: true },
                { name: "engagement", label: "Engagement type", options: engagementModels.map((m) => m.name), optional: true },
                { name: "timeline", label: "Timeline", options: ["Immediately", "Within 1 month", "1–3 months", "3+ months", "Just exploring"], optional: true },
              ]}
              messageLabel="About the project"
              messagePlaceholder="What are you trying to achieve? What's the current situation, scale (sites, users, budget) and key constraints?"
              submitLabel="Send enquiry"
              sourcePage="/consulting"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

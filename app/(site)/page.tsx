import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticles, getProjects, getResources } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { careerPath, outcomes, profile, recognition, testimonials } from "@/content/profile";
import { consultingServices, mentoringPackages } from "@/content/services";
import { ButtonLink, SectionHeader, TextLink } from "@/components/ui";
import { ArticleCard, ProjectCard, ProjectFeature, ResourceRow } from "@/components/cards";
import { NetworkMotif } from "@/components/visuals";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { ArrowRight, Check, Chart, Compass, Layers, Network, People, Spark } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

const capabilities = [
  {
    Icon: Layers,
    title: "Technology Transformation",
    plain: "Moving an organisation from the technology it has to the technology it needs — without breaking what works.",
    proof: "Network modernisation across 200+ sites",
    href: "/consulting#infrastructure-transformation",
  },
  {
    Icon: Compass,
    title: "Programme & Project Management",
    plain: "Turning a goal into a plan, a plan into weekly progress, and progress into honest reporting.",
    proof: "RAID, governance and executive dashboards at BT and HCLTech",
    href: "/consulting#technology-program-management",
  },
  {
    Icon: Network,
    title: "Enterprise Network & Infrastructure",
    plain: "The LAN, WAN, SD-WAN, Wi-Fi and data centres a business runs on — designed to be reliable and replaceable.",
    proof: "20,000+ devices under remediation governance",
    href: "/consulting#network-transformation",
  },
  {
    Icon: Chart,
    title: "Technology Operations",
    plain: "Keeping services running day to day, and aligning them with what the business actually needs.",
    proof: "Technical Account Manager, Technology Operations at Accenture",
    href: "/consulting#technology-governance",
  },
  {
    Icon: Spark,
    title: "AI & AIOps",
    plain: "Using AI to cut alert noise and speed up fixes in IT and network operations — introduced in safe, governed stages.",
    proof: "Seven-layer AIOps reference framework (MBA research)",
    href: "/consulting#ai-aiops-advisory",
  },
  {
    Icon: People,
    title: "Strategy & Financial Governance",
    plain: "Linking technology spend to outcomes: business cases, cost optimisation and renewal discipline.",
    proof: "Executive MBA, IIM Lucknow · 5-year TCO research",
    href: "/consulting#technology-strategy",
  },
];

const problems = [
  "A network or infrastructure refresh that feels too risky to start",
  "Programmes reporting “green” until the week before go-live",
  "Technology spend rising with no clear link to outcomes",
  "Vendor or SD-WAN decisions with too many unknowns",
];

const outcomesExpect = [
  "A clear plan with owners, milestones and a RAID log",
  "Honest status reporting that surfaces risk early",
  "Business cases with cost, risk and value side by side",
  "Vendor-neutral advice — no reseller agenda",
];

const mentoringTopics = [
  { title: "Career strategy", detail: "A realistic 12–24 month plan for the role you want next." },
  { title: "Resume & LinkedIn review", detail: "Make scope, impact and outcomes obvious in a 30-second scan." },
  { title: "Interview preparation", detail: "Mock interviews for PM, TPM and technology roles, with feedback." },
  { title: "Engineering → project management", detail: "The transition I made myself — what to do before you have the title." },
  { title: "Technology career development", detail: "Certifications, MBA decisions and moving into AI, cloud or leadership." },
];

export default async function HomePage() {
  const [projects, articles, resources] = await Promise.all([getProjects(), getArticles(), getResources()]);

  const bySlug = (s: string) => projects.find((p) => p.slug === s);
  const flagship = [bySlug("travel-os"), bySlug("multi-site-network-modernisation")].filter(Boolean) as typeof projects;
  const secondary = projects
    .filter((p) => !flagship.some((f) => f.slug === p.slug))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sort_order - b.sort_order)
    .slice(0, 3);

  const seriesLead = articles.find((a) => a.slug === "enterprise-network-vendors-2026-market-landscape");
  const featureArticle = seriesLead ?? articles.find((a) => a.featured) ?? articles[0];
  const recent = articles
    .filter((a) => a.slug !== featureArticle?.slug && !a.tags.includes("Enterprise Network Vendors 2026"))
    .slice(0, 4);
  const topics = Array.from(new Set(articles.map((a) => a.category))).slice(0, 8);
  const topResources = (resources.filter((r) => r.featured).length ? resources.filter((r) => r.featured) : resources).slice(0, 4);

  return (
    <>
      {/* ───────────────────────── 1 · HERO ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-tint-blue">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_35%,black,transparent_68%)]" aria-hidden />
        <div className="container-x relative grid gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div className="flex flex-col">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px] text-ink-3 animate-rise">
              <span className="font-semibold text-ink">Rupesh Kumar</span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>Technology Transformation &amp; Programme Leadership</span>
            </p>

            <h1 className="display mt-7 text-[2.55rem] leading-[1.04] text-ink animate-rise [animation-delay:60ms] sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4rem]">
              I turn complex technology programmes into outcomes{" "}
              <span className="italic text-accent-ink">the business can measure.</span>
            </h1>

            <p className="lede mt-7 max-w-[34rem] animate-rise [animation-delay:120ms]">
              Six years across IT and telecom — leading network modernisation at BT, infrastructure delivery at HCLTech, and today
              aligning technology operations with commercial priorities at Accenture. I also build products of my own, write about
              networks and AI, and mentor engineers moving into leadership.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-rise [animation-delay:180ms]">
              <ButtonLink href="/projects" size="lg" arrow>See my work</ButtonLink>
              <ButtonLink href="/consulting" size="lg" variant="secondary">Work with me</ButtonLink>
              <TextLink href="/about" className="ml-1">About me</TextLink>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-7 text-[13.5px] sm:grid-cols-[auto_auto_1fr] sm:gap-10 lg:mt-auto animate-rise [animation-delay:240ms]">
              <div>
                <dt className="text-faint">Experience</dt>
                <dd className="mt-1.5 font-medium text-ink">Accenture · BT · HCLTech</dd>
              </div>
              <div>
                <dt className="text-faint">Education</dt>
                <dd className="mt-1.5 font-medium text-ink">Executive MBA, IIM Lucknow</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-faint">Focus</dt>
                <dd className="mt-1.5 font-medium text-ink">Networks · Operations · AI</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] animate-rise [animation-delay:100ms] lg:max-w-none">
            <NetworkMotif className="pointer-events-none absolute -left-20 top-10 hidden h-[82%] opacity-60 xl:block" />
            <figure className="relative ml-auto overflow-hidden rounded-2xl border border-line bg-paper-2 lg:w-[88%]">
              <Image
                src={siteConfig.portrait}
                alt="Portrait of Rupesh Kumar"
                width={1000}
                height={1290}
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl border border-white/70 bg-white/90 p-3.5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ok/50 motion-safe:animate-ping [animation-duration:2.6s]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-snug text-ink">{profile.currentRole.replace(" — ", ", ")}</span>
                  <span className="block text-[12.5px] text-muted">{profile.currentCompany} · open to consulting &amp; mentoring</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 2 · CREDIBILITY ───────────────────────── */}
      <section className="bg-brand-hero text-paper">
        <div className="container-x py-20 sm:py-24">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-xl text-[2rem] leading-[1.1] sm:text-[2.5rem]">Programmes delivered at enterprise scale.</h2>
            <p className="max-w-sm text-[14.5px] text-paper/55">
              Figures from roles at BT and HCLTech, as listed on my resume. Client names kept confidential.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-dark bg-line-dark lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 80} className="flex flex-col bg-card-dark p-5 sm:p-7">
                <dt className="sr-only">{o.label}</dt>
                <dd className="display text-[2.2rem] leading-none text-paper sm:text-[3.1rem]">
                  <CountUp value={o.value} />
                </dd>
                <dd aria-hidden className="mt-3 text-[13.5px] leading-snug text-paper/80 sm:mt-4 sm:text-[15px]">{o.label}</dd>
                <dd className="mt-auto pt-5 text-[12.5px] text-highlight">{o.context}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <p className="text-[13px] font-medium text-paper/45">Career path</p>
              <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-5">
                {careerPath.map((c, i) => (
                  <li key={c.org}>
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${i === careerPath.length - 1 ? "bg-highlight" : "bg-paper/35"}`} aria-hidden />
                      <span className="font-mono text-[12px] text-paper/45">{c.year}</span>
                    </span>
                    <span className="mt-2 block text-[15.5px] font-medium text-paper">{c.org}</span>
                    <span className="block text-[13px] leading-snug text-paper/55">{c.role}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[13px] font-medium text-paper/45">Recognition</p>
              <ul className="mt-5 space-y-3">
                {recognition.map((r) => (
                  <li key={r.title + r.org} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-3 text-[15px]">
                    <span className="text-paper">
                      {r.title} <span className="text-paper/50">· {r.org}</span>
                    </span>
                    <span className="font-mono text-[12px] text-paper/45">{r.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 3 · WHAT I DO ───────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="What I do"
            title="Six areas where I add the most value"
            intro="Each explained in plain terms — for technical and non-technical readers alike."
            action={<TextLink href="/about">My full background</TextLink>}
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ Icon, title, plain, proof, href }, i) => (
              <Reveal key={title} delay={(i % 3) * 70} className="h-full">
                <Link href={href} className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-accent-soft/60 sm:p-8">
                  <span className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink transition-colors group-hover:border-accent group-hover:text-accent-ink">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-[12px] text-faint">0{i + 1}</span>
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{plain}</p>
                  <p className="mt-auto flex items-start gap-2 pt-6 text-[13px] leading-snug text-ink-3">
                    <Check size={14} className="mt-0.5 shrink-0 text-teal" />
                    {proof}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── 4 · FEATURED PROJECTS ───────────────────────── */}
      <section className="border-t border-line bg-paper-2/60 py-20 sm:py-28 lg:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="Selected work"
            title="Things I've built and delivered"
            intro="A product I designed and shipped, the programmes I led, and the research behind them."
            action={<ButtonLink href="/projects" variant="secondary" arrow>All projects</ButtonLink>}
          />
          <div className="space-y-6">
            {flagship.map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectFeature project={p} reverse={i % 2 === 1} priority={i === 0} />
              </Reveal>
            ))}
          </div>
          {secondary.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {secondary.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────── 5 · CONSULTING ───────────────────────── */}
      <section className="bg-night text-paper">
        <div className="container-x py-20 sm:py-28 lg:py-32">
          <SectionHeader
            dark
            eyebrow="Consulting"
            title={<>Technology &amp; programme advice, <span className="italic text-highlight">grounded in delivery.</span></>}
            intro="For IT leaders, PMOs and growing organisations planning network, infrastructure, operations or AI initiatives."
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-line-dark bg-line-dark lg:grid-cols-3">
            <Reveal className="bg-card-dark p-7 sm:p-9">
              <p className="text-[13px] font-medium text-paper/45">Problems I solve</p>
              <ul className="mt-5 space-y-4">
                {problems.map((t) => (
                  <li key={t} className="text-[15.5px] leading-snug text-paper/85">{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="bg-card-dark p-7 sm:p-9">
              <p className="text-[13px] font-medium text-paper/45">Services</p>
              <ul className="mt-4 divide-y divide-paper/10">
                {consultingServices.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/consulting#${s.slug}`} className="group flex items-center justify-between gap-4 py-2.5 text-[15.5px] text-paper">
                      {s.title}
                      <ArrowRight size={15} className="shrink-0 text-paper/30 transition-all group-hover:translate-x-0.5 group-hover:text-highlight" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160} className="bg-card-dark p-7 sm:p-9">
              <p className="text-[13px] font-medium text-paper/45">What you can expect</p>
              <ul className="mt-5 space-y-4">
                {outcomesExpect.map((t) => (
                  <li key={t} className="flex gap-3 text-[15.5px] leading-snug text-paper/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-highlight" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/consulting#enquire" variant="light" size="lg" arrow>Discuss your project</ButtonLink>
            <ButtonLink href="/consulting" variant="outline-light" size="lg">How engagements work</ButtonLink>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 6 · MENTORING ───────────────────────── */}
      <section className="bg-tint-teal py-20 sm:py-28 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">Career mentoring</p>
            <h2 className="display text-[2.15rem] leading-[1.06] text-ink sm:text-[2.9rem]">Build a better technology career</h2>
            <figure className="mt-8 rounded-xl border border-line bg-surface p-6">
              <blockquote className="display text-[1.3rem] leading-[1.35] text-ink">
                “I moved from engineering into project management, through an MBA and into technology leadership — and I remember what
                was confusing along the way. Mentoring is how I make that path clearer for others.”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src={siteConfig.portraitSquare} alt="" width={44} height={44} className="rounded-full border border-line" />
                <span className="text-[14px]">
                  <span className="block font-medium text-ink">Rupesh Kumar</span>
                  <span className="block text-muted">One-to-one sessions over video</span>
                </span>
              </figcaption>
            </figure>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/mentoring#book" size="lg" arrow>Book a session</ButtonLink>
              <ButtonLink href="/mentoring#packages" size="lg" variant="secondary">{mentoringPackages.length} session formats</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ol className="border-b border-line">
              {mentoringTopics.map((t, i) => (
                <li key={t.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6">
                  <span className="font-mono text-[12.5px] text-teal-ink">0{i + 1}</span>
                  <span>
                    <span className="block text-[17.5px] font-semibold tracking-[-0.01em] text-ink">{t.title}</span>
                    <span className="mt-1 block text-[15px] text-muted">{t.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── 7 · TECH HUB ───────────────────────── */}
      {featureArticle && (
        <section className="border-t border-line bg-surface py-20 sm:py-28 lg:py-32">
          <div className="container-x">
            <SectionHeader
              eyebrow="Tech Hub"
              title="Research, explainers and field notes"
              intro="Networking, programme delivery, AI and careers — written for practitioners and the leaders they report to."
              action={<ButtonLink href="/hub" variant="secondary" arrow>Visit the Tech Hub</ButtonLink>}
            />
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
              <Reveal className="h-full">
                <ArticleCard article={featureArticle} variant="feature" />
              </Reveal>
              <Reveal delay={100}>
                <div className="border-b border-line">
                  {recent.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
                {topics.length > 0 && (
                  <div className="mt-7">
                    <p className="text-[13px] font-medium text-muted">Browse by topic</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <Link
                          key={t}
                          href={`/hub?topic=${encodeURIComponent(t)}`}
                          className="rounded-full border border-line-strong px-3 py-1 text-[13px] text-ink-3 transition-colors hover:border-ink hover:text-ink"
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────── 8 · RESOURCES ───────────────────────── */}
      {topResources.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow mb-5">Resources</p>
              <h2 className="display text-[2.15rem] leading-[1.06] text-ink sm:text-[2.7rem]">Templates and reports I actually use</h2>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-muted">
                Free to download and adapt — from a RAID log to a 44-page vendor market analysis.
              </p>
              <TextLink href="/resources" className="mt-7">Open the resource library</TextLink>
            </Reveal>
            <Reveal delay={100} className="min-w-0 border-b border-line">
              {topResources.map((r) => (
                <ResourceRow key={r.slug} resource={r} />
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ───────────── Testimonials (shown only when real ones are added) ───────────── */}
      {testimonials.length > 0 && (
        <section className="border-t border-line py-20 sm:py-28">
          <div className="container-x">
            <SectionHeader eyebrow="Recommendations" title="What people say" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="card p-7">
                  <blockquote className="display text-[1.25rem] leading-snug text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-[14px] text-muted">
                    <span className="font-medium text-ink">{t.name}</span> · {t.title}
                    {t.company ? `, ${t.company}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────── 9 · CONTACT ───────────────────────── */}
      <ContactBand />
    </>
  );
}

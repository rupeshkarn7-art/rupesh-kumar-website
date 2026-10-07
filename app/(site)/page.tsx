import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticles, getCaseStudies, getProjects, getResources } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { outcomes, profile, testimonials } from "@/content/profile";
import { consultingServices, mentoringPackages } from "@/content/services";
import { ButtonLink, Section, SectionHeader, TextLink } from "@/components/ui";
import { ArticleCard, ProjectCard, ResourceCard } from "@/components/cards";
import { SocialLinks } from "@/components/social-links";
import { ArrowRight, Chart, Compass, Layers, Network, People, Spark } from "@/components/icons";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

const pillars = [
  { k: "Technology", v: "Networks, cloud, infrastructure and operations" },
  { k: "Projects", v: "Programme delivery and governance at scale" },
  { k: "Business", v: "MBA lens on cost, strategy and value" },
  { k: "AI", v: "AIOps and AI-enabled operating models" },
  { k: "Careers", v: "Mentoring the next technology leaders" },
];

const expertise = [
  {
    Icon: Network,
    title: "Infrastructure & Network Transformation",
    body: "Multi-site LAN/WAN/WLAN modernisation, SD-WAN and MPLS, firewall and switch replacement, data-centre migration and security remediation.",
  },
  {
    Icon: Layers,
    title: "Programme & Delivery Governance",
    body: "Planning, RAID, dependency and change governance; executive reporting that surfaces risk early; coordinating vendors and global teams.",
  },
  {
    Icon: Compass,
    title: "Technology Operations & Service",
    body: "Aligning infrastructure, Data & Voice, cloud and end-user services with business priorities; lifecycle, compliance and escalation management.",
  },
  {
    Icon: Spark,
    title: "AI & AIOps",
    body: "Practical paths to AI-enabled IT and network operations — data foundations, event correlation, automation and the operating model around them.",
  },
  {
    Icon: Chart,
    title: "Technology Strategy & Finance",
    body: "Business cases, cost optimisation and technology financial management — connecting investment to measurable outcomes.",
  },
  {
    Icon: People,
    title: "Career Mentoring",
    body: "Helping engineers and early-career professionals move into project, programme and technology leadership roles.",
  },
];

export default async function HomePage() {
  const [projects, articles, resources, caseStudies] = await Promise.all([
    getProjects(),
    getArticles(),
    getResources(),
    getCaseStudies(),
  ]);
  const featuredProjects = (projects.filter((p) => p.featured).length ? projects.filter((p) => p.featured) : projects).slice(0, 3);
  const latestArticles = articles.slice(0, 3);
  const featuredResources = (resources.filter((r) => r.featured).length ? resources.filter((r) => r.featured) : resources).slice(0, 3);

  return (
    <>
      {/* 1 — HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" aria-hidden />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-2 animate-rise">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 [animation-duration:2.4s]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to consulting & mentoring conversations
            </p>
            <h1 className="display text-display text-ink animate-rise [animation-delay:60ms]">
              Technology. Projects. AI.{" "}
              <span className="italic text-accent-ink">Career Growth.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink-3 animate-rise [animation-delay:120ms]">
              I build technology solutions, lead complex IT projects, explore AI-driven transformation, and help professionals navigate technology careers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 animate-rise [animation-delay:180ms]">
              <ButtonLink href="/projects" size="lg" arrow>Explore My Projects</ButtonLink>
              <ButtonLink href="/consulting" size="lg" variant="secondary">Work With Me</ButtonLink>
              <ButtonLink href="/mentoring" size="lg" variant="ghost">Career Mentoring</ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise [animation-delay:240ms]">
              <SocialLinks labels />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] animate-rise [animation-delay:120ms] lg:max-w-none">
            <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-[28px] border border-line-strong sm:block" aria-hidden />
            <figure className="relative overflow-hidden rounded-[28px] border border-line bg-[#f7f8f9]">
              <Image
                src={siteConfig.portrait}
                alt="Portrait of Rupesh Kumar"
                width={1000}
                height={1290}
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/60 bg-white/85 p-4 backdrop-blur-md">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">Currently</p>
                <p className="mt-1 text-[14.5px] font-medium leading-snug text-ink">
                  {profile.currentRole}
                </p>
                <p className="text-[13.5px] text-muted">{profile.currentCompany} · MBA, IIM Lucknow</p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* credential strip */}
        <div className="relative border-t border-line bg-surface/70">
          <div className="container-x flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
            <p className="eyebrow shrink-0">Experience & education</p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] font-medium text-ink-3">
              {["Accenture", "BT", "HCLTech", "IIM Lucknow", "IÉSEG, France"].map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — SNAPSHOT */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2"><span className="inline-block h-px w-6 bg-accent" />Professional snapshot</p>
            <h2 className="display text-[2.1rem] leading-[1.1] text-ink sm:text-[2.6rem]">
              Where enterprise technology, delivery and business meet.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-3">{profile.shortBio}</p>
            <TextLink href="/about" className="mt-7">More about my journey</TextLink>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {outcomes.map((o) => (
                <div key={o.label} className="bg-surface p-5 sm:p-7">
                  <dt className="sr-only">{o.label}</dt>
                  <dd>
                    <span className="display block text-[2rem] leading-none text-ink sm:text-[2.6rem]">{o.value}</span>
                    <span className="mt-3 block text-[14px] leading-snug text-muted">{o.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[11px] text-faint">Figures from professional roles at BT and HCLTech.</p>
          </div>
        </div>

        {/* The intersection */}
        <div className="mt-20">
          <p className="eyebrow mb-5">The intersection I work in</p>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
            {pillars.map((p, i) => (
              <li key={p.k} className="bg-paper p-5 transition-colors hover:bg-surface">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <p className="mt-2 text-[17px] font-semibold tracking-tight text-ink">{p.k}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-muted">{p.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 3 — EXPERTISE */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Areas of expertise"
          title="What I know — and where I can help"
          intro="Six years across enterprise infrastructure, programme delivery and technology operations, with a business education and a growing focus on AI."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map(({ Icon, title, body }) => (
            <div key={title} className="card card-hover p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper text-ink">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 — FEATURED PROJECTS */}
      <Section>
        <SectionHeader
          eyebrow="Featured work"
          title="Projects & programmes"
          intro="Selected professional programmes, research and builds. Client names are kept confidential."
          action={<ButtonLink href="/projects" variant="secondary" arrow>All projects</ButtonLink>}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* 5 — CONSULTING */}
      <Section tone="ink">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2 text-paper/55"><span className="inline-block h-px w-6 bg-accent" />Consulting</p>
            <h2 className="display text-[2.2rem] leading-[1.08] text-paper sm:text-[2.8rem]">
              Technology &amp; project management solutions
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-paper/70">
              I help organisations understand, plan and execute technology initiatives — from network and infrastructure transformation to governance, AIOps and technology strategy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/consulting#enquire" variant="light" size="lg" arrow>Discuss your project</ButtonLink>
              <ButtonLink href="/consulting" size="lg" className="border-paper/20 bg-transparent text-paper hover:bg-paper/10">
                View services
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-paper/10 border-y border-paper/10">
            {consultingServices.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/consulting#${s.slug}`} className="group flex items-start justify-between gap-6 py-5">
                  <span>
                    <span className="block text-[17px] font-medium text-paper">{s.title}</span>
                    <span className="mt-1 block text-[14.5px] text-paper/55">{s.short}</span>
                  </span>
                  <ArrowRight size={18} className="mt-1 shrink-0 text-paper/40 transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 6 — MENTORING */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2"><span className="inline-block h-px w-6 bg-accent" />Career mentoring</p>
            <h2 className="display text-[2.1rem] leading-[1.08] text-ink sm:text-[2.6rem]">Build a better technology career</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-3">
              I moved from engineering into project management, then into an MBA and technology leadership. If you're planning a similar path — or just your next role — I can help you get there with a clear plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/mentoring#book" arrow>Book a session</ButtonLink>
              <ButtonLink href="/mentoring" variant="secondary">How mentoring works</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mentoringPackages.map((p) => (
              <div key={p.name} className="card p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{p.duration}</p>
                <p className="mt-2 text-[17px] font-semibold tracking-tight text-ink">{p.name}</p>
                <p className="mt-1.5 text-[14.5px] text-muted">{p.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7 — LATEST CONTENT */}
      {latestArticles.length > 0 && (
        <Section tone="surface">
          <SectionHeader
            eyebrow="Tech Hub"
            title="Latest writing"
            intro="Explainers, guides and lessons from the field — networking, project management, AI and careers."
            action={<ButtonLink href="/hub" variant="secondary" arrow>Visit the Tech Hub</ButtonLink>}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {latestArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* 8 — CASE STUDIES */}
      {caseStudies.projects.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Case studies"
            title="How the work actually gets done"
            action={<ButtonLink href="/case-studies" variant="secondary" arrow>All case studies</ButtonLink>}
          />
          <ul className="border-t border-line">
            {caseStudies.projects.slice(0, 3).map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/projects/${p.slug}`} className="group grid gap-3 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <span>
                    <span className="block text-[21px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-ink sm:text-[24px]">{p.title}</span>
                    <span className="mt-1.5 block max-w-2xl text-[15px] text-muted">{p.summary}</span>
                  </span>
                  <span className="hidden items-center gap-2 font-mono text-[12px] text-faint sm:flex">
                    {p.category}
                    <ArrowRight size={16} className="text-ink transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 9 — RESOURCES */}
      {featuredResources.length > 0 && (
        <Section tone="paper-2">
          <SectionHeader
            eyebrow="Free resources"
            title="Templates & checklists I actually use"
            action={<ButtonLink href="/resources" variant="secondary" arrow>Resource library</ButtonLink>}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredResources.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </Section>
      )}

      {/* 10 — TESTIMONIALS (only rendered once real testimonials are added in content/profile.ts) */}
      {testimonials.length > 0 && (
        <Section>
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
        </Section>
      )}

      {/* 11 — CONTACT CTA */}
      <ContactBand />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SocialLinks } from "@/components/social-links";
import { ArrowRight, Mail, MapPin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Rupesh Kumar about consulting, career mentoring, project collaboration, speaking or a general enquiry.",
  path: "/contact",
});

const routes = [
  { title: "Consulting", text: "Technology, network or project management initiatives.", href: "/consulting#enquire" },
  { title: "Career mentoring", text: "Resume, interviews, roadmaps and career transitions.", href: "/mentoring#book" },
  { title: "Project collaboration", text: "Building something in AI, automation or the web? Let's talk.", href: "#form" },
  { title: "Speaking", text: "Talks and panels on technology transformation, AIOps and careers.", href: "#form" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation"
        intro="Whether it's a technology initiative, a collaboration, a speaking invitation or a career question — send a note and I'll get back to you."
      />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="space-y-10">
            <ul className="space-y-3">
              {routes.map((r) => (
                <li key={r.title}>
                  <Link href={r.href} className="card card-hover group flex items-center justify-between gap-4 p-5">
                    <span>
                      <span className="block text-[16.5px] font-semibold text-ink">{r.title}</span>
                      <span className="mt-0.5 block text-[14px] text-muted">{r.text}</span>
                    </span>
                    <ArrowRight size={17} className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-line pt-8">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-[16px] text-ink">
                <Mail size={18} className="text-accent" /> <span className="link-underline">{siteConfig.email}</span>
              </a>
              <p className="flex items-center gap-3 text-[16px] text-ink-3"><MapPin size={18} className="text-accent" /> {siteConfig.location} · working with teams globally</p>
              <SocialLinks labels className="pt-2" />
            </div>
          </div>
          <div id="form" className="card scroll-mt-24 p-6 sm:p-9">
            <h2 className="mb-6 text-[22px] font-semibold tracking-tight text-ink">Send a message</h2>
            <EnquiryForm kind="contact" defaultPurpose="General enquiry" sourcePage="/contact" />
          </div>
        </div>
      </Section>
    </>
  );
}

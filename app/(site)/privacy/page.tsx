import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How this website handles the information you share through its forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy note" intro="Short and plain: what's collected and why." />
      <Section>
        <div className="prose-article max-w-[720px]">
          <h2>Information you send me</h2>
          <p>When you use a contact, consulting or mentoring form, I receive the details you enter (name, email, optional company and your message). I use them only to reply to you and to follow up on your request. I don&apos;t sell or share them.</p>
          <h2>Where it&apos;s stored</h2>
          <p>Form submissions are stored securely in a managed database (Supabase) with access restricted to me. You can ask me to delete your information at any time by emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
          <h2>Analytics</h2>
          <p>If analytics are enabled, they are used to understand which pages are useful — in aggregate. Embedded videos load only after you choose to play them.</p>
          <h2>Contact</h2>
          <p>Questions about this note: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { getResources } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { ContactBand } from "@/components/contact-band";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Free project management templates, RAID logs, network change checklists, interview question banks and career resources for technology professionals.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Templates, checklists & guides"
        intro="Practical tools from real programmes — free to download and adapt. New resources are added regularly."
      />
      <Section>
        <ResourceExplorer resources={resources} />
      </Section>
      <ContactBand title="Need a template that isn't here?" intro="Let me know what would help — I'm building this library based on what people ask for." />
    </>
  );
}

import type { Metadata } from "next";
import { getResources } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { ContactBand } from "@/components/contact-band";
import { Download } from "@/components/icons";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Free project management templates, RAID logs, network change checklists, interview question banks and career resources for technology professionals.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const resources = await getResources();
  const report = resources.find((r) => r.slug === "enterprise-network-vendor-analysis-2026");
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Templates, checklists & research reports"
        intro="Practical tools from real programmes — free to download and adapt. New resources are added regularly."
        aside={
          report?.file_url ? (
            <a href={report.file_url} download="" className="group block rounded-xl bg-card-dark p-6 text-paper">
              <span className="text-[12.5px] font-medium text-highlight">Featured report · PDF</span>
              <span className="display mt-3 block text-[1.5rem] leading-[1.15]">{report.title}</span>
              <span className="mt-2 block text-[14px] leading-snug text-paper/60">{report.description}</span>
              <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium">
                <Download size={16} /> Download free
              </span>
            </a>
          ) : undefined
        }
      />
      <Section>
        <ResourceExplorer resources={resources} />
      </Section>
      <ContactBand title="Need a template that isn't here?" intro="Let me know what would help — I'm building this library based on what people ask for." />
    </>
  );
}

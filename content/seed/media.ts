import type { Resource, Video } from "@/lib/schemas";

/** Starter downloadable resources (files live in /public/resources). Manage new ones from /admin. */
export const seedResources: Resource[] = [
  {
    slug: "raid-log-template",
    title: "RAID Log Template",
    description:
      "Excel template for Risks, Assumptions, Issues and Dependencies — with probability × impact scoring, automatic RAG status, owners and dependency dates.",
    category: "Templates",
    format: "Excel",
    file_url: "/resources/raid-log-template.xlsx",
    external_url: null,
    featured: true,
    published: true,
    sort_order: 10,
  },
  {
    slug: "network-change-readiness-checklist",
    title: "Network Change Readiness Checklist",
    description:
      "A pre-cutover checklist for LAN/WAN/WLAN, firewall and data-centre changes: approvals, validation, backups, rollback and closure.",
    category: "Checklists",
    format: "PDF",
    file_url: "/resources/network-change-readiness-checklist.pdf",
    external_url: null,
    featured: true,
    published: true,
    sort_order: 20,
  },
  {
    slug: "it-project-manager-interview-questions",
    title: "IT / Technical PM Interview Question Bank",
    description:
      "Practice questions for project, programme and technical PM interviews — delivery, RAID, stakeholders, technical understanding and commercials.",
    category: "Interview Preparation",
    format: "PDF",
    file_url: "/resources/it-project-manager-interview-questions.pdf",
    external_url: null,
    featured: true,
    published: true,
    sort_order: 30,
  },
];

/**
 * No videos yet — the Vlogs page shows a tidy "coming soon" state until you add one in /admin.
 * Paste a YouTube or LinkedIn URL and it embeds automatically.
 */
export const seedVideos: Video[] = [];

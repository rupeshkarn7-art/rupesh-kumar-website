import type { Certification, Experience, Testimonial } from "@/lib/schemas";

/**
 * PROFILE DATA — edit this file to update your story, experience, education,
 * certifications and skills. Every page reads from here; no UI changes needed.
 */

export const profile = {
  name: "Rupesh Kumar",
  headline: "Technology Transformation & Project Management",
  roles: [
    "Technology & IT Project Management",
    "AI & Digital Transformation",
    "Technology Consulting",
    "Career Mentoring",
  ],
  currentRole: "Technical Account Manager — Technology Operations",
  currentCompany: "Accenture",
  direction: "Technical Architecture · Project & Technology Management",
  yearsExperience: "6+",
  shortBio:
    "I work where enterprise technology, delivery governance and business outcomes meet. Over six years I've run infrastructure and network transformation programmes, governed security remediation at scale and, more recently, aligned technology operations with commercial priorities on a large enterprise account. An MBA from IIM Lucknow gave me the business and financial lens; my research into enterprise AIOps is where I'm taking it next.",
  longBio: [
    "I started as an electrical and electronics engineer and moved quickly into enterprise IT infrastructure — the networks, data centres and operations that large organisations quietly depend on. At HCLTech I supported infrastructure delivery across the Nordics, including a wireless refresh of more than 5,000 access points and a time-service migration that touched almost every layer of the estate.",
    "At BT I stepped into the technical project manager role. I led a network modernisation programme across 200+ sites for a global logistics client, governed vulnerability remediation across 20,000+ LAN, WAN, WLAN and SD-WAN devices, and ran data-centre migrations involving Cisco and Fortinet platforms. The work taught me that most transformation risk isn't technical — it's in planning, dependencies, communication and the discipline to roll back when needed.",
    "While working full time I completed an MBA in General Management at IIM Lucknow, with an international immersion at IÉSEG School of Management in France. It sharpened how I think about business cases, cost, negotiation and strategy — and it's why I now look at every technology decision through both a delivery lens and a commercial one.",
    "Today I'm a Technical Account Manager in Technology Operations at Accenture, translating business needs into coordinated technology priorities across infrastructure, data & voice, cloud and end-user services. Alongside that, I'm building, writing and mentoring — particularly around AI-enabled operations and helping engineers grow into project and technology leadership roles.",
  ],
  interests: [
    "AI-enabled IT and network operations (AIOps)",
    "Technology strategy and operating models",
    "Programme governance that people actually use",
    "Building small tools with Python and AI",
    "Helping engineers move into leadership roles",
  ],
};

/** Career journey — shown as the About page timeline. */
export const journey = [
  {
    period: "2016 – 2020",
    title: "Engineering",
    detail: "B.Tech, Electrical & Electronics Engineering — Maharaja Agrasen Institute of Technology.",
  },
  {
    period: "2021",
    title: "IT & Telecom",
    detail: "Joined HCLTech infrastructure delivery, supporting enterprise network and platform programmes.",
  },
  {
    period: "2021 – 2022",
    title: "Infrastructure & Network Projects",
    detail: "Wireless refresh across Nordic regions (5,000+ access points); NTP migration across server, load-balancer and network estates.",
  },
  {
    period: "2022 – 2026",
    title: "Project Management",
    detail: "Technical Project Manager at BT — network modernisation across 200+ sites, security remediation across 20,000+ devices, data-centre migration.",
  },
  {
    period: "2024 – 2026",
    title: "MBA — IIM Lucknow",
    detail: "General Management, with finance, strategy and negotiation focus. International immersion at IÉSEG, France (2025).",
  },
  {
    period: "2025 – 2026",
    title: "AI & Digital Transformation",
    detail: "MBA dissertation: a seven-layer reference framework for enterprise-grade AIOps in telecom networks.",
  },
  {
    period: "2026 →",
    title: "Technology Architecture & Consulting",
    detail: "Technical Account Manager at Accenture; building a practice in technology advisory, AIOps and career mentoring.",
  },
];

export const experience: Experience[] = [
  {
    company: "Accenture",
    role: "Technical Account Manager — Technology Operations",
    start: "Jul 2026",
    end: "Present",
    summary:
      "Aligning business priorities with technology execution across infrastructure, Data & Voice, Cloud, asset and support functions for an enterprise account.",
    highlights: [
      "Translate business and operational requirements into coordinated technology priorities across multiple support towers.",
      "Govern technology readiness and mobilisation dependencies through RAG tracking, risk visibility and financial-plan updates.",
      "Evaluated Data & Voice utilisation and built a rightsizing recommendation identifying ~$20k monthly (~$240k annual) savings.",
      "Coordinate secure remote-access readiness, VPN user acceptance testing and compliance controls.",
      "Support control initiatives spanning Autopilot adoption, phishing-resistant authentication assessment and device compliance remediation.",
    ],
  },
  {
    company: "BT E-Serv (India)",
    role: "Technical Project Manager — Infrastructure",
    start: "Sep 2022",
    end: "Jun 2026",
    summary:
      "Led enterprise network transformation and remediation programmes for global clients, from business case to cutover.",
    highlights: [
      "Led a $1M+ network modernisation programme across 200+ sites for a global logistics client.",
      "Governed security vulnerability remediation across 20,000+ LAN/WAN/WLAN/SD-WAN devices while protecting service continuity.",
      "Orchestrated data-centre migration and infrastructure upgrades (Cisco switching/routing, Fortinet firewalls) with lab testing, rollback planning and UAT.",
      "Streamlined delivery to cut the end-of-life transformation timeline by 30% and cost by 25%.",
      "Produced executive dashboards on budget, risk, resourcing and progress; coordinated global vendors and engineering teams.",
    ],
    recognition: ["BT Star Employee of the Year 2024", "BT Star Performer Award 2025"],
  },
  {
    company: "HCLTech",
    role: "Technical Project Assistant — Infrastructure",
    start: "Jan 2021",
    end: "Sep 2022",
    summary: "Supported delivery of large infrastructure refresh and migration programmes across the Nordics.",
    highlights: [
      "Supported delivery of a $1.5M wireless refresh — 5,000+ access points migrated to Cisco 9100 series.",
      "Supported a $300K Network Time Protocol migration across Windows, Linux, Solaris, load balancers and network devices.",
      "Owned RAID logs, decision records and delivery reporting across technical teams, vendors and client stakeholders.",
      "Enabled onboarding of 300+ business users with no reported operational disruption.",
    ],
    recognition: ["HCL Employee of the Year 2022"],
  },
];

export const education = [
  {
    school: "Indian Institute of Management (IIM) Lucknow",
    credential: "MBA — General Management",
    period: "2024 – 2026",
    detail:
      "Corporate finance, financial analysis, product and business strategy, negotiation, strategic decision-making and business transformation.",
  },
  {
    school: "IÉSEG School of Management, France",
    credential: "International Immersion",
    period: "2025",
    detail: "AI & Entrepreneurship; Advanced Negotiation.",
  },
  {
    school: "Maharaja Agrasen Institute of Technology",
    credential: "B.Tech — Electrical & Electronics Engineering",
    period: "2016 – 2020",
    detail: "",
  },
];

/** Add issue years / credential links when you have them — they render automatically. */
export const certifications: Certification[] = [
  { name: "APM Project Management", issuer: "Association for Project Management (APM)" },
  { name: "SAFe® 5.1 Agilist", issuer: "Scaled Agile" },
  { name: "Certified Agile Scrum Master", issuer: "" },
  { name: "Scrum Fundamentals Certified", issuer: "SCRUMstudy" },
  { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft" },
  { name: "Generative AI: Overview for Project Managers", issuer: "PMI" },
  { name: "Six Sigma Yellow Belt", issuer: "" },
];

export const skillGroups = [
  {
    title: "Consulting & Strategy",
    items: ["Technology advisory", "Business–technology alignment", "Technology strategy", "Business case development"],
  },
  {
    title: "Programme & Delivery",
    items: ["Programme management", "Delivery governance", "RAID & risk management", "Executive communication", "Agile / SAFe", "Change management"],
  },
  {
    title: "Infrastructure & Networking",
    items: ["LAN / WAN / WLAN", "SD-WAN", "MPLS", "Data centre migration", "Routing & switching", "Network security", "Cisco", "Fortinet", "Meraki"],
  },
  {
    title: "Cloud, AI & Operations",
    items: ["Azure", "AWS", "Technology operations", "Data & Voice", "Generative AI", "AIOps strategy", "IT service management"],
  },
  {
    title: "Financial & Commercial",
    items: ["Technology financial management", "Cost optimisation", "Financial analysis", "Vendor coordination"],
  },
  {
    title: "Tools",
    items: ["Jira", "MS Project", "Power PPM", "Planview", "ServiceNow", "Microsoft 365", "Python", "AI assistants"],
  },
];

/** Headline outcomes — taken from your resume. Edit or remove freely. */
export const outcomes = [
  { value: "200+", label: "sites in a network modernisation programme I led" },
  { value: "20,000+", label: "network devices under remediation governance" },
  { value: "5,000+", label: "access points migrated in a wireless refresh I supported" },
  { value: "30%", label: "faster end-of-life transformation timeline after process redesign" },
];

/**
 * TESTIMONIALS — intentionally empty. The section stays hidden until you add real,
 * permission-granted quotes (e.g. LinkedIn recommendations). Example:
 * { quote: "…", name: "Full Name", title: "Role", company: "Company", source: "LinkedIn" }
 */
export const testimonials: Testimonial[] = [];

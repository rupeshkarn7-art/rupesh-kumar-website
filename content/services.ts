import type { MentoringPackage, MentoringService, Service } from "@/lib/schemas";

/**
 * CONSULTING SERVICES — add, remove or reorder entries here.
 * Each renders as a card on /consulting and is selectable in the enquiry form.
 */
export const consultingServices: Service[] = [
  {
    slug: "it-project-management",
    title: "IT Project Management",
    short: "Structured delivery for infrastructure and technology projects that can't afford to slip.",
    problem:
      "Technology projects stall on unclear scope, hidden dependencies and status reports that say 'green' until the week before go-live.",
    help: [
      "Set up scope, plan, RAID log and governance cadence from day one",
      "Run delivery with honest RAG reporting and early escalation",
      "Coordinate vendors, engineering teams and business stakeholders",
    ],
    deliverables: ["Project charter & scope", "Integrated plan & milestones", "RAID log", "Status & steering packs", "Cutover / go-live plan"],
    engagement: ["Project-based Consulting", "Implementation Support"],
  },
  {
    slug: "technology-program-management",
    title: "Technology Programme Management",
    short: "Coordinating multiple workstreams toward one business outcome.",
    problem:
      "Several related projects run in parallel with no shared view of dependencies, budget or risk — and leadership can't see the whole picture.",
    help: [
      "Design programme structure, workstreams and decision rights",
      "Build a single dependency, risk and budget view",
      "Create executive dashboards that support real decisions",
    ],
    deliverables: ["Programme blueprint", "Dependency map", "Benefits & budget tracker", "Executive dashboard"],
    engagement: ["Advisory", "Project-based Consulting", "Ongoing Advisory"],
  },
  {
    slug: "network-transformation",
    title: "Network Transformation",
    short: "Planning multi-site LAN/WAN/WLAN modernisation without disrupting the business.",
    problem:
      "Ageing, end-of-life network estates carry security and reliability risk, but a multi-site refresh feels too disruptive to start.",
    help: [
      "Assess the current estate and lifecycle exposure",
      "Shape a phased roadmap with site waves and rollback strategy",
      "Define lab testing, UAT and cutover governance",
    ],
    deliverables: ["Current-state assessment", "Transformation roadmap", "Wave plan", "Test & rollback strategy"],
    engagement: ["Discovery Session", "Advisory", "Implementation Support"],
  },
  {
    slug: "sd-wan-advisory",
    title: "SD-WAN Advisory",
    short: "Clear-eyed guidance on whether, when and how to move from MPLS to SD-WAN.",
    problem:
      "SD-WAN promises cost and agility gains, but vendor choice, underlay design, security and migration sequencing are easy to get wrong.",
    help: [
      "Frame requirements and the business case (cost, resilience, performance)",
      "Compare architecture and migration options objectively",
      "Plan a pilot and phased rollout with measurable success criteria",
    ],
    deliverables: ["Requirements & business case", "Options analysis", "Pilot plan", "Migration sequencing"],
    engagement: ["Discovery Session", "Advisory"],
  },
  {
    slug: "infrastructure-transformation",
    title: "Infrastructure Transformation",
    short: "Data-centre migrations, platform refreshes and lifecycle programmes.",
    problem:
      "Data-centre moves and platform refreshes involve hundreds of interdependent changes where a single missed dependency causes an outage.",
    help: [
      "Build migration runbooks, dependency maps and change windows",
      "Plan rollback, validation and hypercare",
      "Govern vendors and internal teams through cutover",
    ],
    deliverables: ["Migration strategy", "Runbooks", "Change & cutover calendar", "Hypercare plan"],
    engagement: ["Project-based Consulting", "Implementation Support"],
  },
  {
    slug: "ai-aiops-advisory",
    title: "AI & AIOps Advisory",
    short: "Practical first steps toward AI-enabled IT and network operations.",
    problem:
      "Operations teams are drowning in alerts and tickets; AIOps looks promising, but it's unclear where to start or what data is needed.",
    help: [
      "Assess operational maturity, data sources and observability gaps",
      "Prioritise use cases (noise reduction, correlation, prediction)",
      "Define a phased AIOps roadmap and operating model",
    ],
    deliverables: ["Maturity assessment", "Use-case backlog", "Reference architecture", "Phased roadmap"],
    engagement: ["Discovery Session", "Advisory"],
  },
  {
    slug: "technology-governance",
    title: "Technology Governance",
    short: "Lightweight governance that improves decisions instead of slowing them down.",
    problem:
      "Governance is either missing — so risks surface late — or so heavy that teams work around it.",
    help: [
      "Design decision forums, RACI and escalation paths",
      "Standardise status, risk and change reporting",
      "Introduce controls proportionate to risk",
    ],
    deliverables: ["Governance framework", "RACI", "Reporting templates", "Control checklist"],
    engagement: ["Advisory", "Ongoing Advisory"],
  },
  {
    slug: "pmo-delivery-governance",
    title: "PMO & Delivery Governance",
    short: "Setting up or resetting a PMO around delivery outcomes.",
    problem:
      "Project portfolios grow without consistent methods, tooling or visibility, and leadership lacks a reliable view of delivery health.",
    help: [
      "Define PMO scope, methods and minimum standards",
      "Set up portfolio reporting (Jira, MS Project, Planview or Power PPM)",
      "Coach project leads on governance and reporting",
    ],
    deliverables: ["PMO charter", "Method & templates", "Portfolio dashboard", "Coaching plan"],
    engagement: ["Project-based Consulting", "Ongoing Advisory"],
  },
  {
    slug: "technology-strategy",
    title: "Technology Strategy",
    short: "Connecting technology investment to business priorities and cost.",
    problem:
      "Technology spend keeps growing, but it's hard to link investments to outcomes or decide what to stop.",
    help: [
      "Map technology capabilities to business priorities",
      "Build business cases with cost, risk and value",
      "Identify rationalisation and cost-optimisation opportunities",
    ],
    deliverables: ["Capability map", "Business cases", "Cost-optimisation opportunities", "Roadmap"],
    engagement: ["Discovery Session", "Advisory"],
  },
  {
    slug: "process-optimization",
    title: "Process Optimisation",
    short: "Removing friction from delivery and operations processes.",
    problem:
      "Hand-offs, approvals and manual steps add weeks to delivery and frustrate both teams and customers.",
    help: [
      "Map the current process and measure where time is lost",
      "Redesign hand-offs, templates and approvals",
      "Identify automation candidates (including Python and AI tools)",
    ],
    deliverables: ["Process map", "Improvement plan", "Automation shortlist", "Before/after metrics"],
    engagement: ["Discovery Session", "Project-based Consulting"],
  },
];

export const engagementModels = [
  {
    name: "Discovery Session",
    description: "A focused working session to understand the problem, constraints and options. Ends with clear next steps.",
  },
  {
    name: "Advisory",
    description: "Independent input on a specific decision — architecture options, vendor choice, roadmap or business case.",
  },
  {
    name: "Project-based Consulting",
    description: "A defined scope with agreed deliverables and timeline, such as a roadmap, PMO setup or migration plan.",
  },
  {
    name: "Implementation Support",
    description: "Hands-on delivery governance alongside your team through planning, execution and cutover.",
  },
  {
    name: "Ongoing Advisory",
    description: "A regular cadence of reviews and guidance for leaders running technology programmes.",
  },
];

export const consultingProcess = [
  { step: "01", title: "Understand", detail: "Short call to understand the context, goals and constraints." },
  { step: "02", title: "Frame", detail: "Agree the problem, scope, success measures and engagement model." },
  { step: "03", title: "Deliver", detail: "Work in short cycles with visible progress and early risk flags." },
  { step: "04", title: "Hand over", detail: "Leave your team with documentation, templates and a clear path forward." },
];

/** CAREER MENTORING */
export const mentoringServices: MentoringService[] = [
  { title: "Resume Review", description: "Rework your resume so achievements, scope and impact are obvious within a 30-second scan." },
  { title: "Interview Preparation", description: "Mock interviews for project, programme and technology roles with structured feedback." },
  { title: "Career Roadmap", description: "A realistic 12–24 month plan: target roles, skills, certifications and the experience to build." },
  { title: "IT Project Management Career", description: "How to move from engineering or operations into project and programme management." },
  { title: "Technology Career Transition", description: "Changing domains — e.g. networking to cloud, operations to AI — without starting over." },
  { title: "LinkedIn & Personal Branding", description: "Position yourself clearly for the roles you want, with a profile that reflects your real work." },
  { title: "MBA Career Guidance", description: "Whether an MBA (including executive formats) fits your goals, and how to use it once you have it." },
  { title: "Technical Interview Preparation", description: "Networking, infrastructure and delivery-scenario questions, with model answers and practice." },
];

/** Leave price as null to show "Price to be configured". Set e.g. "₹1,500" when ready. */
export const mentoringPackages: MentoringPackage[] = [
  {
    name: "30-Minute Consultation",
    duration: "30 min · video call",
    bestFor: "A specific question or a quick second opinion",
    includes: ["Focused discussion on one topic", "Practical next steps", "Short follow-up notes"],
    price: null,
  },
  {
    name: "60-Minute Career Strategy",
    duration: "60 min · video call",
    bestFor: "Planning your next move or a career transition",
    includes: ["Current-state review", "Target roles & gaps", "12-month action plan", "Resource recommendations"],
    price: null,
  },
  {
    name: "Resume & LinkedIn Review",
    duration: "Async review + 30 min call",
    bestFor: "Applying for new roles in the next few months",
    includes: ["Line-by-line resume feedback", "LinkedIn headline & About rewrite suggestions", "Walkthrough call"],
    price: null,
  },
  {
    name: "Interview Preparation Package",
    duration: "2 × 60 min sessions",
    bestFor: "An upcoming interview for a PM, TPM or technology role",
    includes: ["Role-specific question bank", "Mock interview with feedback", "Story & STAR-answer coaching", "Final readiness session"],
    price: null,
  },
];

export const mentoringAudiences = [
  "Network and infrastructure engineers moving into project management",
  "Early-career IT and telecom professionals planning their next step",
  "Project managers moving toward programme, architecture or consulting roles",
  "Working professionals considering an MBA or executive programme",
];

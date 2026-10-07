import type { Article } from "@/lib/schemas";

/**
 * Starter articles — written as drafts in your voice. Review and edit them in /admin
 * before promoting the site. Loaded into the database by scripts/seed.ts.
 */
export const seedArticles: Article[] = [
  {
    slug: "sd-wan-vs-mpls-decision-framework",
    title: "SD-WAN vs MPLS: A Practical Decision Framework",
    excerpt:
      "SD-WAN isn't automatically cheaper or better than MPLS. Here's the set of questions I use to frame the decision before anyone talks to a vendor.",
    category: "SD-WAN",
    content_type: "Guide",
    tags: ["SD-WAN", "MPLS", "Network Transformation", "WAN"],
    hero_image: null,
    author: "Rupesh Kumar",
    published_at: "2026-09-08T09:00:00+05:30",
    featured: true,
    published: true,
    content: `Most SD-WAN conversations start with the technology. The better ones start with the business: what the network has to do, where it hurts today and what a change is worth.

After several network transformation programmes, these are the questions I now ask before any architecture or vendor discussion.

## 1. What problem are we actually solving?

"Move to SD-WAN" is a solution, not a problem. The common real drivers are:

- **Cost** — MPLS circuits are expensive, especially for small sites
- **Agility** — new sites take months to connect
- **Cloud performance** — traffic to SaaS and public cloud is backhauled through a data centre
- **Resilience** — single-circuit sites go down with every carrier fault
- **Lifecycle** — routers are end-of-life and need replacing anyway

Each driver leads to a different design and a different business case. If the honest answer is "lifecycle", the decision is really about what you replace the routers *with* — and SD-WAN may simply be the sensible default.

## 2. What does the traffic look like?

Pull a few weeks of flow data before deciding anything. You want to know:

| Question | Why it matters |
|---|---|
| How much traffic goes to SaaS / cloud? | Drives local internet breakout design |
| Which applications are latency-sensitive? | Voice, video and some OT traffic need strict SLAs |
| What's the east–west traffic between sites? | Affects topology (hub-and-spoke vs mesh) |
| What's peak vs average utilisation? | Avoids over- or under-sizing underlay circuits |

## 3. Keep, replace or blend the underlay?

SD-WAN is an overlay. The underlay can be MPLS, broadband, dedicated internet, 4G/5G — or a mix. Three common patterns:

1. **Hybrid** — keep MPLS at critical sites, add broadband everywhere
2. **Internet-first** — dual internet circuits, MPLS retired over time
3. **Tiered** — site design depends on criticality (e.g. Gold / Silver / Bronze)

Tiered designs are usually the most realistic for large estates. They also make the business case easier to defend, because savings come from the long tail of smaller sites.

## 4. Who owns security?

Local internet breakout changes your security model. Decide early whether security is enforced on-box, in a cloud security service, or both — and who operates it. This is where many SD-WAN projects get stuck in approvals.

## 5. How will you migrate?

The migration plan matters as much as the target design:

- Pilot at a few representative sites (not just the easy ones)
- Define success criteria before the pilot starts
- Group the rest into waves by region, site type or circuit renewal date
- Agree rollback criteria for every cutover

## A simple scoring approach

When I need to compare options for leadership, I use a weighted score rather than a feature list:

\`\`\`text
Criterion            Weight   Option A   Option B
---------------------------------------------------
Total cost (5 yrs)     30%       4          3
Resilience             25%       3          5
Cloud performance      20%       5          4
Operational effort     15%       3          4
Migration risk         10%       4          3
---------------------------------------------------
Weighted score                  3.85       3.90
\`\`\`

The numbers matter less than the conversation they create. Agreeing the weights is often where the real decision gets made.

## The takeaway

SD-WAN is a good answer to many enterprise WAN problems — but only once you're clear which problem you're solving. Start with drivers and data, design the underlay by site tier, settle security ownership early and invest in the migration plan.

*Have a WAN decision in front of you? I'm happy to talk it through — [get in touch](/contact).*`,
  },
  {
    slug: "what-aiops-actually-changes-in-operations",
    title: "What AIOps Actually Changes in IT and Network Operations",
    excerpt:
      "AIOps is often sold as a tool. In practice it's an operating-model change. Lessons from my MBA research on enterprise-grade AIOps for telecom networks.",
    category: "AIOps",
    content_type: "Article",
    tags: ["AIOps", "AI", "Network Operations", "ITSM", "Observability"],
    hero_image: null,
    author: "Rupesh Kumar",
    published_at: "2026-08-20T09:00:00+05:30",
    featured: true,
    published: true,
    content: `For my MBA dissertation at IIM Lucknow I designed a reference framework for enterprise-grade AIOps in telecom networks. The most useful conclusion wasn't about algorithms. It was that **AIOps changes how operations work — and organisations that treat it as a tool purchase usually stall.**

## The problem AIOps is meant to solve

A large network can generate thousands of events an hour. Most are noise, many are duplicates, and the few that matter are buried. Engineers spend their time triaging rather than fixing, and root-cause analysis depends on whoever happens to know the topology best.

AIOps applies analytics and machine learning to that data to do three things:

1. **Reduce noise** — deduplicate and suppress events that don't need a human
2. **Correlate** — group related events into one incident with a probable cause
3. **Predict and act** — spot patterns before they become outages, and trigger approved automations

## Seven layers, not one product

The framework I proposed has seven layers:

\`\`\`text
┌──────────────────────────────────────────┐
│ 7. Executive intelligence                │  service health, risk, value
├──────────────────────────────────────────┤
│ 6. Security & compliance                 │  access, audit, model governance
├──────────────────────────────────────────┤
│ 5. ITSM integration                      │  incidents, problems, changes
├──────────────────────────────────────────┤
│ 4. Automation                            │  runbooks, closed loop + approvals
├──────────────────────────────────────────┤
│ 3. AI engine                             │  anomaly, correlation, prediction
├──────────────────────────────────────────┤
│ 2. Observability                         │  normalise, enrich, topology
├──────────────────────────────────────────┤
│ 1. Data ingestion                        │  metrics, logs, events, tickets
└──────────────────────────────────────────┘
\`\`\`

The layers matter because most failures happen at the bottom. If topology data is out of date, or events from different platforms can't be normalised, the AI engine has nothing reliable to work with.

## A tiny example of where value starts

Before any machine learning, simple correlation already removes a surprising amount of noise. A toy version in Python:

\`\`\`python
from collections import defaultdict
from datetime import timedelta

def group_events(events, window=timedelta(minutes=5)):
    """Group events from the same site within a time window into one candidate incident."""
    incidents = defaultdict(list)
    for e in sorted(events, key=lambda e: e["time"]):
        key = e["site"]
        bucket = incidents[key]
        if bucket and e["time"] - bucket[-1][-1]["time"] <= window:
            bucket[-1].append(e)
        else:
            bucket.append([e])
    return [group for groups in incidents.values() for group in groups]
\`\`\`

Real platforms use topology, service maps and learned patterns rather than a fixed window — but the principle is the same: **fewer, better incidents.**

## What actually changes

- **Roles shift** from triage to engineering. Teams spend more time improving runbooks and data quality.
- **Process changes** — incident, problem and change management need to accept machine-generated insights and automated actions, with clear approval rules.
- **Trust is earned in stages.** Start with recommendations, then supervised automation, then closed-loop automation for well-understood, low-risk scenarios.
- **Governance expands** to cover models: who approves them, how they're monitored, how decisions are audited.

## Where to start

If you're considering AIOps, start with three questions:

1. Can we trust our event, topology and CMDB data today?
2. Which two or three high-volume, well-understood problems would we automate first?
3. Who will own the operating-model change — not just the tool?

AIOps is one of the most practical applications of AI in the enterprise. But the order matters: data foundations, then correlation, then prediction, then autonomy.

*Note: this article summarises an academic framework; no commercial deployment is claimed.*`,
  },
  {
    slug: "raid-log-most-underused-project-tool",
    title: "The RAID Log: The Most Underused Tool in Infrastructure Projects",
    excerpt:
      "Every project has a RAID log. Few use it well. A practical guide to Risks, Assumptions, Issues and Dependencies — with a free template.",
    category: "Project Management",
    content_type: "Tutorial",
    tags: ["Project Management", "RAID", "Governance", "Templates"],
    hero_image: null,
    author: "Rupesh Kumar",
    published_at: "2026-07-15T09:00:00+05:30",
    featured: false,
    published: true,
    content: `On large infrastructure programmes, the RAID log is where projects quietly succeed or fail. Teams create one at kickoff, fill it with generic entries, and then stop looking at it. When it's used properly, it's the single best early-warning system a project manager has.

## What RAID stands for

- **Risks** — things that *might* happen and would affect the project
- **Assumptions** — things we're treating as true without proof
- **Issues** — things that *have* happened and need action
- **Dependencies** — things we need from others (or others need from us)

## Writing risks that are useful

A weak risk: *"Vendor delays."*

A useful risk: *"If the hardware vendor misses the 15 March delivery date, wave 2 cutovers (40 sites) slip by at least three weeks, because change windows are booked four weeks in advance."*

The second version has a **cause**, an **event** and a **consequence**. It tells everyone why it matters and points directly at mitigations — confirm dates in writing, identify alternative stock, pre-book backup change windows.

## Scoring that people actually use

Keep scoring simple: probability × impact on a 1–5 scale, with clear definitions for each number. The goal isn't precision — it's consistent conversations about what to worry about first.

## Assumptions are risks in disguise

Every assumption should have an owner and a date by which it will be validated. "Site access will be available out of hours" is fine on day one. On day sixty, an unvalidated assumption is just a risk nobody has scored.

## Dependencies are where infrastructure projects break

In network and data-centre work, most delays come from outside the project team: circuit delivery, firewall rule approvals, application owners for testing, facilities access. Track each dependency with:

- who provides it
- who needs it
- the date it's needed
- the date it's committed

The gap between "needed" and "committed" is where you'll find next month's issues.

## Making it a habit

1. Review the RAID log in every weekly project meeting — top risks and overdue items only
2. Escalate anything above an agreed score to the steering group automatically
3. Close items explicitly; a RAID log that only grows is a RAID log nobody trusts

## Free template

I've shared the RAID log template I use — with scoring, owners and an escalation view — in the [Resources](/resources) section.`,
  },
  {
    slug: "network-engineer-to-technical-project-manager",
    title: "From Network Engineer to Technical Project Manager: A Career Roadmap",
    excerpt:
      "The move from engineering to project management is one of the most common — and least explained — transitions in IT. A practical roadmap.",
    category: "Career",
    content_type: "Guide",
    tags: ["Career", "Project Management", "Career Transition", "IT Careers"],
    hero_image: null,
    author: "Rupesh Kumar",
    published_at: "2026-06-25T09:00:00+05:30",
    featured: false,
    published: true,
    content: `Many of the best technical project managers I've worked with started as engineers. They understand what a change window really involves, why a "simple" firewall rule takes two weeks, and when an engineer's estimate is optimistic. That background is an advantage — if you make the transition deliberately.

## What changes when you move into project management

| As an engineer | As a technical PM |
|---|---|
| You solve the problem | You make sure the problem gets solved — on time, in scope, with the right people |
| Success = working configuration | Success = business outcome delivered with managed risk |
| Depth in one area | Breadth across teams, vendors and stakeholders |
| Your work is visible in the network | Your work is visible in decisions, plans and communication |

## Step 1 — Start doing the work before you have the title

- Volunteer to own the RAID log or the cutover plan on your next change
- Write the weekly status update for your workstream
- Run a lessons-learned session after a major change

These are low-risk ways to build evidence.

## Step 2 — Learn the language

Pick one recognised framework and learn it properly. Options include APM, PMI-based certifications, PRINCE2, and Agile/Scrum or SAFe for organisations that use them. A certification won't make you a project manager, but it gives you shared vocabulary and signals intent.

## Step 3 — Get comfortable with numbers

Project managers are trusted when they understand cost. Learn to read a budget, track forecast against actuals and explain variance. This is also where business education — formal or self-taught — pays off.

## Step 4 — Rewrite your story

Your resume should show **scope, coordination and outcomes**, not just technologies:

- ❌ "Configured Cisco switches for data-centre migration"
- ✅ "Coordinated cutover of 40 network devices across three change windows with zero unplanned downtime"

Only use numbers you can stand behind in an interview.

## Step 5 — Target the right first role

Technical project coordinator, project analyst or technical project assistant roles are realistic stepping stones. Infrastructure-heavy organisations — telecom providers, managed service providers, large enterprises — value engineers who can manage delivery.

## A 12-month plan

1. **Months 1–3:** take on PM-style tasks in your current role; start a certification
2. **Months 4–6:** complete the certification; document 3–4 delivery stories
3. **Months 7–9:** update your resume and LinkedIn; talk to PMs in your organisation
4. **Months 10–12:** apply internally first, then externally

*If you'd like help building your own roadmap, take a look at [career mentoring](/mentoring).*`,
  },
];

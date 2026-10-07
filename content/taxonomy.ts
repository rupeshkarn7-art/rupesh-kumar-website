/**
 * Controlled vocabularies used by filters, the admin forms and validation.
 * Add a value here and it immediately appears everywhere (filters, admin dropdowns).
 */
export const PROJECT_CATEGORIES = [
  "AI & Automation",
  "Networking & Telecom",
  "Web Applications",
  "Mobile Applications",
  "Data & Analytics",
  "Project Management",
  "Cloud",
  "MBA / Business",
  "Personal Experiments",
] as const;

export const PROJECT_TYPES = ["Professional", "Academic", "Personal", "Open Source"] as const;
export const PROJECT_STATUSES = ["Completed", "In Progress", "Ongoing", "Concept"] as const;

export const ARTICLE_CATEGORIES = [
  "Networking",
  "SD-WAN",
  "Cloud",
  "AI",
  "AIOps",
  "Python",
  "Project Management",
  "Agile",
  "Technology Architecture",
  "Career",
  "Interview Preparation",
  "MBA / Management",
] as const;

export const CONTENT_TYPES = ["Article", "Tutorial", "Case Study", "Cheat Sheet", "Guide"] as const;

export const VIDEO_SERIES = [
  "Technology Tutorials",
  "Project Build Logs",
  "Career Talks",
  "Technology Explained",
  "Behind the Project",
] as const;

export const VIDEO_PLATFORMS = ["youtube", "linkedin", "other"] as const;

export const RESOURCE_CATEGORIES = [
  "Project Management",
  "Networking",
  "AI",
  "Career",
  "Interview Preparation",
  "Templates",
  "Checklists",
  "Architecture",
  "Productivity",
] as const;

export const RESOURCE_FORMATS = ["PDF", "Excel", "Word", "PowerPoint", "Notion", "Link", "ZIP"] as const;

export const ENQUIRY_PURPOSES = [
  "Work with me",
  "Consulting",
  "Career mentoring",
  "Project collaboration",
  "Speaking",
  "General enquiry",
] as const;

import type { BlankKind } from "./blanks";

type IndustryKind = "role" | "clientRole" | "audience" | "domain" | "deliverable" | "process" | "project" | "product" | "title";

export interface Industry {
  id: string;
  name: string;
  /** Short line sent to the AI so the writing fits the field. */
  context: string;
  suggestions: Record<IndustryKind, string[]>;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "freelance",
    name: "Freelance / Consulting",
    context: "an independent consultant or freelancer selling expertise to business clients",
    suggestions: {
      role: ["brand strategist", "independent marketing consultant", "fractional operations lead"],
      clientRole: ["founder", "head of marketing", "COO"],
      audience: ["small business owners hiring their first consultant", "marketing leads at growing startups"],
      domain: ["brand positioning", "go-to-market strategy", "operations consulting"],
      deliverable: ["brand strategy deck", "90-day marketing plan", "process audit report"],
      process: ["scoping a consulting engagement", "running a positioning workshop"],
      project: ["Q3 brand refresh", "website messaging overhaul"],
      product: ["positioning sprint", "monthly advisory retainer"],
      title: ["Why Your Positioning Fails Before Anyone Reads It", "The Retainer Trap Most Consultants Fall Into"],
    },
  },
  {
    id: "saas",
    name: "SaaS / Tech",
    context: "a software or technology company selling a SaaS product",
    suggestions: {
      role: ["head of product", "solutions engineer", "customer success lead"],
      clientRole: ["VP of engineering", "CTO", "IT director"],
      audience: ["engineering managers evaluating new tools", "non-technical founders choosing a stack"],
      domain: ["B2B SaaS growth", "developer tooling", "cloud infrastructure"],
      deliverable: ["integration spec", "onboarding playbook", "product roadmap"],
      process: ["setting up single sign-on", "migrating from a legacy system"],
      project: ["platform migration", "API integration rollout"],
      product: ["analytics dashboard", "workflow automation platform"],
      title: ["Your Onboarding Isn’t Too Long — It’s Out of Order", "Stop Measuring Activation the Wrong Way"],
    },
  },
  {
    id: "real-estate",
    name: "Real Estate",
    context: "a residential or commercial real estate business",
    suggestions: {
      role: ["listing agent", "real estate broker", "property manager"],
      clientRole: ["homeowner", "property investor", "commercial tenant"],
      audience: ["first-time home buyers", "landlords with one to five rentals"],
      domain: ["residential sales", "commercial leasing", "property management"],
      deliverable: ["comparative market analysis", "listing presentation", "lease renewal summary"],
      process: ["preparing a home for listing", "screening rental applicants"],
      project: ["Maple Street listing", "office lease renewal"],
      product: ["full-service listing package", "property management plan"],
      title: ["Pricing Low Doesn’t Start a Bidding War", "What Your Inspection Report Is Really Telling You"],
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    context: "a healthcare practice or health services organization (avoid medical claims or diagnoses)",
    suggestions: {
      role: ["practice manager", "physical therapist", "clinic director"],
      clientRole: ["practice owner", "hospital administrator", "patient"],
      audience: ["patients managing a chronic condition", "independent clinic owners"],
      domain: ["outpatient care", "physical therapy", "practice operations"],
      deliverable: ["patient intake workflow", "care plan summary", "staff training guide"],
      process: ["preparing for a first appointment", "reducing appointment no-shows"],
      project: ["patient portal rollout", "front-desk workflow redesign"],
      product: ["telehealth consultation", "wellness program"],
      title: ["Why Patients Skip Their Home Exercises", "The Front Desk Is Your Real Patient Experience"],
    },
  },
  {
    id: "legal",
    name: "Legal",
    context: "a law firm or legal services provider (no specific legal advice)",
    suggestions: {
      role: ["employment attorney", "paralegal", "managing partner"],
      clientRole: ["general counsel", "small business owner", "HR director"],
      audience: ["founders signing their first commercial lease", "HR managers handling terminations"],
      domain: ["employment law", "contract law", "estate planning"],
      deliverable: ["contract review memo", "employee handbook update", "engagement letter"],
      process: ["reviewing a vendor contract", "preparing for a deposition"],
      project: ["handbook compliance review", "trademark filing"],
      product: ["flat-fee contract review", "estate planning package"],
      title: ["The Contract Clause Founders Never Read", "Your Handbook Is a Liability, Not a Shield"],
    },
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    context: "an accounting, bookkeeping or financial advisory business",
    suggestions: {
      role: ["CPA", "fractional CFO", "financial advisor"],
      clientRole: ["business owner", "finance director", "CEO"],
      audience: ["small business owners doing their own books", "pre-retirees planning withdrawals"],
      domain: ["small business accounting", "tax planning", "financial planning"],
      deliverable: ["monthly financial report", "cash flow forecast", "tax planning summary"],
      process: ["closing the books each month", "preparing for a tax audit"],
      project: ["year-end close", "budget planning cycle"],
      product: ["monthly bookkeeping service", "quarterly tax planning"],
      title: ["Profit Isn’t Cash, and It’s Costing You", "The Spreadsheet That Replaces Your Budget"],
    },
  },
  {
    id: "agency",
    name: "Marketing Agency",
    context: "a marketing, creative or advertising agency",
    suggestions: {
      role: ["creative director", "account manager", "paid media strategist"],
      clientRole: ["CMO", "brand manager", "marketing director"],
      audience: ["in-house marketing teams of one", "DTC founders scaling past $1M"],
      domain: ["performance marketing", "content strategy", "brand design"],
      deliverable: ["campaign creative", "content calendar", "media plan"],
      process: ["briefing a creative team", "auditing a paid search account"],
      project: ["spring campaign launch", "website redesign"],
      product: ["paid social management", "brand identity package"],
      title: ["Your Brand Guidelines Are Too Long", "More Content Won’t Fix Your Funnel"],
    },
  },
  {
    id: "ecommerce",
    name: "E-commerce / Retail",
    context: "an online store or retail brand",
    suggestions: {
      role: ["e-commerce manager", "store owner", "merchandising lead"],
      clientRole: ["wholesale buyer", "retail partner", "repeat customer"],
      audience: ["shoppers comparing options before buying", "new store owners on Shopify"],
      domain: ["direct-to-consumer retail", "online merchandising", "fulfillment"],
      deliverable: ["product launch plan", "wholesale line sheet", "holiday promotion calendar"],
      process: ["setting up a returns policy", "photographing products for listings"],
      project: ["holiday collection launch", "store replatform"],
      product: ["subscription box", "limited-edition collection"],
      title: ["Free Shipping Isn’t Why They Left", "Your Product Page Is Answering the Wrong Questions"],
    },
  },
  {
    id: "construction",
    name: "Construction & Trades",
    context: "a construction, contracting or skilled trades business",
    suggestions: {
      role: ["general contractor", "project manager", "estimator"],
      clientRole: ["homeowner", "property developer", "facilities manager"],
      audience: ["homeowners planning a first renovation", "developers vetting contractors"],
      domain: ["residential remodeling", "commercial construction", "HVAC"],
      deliverable: ["project estimate", "change order", "site progress report"],
      process: ["getting a building permit", "preparing a home for renovation"],
      project: ["kitchen remodel", "warehouse fit-out"],
      product: ["full kitchen remodel", "annual maintenance contract"],
      title: ["The Lowest Bid Is the Most Expensive One", "Why Renovations Run Over (and How to Stop It)"],
    },
  },
  {
    id: "education",
    name: "Education & Coaching",
    context: "an education, training or coaching business",
    suggestions: {
      role: ["executive coach", "instructional designer", "course creator"],
      clientRole: ["L&D manager", "school principal", "coaching client"],
      audience: ["new managers in their first year", "teachers adopting new tools"],
      domain: ["leadership development", "corporate training", "online learning"],
      deliverable: ["course outline", "workshop curriculum", "coaching program plan"],
      process: ["running a feedback conversation", "designing a training module"],
      project: ["manager training program", "online course launch"],
      product: ["six-week leadership cohort", "1:1 coaching package"],
      title: ["Training Doesn’t Fail — Follow-Up Does", "Why Your Best Engineer Is a Struggling Manager"],
    },
  },
  {
    id: "hospitality",
    name: "Hospitality & Food",
    context: "a restaurant, hotel, catering or events business",
    suggestions: {
      role: ["restaurant owner", "events manager", "hotel general manager"],
      clientRole: ["event planner", "corporate booker", "wedding couple"],
      audience: ["corporate teams planning offsites", "couples booking a wedding venue"],
      domain: ["restaurant operations", "event catering", "boutique hospitality"],
      deliverable: ["event proposal", "catering menu", "venue booking agreement"],
      process: ["planning a private dining event", "training new front-of-house staff"],
      project: ["corporate holiday party", "seasonal menu launch"],
      product: ["private dining package", "full-service catering"],
      title: ["Reviews Aren’t About the Food", "The Hidden Cost of an Empty Tuesday"],
    },
  },
  {
    id: "nonprofit",
    name: "Nonprofit",
    context: "a nonprofit or mission-driven organization",
    suggestions: {
      role: ["development director", "program manager", "executive director"],
      clientRole: ["major donor", "foundation program officer", "board member"],
      audience: ["first-time donors", "volunteers considering a bigger role"],
      domain: ["fundraising", "community programs", "grant writing"],
      deliverable: ["grant proposal", "impact report", "donor update"],
      process: ["onboarding new volunteers", "preparing a grant application"],
      project: ["annual fundraising campaign", "community outreach program"],
      product: ["monthly giving program", "corporate sponsorship package"],
      title: ["Donors Don’t Want Your Overhead Ratio", "Your Impact Report Is Too Polite"],
    },
  },
];

const GENERIC: Partial<Record<BlankKind, string[]>> = {
  years: ["5", "10", "15"],
  wordCount: ["600", "900", "1,200"],
  wordLimit: ["25", "40", "60"],
  timeframe: ["one week", "30 days", "this quarter"],
  date: ["this Friday", "end of next week", "the 15th"],
  goal: ["a 20-minute call", "a meeting next week", "a review of the attached document"],
  meetingType: ["meeting", "call", "video call"],
};

/** Suggestions for specific labels that don't map to a kind. */
const BY_LABEL: Record<string, string[]> = {
  platform: ["LinkedIn", "Instagram", "Google Search"],
  "meeting length": ["30-minute", "45-minute", "60-minute"],
  "number of items": ["5", "7", "10"],
  "call to action": ["Book a call", "Start free trial", "Get the guide"],
};

export function suggestionsFor(industry: Industry | undefined, kind: BlankKind, label: string): string[] {
  const byLabel = BY_LABEL[label.toLowerCase()];
  if (byLabel) return byLabel;
  if (kind === "industry") return industry ? [industry.name.split(" / ")[0] ?? industry.name] : [];
  if (kind === "jobTitle") return industry?.suggestions.role ?? [];
  if (industry && kind in industry.suggestions) return industry.suggestions[kind as IndustryKind];
  return GENERIC[kind] ?? [];
}

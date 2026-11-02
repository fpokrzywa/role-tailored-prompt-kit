export type CategoryId =
  | "blog"
  | "email"
  | "client"
  | "social"
  | "sales"
  | "ops"
  | "support";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { id: "blog", name: "Blog & Articles", blurb: "Long-form content that sounds like someone in particular wrote it." },
  { id: "email", name: "Email & Proposals", blurb: "Outreach, pitches and proposals that get to the point." },
  { id: "client", name: "Client Communication", blurb: "The week-over-week messages that keep projects moving." },
  { id: "social", name: "Social & Marketing", blurb: "Posts, pages and announcements without the buzzwords." },
  { id: "sales", name: "Sales", blurb: "Prep, objections and one-pagers for the deal in front of you." },
  { id: "ops", name: "Operations & Internal", blurb: "Agendas, updates, postings and processes for your team." },
  { id: "support", name: "Customer Support", blurb: "Replies that fix the problem and keep the customer." },
];

export interface Template {
  id: string;
  category: CategoryId;
  title: string;
  whyItWorks: string;
  body: string;
  original?: boolean;
}

export const TEMPLATES: Template[] = [
  // ——— Originals ———
  {
    id: "thought-leadership",
    category: "blog",
    original: true,
    title: "Thought Leadership Article",
    whyItWorks:
      "The role and audience lines calibrate vocabulary before any content appears. The exclusions at the end prevent the safe, everything-qualified close.",
    body: "You are a [role title] with [X] years of experience in [domain]. Your reader is a [target audience description] who has encountered the generic takes on this topic. Write a [word count]-word article titled ‘[title]’. Open by naming the specific misconception your reader is most likely holding. Build toward a recommendation they can act on within [timeframe]. Use plain subheads. No summary paragraph at the end. No hedged language in the recommendations.",
  },
  {
    id: "how-to",
    category: "blog",
    original: true,
    title: "How-To Article",
    whyItWorks:
      "“No introduction that restates the title” alone saves a full revision pass — it closes off the default opener before the output is generated.",
    body: "You are a [role] explaining [process] to [specific audience]. Write a [word count]-word how-to article. Structure: one sentence stating the problem the reader is solving, numbered steps each under [word limit] words, one common mistake to avoid at the end. No introduction that restates the title. No transition sentences between steps.",
  },
  {
    id: "cold-outreach",
    category: "email",
    original: true,
    title: "Cold Outreach Email",
    whyItWorks:
      "The “specific observation” line is load-bearing. It routes around the compliment or self-introduction that signals you haven’t looked at the prospect’s situation.",
    body: "Write a cold outreach email from [your role] to [prospect role] at a [industry] company. Goal: [specific action — meeting, call, review of attached document]. Length: under 150 words. Open with a specific observation about their business, not a compliment or a statement about mine. Close with one clear ask. No paragraph about my background.",
  },
  {
    id: "proposal",
    category: "email",
    original: true,
    title: "Project Proposal",
    whyItWorks: "A fixed four-paragraph structure and a hard word cap keep the proposal about the client, not your company history.",
    body: "Write a project proposal for [client name/type] for [deliverable]. Structure: one paragraph on what we’re solving and why it matters to them, one paragraph on approach, one paragraph on deliverables and timeline, one paragraph on investment. Total length: under 400 words. Confident and direct tone. No buzzwords. No section about my company history.",
  },
  {
    id: "follow-up",
    category: "email",
    original: true,
    title: "Meeting Follow-Up",
    whyItWorks: "Three agreed points, one dated next step, and no pleasantries opener — the follow-up does its job in under 100 words.",
    body: "Write a follow-up email after a [meeting/call] with [prospect/client role]. Recap the three key points we agreed on, state one specific next step with a proposed date, and make the ask clear if a decision is pending. Under 100 words. No opener like ‘It was great speaking with you.’",
  },
  {
    id: "status-update",
    category: "client",
    original: true,
    title: "Client Status Update",
    whyItWorks: "Done / in progress / next, with any client decision flagged in bold at the top so it can’t be missed.",
    body: "Write a client status update for [project name]. Audience: [client role]. Three sections — what’s done, what’s in progress, what’s next. Each section: two to three bullet points in plain language. No jargon. If a decision is needed from the client, flag it in bold at the top. Under 200 words.",
  },
  {
    id: "scope-change",
    category: "client",
    original: true,
    title: "Scope Change Notice",
    whyItWorks: "One-sentence change, two-sentence impact, two options and a dated decision request — with no apologetic tone.",
    body: "Write a professional email notifying a client of a scope change on [project]. Describe the change in one sentence. Explain how it affects timeline or cost in two sentences. Propose two options for handling it. Close with a specific request for their decision by [date]. No apologetic tone. Under 250 words.",
  },
  {
    id: "handoff",
    category: "client",
    original: true,
    title: "Deliverable Handoff",
    whyItWorks: "Tells the client exactly what to look for and how revisions work, so feedback comes back focused.",
    body: "Write a short email handing off [deliverable] to [client role]. Include: what’s attached, one sentence on what they should look for when reviewing, the revision process and timeline, and one clear next step. Under 150 words.",
  },

  // ——— Blog & Articles ———
  {
    id: "case-study",
    category: "blog",
    title: "Case Study",
    whyItWorks: "Leading with the measurable result and banning vague praise keeps the case study credible.",
    body: "You are a [role] writing a case study about work done for a [client type]. The reader is a [target audience] deciding whether to hire someone like you. Write a [word count]-word case study. Structure: the result in one opening sentence with a number, the situation before, the approach in three short steps, the result in detail, one quote-ready line from the client’s perspective. No adjectives like ‘amazing’ or ‘seamless’. No closing call to action paragraph.",
  },
  {
    id: "listicle",
    category: "blog",
    title: "Practical Listicle",
    whyItWorks: "Each item must carry a specific example, which stops the list from collapsing into generic tips.",
    body: "You are a [role] writing for [target audience]. Write a [word count]-word list article titled ‘[title]’. Include [number of items] items. Each item: a bold one-line headline, then two to three sentences with one concrete example from [domain]. Order items from most to least impactful. No introduction longer than two sentences. No conclusion section.",
  },
  {
    id: "contrarian",
    category: "blog",
    title: "Contrarian Take",
    whyItWorks: "Stating the popular belief fairly before dismantling it makes the argument persuasive rather than provocative.",
    body: "You are a [role] with [X] years in [domain]. Write a [word count]-word opinion piece arguing against this common belief: ‘[popular belief]’. Your reader is a [target audience] who currently agrees with it. Open by stating the belief in its strongest form. Give three reasons it fails in practice, each grounded in a specific scenario. End with what to do instead. No straw-man framing. No phrases like ‘in today’s fast-paced world’.",
  },
  {
    id: "comparison",
    category: "blog",
    title: "Option Comparison",
    whyItWorks: "Forcing a verdict for each reader type prevents the useless ‘it depends’ ending.",
    body: "You are a [role] comparing [option A] and [option B] for [target audience]. Write a [word count]-word comparison article. Structure: one sentence on the decision the reader faces, a short section on each option’s real strengths and real drawbacks, a plain-language table of key differences, then a clear verdict for two different reader situations. No ‘it depends’ without saying on what. No marketing language.",
  },

  // ——— Email & Proposals ———
  {
    id: "referral-intro",
    category: "email",
    title: "Warm Referral Intro",
    whyItWorks: "Naming the mutual contact and the reason for the connection in the first line earns the read.",
    body: "Write an email from [your role] to [prospect role] who was referred by [mutual contact]. First sentence: who referred me and why they thought we should talk. Second paragraph: one specific way I could help with [their likely problem]. Close with a low-pressure ask for a 15-minute call. Under 120 words. No flattery about their company. No list of my services.",
  },
  {
    id: "re-engagement",
    category: "email",
    title: "Re-engagement Email",
    whyItWorks: "Bringing something new to the table gives the contact a reason to reply that isn’t guilt.",
    body: "Write a re-engagement email to a [prospect role] I last spoke with about [previous topic] [time since last contact] ago. Open with one new, relevant development — [new reason to talk]. Make one clear, easy-to-answer ask. Under 100 words. No ‘just checking in’ or ‘circling back’. No guilt-trip about the silence.",
  },
  {
    id: "quote-email",
    category: "email",
    title: "Pricing / Quote Email",
    whyItWorks: "Anchoring the price to the outcome and giving a dated next step keeps the quote from stalling.",
    body: "Write an email sending a quote to [client role] for [product/service]. Structure: one sentence restating the outcome they want, the price of [price] with what’s included in three bullets, one sentence on what’s not included, and how to proceed with a date of [deadline]. Under 180 words. Confident tone. No apologizing for the price. No discount offered unprompted.",
  },
  {
    id: "partnership-pitch",
    category: "email",
    title: "Partnership Pitch",
    whyItWorks: "Leading with their audience’s benefit instead of yours makes partnerships feel mutual.",
    body: "Write a partnership pitch email from [your role] to [prospect role] at [partner company type]. Open with a specific overlap between our audiences. Propose one concrete collaboration: [partnership idea]. State what each side gets in one sentence each. Ask for a short call. Under 150 words. No vague ‘synergy’ language. No long company introduction.",
  },

  // ——— Client Communication ———
  {
    id: "kickoff",
    category: "client",
    title: "Project Kickoff Email",
    whyItWorks: "Setting expectations on communication and decisions in week one prevents most mid-project friction.",
    body: "Write a project kickoff email to [client role] for [project name]. Include: the goal in one sentence, the first three milestones with dates, how and when we’ll communicate, what I need from them by [date], and who makes final decisions. Use short headed sections. Under 250 words. No excitement filler like ‘We’re thrilled to get started’.",
  },
  {
    id: "invoice-reminder",
    category: "client",
    title: "Overdue Invoice Reminder",
    whyItWorks: "Firm, factual and easy to act on — it gets paid without damaging the relationship.",
    body: "Write a polite but firm reminder to [client role] about invoice [invoice number] for [project] that was due on [due date]. State the amount of [amount] and the original due date in the first two sentences. Make paying easy: one line on how to pay. Ask them to confirm a payment date by [date]. Under 100 words. No apologetic language. No threats.",
  },
  {
    id: "wrap-up",
    category: "client",
    title: "Project Wrap-Up & Testimonial Ask",
    whyItWorks: "Pairing a concrete results recap with a tiny, specific testimonial ask raises response rates.",
    body: "Write a project wrap-up email to [client role] for [project name]. Recap the outcome in two sentences with one specific result. Note anything they should do to maintain results. Ask for a short testimonial by giving them two questions they can answer in one line each. Under 180 words. No generic ‘it was a pleasure’ opener.",
  },
  {
    id: "delay-notice",
    category: "client",
    title: "Bad News / Delay Notice",
    whyItWorks: "Leading with the news and the new date respects the reader; the recovery plan rebuilds trust.",
    body: "Write an email telling [client role] that [deliverable] will be delayed from [original date] to [new date]. First sentence: the delay and the new date. Then one sentence on the cause, without blaming anyone. Then what I’m doing to prevent further slippage, in two bullets. Close with whether any action is needed from them. Under 150 words. No over-apologizing. No vague ‘unforeseen circumstances’.",
  },

  // ——— Social & Marketing ———
  {
    id: "linkedin-post",
    category: "social",
    title: "LinkedIn Post",
    whyItWorks: "A specific first line and one takeaway beat the broetry format every time.",
    body: "You are a [role] writing a LinkedIn post for [target audience]. Topic: [topic]. Open with one specific, concrete line — a number, a moment, or a mistake. Share one lesson in short paragraphs of one to two sentences. End with a question that invites a real answer. Under [word count] words. No hashtags in the body. No ‘I’m humbled’ or ‘Agree?’.",
  },
  {
    id: "newsletter",
    category: "social",
    title: "Newsletter Issue",
    whyItWorks: "One idea per issue with a single link keeps the newsletter readable and clickable.",
    body: "You are a [role] writing a newsletter for [target audience]. Write one issue about [topic] in [word count] words. Structure: a subject line under 50 characters, one opening line that names the reader’s problem, one main idea with a practical example, one recommended action, and a single link prompt for [call to action]. No ‘Hope you’re well’. No roundup of unrelated items.",
  },
  {
    id: "landing-page",
    category: "social",
    title: "Landing Page Copy",
    whyItWorks: "Writing outcomes for a named customer forces clarity that feature lists never reach.",
    body: "Write landing page copy for [product/service] aimed at [target audience]. Sections: a headline under 10 words stating the outcome, a subheadline under 25 words, three benefit blocks each with a 4-word title and one sentence, one objection with its answer, and a call to action that says ‘[call to action]’. No buzzwords like ‘revolutionary’ or ‘seamless’. No feature lists without the benefit.",
  },
  {
    id: "announcement",
    category: "social",
    title: "Product or Service Announcement",
    whyItWorks: "Starting with who it’s for and what changes for them keeps launches from reading like press releases.",
    body: "Write an announcement for [product/service] launching on [date] for [target audience]. First sentence: who it’s for and what changes for them. Then three short bullets on what’s included. Then pricing or availability: [price or availability]. Close with one clear next step. Under 200 words. No ‘we’re excited to announce’. No exclamation marks.",
  },
  {
    id: "ad-copy",
    category: "social",
    title: "Ad Copy Variations",
    whyItWorks: "Asking for distinct angles instead of rewordings gives you real options to test.",
    body: "Write five ad copy variations for [product/service] targeting [target audience] on [platform]. Each variation uses a different angle: pain point, outcome, social proof, urgency, and curiosity. Each: a headline under 40 characters and body text under 125 characters. Label each angle. No clickbait claims. No emojis.",
  },

  // ——— Sales ———
  {
    id: "discovery-prep",
    category: "sales",
    title: "Discovery Call Prep Brief",
    whyItWorks: "Hypotheses plus questions to test them make the call a conversation, not an interrogation.",
    body: "You are a [role] preparing for a discovery call with a [prospect role] at a [industry] company. Write a one-page prep brief: three likely business problems they face, two questions to test each problem, one risk that could stall the deal, and the single outcome I want from the call: [call goal]. Use bullets. Under 300 words. No generic rapport-building tips.",
  },
  {
    id: "objection",
    category: "sales",
    title: "Objection Response",
    whyItWorks: "Acknowledging the concern and reframing with a specific example avoids sounding defensive.",
    body: "A [prospect role] considering [product/service] said: ‘[objection]’. Write a response I can say or send. Structure: acknowledge the concern in one sentence without arguing, ask one clarifying question, offer a reframe with a specific example, suggest a low-risk next step. Under 120 words. No pushy language. No ‘I totally understand, but’.",
  },
  {
    id: "one-pager",
    category: "sales",
    title: "Sales One-Pager",
    whyItWorks: "One problem, one solution, one proof point and one ask fits on a page and survives forwarding.",
    body: "Write a sales one-pager for [product/service] for [target audience]. Sections: the problem in two sentences, how it’s solved in three bullets, one proof point — [proof point], pricing or engagement model in one line, and a single next step. Under 250 words. Plain language. No superlatives. No company history.",
  },

  // ——— Operations & Internal ———
  {
    id: "agenda",
    category: "ops",
    title: "Meeting Agenda",
    whyItWorks: "Tying each item to a decision or owner turns meetings into progress.",
    body: "Write a [meeting length] meeting agenda for [meeting purpose] with [attendees]. List up to five items, each with a time box, an owner, and whether it needs a decision, input, or is just an update. Start with the single outcome the meeting must produce. End with five minutes for next steps. No ‘misc’ items. No items without an owner.",
  },
  {
    id: "team-update",
    category: "ops",
    title: "Team Update",
    whyItWorks: "Wins, blockers and asks in a fixed shape make updates skimmable in under a minute.",
    body: "Write a weekly team update from [your role] to [audience]. Three sections: wins (with numbers where possible), blockers (with what would unblock them), and asks (who needs to do what by when). Two to three bullets each. Context: [this week’s key events]. Under 200 words. No filler intro. No vague ‘making progress’.",
  },
  {
    id: "job-posting",
    category: "ops",
    title: "Job Posting",
    whyItWorks: "Describing the first 90 days attracts candidates who can actually picture doing the job.",
    body: "Write a job posting for a [job title] at a [industry] company. Sections: one paragraph on why the role exists now, what they’ll accomplish in the first 90 days in three bullets, must-have skills in four bullets, nice-to-haves in two bullets, and compensation of [salary range]. Under 350 words. No ‘rockstar’ or ‘ninja’. No ‘fast-paced environment’.",
  },
  {
    id: "sop",
    category: "ops",
    title: "SOP / Process Doc",
    whyItWorks: "Numbered steps with a clear trigger and done-state make a process someone else can run.",
    body: "You are a [role] documenting [process] for [audience]. Write a standard operating procedure. Include: when to use this process (the trigger), tools needed, numbered steps each starting with a verb and under [word limit] words, what ‘done’ looks like, and the one mistake new people make. No background history. No paragraphs longer than three sentences.",
  },

  // ——— Customer Support ———
  {
    id: "complaint",
    category: "support",
    title: "Complaint Response",
    whyItWorks: "Owning the issue specifically and stating the fix and timeline restores trust faster than apologies.",
    body: "Write a reply to a [customer type] who complained that [complaint summary]. First sentence: acknowledge the specific problem in their words. Then state what went wrong in one sentence, what I’m doing to fix it, and by when: [resolution timeline]. Offer one concrete goodwill gesture if appropriate: [gesture]. Under 150 words. No ‘we apologize for any inconvenience’. No blaming policy.",
  },
];

export function templatesFor(category: CategoryId): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}

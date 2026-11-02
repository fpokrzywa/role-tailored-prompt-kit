# Prompt Blanks — fill-in-the-blank prompt builder

A one-page tool: pick an industry, pick a category, pick a template, fill in the bracketed blanks, and send the finished prompt to an AI. The written result streams back on the same screen, ready to copy.

## How it works for the user

```text
[ Industry ▾ ]  [ Category ▾ ]
        |
  Template cards for that category
        |
  Blanks form (one field per [bracket])   |  Live prompt preview
  - industry-based suggestion chips       |  (brackets highlight as filled)
        |
  [ Submit ]  ->  AI result streams in  ->  Copy / Regenerate / Edit blanks
```

1. **Pick industry** (about 12 choices, e.g. Real Estate, SaaS / Tech, Healthcare, Legal, Finance, Marketing Agency, E-commerce, Construction, Education, Hospitality, Nonprofit, Freelance / Consulting).
2. **Pick category** — filters the template list.
3. **Pick a template** — shows its name, a short "why it works" note (taken from your text), and its blanks.
4. **Fill the blanks** — each bracket becomes a labeled field. Under each field, clickable suggestion chips are tailored to the chosen industry (e.g. Real Estate → role "listing agent", audience "first-time home buyers"). Required blanks must be filled before Submit.
5. **Live preview** — the full prompt updates as you type; unfilled blanks stay highlighted in amber.
6. **Submit** — the prompt plus a short industry context line is sent to the AI. The answer streams in, with Copy, Regenerate, and Stop buttons.

No sign-in and no saved history (per your choice).

## Templates (34 total)

**Your 9, word for word:** Thought Leadership Article, How-To Article, Cold Outreach Email, Project Proposal, Meeting Follow-Up, Client Status Update, Scope Change Notice, Deliverable Handoff — grouped into Blog & Articles, Email & Proposals, Client Communication. (Your text describes 8 distinct prompts; I'll count those as the originals.)

**25 new ones, written in the same style** (role, audience, structure, length limit, explicit "No..." exclusions):

- **Blog & Articles:** Case Study, Listicle, Opinion / Contrarian Take, Product Comparison
- **Email & Proposals:** Warm Referral Intro, Re-engagement Email, Pricing / Quote Email, Partnership Pitch
- **Client Communication:** Kickoff Email, Overdue Invoice Reminder, Project Wrap-Up & Testimonial Ask, Bad News / Delay Notice
- **Social & Marketing:** LinkedIn Post, Newsletter Issue, Landing Page Copy, Product Announcement, Ad Copy Variations
- **Sales:** Discovery Call Prep Brief, Objection Response, Sales One-Pager
- **Operations & Internal:** Meeting Agenda, Team Update, Job Posting, SOP / Process Doc
- **Customer Support:** Complaint Response

## Look and feel

Dark console style: deep charcoal background, warm off-white text, soft amber highlights for blanks and the main button, a monospace font for the prompt preview, and a clean sans for everything else. Desktop shows the form and preview side by side; phones stack them.

## Technical details

- Single route at `/` replacing the placeholder; head metadata set for it.
- Templates and industries live in a typed data module: each template has `id`, `category`, `title`, `whyItWorks`, and a `body` with `[bracket]` tokens. Fields are parsed from the brackets automatically; each blank maps to a field "kind" (role, audience, domain, word count, etc.) so industry suggestion chips can be looked up per kind.
- Pure helpers `parseBlanks(body)` and `fillTemplate(body, values)` with small Vitest tests (every bracket becomes a field; filled values replace brackets; duplicate brackets share one field).
- AI call via a TanStack server function using the Lovable AI Gateway with `anthropic/claude-sonnet-5` (your templates are written for Claude), streamed to the browser. The API key stays on the server. Errors such as rate limits or no credits are shown as a clear message in the result panel.
- Design tokens (colors, fonts, glow/shadow) defined in `src/styles.css`; fonts loaded in the root head.

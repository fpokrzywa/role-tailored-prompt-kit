export type BlankKind =
  | "role"
  | "clientRole"
  | "audience"
  | "domain"
  | "industry"
  | "deliverable"
  | "process"
  | "project"
  | "product"
  | "title"
  | "jobTitle"
  | "years"
  | "wordCount"
  | "wordLimit"
  | "timeframe"
  | "date"
  | "goal"
  | "meetingType"
  | "other";

export interface Blank {
  /** Exact text inside the brackets, e.g. "role title". */
  label: string;
  kind: BlankKind;
}

const BRACKET_RE = /\[([^[\]]+)\]/g;

/** Guess what kind of value a bracket asks for, so industry suggestions can be matched. */
export function blankKind(label: string): BlankKind {
  const l = label.toLowerCase().trim();
  if (l === "x") return "years";
  if (l.includes("word count")) return "wordCount";
  if (l.includes("word limit")) return "wordLimit";
  if (l.includes("timeframe") || l.includes("timeline")) return "timeframe";
  if (l.includes("job")) return "jobTitle";
  if (l.includes("meeting/call")) return "meetingType";
  if (l.includes("action") || l.includes("goal")) return "goal";
  if (l.includes("date") || l.includes("deadline")) return "date";
  if (l.includes("prospect") || l.includes("client") || l.includes("recipient") || l.includes("customer"))
    return "clientRole";
  if (l.includes("audience") || l.includes("reader")) return "audience";
  if (l.includes("role")) return "role";
  if (l.includes("industry")) return "industry";
  if (l.includes("domain") || l.includes("expertise")) return "domain";
  if (l.includes("deliverable")) return "deliverable";
  if (l.includes("process") || l.includes("task")) return "process";
  if (l.includes("project")) return "project";
  if (l.includes("product") || l.includes("service") || l.includes("offer")) return "product";
  if (l.includes("title") || l.includes("topic")) return "title";
  return "other";
}

/** Every unique [bracket] in the template, in order of first appearance. */
export function parseBlanks(body: string): Blank[] {
  const seen = new Set<string>();
  const blanks: Blank[] = [];
  for (const match of body.matchAll(BRACKET_RE)) {
    const label = match[1].trim();
    if (seen.has(label)) continue;
    seen.add(label);
    blanks.push({ label, kind: blankKind(label) });
  }
  return blanks;
}

/** Replace each [bracket] with its filled value; unfilled brackets stay as-is. */
export function fillTemplate(body: string, values: Record<string, string>): string {
  return body.replace(BRACKET_RE, (whole, raw: string) => {
    const v = values[raw.trim()]?.trim();
    return v ? v : whole;
  });
}

export type PromptSegment = { type: "text"; text: string } | { type: "blank"; label: string; value?: string };

/** Split a template into text and blank segments for highlighted previews. */
export function segmentTemplate(body: string, values: Record<string, string>): PromptSegment[] {
  const out: PromptSegment[] = [];
  let last = 0;
  for (const match of body.matchAll(BRACKET_RE)) {
    const idx = match.index ?? 0;
    if (idx > last) out.push({ type: "text", text: body.slice(last, idx) });
    const label = match[1].trim();
    const value = values[label]?.trim();
    out.push({ type: "blank", label, value: value || undefined });
    last = idx + match[0].length;
  }
  if (last < body.length) out.push({ type: "text", text: body.slice(last) });
  return out;
}

export function missingBlanks(body: string, values: Record<string, string>): string[] {
  return parseBlanks(body)
    .filter((b) => !values[b.label]?.trim())
    .map((b) => b.label);
}

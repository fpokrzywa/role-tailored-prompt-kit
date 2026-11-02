import { describe, expect, it } from "vitest";
import { blankKind, fillTemplate, missingBlanks, parseBlanks } from "./blanks";
import { TEMPLATES } from "./templates";

describe("parseBlanks", () => {
  it("turns every bracket into a field, in order", () => {
    const blanks = parseBlanks("You are a [role] explaining [process] to [specific audience].");
    expect(blanks.map((b) => b.label)).toEqual(["role", "process", "specific audience"]);
  });

  it("gives duplicate brackets a single shared field", () => {
    const blanks = parseBlanks("[project] update. Again: [project].");
    expect(blanks).toHaveLength(1);
  });
});

describe("fillTemplate", () => {
  it("replaces filled brackets with the user's values", () => {
    expect(fillTemplate("Write about [topic] for [audience].", { topic: "pricing", audience: "founders" })).toBe(
      "Write about pricing for founders.",
    );
  });

  it("keeps unfilled brackets visible", () => {
    expect(fillTemplate("Due by [date].", { date: "  " })).toBe("Due by [date].");
  });

  it("fills every occurrence of a repeated bracket", () => {
    expect(fillTemplate("[x] and [x]", { x: "A" })).toBe("A and A");
  });
});

describe("missingBlanks", () => {
  it("lists blanks that still need a value", () => {
    expect(missingBlanks("[a] [b]", { a: "done" })).toEqual(["b"]);
  });
});

describe("blankKind", () => {
  it("reads the prospect's role as a client role, not the writer's", () => {
    expect(blankKind("prospect role")).toBe("clientRole");
    expect(blankKind("your role")).toBe("role");
  });
});

describe("template library", () => {
  it("has 33 templates (8 originals + 25 new)", () => {
    expect(TEMPLATES).toHaveLength(33);
    expect(TEMPLATES.filter((t) => t.original)).toHaveLength(8);
  });

  it("every template has at least one blank and a unique id", () => {
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
    for (const t of TEMPLATES) expect(parseBlanks(t.body).length).toBeGreaterThan(0);
  });
});

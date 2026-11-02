import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { CATEGORIES, TEMPLATES, templatesFor, type CategoryId } from "@/lib/templates";
import { INDUSTRIES, suggestionsFor } from "@/lib/industries";
import { fillTemplate, missingBlanks, parseBlanks, segmentTemplate } from "@/lib/blanks";
import { streamGenerate } from "@/lib/generate-client";
import { ResultPanel, type ResultStatus } from "@/components/ResultPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prompt Blanks — Fill-in-the-blank AI writing templates" },
      {
        name: "description",
        content:
          "Pick your industry and a writing template, fill in the blanks, and get a polished article, email or proposal from AI.",
      },
      { property: "og:title", content: "Prompt Blanks — Fill-in-the-blank AI writing templates" },
      {
        property: "og:description",
        content: "33 battle-tested prompt templates for articles, outreach, proposals and client updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function StepLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Index() {
  const [industryId, setIndustryId] = useState(INDUSTRIES[0].id);
  const [category, setCategory] = useState<CategoryId>("blog");
  const [templateId, setTemplateId] = useState(templatesFor("blog")[0].id);
  const [values, setValues] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<ResultStatus>("idle");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string>();
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const industry = INDUSTRIES.find((i) => i.id === industryId);
  const categoryTemplates = templatesFor(category);
  const template = TEMPLATES.find((t) => t.id === templateId) ?? categoryTemplates[0] ?? TEMPLATES[0];
  const blanks = useMemo(() => parseBlanks(template.body), [template.body]);
  const segments = segmentTemplate(template.body, values);
  const missing = missingBlanks(template.body, values);
  const filledCount = blanks.length - missing.length;

  useEffect(() => () => abortRef.current?.abort(), []);

  const chooseCategory = (id: CategoryId) => {
    setCategory(id);
    setTemplateId(templatesFor(id)[0].id);
  };

  const setValue = (label: string, v: string) => setValues((prev) => ({ ...prev, [label]: v }));

  const submit = async () => {
    if (missing.length > 0 || status === "streaming") return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setResult("");
    setError(undefined);
    setStatus("streaming");
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    try {
      const { error: err } = await streamGenerate(
        {
          prompt: fillTemplate(template.body, values),
          industryName: industry?.name,
          industryContext: industry?.context,
        },
        (chunk) => setResult((r) => r + chunk),
        controller.signal,
      );
      if (controller.signal.aborted) return;
      if (err) {
        setError(err);
        setStatus("error");
      } else setStatus("done");
    } catch {
      if (controller.signal.aborted) {
        setStatus("stopped");
        return;
      }
      setError("Couldn’t reach the AI. Check your connection and try again.");
      setStatus("error");
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setStatus("stopped");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-md bg-accent font-mono text-sm font-medium text-accent-foreground">
              [ ]
            </span>
            <div>
              <h1 className="text-base font-semibold leading-none tracking-tight">Prompt Blanks</h1>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">fill the brackets · run the prompt</p>
            </div>
          </div>
          <p className="hidden font-mono text-xs text-muted-foreground sm:block">
            {TEMPLATES.length} templates · {INDUSTRIES.length} industries
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-10">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Stop rebuilding prompts.
            <span className="text-primary"> Fill in the blanks.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick your field and the piece you need. Every bracket becomes a field, with suggestions for your industry.
          </p>
        </div>

        {/* Step 1 */}
        <section className="mb-10">
          <StepLabel n="01">Industry &amp; category</StepLabel>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <label className="flex shrink-0 flex-col gap-1.5 lg:w-64">
              <span className="text-xs text-muted-foreground">Industry / business type</span>
              <select className="field" value={industryId} onChange={(e) => setIndustryId(e.target.value)}>
                {INDUSTRIES.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">Category</span>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Category">
                {CATEGORIES.map((c) => {
                  const active = c.id === category;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseCategory(c.id)}
                      className={
                        active
                          ? "rounded-md border border-primary bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                          : "rounded-md border bg-surface px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                      }
                    >
                      {c.name}
                      <span className="ml-2 font-mono text-xs opacity-60">{templatesFor(c.id).length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <StepLabel n="02">Template</StepLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categoryTemplates.map((t) => {
              const active = t.id === template.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplateId(t.id)}
                  aria-pressed={active}
                  className={
                    active
                      ? "glow-primary rounded-xl border border-primary bg-surface-raised p-4 text-left"
                      : "rounded-xl border bg-surface p-4 text-left transition-colors hover:border-primary/50 hover:bg-surface-raised"
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium leading-snug">{t.title}</h3>
                    {t.original && (
                      <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                        Core
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{t.whyItWorks}</p>
                  <p className="mt-3 font-mono text-[11px] text-primary">{parseBlanks(t.body).length} blanks</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-10">
          <StepLabel n="03">Fill the blanks</StepLabel>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <form
              className="panel p-5"
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
            >
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight">{template.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  <span className={missing.length === 0 ? "text-primary" : ""}>{filledCount}</span>/{blanks.length} filled
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {blanks.map((b) => {
                  const suggestions = suggestionsFor(industry, b.kind, b.label);
                  const id = `blank-${b.label.replace(/\W+/g, "-")}`;
                  return (
                    <div key={b.label} className="flex flex-col gap-1.5">
                      <label htmlFor={id} className="font-mono text-xs text-blank">
                        [{b.label}]
                      </label>
                      <input
                        id={id}
                        className="field"
                        value={values[b.label] ?? ""}
                        onChange={(e) => setValue(b.label, e.target.value)}
                        placeholder={capitalize(b.label)}
                        autoComplete="off"
                      />
                      {suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {suggestions.map((s) => (
                            <button key={s} type="button" className="chip" onClick={() => setValue(b.label, s)}>
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="submit"
                disabled={missing.length > 0 || status === "streaming"}
                className="glow-primary mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                <Sparkles className="size-4" />
                {status === "streaming" ? "Writing…" : "Submit to AI"}
                <ArrowRight className="size-4" />
              </button>
              {missing.length > 0 && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {missing.length} blank{missing.length === 1 ? "" : "s"} left to fill
                </p>
              )}
            </form>

            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="panel overflow-hidden">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Prompt preview</span>
                  {industry && <span className="font-mono text-[11px] text-muted-foreground">{industry.name}</span>}
                </div>
                <p className="whitespace-pre-wrap px-5 py-5 font-mono text-[13px] leading-7">
                  {segments.map((s, i) =>
                    s.type === "text" ? (
                      <span key={i}>{s.text}</span>
                    ) : s.value ? (
                      <span key={i} className="filled-token">
                        {s.value}
                      </span>
                    ) : (
                      <span key={i} className="blank-token">
                        [{s.label}]
                      </span>
                    ),
                  )}
                </p>
              </div>
              <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                <span className="text-primary">Why it works · </span>
                {template.whyItWorks}
              </p>
            </div>
          </div>
        </section>

        <div ref={resultRef} className="scroll-mt-6">
          <ResultPanel status={status} text={result} error={error} onStop={stop} onRegenerate={() => void submit()} />
        </div>
      </main>
    </div>
  );
}

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Templates live in `src/lib/templates.ts` as plain strings with `[bracket]` blanks; fields are derived by `parseBlanks` in `src/lib/blanks.ts`, so never hand-maintain a separate field list. Why: one source of truth per template.
- Industry suggestion chips are looked up by blank "kind" (`blankKind` heuristics + `suggestionsFor` in `src/lib/industries.ts`); add new blank wording by extending the heuristics, not per-template overrides. Why: keeps 30+ templates consistent.
- AI generation runs through the server route `/api/generate` (`src/lib/ai/generate.server.ts`), streaming NDJSON events (text / done / error) to the browser; errors before the first text keep their HTTP status. Why: streaming needs a raw Response, which server functions can't return.
- Run `bunx vitest run` after changing blanks/templates logic; tests sit next to the code (`src/lib/*.test.ts`).

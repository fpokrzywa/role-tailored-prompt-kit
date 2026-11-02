import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, RotateCcw, Square } from "lucide-react";
import { useState } from "react";

export type ResultStatus = "idle" | "streaming" | "done" | "stopped" | "error";

interface Props {
  status: ResultStatus;
  text: string;
  error?: string;
  onStop: () => void;
  onRegenerate: () => void;
}

export function ResultPanel({ status, text, error, onStop, onRegenerate }: Props) {
  const [copied, setCopied] = useState(false);
  if (status === "idle") return null;

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="panel overflow-hidden" aria-live="polite">
      <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span
            className={
              status === "streaming"
                ? "size-2 animate-pulse rounded-full bg-primary"
                : status === "error"
                  ? "size-2 rounded-full bg-destructive"
                  : "size-2 rounded-full bg-filled"
            }
          />
          {status === "streaming" ? "Writing…" : status === "stopped" ? "Stopped" : status === "error" ? "Error" : "Result"}
        </div>
        <div className="flex items-center gap-2">
          {status === "streaming" ? (
            <button type="button" onClick={onStop} className="chip gap-1.5">
              <Square className="size-3" /> Stop
            </button>
          ) : (
            <>
              {text && (
                <button type="button" onClick={copy} className="chip gap-1.5">
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
              <button type="button" onClick={onRegenerate} className="chip gap-1.5">
                <RotateCcw className="size-3" /> Regenerate
              </button>
            </>
          )}
        </div>
      </header>
      <div className="px-5 py-5">
        {error && (
          <p className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {text ? (
          <div className={status === "streaming" ? "prose-console caret-blink" : "prose-console"}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        ) : (
          status === "streaming" && <p className="caret-blink font-mono text-sm text-muted-foreground">Thinking</p>
        )}
      </div>
    </section>
  );
}

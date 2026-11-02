import { createAnthropic } from "@ai-sdk/anthropic";
import { APICallError, streamText } from "ai";
import { z } from "zod";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "anthropic/claude-sonnet-5";

const InputSchema = z.object({
  prompt: z.string().trim().min(1).max(8000),
  industryName: z.string().trim().max(100).optional(),
  industryContext: z.string().trim().max(300).optional(),
});

export type GenerateEvent =
  | { type: "text"; text: string }
  | { type: "done"; finishReason: string }
  | { type: "error"; status: number; message: string };

function json(status: number, message: string) {
  return new Response(JSON.stringify({ type: "error", status, message } satisfies GenerateEvent), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function friendlyError(error: unknown): { status: number; message: string } {
  const apiError = APICallError.isInstance(error)
    ? error
    : APICallError.isInstance((error as { cause?: unknown })?.cause)
      ? ((error as { cause: APICallError }).cause as APICallError)
      : undefined;
  const status = apiError?.statusCode ?? 500;
  let upstream: string | undefined;
  try {
    const body = apiError?.responseBody ? JSON.parse(apiError.responseBody) : undefined;
    upstream = body?.message ?? body?.error?.message;
  } catch {
    /* non-JSON body */
  }
  if (status === 429) return { status, message: "The AI is busy right now. Please wait a moment and try again." };
  if (status === 402) return { status, message: upstream ?? "AI credits have run out for this workspace." };
  if (status === 403) return { status, message: upstream ?? "The AI declined this request." };
  if (status === 401) return { status, message: "The AI service isn’t configured correctly." };
  if (status === 400) return { status, message: upstream ?? "The AI couldn’t accept this prompt. Try shortening it." };
  return { status, message: "Something went wrong reaching the AI. Please try again." };
}

export async function handleGenerate(request: Request): Promise<Response> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return json(500, "The AI service isn’t configured.");

  let input: z.infer<typeof InputSchema>;
  try {
    input = InputSchema.parse(await request.json());
  } catch {
    return json(400, "Please fill in the template before submitting.");
  }

  const gateway = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const anthropic = createAnthropic({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: gateway.fetch,
  });

  const system = [
    "You are an expert professional writer. Follow the user's instructions exactly, including length limits, structure and every exclusion.",
    input.industryName
      ? `The writer works in ${input.industryName}${input.industryContext ? ` (${input.industryContext})` : ""}. Use vocabulary, examples and assumptions that fit that field.`
      : "",
    "Return only the requested piece of writing in Markdown. No preamble, no notes about what you did.",
  ]
    .filter(Boolean)
    .join("\n");

  const result = streamText({
    model: anthropic(MODEL),
    system,
    messages: [{ role: "user", content: input.prompt }],
    maxOutputTokens: 8000,
    maxRetries: 0,
    abortSignal: request.signal,
  });

  const iterator = result.stream[Symbol.asyncIterator]();
  const buffered: GenerateEvent[] = [];

  const toEvent = (part: { type: string; [k: string]: unknown }): GenerateEvent | null => {
    if (part.type === "text-delta") return { type: "text", text: String(part['text'] ?? "") };
    if (part.type === "error") return { type: "error", ...friendlyError(part['error']) };
    if (part.type === "finish") {
      const reason = String(part['finishReason'] ?? "stop");
      const raw = String(part['rawFinishReason'] ?? "");
      if (reason === "content-filter" || raw === "refusal")
        return { type: "error", status: 200, message: "The AI declined to write this. Try a different template or details." };
      return { type: "done", finishReason: reason };
    }
    return null;
  };

  // Read until the first text or error so failures before any output keep their HTTP status.
  try {
    while (true) {
      const next = await iterator.next();
      if (next.done) break;
      const event = toEvent(next.value as { type: string });
      if (!event) continue;
      if (event.type === "error" && buffered.length === 0) {
        console.error("AI generate error", event);
        return json(event.status >= 400 ? event.status : 422, event.message);
      }
      buffered.push(event);
      if (event.type !== "text" || event.text.length > 0) break;
    }
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    const e = friendlyError(error);
    console.error("AI generate failed", error);
    return json(e.status, e.message);
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: GenerateEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        for (const e of buffered) send(e);
        if (!buffered.some((e) => e.type === "done" || e.type === "error")) {
          while (true) {
            const next = await iterator.next();
            if (next.done) break;
            const event = toEvent(next.value as { type: string });
            if (event) send(event);
            if (event && event.type !== "text") break;
          }
        }
        controller.close();
      } catch (error) {
        if (!request.signal.aborted) {
          send({ type: "error", ...friendlyError(error) });
        }
        controller.close();
      }
    },
    cancel() {
      void iterator.return?.();
    },
  });

  return withLovableAiGatewayRunIdHeader(
    new Response(body, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    }),
    gateway,
  );
}

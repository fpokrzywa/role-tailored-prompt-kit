type Event =
  | { type: "text"; text: string }
  | { type: "done"; finishReason: string }
  | { type: "error"; status: number; message: string };

/** Streams the AI result from /api/generate, calling onText with each new chunk. */
export async function streamGenerate(
  body: { prompt: string; industryName?: string; industryContext?: string },
  onText: (chunk: string) => void,
  signal: AbortSignal,
): Promise<{ error?: string | undefined }> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    return { error: data?.message ?? "Something went wrong. Please try again." };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let error: string | undefined;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      const event = JSON.parse(line) as Event;
      if (event.type === "text") onText(event.text);
      else if (event.type === "error") error = event.message;
    }
  }
  return { error };
}

// src/app/api/chat/route.ts（上流先だけ差し替え）
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MASTRA_BASE_URL = process.env.MASTRA_BASE_URL ?? "http://localhost:4111";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));

  const upstream = await fetch(`${MASTRA_BASE_URL}/chat`, {
    method: "POST",
    headers: { "content-type": "application/json", "accept": "text/event-stream" },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return new Response(JSON.stringify({ error: text || "upstream error" }), {
      status: upstream.status,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "x-vercel-ai-ui-message-stream": "v1",
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { buildAgentSystemPrompt } from "@/lib/agentContext";
import { isRateLimited } from "@/lib/rateLimit";

const VALID_DIRECTORIES = ["home", "about", "experience", "projects", "skills", "education", "contact"];

// Flash is the free-tier workhorse: generous daily quota, no credit card
// required. Swap to "gemini-flash-lite-latest" for even higher rate limits
// if you outgrow this (slightly lower quality, faster/cheaper).
const GEMINI_MODEL = "gemini-2.5-flash";

type HistoryTurn = { role: "user" | "assistant"; text: string };

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(`agent:${ip}`)) {
    return NextResponse.json(
      { reply: "Slow down a bit — try again in a minute." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = body.message.slice(0, 1000);
  const directory = VALID_DIRECTORIES.includes(body.directory) ? body.directory : "home";
  const history: HistoryTurn[] = Array.isArray(body.history) ? body.history.slice(-10) : [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "hey — it's anika! my AI agent isn't wired up on this deployment yet (missing GEMINI_API_KEY in .env.local). ask the site owner to grab a free key from aistudio.google.com.",
    });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildAgentSystemPrompt(directory) }] },
          contents: [
            ...history.map((h) => ({
              role: h.role === "assistant" ? "model" : "user",
              parts: [{ text: h.text }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: { maxOutputTokens: 300, temperature: 0.8 },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Gemini API error:", res.status, errBody);
      return NextResponse.json({ reply: "hmm, my brain glitched for a second — try that again?" });
    }

    const data = await res.json();
    const text: string =
      data.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("")
        .trim() || "...";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Terminal agent request failed:", err);
    return NextResponse.json({ reply: "network hiccup reaching my brain — try again in a sec." });
  }
}

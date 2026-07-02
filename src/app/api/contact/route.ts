import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";
import { getSupabaseServerClient } from "@/lib/supabase";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000),
  // Honeypot field — real users never fill this in; bots often do.
  company: z.string().max(0, "Bot check failed").optional().or(z.literal("")),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid submission." },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything, but drop the message.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;

  // Best-effort persistence — a DB hiccup shouldn't block the email from sending.
  const supabase = getSupabaseServerClient();
  if (supabase) {
    await supabase.from("contact_submissions").insert({ name, email, message, ip }).then(
      () => {},
      () => {}
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY not set — contact submission was logged but not emailed.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "abhutani@berkeley.edu",
      replyTo: email,
      subject: `Portfolio contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("Resend send failed:", err);
    // The submission was still saved (if Supabase is configured) — don't fail hard.
    return NextResponse.json({ ok: true, delivered: false });
  }
}

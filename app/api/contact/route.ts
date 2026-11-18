import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { event, organiser } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Best-effort, per-instance rate limit (5 submissions / 10 min / IP). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  // Same-origin only (browsers always send Origin on POST fetches).
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: "forbidden" });
  }

  let body: Partial<ContactPayload>;
  try {
    const raw = await req.text();
    if (raw.length > 20_000) return json(413, { ok: false, error: "too_large" });
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  // Honeypot or impossibly fast submission → quietly drop (bots only).
  if (body.website) return json(200, { ok: true });
  if (typeof body.startedAt === "number" && Date.now() - body.startedAt < 2500) {
    return json(400, { ok: false, error: "too_fast", message: "That was quick! Please wait a moment and send again." });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length) return json(422, { ok: false, error: "validation", fields: errors });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate_limited", message: "Too many messages from this connection. Please try again in a few minutes." });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || organiser.email;
  if (!apiKey || !from) {
    console.error("[contact] Email delivery is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.");
    return json(503, { ok: false, error: "not_configured" });
  }

  const name = oneLine(body.name!);
  const email = oneLine(body.email!);
  const role = oneLine(body.role!);
  const message = body.message!.trim();

  const text = `New enquiry from the ${event.name} website\n\nName: ${name}\nEmail: ${email}\nWriting as: ${role}\n\n${message}\n`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#000">
<p style="font:600 12px monospace;letter-spacing:.12em;text-transform:uppercase;color:#1e7a3b">New website enquiry · ${esc(event.name)}</p>
<table cellpadding="6" style="border-collapse:collapse">
<tr><td><b>Name</b></td><td>${esc(name)}</td></tr>
<tr><td><b>Email</b></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
<tr><td><b>Writing as</b></td><td>${esc(role)}</td></tr>
</table>
<hr style="border:0;border-top:2px solid #39c463;margin:16px 0" />
<p style="white-space:pre-wrap">${esc(message)}</p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[TSWS 2027] ${role} — ${name}`.slice(0, 200),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend rejected the message", res.status, detail.slice(0, 500));
      return json(502, { ok: false, error: "delivery_failed" });
    }
    return json(200, { ok: true });
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return json(502, { ok: false, error: "delivery_failed" });
  }
}

export function GET() {
  return json(405, { ok: false, error: "method_not_allowed" });
}

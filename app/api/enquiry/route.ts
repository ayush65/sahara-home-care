import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { site } from '@/lib/site'

export const runtime = 'nodejs'

type Enquiry = {
  name?: string
  phone?: string
  email?: string
  service?: string
  appointmentDate?: string
  appointmentSlot?: string
  message?: string
}

const SLOT_HINT: Record<string, string> = {
  morning: 'Morning (8am – 12pm)',
  afternoon: 'Afternoon (12pm – 4pm)',
  evening: 'Evening (4pm – 8pm)',
  night: 'Night (8pm – 12am)',
}

function str(v: unknown, max = 2000) {
  return String(v ?? '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, max)
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Tiny in-memory throttle. Without this the endpoint is an open relay that
 * anyone can spam through, burning the SMTP quota and getting the domain
 * rate-limited or blacklisted by the mail provider.
 *
 * Per-instance only, so it is a speed bump rather than a hard guarantee — good
 * enough to defeat casual abuse, and it keeps the route free of extra
 * dependencies. Use a KV/Redis limiter if abuse becomes a real problem.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function throttled(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }
  return false
}

function clientKey(request: Request) {
  const fwd = request.headers.get('x-forwarded-for')
  const ip = fwd ? fwd.split(',')[0]?.trim() : request.headers.get('x-real-ip')
  return ip || 'unknown'
}

/** Rejects anything that isn't a plain YYYY-MM-DD date that isn't in the past. */
function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (d < today) return null
  return value
}

export async function POST(request: Request) {
  if (throttled(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': '600' } },
    )
  }

  let body: Enquiry
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const name = str(body.name, 120)
  const phone = str(body.phone, 40)
  const email = str(body.email, 160)
  const service = str(body.service, 200)
  const message = str(body.message)
  const slot = str(body.appointmentSlot, 40)
  const date = validDate(str(body.appointmentDate, 10))

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid phone number.' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Not configured yet — tell the client so it can fall back to WhatsApp.
    return NextResponse.json(
      { ok: false, error: 'Email is not configured right now.' },
      { status: 503 },
    )
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const appointment = [date, SLOT_HINT[slot] ?? slot].filter(Boolean).join(' at ')

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ...(email ? ([['Email', email]] as [string, string][]) : []),
    ...(service ? ([['Service needed', service]] as [string, string][]) : []),
    ...(appointment ? ([['Preferred appointment', appointment]] as [string, string][]) : []),
    ...(message ? ([['Message', message]] as [string, string][]) : []),
  ]

  try {
    await transport.sendMail({
      from: SMTP_FROM ?? `"Sahara Website" <${SMTP_USER}>`,
      to: site.email,
      replyTo: email || `${phone.replace(/[^\d+]/g, '')}@phone`,
      subject: `New enquiry — ${service || 'General enquiry'} — ${name}`,
      text: [
        'New enquiry from the Sahara Home Health Care website',
        '',
        ...rows.map(([k, v]) => `${k}: ${v}`),
        '',
        `Sent: ${new Date().toUTCString()}`,
      ].join('\n'),
      html: `
        <h2>New website enquiry</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="color:#6b7280"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`,
            )
            .join('')}
        </table>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[enquiry] send failed:', err)
    return NextResponse.json(
      { ok: false, error: 'We could not send your enquiry. Please call or WhatsApp us.' },
      { status: 502 },
    )
  }
}
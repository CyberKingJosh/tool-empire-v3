import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const EMAIL_RATE_LIMIT = 10
const WINDOW_MS = 60 * 1000

function checkEmailRateLimit(req: NextRequest): boolean {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }
  if (record.count >= EMAIL_RATE_LIMIT) return false
  record.count++
  return true
}

const requestSchema = z.object({
  toolSlug: z.string().min(1).max(200),
  email: z.string().email().max(320),
  documentTitle: z.string().min(1).max(500),
})

export async function POST(req: NextRequest) {
  if (!checkEmailRateLimit(req)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendKey || !fromEmail) {
    console.error('Resend not configured')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)
    const domain = process.env.NEXT_PUBLIC_DOMAIN ?? 'Tool Empire'

    await resend.emails.send({
      from: fromEmail,
      to: parsed.data.email,
      subject: `Your ${parsed.data.documentTitle} — ${domain}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="font-size: 24px; color: #0A2540;">Your ${parsed.data.documentTitle}</h1>
          <p style="font-size: 16px; color: #4A5568; line-height: 1.6;">
            Thank you for using ${domain}. Your PDF is attached to this email.
          </p>
          <p style="font-size: 14px; color: #718096; margin-top: 24px;">
            Need another document? Visit <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/${parsed.data.toolSlug}">${domain}</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 })
  }
}

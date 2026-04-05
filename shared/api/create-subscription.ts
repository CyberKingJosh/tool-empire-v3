import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT = 100
const WINDOW_MS = 60 * 1000

function checkRateLimit(req: NextRequest): boolean {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }
  if (record.count >= RATE_LIMIT) return false
  record.count++
  return true
}

const requestSchema = z.object({
  toolName: z.string().min(1).max(200),
  priceAud: z.number().min(15).max(19),
})

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY not configured')
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
    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      currency: 'aud',
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: `${parsed.data.toolName} Pro`,
              description: 'Unlimited uses, saved history, team sharing, CSV/PDF export',
            },
            unit_amount: parsed.data.priceAud * 100,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pro/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe subscription error:', err)
    return NextResponse.json({ error: 'Subscription creation failed' }, { status: 500 })
  }
}

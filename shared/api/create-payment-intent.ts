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
  toolSlug: z.string().min(1).max(200),
  documentTitle: z.string().min(1).max(500),
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
    const priceInCents = parseInt(process.env.STRIPE_PDF_EXPORT_PRICE ?? '100', 10)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: 'aud',
      metadata: {
        toolSlug: parsed.data.toolSlug,
        documentTitle: parsed.data.documentTitle,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Stripe payment intent error:', err)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}

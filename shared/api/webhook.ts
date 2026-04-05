import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('Stripe keys not configured')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const { toolSlug, documentTitle } = paymentIntent.metadata
        console.info(`Payment succeeded: ${toolSlug} — ${documentTitle}`)
        // Trigger PDF generation and delivery
        break
      }
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        console.info(`Subscription created: ${subscription.id}`)
        // Update user subscription status in Supabase
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.info(`Subscription cancelled: ${subscription.id}`)
        // Update user subscription status in Supabase
        break
      }
      default:
        console.info(`Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

# STRIPE SETUP — ONE ACCOUNT FOR ALL 1,000 TOOLS

One Stripe account handles every tool on the site. Do this once, never repeat per tool.

## STEP 1 — Create account

Go to stripe.com/au → Start now → Individual/Sole trader
Business name: your trading name
Connect your Australian bank account (BSB + account number)

## STEP 2 — Get API keys

Dashboard → Developers → API Keys
Copy Publishable key (pk_live_...) → add to .env.local as NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Copy Secret key (sk_live_...) → add to .env.local as STRIPE_SECRET_KEY

## STEP 3 — Create the $1 AUD product

Dashboard → Products → Add Product
Name: PDF Export
Pricing: One time → $1.00 AUD
Save → copy Price ID (price_...) → add to .env.local as STRIPE_PDF_EXPORT_PRICE_ID

## STEP 4 — Set up webhook

Dashboard → Developers → Webhooks → Add Endpoint
URL: https://toolsempire.online.au/api/stripe/webhook
Events: payment_intent.succeeded, customer.subscription.created, customer.subscription.updated, customer.subscription.deleted
Copy Signing Secret (whsec_...) → add to .env.local as STRIPE_WEBHOOK_SECRET

## STEP 5 — Test before going live

Use test keys first (pk_test_ and sk_test_)
Test card: 4242 4242 4242 4242 / any future date / any CVC
Confirm PDF arrives by email

## STEP 6 — Go live

Stripe Dashboard → toggle Test → Live
Replace test keys in .env.local with live keys
Run: vercel --prod

## STEP 7 — Check earnings

Dashboard → Payments → shows every $1 AUD transaction
Dashboard → Payouts → shows transfers to your bank (2 business days)

This same setup works for every one of the 1,000 tools automatically.

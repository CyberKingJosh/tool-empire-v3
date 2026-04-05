# TECH STACK — COMPLETE SPECIFICATIONS
# Copy these configs exactly. Do not change versions without reason.

---

## FRAMEWORK & DEPLOYMENT

Framework: Next.js 14.2.x with App Router
Language: TypeScript 5.x (strict mode enabled)
Styling: Tailwind CSS 3.4.x
Deployment: Vercel (free hobby tier initially, pro at $20/mo when needed)
Domain: One domain for all 1000 tools (e.g. quickcalc.io or freetoolkit.co)
All tools at: toolsempire.online/tools/[slug]

---

## PACKAGE.JSON

```json
{
  "name": "tool-empire",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@stripe/stripe-js": "^4.3.0",
    "@stripe/react-stripe-js": "^2.7.3",
    "stripe": "^16.2.0",
    "@supabase/supabase-js": "^2.44.4",
    "puppeteer": "^22.13.1",
    "resend": "^3.4.0",
    "@anthropic-ai/sdk": "^0.26.1",
    "zod": "^3.23.8",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.11",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.3",
    "tailwindcss": "^3.4.6",
    "postcss": "^8.4.39",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5"
  }
}
```

---

## NEXT.CONFIG.JS

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com https://pagead2.googlesyndication.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.stripe.com https://www.google-analytics.com",
              "frame-src https://js.stripe.com",
            ].join('; ')
          }
        ]
      }
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig
```

---

## TAILWIND.CONFIG.TS

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        // Finance & Business
        finance: {
          primary: '#0F4C75',
          accent: '#1B6CA8',
          surface: '#F0F7FF',
          text: '#0A2540',
          result: '#00A878',
        },
        // Health & Fitness
        health: {
          primary: '#1A5C45',
          accent: '#2D8C6B',
          surface: '#F0FAF5',
          text: '#0D2B1F',
          result: '#F4845F',
        },
        // Legal
        legal: {
          primary: '#1C1C3A',
          accent: '#6B4FA0',
          surface: '#F8F7FF',
          text: '#0D0D24',
          result: '#4A90D9',
        },
        // Writing
        writing: {
          primary: '#8B2FC9',
          accent: '#6225A0',
          surface: '#FBF8FF',
          text: '#1A0A2E',
          result: '#E8A838',
        },
        // SEO
        seo: {
          primary: '#C84B31',
          accent: '#E05B3A',
          surface: '#FFF8F6',
          text: '#2A0F07',
          result: '#2563EB',
        },
        // Property
        property: {
          primary: '#1A3A5C',
          accent: '#C9A84C',
          surface: '#F8F6F0',
          text: '#0A1A2A',
          result: '#00875A',
        },
        // Education
        education: {
          primary: '#F4511E',
          accent: '#BF360C',
          surface: '#FFF8F5',
          text: '#1A0900',
          result: '#0288D1',
        },
        // General
        general: {
          primary: '#2D3A8C',
          accent: '#4353C0',
          surface: '#F8F9FF',
          text: '#0D1124',
          result: '#00ACC1',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## ENV.EXAMPLE

```
# Copy this file to .env.local and fill in all values
# Never commit .env.local to git

# STRIPE
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PDF_EXPORT_PRICE=100  # in pence/cents = £1/$1

# ANTHROPIC (for document generation in Tier 2+ tools)
ANTHROPIC_API_KEY=sk-ant-...

# SUPABASE (for Pro subscription user accounts - Tier C/D tools only)
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# RESEND (email delivery for PDF exports)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=tools@toolsempire.online

# GOOGLE
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-...

# APP
NEXT_PUBLIC_BASE_URL=https://toolsempire.online
NEXT_PUBLIC_DOMAIN=toolsempire.online
```

---

## FOLDER STRUCTURE FOR EACH TOOL

```
/src/app/tools/[slug]/
  page.tsx          <- The tool page (uses ToolLayout from shared)
  route.ts          <- API route if tool needs server-side calc (optional)

/src/lib/tools/
  [slug].ts         <- Pure calculation/generation logic (testable, no React)

/shared/components/
  ToolLayout.tsx    <- Master wrapper (SEO, AdSense, footer)
  AdSenseSlot.tsx   <- Ad slot component
  StripeExport.tsx  <- $1 PDF export flow
  RelatedTools.tsx  <- 4 related tools at bottom
  ProUpgrade.tsx    <- Pro subscription CTA
  ToolInput.tsx     <- Reusable input field
  ResultDisplay.tsx <- Result number + explanation + share

/shared/api/
  create-payment-intent.ts
  create-subscription.ts
  webhook.ts
  generate-pdf.ts
  send-pdf.ts
```

---

## RATE LIMITING (all API routes)

```typescript
// Add to every API route handler
import { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT = 100 // requests
const WINDOW_MS = 60 * 1000 // per minute

export function checkRateLimit(req: NextRequest): boolean {
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
```

---

## ACCOUNTS YOU NEED — IN ORDER OF SETUP

1. Cloudflare (domain registration ~$9/year) or Namecheap
2. Vercel (free, connect GitHub repo)
3. GitHub (free, stores all code)
4. Google account for this project (Gmail, then Analytics, Search Console, AdSense)
5. Stripe (free to set up, 1.4% + 20p per transaction)
6. Anthropic API (pay-as-you-go, start with $10 credit)
7. Resend (free up to 3,000 emails/month)
8. Supabase (free up to 500MB database, 50,000 monthly active users)

Total setup cost: £0 (Vercel, GitHub, Google, Resend, Supabase all free)
First month cost: ~£9 domain + £16 Claude Code Pro = £25 total

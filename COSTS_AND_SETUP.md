# COSTS AND SETUP — ALL PRICES IN AUD
# Updated: March 2026
# Everything you need to create, in order, before starting.

---

## ACCOUNTS TO CREATE — IN ORDER

### Day 1: Free accounts
1. GitHub — github.com (free)
   Purpose: stores all code. Vercel deploys from here.

2. Vercel — vercel.com (free hobby tier)
   Purpose: hosts all tools. Connect to GitHub on signup.

3. Google Account (project-specific, not your personal one)
   Purpose: all Google products below use this account.

4. Google Analytics 4 — analytics.google.com (free)
   Get Measurement ID format: G-XXXXXXXXXX

5. Google Search Console — search.google.com/search-console (free)
   Verify domain ownership via DNS record in Cloudflare.

6. Google AdSense — adsense.google.com (free to apply)
   APPLY DAY 1. Takes 2-4 weeks to approve.
   You need: domain live with real content before approval.
   One account serves ALL your tools across all pages. No limit on pages.
   DO NOT create multiple accounts — Google permanently bans all of them.

### Day 1: Paid accounts
7. Domain via Cloudflare Registrar — cloudflare.com
   Cost: AU$12-15/year (AU$1/month equivalent)
   Cloudflare is cheapest with no markup. Also gives free DNS, CDN, SSL.
   Short memorable domain. Examples: toolsuite.com.au, quicktools.com.au

8. Claude Code — via claude.ai Pro subscription
   Cost: AU$31/month (USD $20 at current exchange rate)
   This is your main building tool. Every tool gets built through Claude Code.

### Day 2-3: Additional accounts
9. Stripe — stripe.com (free to set up, fees per transaction)
   Purpose: handles $1 AUD PDF payments and Pro subscriptions.
   Australian business verification: takes 24-48 hours.
   Fee per AU$1 transaction: 1.4% + AU$0.30 = approximately AU$0.69 net.
   No monthly fee. Only pay when you earn.

10. Anthropic API — api.anthropic.com (pay as you go)
    Purpose: Claude Haiku for generating document content in Type B tools.
    Add AU$15 credit to start. Haiku is extremely cheap.
    Cost per document generation: approximately AU$0.001-0.003.
    10,000 document generations = approximately AU$10-30.

11. Resend — resend.com (free tier)
    Purpose: sends PDF to customer email after $1 payment.
    Free: 3,000 emails/month. Paid: AU$30/month for 50,000.
    You will not exceed 3,000/month until you are earning well.

12. Supabase — supabase.com (free tier)
    Purpose: user accounts for Pro subscription tools (Type C and D).
    Free: 500MB database, 50,000 monthly active users.
    Only needed when building Type C/D tools (Month 2 onwards).

---

## TOTAL MONTHLY COSTS IN AUD

### Month 1 (building tools, no significant revenue yet)
Claude Code Pro: AU$31
Domain: AU$1 (AU$12/year)
Vercel: AU$0 (free hobby tier)
Anthropic API: AU$5-15
Resend: AU$0 (free tier)
Supabase: AU$0 (free tier)
Stripe: AU$0 monthly (fees only on revenue)
TOTAL: AU$37-47/month

### Month 2-3 (traffic arriving, first revenue)
Same as above: AU$37-47/month
Break-even: need approximately 8,000-10,000 monthly pageviews at AU$5 RPM

### When to upgrade
Vercel Pro (AU$30/month): when you hit 500,000+ monthly visitors
Claude Code Max 5x (AU$155/month): when you start building Tier 2-3 tools at scale
Anthropic API budget: increase as document generation revenue increases

---

## CLAUDE CODE TOKEN MANAGEMENT (AUD PRO PLAN)

Pro Plan: AU$31/month
Session window: approximately 44,000 tokens per 5-hour period
Sessions per day: 4 (5-hour windows across 24 hours)
Daily token budget: approximately 176,000 tokens

Cost per tool build with AGENT_QUICK_REF.md compression:
- Reading AGENT_QUICK_REF.md + SPEC.md: ~5,000 tokens
- Competitor research step: ~5,000 tokens
- Writing all code: ~16,000 tokens
- Security audit + logs: ~3,000 tokens
TOTAL: ~29,000 tokens per Tier Zero or Emerging tool

Tools per session on Pro plan: 1 (29,000 tokens used from 44,000 available)
Tools per day on Pro plan: 4 sessions × 1 tool = 4 tools/day
Tools per month on Pro plan: ~80-100 tools

IMPORTANT: Always use AGENT_QUICK_REF.md not all 6 master files.
This saves 17,000 tokens per build — nearly doubles your monthly output.

How to handle session limits:
- Session ends mid-build: open new Claude Code session
- Say: "Read BUILD_LOG.md in /tool-empire-v3/tools/[NNN]-[slug]/ and resume"
- Agent reads log, continues from last completed step
- Never lose work — BUILD_LOG.md captures every completed step

Parallel agents on Pro:
Both Pro and Max share token limits across ALL Claude activity.
Running 10 agents simultaneously means 10x token consumption.
On Pro: run 1 agent at a time. On Max 5x: run 2-3 agents simultaneously.

---

## YOUR PERSONAL SETUP CHECKLIST

Print this. Check each item off before running the Architect Prompt.

Day 1:
[ ] GitHub account created
[ ] Vercel account created and connected to GitHub
[ ] Google project account created
[ ] Google Analytics property created, Measurement ID saved to .env.local
[ ] Google Search Console set up, domain verified
[ ] Google AdSense application submitted TODAY
[ ] Cloudflare account created, domain registered (AU$12-15)
[ ] Claude Code subscription active (AU$31/month)
[ ] tool-empire-v3 folder created on Desktop
[ ] ZIP file unzipped into tool-empire-v3 folder
[ ] VS Code opened in tool-empire-v3 folder
[ ] Claude Code extension installed in VS Code

Day 2-3:
[ ] Stripe account created, AU business verification submitted
[ ] Anthropic API account created, AU$15 credit added, API key saved
[ ] Resend account created, API key saved, from-email configured
[ ] All API keys added to .env.local (never committed to GitHub)
[ ] .gitignore confirms .env.local is excluded

Day 4+ (when needed):
[ ] Supabase project created (free tier)
[ ] LinkedIn profile set up for outreach

---

## ENV.LOCAL TEMPLATE

Create this file at /tool-empire-v3/.env.local
Never commit it to GitHub.

```
# STRIPE (AUD)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_CURRENCY=aud
STRIPE_PDF_EXPORT_PRICE=100

# ANTHROPIC
ANTHROPIC_API_KEY=sk-ant-...

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# RESEND
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=tools@toolsempire.online.au

# GOOGLE
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-...

# APP
NEXT_PUBLIC_BASE_URL=https://toolsempire.online.au
NEXT_PUBLIC_DOMAIN=toolsempire.online.au
NEXT_PUBLIC_CURRENCY=AUD
```

---

## REVENUE TIMELINE — MANUS AI VALIDATED (2026 DATA)

Month 3: AU$300-$500
Month 6: AU$2,000-$4,000
Month 9: AU$5,000-$10,000
Month 12: AU$10,000-$18,000
Month 18: AU$25,000-$40,000
Month 24: AU$50,000-$100,000

Key to hitting the high end of each range:
1. Build Track A tools in Week 1 and do LinkedIn outreach immediately
2. Apply for AdSense Day 1 (long approval wait, start now)
3. Submit every tool to Google Search Console on deploy day
4. Post on Reddit with the correct format (REDDIT_STRATEGY.md)
5. Use AGENT_QUICK_REF.md to maximize tools built per day on Pro plan

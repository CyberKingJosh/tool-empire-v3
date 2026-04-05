# MONETISATION RULES v3
# Updated based on Manus AI 2026 validation report.
# These rules determine exactly how each tool earns money.
# CRITICAL UPDATE: AdSense is no longer the sole revenue stream.
# Diversification is mandatory, not optional.

---

## THE 2026 REVENUE SPLIT — FOLLOW THIS MODEL

Google AI Overviews are reducing AdSense click-through rates.
Publishers are reporting 50-90% AdSense revenue drops on informational pages.
Tool pages with personal inputs are IMMUNE because AI cannot answer them.
But diversification is still required for a resilient business.

Target revenue split at portfolio maturity:
- AdSense: 40% of total revenue
- Pro subscriptions: 30% of total revenue
- Affiliates: 20% of total revenue
- $1 AUD PDF exports: 10% of total revenue

Build all four streams from Day 1. Never rely on AdSense alone.

---

## ADSENSE — HOW IT ACTUALLY WORKS

RPM = Revenue Per 1,000 PAGE VIEWS (not per visitor).
Each ad slot on a page earns separately.
Tier Zero tools: 3 slots × RPM = 3x the impression value per visitor.
Tier One+ tools: 2 slots maximum.

Example: 20M visitors on a Tier Zero time tool:
20M visitors × 3 slots = 60M impressions
60M ÷ 1,000 × $3 RPM = $180,000 AUD/month from one tool.

One Google AdSense account works across unlimited tools and domains.
No cap on pages. No cap on tools. One account serves everything.
Apply Day 1 — approval takes 2-4 weeks.

---

## TYPE A — FREE, ADSENSE ONLY

Used when: result appears on screen, nothing to download or save.
Examples: BMI calc, tip calc, all unit converters, all time tools, GPA calc.

Tier Zero (time, date, converters): 3 AdSense slots
  Slot 1 (top): Leaderboard 728x90 — between page header and tool input card
  Slot 2 (mid): Rectangle 300x250 — between result card and blog article
  Slot 3 (bottom): Rectangle 300x250 — below blog article, above related tools

Tier One and above: 2 AdSense slots
  Slot 1 (top): Leaderboard 728x90 — between page header and tool input card
  Slot 2 (bottom): Rectangle 300x250 — below result card

NEVER: ad slot inside the tool interaction card
NEVER: ad slot between input fields
NEVER: more than 3 slots on any single page
NEVER: ad slot that causes layout shift (use min-height placeholder)

---

## TYPE B — FREE + $1 AUD PDF EXPORT

Used when: user creates a document they need to send or save.
Examples: invoice generator, CV builder, contract generator, NDA, privacy policy.

Free tier: user fills form, sees preview on screen for free.
$1 AUD tier: pays to download as polished PDF.

Currency: AUD always. $1.00 AUD = 100 cents in Stripe.
Net after Stripe fee (1.4% + 30c AUD): approximately $0.69 AUD per transaction.

The $1 AUD button:
  Position: inside result display card, below the preview
  Label: "Download as PDF — $1"
  Sublabel: "Instant download. No account needed."
  Component: StripeExport from /tool-empire-v3/shared/components/StripeExport.tsx

Payment flow:
  1. User clicks Download button
  2. Stripe Payment Elements load inline — no redirect, no leaving the page
  3. On success: email input appears "Where should we send your PDF?"
  4. POST /api/tools/[slug]/generate-pdf runs server-side via Puppeteer
  5. Resend delivers PDF to email within 60 seconds
  6. Success state shown on page with download link

Type B tools ALSO have AdSense slots in same positions as Type A.
The $1 export is additional revenue on top of AdSense, not instead of.

---

## TYPE C — FREE TIER + SUBSCRIPTION

Used when: tool has genuine daily or weekly repeat use.
Examples: backlink checker, rank tracker, plagiarism checker, paraphrasing tool.

Free tier limits (typical):
  - 3 uses per day, or
  - 10 uses per month, or
  - Basic features only

Pro tier: $15 AUD/month (simple tools) or $19 AUD/month (suite tools)
  - Unlimited uses
  - Saved history
  - Team sharing (up to 5 members)
  - Export to CSV or PDF
  - API access

Annual option: 20% discount ($144 AUD/year or $182 AUD/year)

Pro CTA:
  Component: ProUpgrade from /tool-empire-v3/shared/components/ProUpgrade.tsx
  Position: shown ONLY when free tier limit is reached — never before
  Never show paywall before user has experienced free tier value

Subscriptions managed by: Stripe Subscriptions + Supabase Auth
Feature gating: middleware checks subscription status on protected routes

---

## TYPE D — FREE + $1 AUD EXPORT + SUBSCRIPTION

Used when: document generator also benefits from Pro features.
Examples: Invoice Generator Pro (unlimited invoices + client database + payment tracking).

Combines Type B and Type C:
  Free: fill form, see preview
  $1 AUD: one-time export per document (works for non-Pro users)
  Pro $15-19 AUD/month: unlimited exports + saved clients + custom branding

---

## AFFILIATE RECOMMENDATIONS

Every tool page includes exactly ONE affiliate recommendation box.
Position: between result section and Related Tools section.
Label: "Recommended" in 12px text above the box (required for compliance).

Australian-focused affiliate programs:
Finance tools → Xero (xero.com/au/affiliates) — $50 AUD commission
Invoice tools → MYOB (myob.com/au) — $30-80 AUD per lead
CV tools → LinkedIn Premium — $20-50 AUD per signup
SEO tools → Ahrefs — $5 trial commission
Property tools → Home loan comparison (Canstar, Finder) — lead gen $30-100 AUD
Legal tools → LawPath (lawpath.com.au/affiliates) — $20-80 AUD per signup
Health tools → MyFitnessPal Premium or Whoop — $10-20 AUD
Solar tools → Solar comparison sites — $50-200 AUD per lead

Affiliate box design:
  Background: category surface colour
  Border: 1px solid category accent at 30% opacity
  Layout: logo left, 2-line description right, CTA button right
  CTA: "Try Free" or "Get Started" — never "Buy Now"
  Always label: "Sponsored" in 12px above box

---

## WHAT NEVER TO DO

Never hide tool result behind signup wall.
Never show more than 3 AdSense slots on any page.
Never place AdSense inside the tool interaction area.
Never use multiple AdSense accounts for one site (Google bans all of them).
Never use dark patterns (fake urgency timers, hidden free options).
Never put affiliate links inside the tool interaction card itself.
Never recommend a product not genuinely relevant to the tool.
Never use USD or GBP pricing — always AUD.

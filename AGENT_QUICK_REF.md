# AGENT QUICK REFERENCE v2
# READ THIS INSTEAD OF ALL MASTER FILES SEPARATELY.
# Saves ~17,000 tokens per build. Essential on Claude Code Pro plan.
# If you need detail not here, read the specific master file.

---

## PROJECT
One domain. 1,000+ free tools. Passive income: AdSense + $1 exports + subscriptions + affiliates.
All tools at: toolsempire.online/tools/[slug]
Stack: Next.js 14 + TypeScript + Tailwind + Vercel + Stripe + Supabase

---

## TOOL TIERS (your SPEC.md tells you which tier)
Tier 0 = Volume giant. Simple build. Massive traffic. 3 AdSense slots. 20-min build.
Tier 1 = High RPM earner. $20-40 RPM. Medium complexity. Backbone revenue.
Tier 2 = AI/trending tool. Rising searches now. Low competition. Build fast.
Tier 3 = Viral tool. Built for sharing and backlinks. Not AdSense focus.

---

## MONETISATION (your SPEC.md tells you which type)
A = Free, AdSense only. 3 slots on Tier 0, 2 slots on Tier 1+.
B = Free to use, $1 AUD to export as PDF.
C = Free tier + $15-19 AUD/month Pro subscription.
D = $1 export AND Pro subscription.

---

## ADSENSE SLOT POSITIONS
Tier 0 tools (3 slots): top leaderboard + mid-page rectangle + bottom rectangle
Tier 1+ tools (2 slots): top leaderboard + bottom rectangle
NEVER inside the tool interaction card. NEVER between input fields.

---

## FRONTEND — NON-NEGOTIABLE RULES
Read FRONTEND_RULES.md for full detail. These are the critical rules:

Never use Inter, Roboto, Arial as primary fonts — they scream AI-built.
Never use purple gradient on white background.
Never require signup before showing a result.
Always mobile-first. Tool interaction above fold on 375px.
Every tool gets ONE unforgettable detail — something no other calculator does.
Design thinking FIRST: write tone, differentiation, unforgettable detail in DECISIONS.md before any code.

Font options (pick one, vary across portfolio):
- Editorial: DM Sans 700-800 display + DM Mono for numbers
- Technical: Space Grotesk 600-700 + JetBrains Mono
- Warm: Fraunces 700 + Plus Jakarta Sans
- Playful: Syne 700-800 + Outfit
- Luxury: Cormorant Garamond 600 + Jost
- Bold: Bebas Neue + Nunito

Category colours (primary | accent | surface):
time/clock: #0A0A0F | #00D4FF | #0F1117 (dark mode)
converter: #2D3A8C | #4353C0 | #F8F9FF
finance: #0F4C75 | #1B6CA8 | #F0F7FF
health: #1A5C45 | #2D8C6B | #F0FAF5
legal: #1C1C3A | #6B4FA0 | #F8F7FF
ai/tech: #0D1117 | #58A6FF | #161B22 (dark mode)
writing: #8B2FC9 | #6225A0 | #FBF8FF
property: #1A3A5C | #C9A84C | #F8F6F0
education: #F4511E | #BF360C | #FFF8F5

---

## SEO RULES
Title: '[Tool Name] Free Online | [Domain]'
H1: exact keyword match only — no added adjectives
Meta: 'Free [tool]. [One sentence what it does]. No signup. Instant results.'
URL: /tools/[keyword-slug] — never nested
Schema: SoftwareApplication for calculators, HowTo for generators
Canonical: always absolute URL
Internal links: exactly 4 related tools
Submit URL to Google Search Console on deploy day

---

## SECURITY RULES
Never: eval(), innerHTML with user input, API keys in client code
Every API route: Zod validation + rate limiting (100 req/min per IP)
Headers: already set in next.config.js — do not remove

---

## PAGE STRUCTURE (exact order)
1. ToolLayout wrapper
2. Top AdSense slot
3. H1 + one-line description
4. Tool Input Card (above fold 375px)
5. Result Display Card (count-up animation on number)
6. $1 Download button (Type B/D only, inside result card)
7. How it works section
8. Bottom AdSense slot(s)
9. Blog article section (300-500 words, evergreen, SEO)
10. Related Tools (exactly 4)
11. Affiliate box (1 product, labelled Sponsored)

---

## QUALITY CHECKLIST
[ ] Loads under 1.5s on mobile
[ ] Design tone chosen and written in DECISIONS.md before coding
[ ] One unforgettable detail implemented
[ ] Font from approved list, not Inter/Roboto/Arial
[ ] Category colour palette used exactly
[ ] Mobile-first, tested 375px 768px 1200px
[ ] All inputs validated client + server
[ ] SEO: title H1 meta schema canonical all correct
[ ] Correct number of AdSense slots in correct positions
[ ] Related Tools = exactly 4
[ ] API routes rate-limited + Zod validated
[ ] No console.log in production
[ ] No TypeScript any types
[ ] Status.md updated to BUILT when done
[ ] BUILD_LOG.md updated after every step
[ ] Image prompts written in DECISIONS.md

---

## COMPETITOR RESEARCH STEP (do before any code — read COMPETITOR_RESEARCH_RULES.md for full detail)

Search your tool's exact target keyword. Check top 3 results. Answer in DECISIONS.md:
1. Is each result a real interactive tool or just a blog post?
2. What are the top 3 weaknesses of the best existing tool?
3. Does this tool need a paid API? Check the API Cost column in TOOLS_INPUT.md.
   FREE = build normally. YELLOW = use the free API listed. RED = only build as Type B or C.
4. Is Australian-specific data needed? If yes, hardcode ATO/state rates with "as of [quarter]" label.

The three fastest-to-beat competitor weaknesses are:
- Requires signup before showing result (yours never does)
- No mobile optimisation (yours is always mobile-first)
- Uses US/UK data for an Australian audience (yours uses AU data by default)

---

## CONTEXT RECOVERY
Read BUILD_LOG.md. Find last completed step. Resume from next step.
Say: "Read BUILD_LOG.md and resume from where it stopped."

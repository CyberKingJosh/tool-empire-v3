# MASTER ARCHITECT PROMPT — v3
# ═══════════════════════════════════════════════════════════════════
# HOW TO USE THIS FILE:
# 1. On your computer, create a folder called tool-empire-v3
# 2. Unzip tool-empire-v3-FINAL.zip into that folder
# 3. Open VS Code
# 4. File → Open Folder → select tool-empire-v3
# 5. Install Claude Code extension if not already installed
# 6. Open this file in VS Code
# 7. Copy EVERYTHING between START COPY HERE and END COPY HERE
# 8. Open Claude Code panel, paste, press Enter
# 9. Walk away. It runs 3-6 hours. Come back to 1000+ tool folders.
# ═══════════════════════════════════════════════════════════════════

# ─────────────────────── START COPY HERE ────────────────────────────

You are the Master Architect for a micro SaaS tool portfolio.
Your working directory is /tool-empire-v3/
All files you create or reference live inside /tool-empire-v3/
Never reference a path outside this folder.

Read this entire prompt before taking any action. Do not skip phases.

---

## ABOUT THIS BUSINESS

One domain. 1,000+ free online tools. Four revenue streams:
1. Google AdSense — 40% of revenue. 3 slots on Tier Zero tools, 2 on others.
2. $1 AUD PDF exports — 10% of revenue. Document generator tools.
3. Pro subscriptions $15-19 AUD/month — 30% of revenue. Daily-use tools.
4. Affiliate commissions — 20% of revenue. One recommendation per tool page.

Based in Australia. Tools are global but default to Australian data where relevant.
Zero paid advertising. Growth through Google SEO, Reddit, Product Hunt, LinkedIn.
Target: $100,000 AUD/month by Month 12. $1,000,000 AUD/month by Month 24.

---

## FILES ALREADY IN /tool-empire-v3/ — READ ALL OF THEM

| File | What it contains | When agents read it |
|------|-----------------|---------------------|
| MASTER.md | Project overview, tier system, revenue model | Every agent, first |
| AGENT_QUICK_REF.md | Compressed rules for all agents — saves tokens | Every agent, required |
| FRONTEND_RULES.md | Complete design system from Claude frontend skill | Every agent, required |
| VIBE_CODING_AVOIDANCE.md | What never to build | Every agent, required |
| COMPETITOR_RESEARCH_RULES.md | How to research competitors + API cost flags | Every agent, required |
| DESIGN_SYSTEM.md | Colour palettes, typography, spacing | Every agent |
| TECH_STACK.md | Next.js config, packages, env vars | Every agent |
| SEO_RULES.md | Title, meta, schema, internal links, AI Overview strategy | Every agent |
| MONETISATION_RULES.md | AdSense slots, $1 export, subscription rules, 40/30/20/10 split | Every agent |
| TOOLS_INPUT.md | All 200+ tools with data, tiers, API cost flags | Architect only |
| PRIORITY_LIST.md | Ranked build order — you fill this | Architect fills, agents read |
| BUILD_STATUS.md | Live tracker | Architect + agents update |
| MARKETING_STRATEGY.md | Reddit, Product Hunt, LinkedIn, N8N, blog strategy | Reference |
| REDDIT_STRATEGY.md | Subreddit map, post templates | Reference |
| PRODUCT_HUNT_STRATEGY.md | Launch calendar, assets | Reference |
| LAUNCH_SEQUENCE.md | Day by day plan with Track A first | Reference |
| COSTS_AND_SETUP.md | Every account, cost in AUD, token management | Reference |
| IMAGE_AND_LOGO_PROMPTS.md | Logo/image prompt templates for free AI tools | Every agent |
| DESIGN_RESEARCH.md | Research findings from top tool sites (time.is, calculator.net, etc.) | Every agent |
| TIME_TOOL_PATTERN.md | Correct React pattern for live clocks (hydration, tabular-nums) | Time tool agents |
| SCREENSHOT_REVIEW.md | Playwright MCP screenshot workflow — competitor + our site + summary | Every agent, mandatory |
| STRIPE_SETUP.md | One Stripe account setup for all 1,000 tools | Reference |
| AWDRA_ANSWERS.md | Pre-filled answers for /web-build (AWDRA) skill integration | Every agent using /web-build |

---

## PHASE 1 — READ AND VALIDATE ALL EXISTING FILES

STEP 1A: Read every file listed in the table above. Start with MASTER.md.
Read them in order. Do not skip any. Understand the complete system before proceeding.

STEP 1B: Research anti-vibe-coding patterns. Search:
- "vibe coding websites problems 2026"
- "how to spot AI generated website design"
- "why do AI built tools all look the same 2026"
Read VIBE_CODING_AVOIDANCE.md. Add anything new from your research.

STEP 1C: Read /mnt/skills/public/frontend-design/SKILL.md if it exists.
Read FRONTEND_RULES.md. Confirm they align. If the skill file has rules
not in FRONTEND_RULES.md, add them.

STEP 1D: Research premium tool design by fetching these pages:
- time.is (study their minimalist light-background time display)
- calculator.net
- timeanddate.com (note: they use LIGHT backgrounds for content areas)
- nerdwallet.com/calculators
Read DESIGN_SYSTEM.md and DESIGN_RESEARCH.md. Confirm they align.
Time/clock tools use a LIGHT theme (primary #1B2A4A, surface #F8FAFC).
The old dark theme has been removed based on research — see DESIGN_RESEARCH.md.
Time tools must read TIME_TOOL_PATTERN.md for the correct React clock pattern.

---

## PHASE 2 — EXPAND AND RANK THE TOOL LIST

STEP 2A: Read TOOLS_INPUT.md completely.
Note the four sections:
- Track A (3 tools — build first for immediate LinkedIn/Reddit revenue)
- 30 Emerging Tools (low competition, rising searches, build second)
- Tier Zero (volume giants — time, date, converters — build third)
- Tier One, Two, Three (build fourth onwards)

STEP 2B: Search the web to find additional tools not in TOOLS_INPUT.md.
Focus on: Australian-specific calculators with no good existing tools,
AI-related tools with rising 2026 search volume,
simple utility tools where existing results are outdated blog posts.
Add findings to TOOL_RESEARCH_ADDITIONS.md.

STEP 2C: Rank every tool by Priority Score.
Formula: (Monthly_Volume / 1000) x RPM x (1 / Difficulty_Score)
Difficulty: Easy=1, Medium=2, Hard=4

HOWEVER — override the formula for these categories:
Track A tools always rank 001, 002, 003 regardless of score.
Emerging tools with Beat Difficulty 1 rank above Tier Zero tools.
The build order is: Track A → Emerging Beat-1 → Emerging Beat-2-3 → Tier Zero → Tier One.

Output PRIORITY_LIST.md with columns:
Rank | Name | Target Query | Volume | RPM | Difficulty | Score | Type | Tier | Build Time | API Cost

API Cost column: FREE / YELLOW / RED (from TOOLS_INPUT.md — never build RED tools as Type A)

---

## PHASE 3 — CREATE ALL TOOL FOLDERS

For every tool in PRIORITY_LIST.md create:
/tool-empire-v3/tools/[NNN]-[slug]/
  AGENT_PROMPT.md
  SPEC.md
  BUILD_LOG.md  (empty)
  STATUS.md     (contains: NOT_STARTED)
  DECISIONS.md  (empty)

NNN = 3-digit rank from PRIORITY_LIST.md (001, 002, 003...)
slug = URL-safe tool name with hyphens (invoice-generator-australia)

Also create these folders:
/tool-empire-v3/shared/components/
/tool-empire-v3/shared/lib/
/tool-empire-v3/shared/api/
/tool-empire-v3/aios/workflows/
/tool-empire-v3/public/logos/
/tool-empire-v3/public/og/
/tool-empire-v3/blog/

---

## PHASE 4 — WRITE SPEC.MD FOR EVERY TOOL

For each tool write its SPEC.md:

```
# SPEC: [Tool Name]

Name: [Full tool name]
Slug: [url-slug]
Priority Rank: [NNN]
Target Keyword: [exact search query]
Monthly Search Volume: [number]
Keyword Difficulty: [Easy/Medium/Hard]
RPM Estimate: $[number] AUD
Priority Score: [calculated]
Monetisation Type: [A/B/C/D]
Build Tier: [0/1/2/3 or Track A or Emerging]
Estimated Build Time: [X] minutes
Tool Category: [time/finance/health/legal/writing/seo/property/education/ai/general/viral]
API Cost: [FREE/YELLOW/RED]
Beat Difficulty: [1-5 or N/A] — from COMPETITOR_RESEARCH_RULES.md table

Free Tier Does: [what free users get]
$1 AUD Export: [Yes — PDF of X / No]
Pro Tier Does: [Pro features / N/A]

Competitor 1: [domain] — Weakness: [what is wrong with it]
Competitor 2: [domain] — Weakness: [what is wrong with it]
Competitor 3: [domain] — Weakness: [what is wrong with it]

Related Tools:
1. [tool name] at /tools/[slug]
2. [tool name] at /tools/[slug]
3. [tool name] at /tools/[slug]
4. [tool name] at /tools/[slug]

Affiliate Recommendation: [Product name] — [why relevant] — [affiliate URL]
Australian Data Required: [Yes — list what data / No]
```

---

## PHASE 5 — BUILD SHARED COMPONENTS

Read TECH_STACK.md, FRONTEND_RULES.md, and DESIGN_SYSTEM.md before writing any component code.

Build these in /tool-empire-v3/shared/components/:

ToolLayout.tsx
- Master page wrapper for every tool page
- Props: title, description, canonical, schemaType, toolCategory, tier
- Contains: HTML head with SEO meta, schema.org markup, GA4 script, AdSense auto-ads
- Tier Zero tools: 3 AdSense slots. All other tools: 2 AdSense slots.
- toolCategory selects correct colour palette from DESIGN_SYSTEM.md
- Tier Zero time tools use LIGHT theme (primary #1B2A4A, surface #F8FAFC) — see DESIGN_RESEARCH.md
- Also accepts optional logoPath prop for tool logos

AdSenseSlot.tsx
- Renders one AdSense slot
- Props: position ('top'|'mid'|'bottom'), className
- Only renders if NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set
- Handles ad blocker gracefully, no console errors

StripeExport.tsx
- Complete $1 AUD PDF export flow
- Stripe Payment Elements inline (no redirect)
- On success: email input → Resend PDF delivery → success state
- Uses AUD currency throughout (not USD, not GBP)

RelatedTools.tsx
- Shows exactly 4 related tools
- Props: tools array of 4 objects
- 2-column mobile, 4-column desktop

ProUpgrade.tsx
- Pro subscription CTA
- Shows only when free tier limit reached
- Never shows before user has experienced free value

ToolInput.tsx
- Reusable input field
- 16px minimum font (prevents iOS zoom)
- 48px minimum height (touch target)
- Specific placeholders: "e.g. $850,000" not "Enter value"

ResultDisplay.tsx
- Result with count-up animation (400ms)
- Copy button, share button (URL with inputs as query params)
- If showStripeExport: renders StripeExport below result
- aria-live region for screen readers

Build shared API routes in /tool-empire-v3/shared/api/:
- create-payment-intent.ts (AUD currency, Zod validation, rate limited)
- create-subscription.ts (AUD pricing, rate limited)
- webhook.ts (Stripe signature verification)
- generate-pdf.ts (Puppeteer, rate limited 20/min)
- send-pdf.ts (Resend, rate limited 10/min)

All API routes must: validate with Zod, rate limit (100 req/min per IP),
return no error details to client, log errors server-side only.

---

## PHASE 6 — WRITE AGENT_PROMPT.MD FOR EVERY TOOL

This is the most important phase. Every AGENT_PROMPT.md must be completely
self-contained so an agent can build the tool without asking any questions.

Each AGENT_PROMPT.md uses this exact structure:

---
You are building Tool #[NNN]: [TOOL NAME]
Your working directory is /tool-empire-v3/

FIRST — Read these files in this exact order:
1. /tool-empire-v3/MASTER.md
2. /tool-empire-v3/AGENT_QUICK_REF.md — critical, read every word
3. /tool-empire-v3/FRONTEND_RULES.md — read every word, follow exactly
4. /tool-empire-v3/VIBE_CODING_AVOIDANCE.md — read every word, violate nothing
5. /tool-empire-v3/DESIGN_RESEARCH.md — understand what top sites actually look like
6. /tool-empire-v3/COMPETITOR_RESEARCH_RULES.md — read before any code
7. /tool-empire-v3/SCREENSHOT_REVIEW.md — understand the visual review process
8. /tool-empire-v3/tools/[NNN]-[slug]/SPEC.md — your specific tool data
9. If this is a time/clock tool: /tool-empire-v3/TIME_TOOL_PATTERN.md — mandatory

TOOL SUMMARY:
Name: [Tool Name]
Target keyword: [exact query]
Monthly volume: [number]
Difficulty: [Easy/Medium/Hard]
RPM: $[number] AUD
Monetisation: Type [A/B/C/D]
Tier: [0/1/2/3/Track A/Emerging]
Build time estimate: [X] minutes
Category: [category name]
API Cost: [FREE/YELLOW/RED]
Beat difficulty: [1-5]
Free tier: [description]
$1 AUD export: [Yes/No]
Pro tier: [description or N/A]
Competitors and their weaknesses: [from SPEC.md]
Australian data needed: [Yes/No — what data]
Related tools: [4 tools with slugs]
Affiliate: [product + why relevant]

DESIGN BRIEF — Write this in DECISIONS.md before any code:
1. Tone: [pick ONE from FRONTEND_RULES.md list — not "modern and clean"]
2. Differentiation: [what makes this unforgettable vs competitors]
3. Unforgettable detail: [the one thing no other calculator does]
4. Font pairing: [pick one from FRONTEND_RULES.md approved list]
5. Colour palette: [exact hex values from DESIGN_SYSTEM.md for this category]

COMPETITOR RESEARCH — Do this before any code (GENUINE research, not imagination):
Search "[target keyword]" on the web. Open the actual top 3 results.
Spend real time understanding their visual approach and weaknesses.
Write in DECISIONS.md under COMPETITOR RESEARCH:
- Is each result a real interactive tool or just a blog post?
- What does each competitor's page actually look like? (colours, layout, typography)
- Top 3 specific weaknesses you will exploit (be concrete, not generic)
- Three documented design decisions about how YOUR tool will look different
- Confirm API Cost: FREE/YELLOW/RED
- Confirm Australian data: what rates/values to hardcode
Do NOT skip this step. Do NOT make up competitor names. Search and find real ones.

BUILD STEPS — Update BUILD_LOG.md after each step:

Step 1: Create /tool-empire-v3/src/app/tools/[slug]/page.tsx
Import ToolLayout from shared. Set all props correctly.
Tier: [tier number] determines number of AdSense slots.
Tool interaction must be above fold on 375px mobile. Non-negotiable.

Step 2: Create /tool-empire-v3/src/lib/tools/[slug].ts
Pure TypeScript calculation/generation logic. No React. No UI.
Zod validation on all inputs.
Handle: empty input (return null), division by zero, negatives, enormous numbers.
Australian data hardcoded with "as of [Q1 2026]" label where applicable.

Step 3: Build tool-specific UI components
Follow FRONTEND_RULES.md category colour palette exactly.
Implement the unforgettable detail from your DECISIONS.md.
Mobile first: design 375px first, then 768px, then 1200px.
Use shared components: ToolInput, ResultDisplay, ToolLayout.

Step 4: Wire monetisation
Type A: confirm AdSense slots in correct positions per MONETISATION_RULES.md
Type B: StripeExport inside ResultDisplay, AUD pricing
Type C: ProUpgrade shows at free tier limit only
Type D: both B and C

Step 5: Add blog article section (300-500 words)
Evergreen question answered immediately in first paragraph.
Natural internal link to 2-3 related tools.
Australian context where relevant.
AdSense slot below article on Type A/B tools.

Step 6: Related Tools section
Import RelatedTools from shared.
Pass exact 4 tools from SPEC.md.

Step 7: API route (only if tool needs server-side logic)
/tool-empire-v3/src/app/tools/[slug]/api/route.ts
Zod validation. Rate limited. No client-exposed errors.

Step 8: SEO audit
Title: '[Tool Name] Free Online | [Domain]'
H1: exact target keyword match only
Meta: 'Free [tool]. [one sentence]. No signup. Instant results.'
Schema: SoftwareApplication or HowTo
Canonical: absolute URL
Does this query trigger Google AI Overview? If yes — add personal input
fields that require the user's own numbers. AI Overview cannot answer
personalised calculations. Tool pages with personal inputs are immune.

Step 9: Security audit
No eval(). No innerHTML with user input. No API keys in client code.
All API routes: Zod + rate limiting. CSP headers in next.config.js.
Confirm .env.local has all required vars. None prefixed NEXT_PUBLIC_ except safe ones.

Step 10: Image prompts
Write three prompts in DECISIONS.md under IMAGE GENERATION PROMPTS:
- Logo prompt for Ideogram (free at ideogram.ai) — specify 4K
- Hero image prompt for Ideogram (free at ideogram.ai) — specify 4K
- OG card: design in Canva free tier (canva.com) — 1200x630px
Follow templates in IMAGE_AND_LOGO_PROMPTS.md exactly.
DO NOT USE: Microsoft Designer, Google AI Studio.

Step 11: Quality checklist
[ ] Loads under 1.5s on mobile
[ ] Design tone chosen and written in DECISIONS.md before coding
[ ] Genuine competitor research done — 3 real sites analysed, not imagined
[ ] Three design decisions documented in DECISIONS.md before any code
[ ] One unforgettable detail implemented
[ ] Font from FRONTEND_RULES.md approved list — not Inter/Roboto/Arial
[ ] Category colour palette used exactly from DESIGN_SYSTEM.md
[ ] Mobile-first, tested at 375px 768px 1200px
[ ] All inputs validated client AND server side
[ ] Edge cases: empty, invalid, negative, very large numbers all handled
[ ] Title, H1, meta, schema, canonical all correct per SEO_RULES.md
[ ] Correct AdSense slot count and positions per MONETISATION_RULES.md
[ ] Blog article section present (300-500 words)
[ ] Related Tools uses shared component with currentSlug and category props
[ ] Affiliate box has real href, company logo via Clearbit, labelled "Sponsored"
[ ] All API routes: Zod + rate limited + no client error leaking
[ ] No console.log in production code
[ ] No TypeScript any types
[ ] AUD used throughout — not USD or GBP
[ ] Australian data hardcoded with date label where applicable
[ ] Three image prompts written in DECISIONS.md
[ ] logoPath prop set on ToolLayout
[ ] Tool added to /shared/lib/builtTools.ts BUILT_TOOLS array

Step 12: Screenshot workflow (MANDATORY — see SCREENSHOT_REVIEW.md)
This step has THREE parts. All three are required. Do not skip any.

PART A — COMPETITOR SCREENSHOTS (before writing code — do this during Step 1):
Use the Playwright MCP to navigate to the top 3 competitor pages and screenshot each.
Save to /screenshots/[slug]/competitors/ as competitor1.png, competitor2.png, competitor3.png.
Write research-notes.md in the same folder with layout, colours, fonts, what to reference/avoid.

PART B — OUR SITE SCREENSHOTS (after deploying or starting dev server):
Use the Playwright MCP to screenshot our tool page.
Save to /screenshots/[slug]/ours/ as v1.png (increment v2, v3 for revisions).
Write visual-review.md using the full checklist from SCREENSHOT_REVIEW.md.
Fix any issues, take new versioned screenshot, repeat until all checks pass.

PART C — SUMMARY FILE:
Create /screenshots/[slug]/summary.md linking competitor screenshots (with URLs and notes)
to our versioned screenshots (with changes per version) and a final comparison note.

Folder structure:
/screenshots/[slug]/competitors/ → competitor1-3.png + research-notes.md
/screenshots/[slug]/ours/ → v1.png, v2.png + visual-review.md
/screenshots/[slug]/summary.md

Add one line to SCREENSHOT_REVIEW_LOG.md with slug, date, and result.

Step 13: Mark complete
Update /tool-empire-v3/tools/[NNN]-[slug]/STATUS.md: NOT_STARTED → BUILT
Update /tool-empire-v3/BUILD_STATUS.md: add tool with status BUILT
Final BUILD_LOG.md entry: "All 13 steps complete. [Tool Name] is BUILT."
Do NOT mark as BUILT until screenshots are saved and reviewed.

CONTEXT RECOVERY RULE:
If interrupted: open new Claude Code session. Say:
"Read BUILD_LOG.md in /tool-empire-v3/tools/[NNN]-[slug]/ and resume from where it stopped."
Never redo a step already marked complete in the log.
---

Write this template, filled with real data from SPEC.md, for every tool.

---

## PHASE 7 — FINAL SETUP

Build LAUNCH_SEQUENCE.md update:
Confirm Day 1 tasks include Track A tools 001-003 (Invoice Generator, CV Builder, AI Token Counter).
These are for LinkedIn outreach this week, not waiting for Google.

Update BUILD_STATUS.md with:
- Total tools in the system
- Breakdown: Track A (3), Emerging Beat-1 (14), Emerging Beat-2-3 (12),
  Tier Zero (50+), Tier One (30+), Tier Two (15+), Tier Three (4)
- Breakdown by type: A / B / C / D
- Breakdown by API cost: FREE / YELLOW / RED

Print completion summary to terminal:
  ══════════════════════════════════
  TOOL EMPIRE V3 — SYSTEM READY
  ══════════════════════════════════
  Working directory: /tool-empire-v3/
  Total tools: [X]
  Track A (build Week 1): 3
  Emerging Beat-1 (build Week 2): 14
  Tier Zero time tools: [X]
  Tier One high RPM: [X]
  Tier Two AI tools: [X]
  Tier Three viral: 4
  RED tools (need subscription to cover API): [X]
  YELLOW tools (free API available): [X]
  FREE tools (pure logic, no API): [X]
  Shared components built: Yes
  All AGENT_PROMPT.md files written: Yes
  ══════════════════════════════════
  NEXT ACTION FOR THE HUMAN:
  Week 1: Build tools 001-003 (Track A) for LinkedIn outreach
  Then: Build tools 004-017 (Emerging Beat-1) for fast Google ranking
  Then: Build 2-3 Tier Zero tools per day as the passive engine
  Run 1 agent per session on Claude Code Pro plan
  Open multiple VS Code windows for parallel builds on Max plan
  ══════════════════════════════════

# ─────────────────────── END COPY HERE ─────────────────────────────

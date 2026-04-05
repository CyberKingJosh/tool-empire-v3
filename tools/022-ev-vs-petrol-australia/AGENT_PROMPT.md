---
You are building Tool #022: EV vs Petrol Australia
Your working directory is /tool-empire-v3/

FIRST — Read these files in this exact order:
1. /tool-empire-v3/MASTER.md
2. /tool-empire-v3/AGENT_QUICK_REF.md — critical, read every word
3. /tool-empire-v3/FRONTEND_RULES.md — read every word, follow exactly
4. /tool-empire-v3/VIBE_CODING_AVOIDANCE.md — read every word, violate nothing
5. /tool-empire-v3/COMPETITOR_RESEARCH_RULES.md — read before any code
6. /tool-empire-v3/tools/022-ev-vs-petrol-australia/SPEC.md — your specific tool data

TOOL SUMMARY:
Name: EV vs Petrol Australia
Target keyword: ev vs petrol cost calculator australia 2026
Monthly volume: 35,000
Difficulty: Easy
RPM: $18 AUD
Monetisation: Type A
Tier: Emerging
Build time estimate: 30 min
Category: general
API Cost: FREE
Beat difficulty: 5
Free tier: Full ev vs petrol australia with instant results, sharing, and copy
$1 AUD export: No
Pro tier: N/A
Competitors and their weaknesses:
- calculator.net: Old design, not mobile-first
- rapidtables.com: Ad-heavy, cluttered
- online-calculator.com: Basic, no sharing or explanation

Australian data needed: Yes — Australian electricity rates, petrol prices by state where applicable
Related tools:
- Carbon Footprint Commute AU at /tools/carbon-footprint-commute-au
- Solar Payback QLD at /tools/solar-payback-qld
- Home Battery Storage NSW at /tools/home-battery-storage-nsw
- Password Generator at /tools/password-generator

Affiliate: Notion — All-in-one workspace for notes and tools — notion.so

DESIGN BRIEF — Write this in DECISIONS.md before any code:
1. Tone: brutally minimal
2. Differentiation: Zero-friction: result appears instantly, copy/share buttons always visible, no page reload
3. Unforgettable detail: The result card has a subtle glassmorphism effect that refracts the background color
4. Font pairing: Editorial Authority (DM Sans 700-800 + DM Mono)
5. Colour palette: Primary #2D3A8C | Accent #4353C0 | Surface #F8F9FF | Text #0D1124 | Result #00ACC1

COMPETITOR RESEARCH — Do this before any code:
Search "ev vs petrol cost calculator australia 2026". Open top 3 results.
Write in DECISIONS.md under COMPETITOR RESEARCH:
- Is each a real tool or a blog post?
- Top 3 weaknesses you will fix
- Confirm API Cost: FREE
- Confirm Australian data: what rates/values to hardcode

BUILD STEPS — Update BUILD_LOG.md after each step:

Step 1: Create /tool-empire-v3/src/app/tools/ev-vs-petrol-australia/page.tsx
Import ToolLayout from shared. Set all props correctly.
Tier: Emerging — 2 AdSense slots.
Tool interaction must be above fold on 375px mobile. Non-negotiable.

Step 2: Create /tool-empire-v3/src/lib/tools/ev-vs-petrol-australia.ts
Pure TypeScript calculation/generation logic. No React. No UI.
Zod validation on all inputs.
Handle: empty input (return null), division by zero, negatives, enormous numbers.
Australian data hardcoded with 'as of Q1 2026' label where applicable.

Step 3: Build tool-specific UI components
Follow FRONTEND_RULES.md category colour palette exactly.
Implement the unforgettable detail from your DECISIONS.md.
Mobile first: design 375px first, then 768px, then 1200px.
Use shared components: ToolInput, ResultDisplay, ToolLayout.

Step 4: Wire monetisation
Type A: confirm 2 AdSense slots in correct positions per MONETISATION_RULES.md

Step 5: Add blog article section (300-500 words)
Evergreen question answered immediately in first paragraph.
Natural internal link to 2-3 related tools.
Australian context where relevant.
AdSense slot below article.

Step 6: Related Tools section
Import RelatedTools from shared.
Pass exact 4 tools from SPEC.md.

Step 7: API route (only if tool needs server-side logic)
/tool-empire-v3/src/app/tools/ev-vs-petrol-australia/api/route.ts
Zod validation. Rate limited. No client-exposed errors.

Step 8: SEO audit
Title: 'EV vs Petrol Australia Free Online | [Domain]'
H1: exact target keyword match only
Meta: 'Free ev vs petrol australia. [one sentence]. No signup. Instant results.'
Schema: SoftwareApplication
Canonical: absolute URL
Does this query trigger Google AI Overview? If yes — add personal input
fields that require the user's own numbers.

Step 9: Security audit
No eval(). No innerHTML with user input. No API keys in client code.
All API routes: Zod + rate limiting. CSP headers in next.config.js.
Confirm .env.local has all required vars.

Step 10: Image prompts
Write three prompts in DECISIONS.md under IMAGE GENERATION PROMPTS:
- Logo prompt for Ideogram (free at ideogram.ai) — specify 4K
- Hero image prompt for Google Imagen 3 (free at aistudio.google.com) — specify 4K
- OG card prompt for Microsoft Designer (free at designer.microsoft.com) — 1200x630px
Follow templates in IMAGE_AND_LOGO_PROMPTS.md exactly.

Step 11: Quality checklist
[ ] Loads under 1.5s on mobile
[ ] Design tone chosen and written in DECISIONS.md before coding
[ ] One unforgettable detail implemented
[ ] Font from FRONTEND_RULES.md approved list — not Inter/Roboto/Arial
[ ] Category colour palette used exactly from DESIGN_SYSTEM.md
[ ] Mobile-first, tested at 375px 768px 1200px
[ ] All inputs validated client AND server side
[ ] Edge cases: empty, invalid, negative, very large numbers all handled
[ ] Title, H1, meta, schema, canonical all correct per SEO_RULES.md
[ ] Correct AdSense slot count (2) and positions per MONETISATION_RULES.md
[ ] Blog article section present (300-500 words)
[ ] Related Tools = exactly 4 matching SPEC.md
[ ] All API routes: Zod + rate limited + no client error leaking
[ ] No console.log in production code
[ ] No TypeScript any types
[ ] AUD used throughout — not USD or GBP
[ ] Australian data hardcoded with date label
[ ] Three image prompts written in DECISIONS.md
[ ] STATUS.md updated to BUILT
[ ] BUILD_STATUS.md updated

Step 12: Mark complete
Update /tool-empire-v3/tools/022-ev-vs-petrol-australia/STATUS.md: NOT_STARTED → BUILT
Update /tool-empire-v3/BUILD_STATUS.md: add tool with status BUILT
Final BUILD_LOG.md entry: "All 12 steps complete. EV vs Petrol Australia is BUILT."

CONTEXT RECOVERY RULE:
If interrupted: open new Claude Code session. Say:
"Read BUILD_LOG.md in /tool-empire-v3/tools/022-ev-vs-petrol-australia/ and resume from where it stopped."
Never redo a step already marked complete in the log.
---

## Step 6 — Preview & Verify
After building, run the dev server and verify your tool works:

```bash
cd /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3
npm run dev
```

Then open: **http://localhost:3000/tools/ev-vs-petrol-australia**

Verify:
1. Tool loads without errors
2. Inputs work and produce correct results
3. Layout is responsive (resize browser to 320px width)
4. Copy and share buttons function
5. No console errors in browser DevTools

**Do not mark this tool as complete until you have confirmed it renders correctly at localhost.**

---
## SYSTEM RULES ADDED — READ BEFORE BUILDING

RELATED TOOLS RULE:
Never hardcode tool names, descriptions, or hrefs in the related tools section.
Import RelatedTools from /tool-empire-v3/shared/components/RelatedTools.tsx
Pass currentSlug and category as props. The component reads builtTools.ts automatically.
If no related tools exist yet the section renders nothing — this is correct.

AFTER DEPLOYING THIS TOOL — DO THIS IMMEDIATELY:
Open /tool-empire-v3/shared/lib/builtTools.ts
Add this tool to the BUILT_TOOLS array:
{ name: "[Tool Name]", slug: "[slug]", description: "[one sentence]", category: "[category]" }
Then: vercel --prod

LOGO AND IMAGES RULE:
Every tool needs 3 images generated free at ideogram.ai
1. Logo → /public/logos/[slug].png (512x512px square)
2. Hero → /public/hero/[slug].jpg (wide 16:9)
3. OG card → /public/og/[slug].png (1200x630px, use Canva)
Agent writes the prompts in DECISIONS.md under IMAGE GENERATION PROMPTS.
Human generates images and places files in /public/ folders then runs vercel --prod.
ToolLayout accepts logoPath prop — set it to "/logos/[slug].png"

STRIPE RULE:
One Stripe account handles all 1,000 tools. See STRIPE_SETUP.md.
Nothing to set up per tool. The shared payment system works automatically.

---
## QUALITY STANDARDS UPDATE — MARCH 2026

READ THESE FILES BEFORE BUILDING (in addition to existing read list):
- /tool-empire-v3/DESIGN_RESEARCH.md — what top tool sites actually look like
- /tool-empire-v3/SCREENSHOT_REVIEW.md — Playwright MCP screenshot workflow (mandatory, 3 parts)
- If this is a time/clock tool: /tool-empire-v3/TIME_TOOL_PATTERN.md

TIME TOOL PALETTE CHANGE:
Time and clock tools now use a LIGHT theme, not dark.
Primary: #1B2A4A | Accent: #3B82F6 | Surface: #F8FAFC | Text: #1E293B | Result: #0F172A
The old dark palette (#0A0A0F / #00D4FF / #00FF88) is removed.
See DESIGN_RESEARCH.md for why — time.is and timeanddate.com both use light backgrounds.
Time displays must use font-variant-numeric: tabular-nums.

GENUINE COMPETITOR RESEARCH (not imagination):
Before writing any code, search the target keyword on the web.
Open the actual top 3 results. Study their visual approach.
Write three specific design decisions in DECISIONS.md about how your tool will look different.
Do NOT make up competitor names or weaknesses. Find real ones.

SCREENSHOT WORKFLOW (mandatory — uses Playwright MCP — cannot skip):
This step has THREE required parts. Follow SCREENSHOT_REVIEW.md exactly.
PART A: Use Playwright MCP to screenshot top 3 competitor pages. Save to /screenshots/[slug]/competitors/ with research-notes.md.
PART B: Use Playwright MCP to screenshot our tool page. Save to /screenshots/[slug]/ours/ as v1.png. Write visual-review.md. Fix issues, re-screenshot as v2, v3 until all checks pass.
PART C: Create /screenshots/[slug]/summary.md linking competitor screenshots to our versions with a final comparison note. Add result to SCREENSHOT_REVIEW_LOG.md.
Do NOT mark STATUS.md as BUILT until all three parts (A, B, C) are complete and visual review passes.

AFFILIATE BOX:
Use real company logos via Clearbit: https://logo.clearbit.com/[domain]
Button must be a real <a> tag with href, target="_blank", rel="noopener noreferrer sponsored"
Research the company's affiliate program and document signup URL in DECISIONS.md.

DEPLOYMENT STEP:
Read /tool-empire-v3/DEPLOYMENT_STATUS.md first.
If DOMAIN_PURCHASED is NO:
  Run: npm run dev
  Open browser to: http://localhost:3000/tools/[slug]
  Run the full SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md (Parts A, B, C) using Playwright MCP
  Log review in SCREENSHOT_REVIEW_LOG.md
  Mark STATUS.md as BUILT_LOCAL
  Tell the human: "Preview ready at http://localhost:3000/tools/[slug] — screenshots saved to /screenshots/[slug]/"
If DOMAIN_PURCHASED is YES:
  Run: vercel --prod
  Run the full SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md (Parts A, B, C) using Playwright MCP on live URL
  Mark STATUS.md as BUILT_LOCAL
Do NOT run vercel --prod when DOMAIN_PURCHASED is NO. It will fail and waste tokens.

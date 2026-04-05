---
You are building Tool #137: Heart Rate Zone Calculator
Your working directory is /tool-empire-v3/

FIRST — Read these files in this exact order:
1. /tool-empire-v3/MASTER.md
2. /tool-empire-v3/AGENT_QUICK_REF.md — critical, read every word
3. /tool-empire-v3/FRONTEND_RULES.md — read every word, follow exactly
4. /tool-empire-v3/VIBE_CODING_AVOIDANCE.md — read every word, violate nothing
5. /tool-empire-v3/COMPETITOR_RESEARCH_RULES.md — read before any code
6. /tool-empire-v3/tools/137-heart-rate-zone-calculator/SPEC.md — your specific tool data

TOOL SUMMARY:
Name: Heart Rate Zone Calculator
Target keyword: heart rate zone calculator
Monthly volume: 2,000,000
Difficulty: Easy
RPM: $6 AUD
Monetisation: Type A
Tier: 1
Build time estimate: 25 min
Category: health
API Cost: FREE
Beat difficulty: N/A
Free tier: Full heart rate zone calculator with instant results, sharing, and copy
$1 AUD export: No
Pro tier: N/A
Competitors and their weaknesses:
- calculator.net/bmi-calculator: US-focused, old design
- healthdirect.gov.au: Government info only, no interactive tool
- myfitnesspal.com: Requires signup before any result

Australian data needed: No
Related tools:
- Gut Health Score at /tools/gut-health-score
- Sleep Debt Calculator at /tools/sleep-debt-calculator
- Biological Age Calculator at /tools/biological-age-calculator
- Hormone Cycle Planner at /tools/hormone-cycle-planner

Affiliate: MyFitnessPal Premium — Track macros and nutrition goals — myfitnesspal.com/premium

DESIGN BRIEF — Write this in DECISIONS.md before any code:
1. Tone: organic natural
2. Differentiation: Result comes with a personalized health insight — not just a number but what it means for YOU
3. Unforgettable detail: The result color shifts from red to green based on how healthy the number is — instant visual feedback
4. Font pairing: Warm Human (Fraunces 700 + Plus Jakarta Sans)
5. Colour palette: Primary #1A5C45 | Accent #2D8C6B | Surface #F0FAF5 | Text #0D2B1F | Result #F4845F

COMPETITOR RESEARCH — Do this before any code:
Search "heart rate zone calculator". Open top 3 results.
Write in DECISIONS.md under COMPETITOR RESEARCH:
- Is each a real tool or a blog post?
- Top 3 weaknesses you will fix
- Confirm API Cost: FREE
- Confirm Australian data: what rates/values to hardcode

BUILD STEPS — Update BUILD_LOG.md after each step:

Step 1: Create /tool-empire-v3/src/app/tools/heart-rate-zone-calculator/page.tsx
Import ToolLayout from shared. Set all props correctly.
Tier: 1 — 2 AdSense slots.
Tool interaction must be above fold on 375px mobile. Non-negotiable.

Step 2: Create /tool-empire-v3/src/lib/tools/heart-rate-zone-calculator.ts
Pure TypeScript calculation/generation logic. No React. No UI.
Zod validation on all inputs.
Handle: empty input (return null), division by zero, negatives, enormous numbers.
No Australian-specific data needed.

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
/tool-empire-v3/src/app/tools/heart-rate-zone-calculator/api/route.ts
Zod validation. Rate limited. No client-exposed errors.

Step 8: SEO audit
Title: 'Heart Rate Zone Calculator Free Online | [Domain]'
H1: exact target keyword match only
Meta: 'Free heart rate zone calculator. [one sentence]. No signup. Instant results.'
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

[ ] Three image prompts written in DECISIONS.md
[ ] STATUS.md updated to BUILT
[ ] BUILD_STATUS.md updated

Step 12: Mark complete
Update /tool-empire-v3/tools/137-heart-rate-zone-calculator/STATUS.md: NOT_STARTED → BUILT
Update /tool-empire-v3/BUILD_STATUS.md: add tool with status BUILT
Final BUILD_LOG.md entry: "All 12 steps complete. Heart Rate Zone Calculator is BUILT."

CONTEXT RECOVERY RULE:
If interrupted: open new Claude Code session. Say:
"Read BUILD_LOG.md in /tool-empire-v3/tools/137-heart-rate-zone-calculator/ and resume from where it stopped."
Never redo a step already marked complete in the log.
---

## Step 6 — Preview & Verify
After building, run the dev server and verify your tool works:

```bash
cd /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3
npm run dev
```

Then open: **https://toolsempire.online/tools/heart-rate-zone-calculator**

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
  Open browser to: https://toolsempire.online/tools/[slug]
  Run the full SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md (Parts A, B, C) using Playwright MCP
  Log review in SCREENSHOT_REVIEW_LOG.md
  Mark STATUS.md as DEPLOYED
  Tell the human: "Preview ready at https://toolsempire.online/tools/[slug] — screenshots saved to /screenshots/[slug]/"
If DOMAIN_PURCHASED is YES:
  Run: vercel --prod
  Run the full SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md (Parts A, B, C) using Playwright MCP on live URL
  Mark STATUS.md as DEPLOYED
Do NOT run vercel --prod when DOMAIN_PURCHASED is NO. It will fail and waste tokens.

---
## AWDRA /web-build SKILL INTEGRATION

If using the /web-build skill (AWDRA) to build this tool, use these pre-filled answers.
Read /tool-empire-v3/AWDRA_ANSWERS.md for the full master template.

Q1 (New or Reform?): REFORMING. Next.js 14.2.x, TypeScript, Tailwind CSS 3.4.x, App Router. Repo: /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3
Q2 (What it does): Tool Empire — 1,000+ free online tools on toolsempire.online. This specific tool page solves one problem instantly. Revenue: AdSense 40%, Pro subs 30%, affiliate 20%, $1 PDF exports 10%.
Q3 (Target customer): See "Competitors and their weaknesses" and "Category" above — match target audience to the tool's niche.
Q4 (Feeling): Map from the "Tone" in DESIGN BRIEF above.
Q5 (Industry): Map from "Category" above.
Q6 (Brand assets): Yes. DESIGN_SYSTEM.md has palettes. FRONTEND_RULES.md has fonts. Shared components in /shared/components/. Colours and fonts specified in DESIGN BRIEF above.
Q7 (Competitors): Use the real competitors listed in "Competitors and their weaknesses" above. Also reference DESIGN_RESEARCH.md.
Q8 (Pages needed): ONE page only — /tools/[slug]/page.tsx. Contains: tool interaction, result display, 300-500 word article, related tools grid, affiliate box, AdSense slots.
Q9 (Primary CTA): Determined by "Monetisation: Type X" above. Type A = tool action button. Type B = "$1 AUD PDF download". Type C = "Upgrade to Pro". Type D = both B+C.
Q10 (Constraints): Exact palette from DESIGN BRIEF. Approved font only. Above fold on 375px mobile. 48px input height. 16px min font. Use shared components. AUD currency. Follow SCREENSHOT_REVIEW.md.
Q11 (Updates): Minimal. AU data hardcoded with date labels. No CMS.
Q12 (Narrative): No. Utility tool — input in, result out. Speed is the feature. No scroll animation.

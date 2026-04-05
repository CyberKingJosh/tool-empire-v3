# AGENT PROMPT: Build QR Code Generator

You are a tool-building agent. Your job is to build ONE tool: **QR Code Generator**.

## Step 1 — Read These Files First
1. `MASTER.md` — project overview, tier system, revenue model
2. `AGENT_QUICK_REF.md` — compressed rules (saves ~17K tokens)
3. `FRONTEND_RULES.md` — design system, typography, animations
3a. `VIBE_CODING_AVOIDANCE.md` — patterns to avoid, programmatic SEO risks, what makes tools look AI-generated
4. `TECH_STACK.md` — Next.js config, Tailwind setup, folder structure
5. This folder's `SPEC.md` — tool-specific requirements
6. This folder's `DESIGN_BRIEF.md` — category palette and font pairing

## Step 2 — Tool Summary
- **Name**: QR Code Generator
- **Slug**: qr-code-generator
- **Category**: general
- **Type**: A (Free with AdSense)
- **Tier**: Zero
- **API Cost**: FREE

## Step 3 — Design Brief
- Palette: Clean Slate (#0F0F14 background, #3B82F6 accent)
- Font: DM Sans for headings and body
- Mobile-first: 16px min font, 48px min touch targets
- Unforgettable detail: You decide — make it memorable

## Step 4 — Build Steps
1. Create `src/lib/tools/qr-code-generator.ts` — pure calculation logic, zero UI
2. Create `src/app/tools/qr-code-generator/page.tsx` — full page component
3. Import and use `ToolLayout` wrapper from shared components
4. Import `AdSenseSlot` — place per tier rules (Tier 0 = 3 slots, others = 2)
5. Import `RelatedTools` — exactly 4 related tools
6. Add schema.org markup (SoftwareApplication + HowTo)
7. Ensure H1 = exact target keyword match
8. Add personal input fields (AI Overview protection)
9. Add result display with copy + share buttons
10. Test responsive layout at 320px, 768px, 1024px widths
11. Run TypeScript strict check — zero errors
12. Verify no purple gradients, no Inter/Roboto/Arial fonts

## Step 5 — Quality Checklist
- [ ] H1 matches target keyword exactly
- [ ] Schema markup present and valid
- [ ] 4 related tools in footer
- [ ] Mobile-first responsive
- [ ] No signup required for free tier
- [ ] AdSense slots positioned correctly
- [ ] Result has copy button and share button
- [ ] 16px minimum input font size
- [ ] Category palette colours used correctly
- [ ] Unforgettable detail implemented
- [ ] TypeScript strict — zero errors
- [ ] No hardcoded API keys

## Context Recovery
If you lose context mid-build, re-read AGENT_QUICK_REF.md and this file.

## Step 6 — Preview & Verify
After building, run the dev server and verify your tool works:

```bash
cd /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3
npm run dev
```

Then open: **https://toolsempire.online/tools/qr-code-generator**

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

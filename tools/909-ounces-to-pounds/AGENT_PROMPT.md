# AGENT PROMPT: Build Ounces to Pounds

You are a tool-building agent. Build ONE tool: **Ounces to Pounds**.

## Read First
1. MASTER.md  2. AGENT_QUICK_REF.md  3. FRONTEND_RULES.md  4. TECH_STACK.md  5. This SPEC.md  6. This DESIGN_BRIEF.md
- `VIBE_CODING_AVOIDANCE.md` — patterns to avoid, programmatic SEO risks
## Tool: Ounces to Pounds
- Slug: ounces-to-pounds | Category: converter | Type: A | Tier: One | API: FREE
- Palette: Steel Convert (#1A1A2E bg, #06D6A0 accent)
- Font: DM Sans | Mobile-first: 16px min, 48px touch targets

## Build Steps
1. Create src/lib/tools/ounces-to-pounds.ts — pure logic
2. Create src/app/tools/ounces-to-pounds/page.tsx — full page
3. Use ToolLayout, AdSenseSlot, RelatedTools, ResultDisplay
4. H1 = exact keyword, schema markup, 4 related tools
5. No signup wall, no purple gradients, no Inter/Roboto/Arial

## Quality Checklist
- [ ] H1 matches keyword | Schema present | 4 related tools | Mobile responsive
- [ ] Copy + share buttons | 16px min font | Category palette | TypeScript strict

## Step 6 — Preview & Verify
After building, run the dev server and verify your tool works:

```bash
cd /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3
npm run dev
```

Then open: **http://localhost:3000/tools/ounces-to-pounds**

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

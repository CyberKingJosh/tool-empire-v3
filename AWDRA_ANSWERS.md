# AWDRA SKILL INTEGRATION — MASTER ANSWER TEMPLATE
# When using /web-build (AWDRA skill) to build any tool, use these answers.
# Replace [PLACEHOLDERS] with data from the specific tool's AGENT_PROMPT.md and SPEC.md.

---

## AWDRA Phase 0 Answers — Copy-Paste Per Tool

**Q1: Are we building a NEW site or REFORMING an existing one?**
> REFORMING an existing one. Tech stack: Next.js 14.2.x, TypeScript strict, Tailwind CSS 3.4.x, App Router. Repo path: /Users/blessingogugua/Desktop/everything/tool-empire-v3/tool-empire-v3

**Q2: What does this business/product do?**
> Tool Empire is a portfolio of 1,000+ free online tools on one domain (toolsempire.online). Each tool is a standalone page that solves one specific problem instantly — no signup, no paywall for the tool itself. Revenue comes from AdSense (40%), Pro subscriptions $15-19 AUD/month (30%), affiliate commissions (20%), and $1 AUD PDF exports (10%).

**Q3: Who is the target customer?**
> [FILL FROM AGENT_PROMPT.md — varies per tool. Examples below]
> - Finance tools: Australian freelancers, sole traders, small business owners aged 25-55 who need quick calculations without hiring an accountant
> - AI tools: Developers, content creators, and tech professionals aged 22-45 comparing AI model costs and usage
> - Time tools: International travellers, remote workers, and business professionals who need instant timezone answers
> - Health tools: Health-conscious individuals aged 20-50 tracking fitness metrics without downloading an app

**Q4: What feeling should the site give a visitor in the first 3 seconds?**
> [MAP FROM AGENT_PROMPT.md "Tone" field]
> - "dark technical" → "precision and power"
> - "refined luxury" → "premium and exclusive"
> - "brutally minimal" → "speed and clarity"
> - "editorial magazine" → "trust and authority"
> - "clean clinical" → "calm and clarity"
> - "playful toy-like" → "energy and fun"
> - "organic natural" → "calm and warmth"
> - "industrial utilitarian" → "no-nonsense efficiency"
> - "bold maximalist" → "energy and confidence"
> - "soft pastel" → "approachable and friendly"

**Q5: What industry or niche is this?**
> [MAP FROM AGENT_PROMPT.md "Category" field]
> - finance → fintech
> - ai → AI/tech tools
> - time → utilities
> - health → health & wellness
> - writing → content/publishing
> - seo → digital marketing
> - property → real estate
> - legal → legal tech
> - education → edtech
> - general → utilities
> - converter → utilities
> - math → education/utilities
> - date → utilities
> - viral → entertainment

**Q6: Do you have any existing brand assets?**
> Yes. Paths:
> - Design system: /tool-empire-v3/DESIGN_SYSTEM.md (all colour palettes by category)
> - Frontend rules: /tool-empire-v3/FRONTEND_RULES.md (fonts, spacing, component rules)
> - Shared components: /tool-empire-v3/shared/components/ (ToolLayout, RelatedTools, ToolInput, ResultDisplay, AdSenseSlot, StripeExport, ProUpgrade)
> - Shared lib: /tool-empire-v3/shared/lib/builtTools.ts (registry of deployed tools)
> - Logo path (if exists): /tool-empire-v3/public/logos/[slug].png
> - Colour palette for this tool: [COPY HEX VALUES FROM AGENT_PROMPT.md "Colour palette" line]
> - Font pairing: [COPY FROM AGENT_PROMPT.md "Font pairing" line]

**Q7: Any competitor or inspiration sites you admire?**
> [FILL FROM AGENT_PROMPT.md "Competitors and their weaknesses" section]
> Also reference these researched sites from DESIGN_RESEARCH.md:
> - time.is (minimalist, light background, instant answer)
> - calculator.net (clean, fast, well-structured)
> - timeanddate.com (comprehensive, light theme)
> - nerdwallet.com/calculators (trust, authority, clean design)

**Q8: What pages does this site need?**
> This is a SINGLE TOOL PAGE, not a full site. One page only:
> /tools/[slug]/page.tsx
> The page contains: tool interaction (above fold), result display, blog article section (300-500 words), related tools grid, affiliate box, AdSense slots.
> Shared layout (ToolLayout) handles: HTML head, SEO meta, schema.org, GA4, AdSense auto-ads.

**Q9: What is the primary CTA on the site?**
> [DEPENDS ON MONETISATION TYPE FROM AGENT_PROMPT.md]
> - Type A (AdSense only): "Calculate" / "Convert" / "Generate" — the tool action itself. No payment CTA.
> - Type B ($1 export): "Download PDF — $1 AUD" after the free result is shown on screen.
> - Type C (Pro subscription): "Upgrade to Pro — $15/month" shown only after free tier limit is reached.
> - Type D (both B+C): Both export and subscription CTAs.

**Q10: Any hard constraints?**
> YES — critical constraints:
> 1. Must use the exact colour palette from DESIGN_SYSTEM.md for this tool's category
> 2. Must use a font pairing from the FRONTEND_RULES.md approved list — never Inter/Roboto/Arial
> 3. Tool interaction MUST be above the fold on 375px mobile
> 4. All inputs minimum 48px height (touch targets), 16px font (prevents iOS zoom)
> 5. Import shared components from /tool-empire-v3/shared/components/ — do NOT rebuild them
> 6. AUD currency throughout — never USD or GBP
> 7. Related tools must use the RelatedTools shared component with currentSlug and category props
> 8. Must follow SCREENSHOT_REVIEW.md workflow (Parts A, B, C) after building
> 9. Must add tool to /shared/lib/builtTools.ts after deploying
> 10. Must run vercel --prod --archive=tgz to deploy (domain: toolsempire.online)

**Q11: Does the site have content that will need regular updates after launch?**
> Minimal. Australian data (tax rates, super rates) updates quarterly — hardcoded with "as of Q1 2026" labels. The human updates these manually. No CMS needed. Blog article is evergreen.

**Q12: Does the product or subject have a natural transformation or assembly narrative?**
> No. This is a utility tool — input goes in, result comes out instantly. No scroll-driven animation or journey narrative. The "transformation" is: user has a question → types input → gets instant answer. Speed is the feature. Keep it fast, no unnecessary animation beyond the result count-up (400ms) and the one unforgettable detail from DECISIONS.md.

---

## HOW TO USE THIS WITH /web-build

1. Open a new Claude Code chat
2. Read the AGENT_PROMPT.md for the tool you're building (e.g. tools/003-ai-token-counter/AGENT_PROMPT.md)
3. Run /web-build
4. When AWDRA asks each question, copy the answer from above and fill in the [PLACEHOLDERS] using data from AGENT_PROMPT.md
5. The skill will generate the page — it should use existing shared components, not create new ones
6. After the skill finishes, run the SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md
7. Deploy with: vercel --prod --archive=tgz
8. Add the tool to /shared/lib/builtTools.ts

## QUICK REFERENCE — WHERE TO FIND EACH PLACEHOLDER

| AWDRA Question | Data Source |
|----------------|------------|
| Target customer | AGENT_PROMPT.md → Category + Competitors section |
| Feeling/tone | AGENT_PROMPT.md → "Tone:" line in DESIGN BRIEF |
| Industry | AGENT_PROMPT.md → "Category:" line |
| Colours | AGENT_PROMPT.md → "Colour palette:" line in DESIGN BRIEF |
| Fonts | AGENT_PROMPT.md → "Font pairing:" line in DESIGN BRIEF |
| Competitors | AGENT_PROMPT.md → "Competitors and their weaknesses:" |
| CTA | AGENT_PROMPT.md → "Monetisation: Type X" |
| Slug | AGENT_PROMPT.md → tool slug in file paths |

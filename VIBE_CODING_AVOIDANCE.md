# VIBE CODING AVOIDANCE — MANDATORY READING
# Every agent reads this before writing any code.
# These are the patterns that make tools look AI-generated and cheap.
# Violating these rules destroys user trust and SEO rankings.

---

## VISUAL PATTERNS TO NEVER USE

### Typography Never
- Never use Inter as the only font. It is the default vibe-coded font.
- Never use Roboto, Arial, or system-ui as primary display fonts.
- Never use font-size below 16px for body text.
- Never mix more than 2 font families on one page.
- Never use font-weight 400 for headings. Use 600, 700, or 800.

### Colour Never
- Never use purple gradient on white background. This is the most recognisable AI aesthetic.
- Never use the default Tailwind blue (#3B82F6) as primary colour without customisation.
- Never use more than 3 colours in a UI (primary, neutral, accent).
- Never use pure white (#FFFFFF) for backgrounds. Use off-white (#FAFAFA or #F8F9FA).
- Never use pure black (#000000) for text. Use #1A1A2E or #111827.

### Layout Never
- Never put the navigation bar as the first thing the user sees above the tool.
- Never make the user scroll before they can interact with the tool.
- Never use a cluttered sidebar with 10+ options.
- Never use a dashboard-style layout with cards everywhere for a simple calculator.
- Never use generic hero sections with stock photo backgrounds.
- Never use cookie banners that block 30%+ of the screen.
- Never use pop-ups within the first 30 seconds of a visit.
- Never use infinite scroll on a tool page.

### Component Never
- Never use the default Tailwind button styles without customisation.
- Never use placeholder text that says 'Enter value here' — be specific.
- Never show empty states as just a blank white area.
- Never use generic icons (the default Heroicons set everyone uses).
- Never use a loading spinner that takes more than 500ms to resolve.
- Never use alert() or confirm() for validation — use inline error messages.
- Never use tooltips that appear on mobile (they don't work on touch screens).

---

## SECURITY PATTERNS TO NEVER USE

### Input Handling Never
- Never pass user input directly to eval() or Function().
- Never use innerHTML with unsanitised user input.
- Never trust client-side validation alone — always validate server-side too.
- Never store sensitive data (API keys, tokens) in localStorage.
- Never expose API keys in client-side code or environment variables prefixed NEXT_PUBLIC_.
- Never use dangerouslySetInnerHTML in React components.

### API Routes Never
- Never create an API route without rate limiting.
- Never create an API route without input validation.
- Never return detailed error messages to the client (log them server-side only).
- Never skip CORS configuration on API routes.
- Never allow unauthenticated access to payment endpoints.

### Headers Never
- Never deploy without Content-Security-Policy headers.
- Never deploy without X-Frame-Options: DENY.
- Never deploy without X-Content-Type-Options: nosniff.

---

## UX PATTERNS TO NEVER USE

### Friction Never
- Never require signup to see a tool result.
- Never show the result behind a blur/paywall before the user has tried the tool.
- Never ask for email before showing the result.
- Never show a CAPTCHA on a free calculator tool.
- Never auto-play audio or video.
- Never use carousels or sliders in the main tool interaction area.

### Mobile Never
- Never design desktop-first. Always mobile-first.
- Never use hover effects as the primary interaction method.
- Never use fixed bottom bars that overlap content on mobile.
- Never use font-size below 16px on mobile (causes iOS auto-zoom).
- Never use horizontal scroll on mobile.

### Performance Never
- Never import a full library when you need one function (import specific).
- Never use unoptimised images (always use Next.js Image component).
- Never block the main thread with synchronous operations.
- Never use more than 2 Google Font families on one page.
- Never ship more than 150KB of JavaScript to the client for a simple calculator.

---

## THE TELL-TALE SIGNS OF VIBE CODING (what users notice immediately)

1. The tool asks you to sign up before doing anything useful.
2. The mobile layout is broken or requires horizontal scroll.
3. The colours feel random — no clear visual hierarchy.
4. The result appears but there is no way to share or save it.
5. Error messages say 'An error occurred' with no helpful guidance.
6. The tool looks identical to 10 other AI-built tools.
7. Buttons have no hover state or loading state.
8. The page title in the browser tab says 'Untitled' or 'Next.js App'.
9. The font is Inter or Roboto with default weights.
10. The layout collapses on anything narrower than 768px.

---

## WHAT PREMIUM NON-AI TOOLS DO INSTEAD

Based on research of Desmos, NerdWallet, Calculator.net, Wolfram Alpha:

- They put the tool interaction above the fold on EVERY device.
- They use custom fonts that feel chosen not defaulted.
- They show the result immediately without page reload.
- They explain the result clearly below the number.
- They have a share button that generates a URL with inputs pre-filled.
- They handle errors with specific helpful messages.
- They load in under 1.5 seconds on mobile.
- They look different from every other tool in their category.
- They have been designed with intention — every element earns its place.

---

## BEFORE BUILDING — ALWAYS CHECK COMPETITOR_RESEARCH_RULES.md

The most important step before writing any code is researching what already
exists for your tool's target keyword.

COMPETITOR_RESEARCH_RULES.md tells you:
- Whether existing results are blog posts (easy to beat) or real tools
- The specific weaknesses to exploit in existing tools
- Whether your tool needs a paid API (RED — change monetisation if so)
- What Australian-specific data to hardcode

The three fastest wins against competitors:
1. They require signup — yours never does
2. They are not mobile-optimised — yours is always mobile-first
3. They use US/UK data — yours uses Australian data by default

If you skip competitor research you build blind.
Every vibe coding mistake in this document was made by someone who
did not research what they were competing against first.

---

## 2026 VIBE CODING RESEARCH UPDATE — NEW PATTERNS TO AVOID

### From 2026 Industry Reports
- Amazon experienced major outages from vibe-coded changes (March 2026). GenAI-assisted
  code pushed to production without proper review caused cascading failures.
- 45% of AI-generated code samples introduced OWASP vulnerabilities.
- AI co-authored code showed 75% more misconfigurations and 2.74x higher security vulnerabilities.
- Experienced developers were actually 19% SLOWER when using AI coding tools,
  despite believing they were 20% faster. Do not trust the speed illusion.
- 25% of Y Combinator Winter 2025 startups had 95% AI-generated codebases.
  These are your competitors — and most will fail on quality.

### Visual Tells of AI-Generated Websites (2026 Update)
- Repetitive section structure: hero → features grid → testimonials → CTA.
  Every AI builder outputs this exact sequence.
- Excessive use of gradient backgrounds, especially purple-to-blue.
- Stock-photo-quality AI images with slight anatomical errors.
- Meta tags with strange spellings indicating AI-written copy.
- Code comments explicitly labelling AI-generated sections (remove all such comments).
- JavaScript references to external AI library files in script tags.
- Vague, superlative-heavy copy: "Revolutionary", "Cutting-edge", "Seamless experience".
- All buttons the same size with identical hover effects across the page.
- Card-based layouts where every card is identical in structure.

### What Premium Non-AI Sites Do Differently (2026 Research)
- calculator.net: 200+ calculators, zero registration, individually tested each one.
  Uses minimal colour palette, emphasises substance over flashy UI.
  Copyright 2008-2026 — longevity builds trust. No AI aesthetic anywhere.
- timeanddate.com: Dark navy (#102233) backgrounds for clock displays.
  Tabular-numeric fonts for precise digit spacing. Schema.org structured data.
  Precision messaging: "Sun & Moon times precise to the second."
  Authority through restraint — minimal ornamentation.
- Both sites succeed because they are USEFUL FIRST, pretty second.
  Your tools must follow this principle: utility above aesthetics.

---

## PROGRAMMATIC SEO RISKS (2026)

This project generates 1,000 tool pages. That is programmatic SEO at scale.
Google is actively penalising thin programmatic content in 2026. Every agent
MUST understand these risks before building any tool page.

### What Google Penalises in 2026
- **Doorway pages**: Pages created purely to rank for keywords with no unique value.
  If your tool page is just a title + empty input + generic text, it is a doorway page.
- **Thin content at scale**: Thousands of pages with identical templates and only
  the keyword swapped out. Google's algorithms detect this pattern and deindex.
- **Value deficit**: The automation itself is not the crime — the value deficit is.
  Amazon, Zillow, and TripAdvisor use programmatic SEO successfully because each
  page provides unique, useful data. Your tool must do the same.
- **AI-generated filler text**: Generic SEO copy that reads like every other AI site.
  Google rewards E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

### How to Stay Safe
1. **Each tool must actually work.** A real calculator with real logic, not a placeholder.
   The calculation file in src/lib/tools/ must contain genuine computation.
2. **Each page must have unique content.** The how-to section, FAQ, and result
   explanation must be specific to that tool — not copy-pasted boilerplate.
3. **Personal input = unique output.** Every tool requires the user to enter their
   own data. This makes each page session unique and protects against AI Overview
   scraping.
4. **Australian data advantage.** Tools with hardcoded AU tax rates, super rates,
   or state-specific data automatically have unique value that competitors lack.
5. **Interactivity signals quality.** Google measures engagement metrics. A tool
   that users actually interact with (enter data, copy results, share) sends
   positive signals.

### Red Flags That Will Get Us Penalised
- 100 city time pages that all look identical with only the city name changed
- Converter pages with no explanation of the formula or use case
- Calculator pages where the "result" is just a static number
- SEO copy that starts with "Welcome to our free [tool name] calculator"
- Pages with no unique schema markup or structured data
- Batch-generated pages deployed all at once (stagger deployments over weeks)

### Deployment Strategy
- Deploy tools in batches of 20-50, not 1,000 at once
- Monitor Google Search Console for "Crawled - currently not indexed" signals
- If any batch shows thin content warnings, pause and add depth before continuing
- Prioritise building Track A and high-priority tools with full depth first

### Sources (March 2026)
- Red Hat Developer: "The Uncomfortable Truth About Vibe Coding"
- Stack Overflow Blog: "Vibe Coding Without Code Knowledge"
- Matt Warren: "Lessons From a Decade of Programmatic SEO"
- SEOmatic: "Google Penalty Recovery for Programmatic SEO Sites"
- Hackaday: "How Vibe Coding Is Killing Open Source"
- Digital Monk Marketing: "Does Google Penalize AI Content in 2026?"

---

## CURRENCY AND LOCALISATION

All prices shown to Australian users must be in AUD.
Never show USD or GBP pricing on any tool page.
The $1 PDF export is $1 AUD — code it as 100 cents AUD in Stripe.
Pro subscriptions are $15-19 AUD per month.
Never hardcode US tax rates, US mortgage rates, or UK-specific data.
Australian data sources: ATO (tax), Fair Work Commission (wages), APRA (super).

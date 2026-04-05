# DESIGN RESEARCH — MARCH 2026
# What the best free tool websites actually do, and what we should learn from them.
# Every agent reads this before building any tool.

---

## RESEARCH METHODOLOGY

Studied the highest-traffic free tool websites across time, finance, health, and utility categories.
Focused on: colour choices, typography, layout hierarchy, how results are displayed,
mobile behaviour, and what makes users bookmark rather than bounce.

---

## SITE-BY-SITE ANALYSIS

### 1. time.is

The gold standard for "current time in [city]" pages.

- **Background**: Pure white (#fff) or very light grey. NOT dark.
- **Time display**: Massive — approximately 72-96px on desktop, 48-60px on mobile.
  The time is the entire page. Nothing competes with it visually.
- **Font**: System sans-serif with tabular-nums. Clean, not decorative.
  The font does not try to be interesting — the information IS interesting.
- **Seconds**: Update in place with no animation. The digits simply change.
  No fading, no sliding, no pulsing. Just accurate replacement.
- **Colour palette**: Almost monochrome. Black text on white. One accent colour
  for links. That restraint is what makes it feel authoritative.
- **Cards/borders/shadows**: None. Zero decoration. The absence of design IS the design.
- **Mobile**: Identical to desktop but scaled. Time stays massive and centred.
- **What makes it premium**: Speed and accuracy. The page loads instantly.
  The time is correct to the second. There is nothing between you and the answer.
- **Key lesson**: The best time tool is the one that shows you the time fastest.

### 2. timeanddate.com

The most comprehensive time/date reference site. 500M+ annual visits.

- **Background**: Light. White (#fff) main content, light grey (#f0f0f0) sidebars.
  The header uses a dark navy (#102233) but the tool areas are always light.
- **Time display**: Large but not as dominant as time.is. Approximately 36-48px.
  Surrounded by supporting information (date, timezone name, UTC offset).
- **Font**: Custom sans-serif, similar to Helvetica. Clean and readable.
  Uses font-variant-numeric: tabular-nums for all number displays.
- **Seconds**: Real-time update, simple digit replacement. No animation.
- **Colour palette**: Navy (#102233) for header/trust, white for content,
  orange (#f60) for calls to action. Three colours total.
- **Cards/borders**: Light grey borders (1px #ddd) to separate content sections.
  Very subtle. No shadows. No rounded corners on most elements.
- **Mobile**: Responsive but content-heavy. Time is visible above fold.
- **What makes it premium**: Depth of information. Every city page has sunrise/sunset,
  moon phase, upcoming time changes, weather. Each piece earns its place.
- **Key lesson**: Authority comes from useful density, not visual flair.

### 3. calculator.net

200+ calculators. One of the highest-traffic tool sites globally.

- **Background**: White (#fff) with light grey (#f5f5f5) for alternating sections.
- **Result display**: Green (#2e7d32) for positive results. Large font (32-40px).
  Results appear inline, no modal, no separate card. Immediate.
- **Font**: System fonts. Nothing custom. The content does the work.
- **Colour palette**: Minimal. White, grey, green for results, blue for links.
  No category-specific palettes. Consistency across all 200+ tools.
- **Input design**: Standard HTML inputs with clear labels. Nothing fancy.
  48px height. Clear placeholder text. Immediate validation.
- **Cards/borders**: Simple 1px borders. No shadows. No gradients.
- **Mobile**: Works perfectly. Inputs stack vertically. Results appear inline.
- **What makes it premium**: It works. Every calculator is accurate, fast, and
  explains its formula. Zero friction between question and answer.
- **Key lesson**: Substance over style. 200+ tools that all work perfectly
  beats 5 beautiful tools with bugs.

### 4. NerdWallet Mortgage Calculator

Best-in-class financial tool design.

- **Background**: White (#fff) content area. Light grey page background.
- **Result display**: Green (#008254) for key numbers. 32-40px bold.
  Breakdown shown in a clean table with alternating row colours.
- **Font**: Gotham family. Custom, intentional, not default.
  Body 16px, headings 24-32px, results 32-40px.
- **Input design**: 48-56px height inputs. White background, 1px grey border.
  Focus state: light blue (#eef7ff) background + blue (#4b99e6) outline.
  Every input has a label AND a helper text explaining what to enter.
- **Colour palette**: Green (#008254) for trust/results, blue (#005fb9) for links,
  grey for structure. Three colours. Consistent.
- **Cards/shadows**: White cards with multi-depth shadows (0 4px 8px rgba(100,102,106,0.1)).
  Subtle lift. Not dramatic.
- **Mobile**: Mobile-first. Inputs stack. Results stack. Everything readable.
- **Transitions**: 0.15s ease on all state changes. Barely noticeable but smooth.
- **What makes it premium**: Trust signals everywhere. Security badges, transparent
  methodology, tooltips explaining every field. You trust the result.
- **Key lesson**: Financial tools earn trust through transparency and restraint.

### 5. Wolfram Alpha

Computational knowledge engine.

- **Background**: White. Orange (#f96) accent for branding only.
- **Result display**: Clean typography. Mathematical precision in layout.
  Results displayed with clear hierarchy — answer first, then derivation.
- **What makes it premium**: The answer appears instantly and is always correct.
  The interface never gets in the way of the information.

---

## UNIVERSAL PATTERNS ACROSS ALL TOP SITES

### 1. Light backgrounds dominate
Every top-performing tool site uses a light background for the tool interaction area.
Even timeanddate.com, which has a dark header, uses white for the actual content.
Dark themes work for developer tools (VS Code, terminal) where users expect them.
For general-purpose tools used by ordinary people, light is always better.

**Why**: Light backgrounds feel open, trustworthy, and readable in any lighting condition.
Dark backgrounds create screen glare problems, reduce readability for older users,
and signal "tech product" rather than "useful tool."

### 2. The result is the hero
On every successful tool site, the result number/output is the visually dominant element.
It is larger than everything else. It appears instantly or within 200ms.
There is no modal, no loading screen, no animation that delays comprehension.

### 3. Maximum three colours
White/light grey for background. One primary colour for trust (navy, green, or indigo).
One accent for calls to action. That is it. More colours = less trust.

### 4. System-like fonts or one intentional custom font
None of these sites use decorative fonts. They use system fonts or one carefully chosen
sans-serif. The font is invisible — it never draws attention to itself.
What draws attention is the content.

### 5. No shadows, no gradients, minimal borders
The top sites use 1px borders or nothing. No drop shadows on cards.
No gradients. Visual hierarchy comes from size and weight, not decoration.

### 6. Inputs are generous
48px minimum height. 16px minimum font. Clear labels above every field.
Specific placeholder text. Validation on blur, not on keystroke.

### 7. Mobile is not an afterthought
Every top site is fully functional on 375px. The tool is usable above the fold.
Nothing is hidden behind a hamburger menu. The tool IS the page.

### 8. Speed is the feature
time.is loads in under 500ms. calculator.net loads in under 1 second.
The fastest tool wins. Not the prettiest. The fastest.

---

## WHAT THIS MEANS FOR TOOL EMPIRE

### Remove dark themes for non-developer tools
The dark theme for time/clock tools was a mistake. time.is and timeanddate.com
both use light backgrounds for their time displays. The "Bloomberg Terminal"
aesthetic appeals to developers, not to the millions of people searching
"what time is it in London." Replace with a light, precise, elegant palette.

### Keep the time display massive
The time number should be 64-96px on desktop, 48-64px on mobile.
It should be the first thing you see. Nothing else competes with it.
Use font-variant-numeric: tabular-nums to prevent digit jitter.

### Simplify the colour palettes
Move from 5 colours per category to 3: background, primary, accent.
The surface colour IS the background. Remove the separate "result" colour
for most categories — the primary colour handles the result display.

### Trust through restraint
Remove unnecessary shadows, gradients, and decorative borders.
Use 1px borders or spacing alone for visual hierarchy.
Every element must earn its place.

### Speed above all
Target sub-1-second load for Tier Zero tools.
No unnecessary JavaScript. No animation that delays showing the result.
The tool loads, you see the answer. That is the entire experience.

---

## NEW TIME & CLOCK PALETTE (derived from research)

The old palette (dark #0A0A0F with cyan #00D4FF) is replaced with:

Primary: #1B2A4A (deep navy — authority without being black)
Accent: #3B82F6 (clear blue — precise, readable, trustworthy)
Surface: #F8FAFC (cool white — clean, bright, professional)
Text: #1E293B (slate — readable, not harsh)
Result: #0F172A (near-black for the time display — maximum contrast and readability)
Font pairing: Space Grotesk 600-700 for headings + JetBrains Mono for the time digits

Why this works:
- Light background = readable in any lighting, feels open and trustworthy
- Navy primary = authority and precision without the coldness of black
- The time digits in near-black on white = maximum contrast = maximum readability
- JetBrains Mono with tabular-nums = digits never shift width
- Feels like a premium instrument, not a coding terminal

---

## AFFILIATE BOX RESEARCH

### How top sites handle recommendations
- NerdWallet: clearly labelled "Partner" or "Sponsored", real company logos,
  genuine one-sentence value proposition, prominent CTA button
- calculator.net: minimal affiliate presence, text links with clear labelling
- Top pattern: company logo + name + one genuine sentence + CTA button + "Sponsored" label

### Free company logo source
Clearbit Logo API: https://logo.clearbit.com/[domain]
Completely free, no API key, no signup. Returns company logo as PNG.
Example: https://logo.clearbit.com/xero.com returns the Xero logo.
Use this for every affiliate box to show real company logos automatically.

### Affiliate programs for our tools
Research each affiliate program and document the signup URL and commission in DECISIONS.md.
The human signs up, gets their tracking link, and replaces the placeholder href.
Until then, link directly to the company homepage — it still provides value to users.

---

## SOURCES

- time.is — analysed March 2026
- timeanddate.com — analysed March 2026
- calculator.net — analysed March 2026
- nerdwallet.com/mortgages/mortgage-calculator — analysed March 2026
- wolframalpha.com — analysed March 2026
- Desmos (desmos.com/calculator) — previously analysed, findings in DESIGN_SYSTEM.md

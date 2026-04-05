# DESIGN SYSTEM v3 — TOOL EMPIRE
# IMPORTANT: This file works alongside FRONTEND_RULES.md
# FRONTEND_RULES.md contains the full design philosophy and font pairings.
# This file contains the specific colour palettes and component specs.
# Agents must read BOTH files before writing any UI code.

---

## CATEGORY COLOUR PALETTES

### TIER ZERO — TIME AND CLOCK TOOLS (Light Theme)
Light backgrounds are mandatory. Research shows every top time site (time.is, timeanddate.com)
uses light backgrounds for content areas. Dark themes reduce readability for general users
and create screen glare. The time digits need maximum contrast — near-black on white.
Reference: time.is uses white background with 100M+ monthly visitors.
Primary: #1B2A4A (deep navy — authority without being black)
Accent: #3B82F6 (clear blue — precise, readable, trustworthy)
Surface: #F8FAFC (cool white — clean, bright, professional)
Text: #1E293B (slate — readable, not harsh)
Result: #0F172A (near-black — maximum contrast for the time display)
Font pairing: Space Grotesk 600-700 + JetBrains Mono (from FRONTEND_RULES.md Pairing 2)
Why light: time.is and timeanddate.com both use light backgrounds. Ordinary people
        searching "what time is it in London" expect a clean, bright page.
        Maximum readability in any lighting condition. See DESIGN_RESEARCH.md.
Time display: Must use font-variant-numeric: tabular-nums to prevent digit jitter.
        See TIME_TOOL_PATTERN.md for the correct React implementation.

### TIER ZERO — UNIT AND CONVERTER TOOLS
Primary: #0F4C75 (deep navy trust)
Accent: #1B6CA8 (confident blue)
Surface: #F0F7FF (pale blue background)
Text: #0A2540 (near-black navy)
Result highlight: #00A878 (success green for positive numbers)
Use for: invoice generator, profit calc, mortgage calc, salary calc, tax tools

### Health & Fitness (BMI, calories, macros)
Primary: #1A5C45 (deep forest green)
Accent: #2D8C6B (medium green)
Surface: #F0FAF5 (pale green background)
Text: #0D2B1F (near-black green)
Result highlight: #F4845F (warm orange for emphasis)
Use for: BMI calc, calorie calc, macro calc, sleep calc, fitness tools

### Legal & Compliance (contracts, NDAs, GDPR)
Primary: #1C1C3A (deep authoritative navy)
Accent: #6B4FA0 (legal purple)
Surface: #F8F7FF (pale purple-white)
Text: #0D0D24 (near-black)
Result highlight: #4A90D9 (document blue)
Use for: NDA gen, contract gen, privacy policy, terms gen, legal tools

### Writing & Content (word count, readability, email)
Primary: #8B2FC9 (bold editorial purple)
Accent: #6225A0 (deep purple)
Surface: #FBF8FF (warm white)
Text: #1A0A2E (near-black purple)
Result highlight: #E8A838 (warm gold)
Use for: word count, readability, paraphrasing, email subject, blog tools

### SEO & Marketing (keyword, backlink, meta tools)
Primary: #C84B31 (confident red-orange)
Accent: #E05B3A (bright orange)
Surface: #FFF8F6 (warm pale)
Text: #2A0F07 (near-black warm)
Result highlight: #2563EB (link blue)
Use for: keyword density, backlink checker, meta tag, SERP preview

### Property & Finance (mortgage, stamp duty, rental yield)
Primary: #1A3A5C (estate agent navy)
Accent: #C9A84C (property gold)
Surface: #F8F6F0 (warm cream)
Text: #0A1A2A (near-black warm navy)
Result highlight: #00875A (profit green)
Use for: mortgage calc, stamp duty, rental yield, buy-to-let, property tools

### Education & Productivity (GPA, pomodoro, essay)
Primary: #F4511E (energetic orange)
Accent: #BF360C (deep burnt orange)
Surface: #FFF8F5 (warm white)
Text: #1A0900 (near-black warm)
Result highlight: #0288D1 (focus blue)
Use for: GPA calc, pomodoro timer, essay outline, flashcard, study tools

### General Utility (converters, calculators, generators)
Primary: #2D3A8C (reliable indigo)
Accent: #4353C0 (bright indigo)
Surface: #F8F9FF (cool white)
Text: #0D1124 (near-black indigo)
Result highlight: #00ACC1 (cyan for outputs)
Use for: unit converter, date calc, percentage calc, random number, misc

---

## SPACING SYSTEM

Use these values consistently. Never arbitrary margins.

xs: 4px  (0.25rem) — tight internal padding
sm: 8px  (0.5rem)  — button internal padding
md: 16px (1rem)    — standard component gap
lg: 24px (1.5rem)  — section spacing
xl: 32px (2rem)    — major section breaks
2xl: 48px (3rem)   — page section separation
3xl: 64px (4rem)   — hero spacing

---

## COMPONENT SPECIFICATIONS

### Tool Input Card
Background: white with 1px border using category accent colour at 20% opacity
Border radius: 12px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Padding: 24px
Input label: 14px, font-weight 600, category primary colour
Input field: 18px, full width, 12px border radius, 12px padding
Focus ring: 2px solid category accent colour
Error state: red border + red helper text below

### Result Display Card
Background: category surface colour (pale tint)
Border: 2px solid category accent colour
Border radius: 16px
Padding: 32px
Result number: 48px, font-weight 800, DM Mono, category primary colour
Result label: 16px, font-weight 400, category text colour
Explanation section: 16px, font-weight 400, 24px top margin

### Primary Button
Background: category primary colour
Text: white, 16px, font-weight 700
Border radius: 8px
Padding: 12px 24px
Hover: darken 10%, smooth 200ms transition
Active: scale(0.97)
Loading state: spinner in button, text changes to 'Calculating...'
Never: outline button as primary. Never: ghost button as primary.

### $1 Download Button (StripeExport component)
Background: category accent colour
Text: white, 16px, font-weight 700
Border radius: 8px
Padding: 12px 24px
Left icon: download arrow icon
Text: 'Download PDF — £1'
Below button: '78p goes to keeping this tool free'
Position: below the result display card

### AdSense Slot Wrapper
Top slot: full width, min-height 90px, placed above the tool input card
Bottom slot: max-width 728px centred, placed below result display
Never: place AdSense inside the tool interaction area
Never: place AdSense between label and input field
Both slots: background matches page surface colour (not white boxes)

---

## ANIMATION RULES

### Do use
- Result number counting up from 0 to final value (300ms duration)
- Input card subtle lift on focus (translateY(-2px), 150ms)
- Button scale on click (scale 0.97, 100ms)
- Page load: tool card fades in with 200ms delay after page renders
- Error messages: slide down from top of field, 150ms

### Never use
- Infinite rotating animations on a static tool page
- Parallax scroll effects
- Full-page transitions that delay showing the tool
- Skeleton loaders that take more than 500ms
- Confetti or celebration animations on every calculation

---

## PAGE STRUCTURE (every tool follows this)

```
[Page]
  [ToolLayout wrapper]
    [Top AdSense slot — Type A tools only]
    [Page header: H1 tool name + one line description]
    [Tool Input Card]
      [inputs]
      [Calculate button]
    [Result Display Card — appears after calculation]
      [Result number]
      [Explanation]
      [$1 Download button — Type B/D tools only]
      [Share button]
    [How it works section — 3-4 sentences explaining the formula]
    [Bottom AdSense slot — Type A tools only]
    [Related Tools section — exactly 4 tools]
    [Affiliate box — one relevant recommendation]
  [Footer]
```

Keep this order. Never move AdSense inside the tool card.
Never put Related Tools before the result section.

---

## DESIGN RESEARCH SOURCES (March 2026)

### Desmos (desmos.com/calculator)
Fetched and analysed. Key takeaways for our tools:
- **Minimal colour palette**: White (#fff) background, gray (#eee) accents. Zero decoration.
  The tool IS the page. No hero sections, no testimonials, no filler.
- **Hardware-accelerated animations**: Loading pulse uses transform + opacity (not
  width/height) for smooth 60fps. Our tools must do the same — use CSS transform
  for all animations, never animate layout properties.
- **Precision spacing**: Every dimension is intentional (140px loader, exact margin
  offsets). No arbitrary values. Use our spacing scale consistently.
- **Embedded assets**: SVG/WebP images encoded inline in CSS to reduce HTTP requests.
  We should inline small icons rather than loading external icon libraries.
- **Zero chrome**: No navigation, no sidebar, no footer cluttering the tool. The
  calculator IS the entire experience. Our tools should follow this: tool above
  the fold, everything else below.
- **Lesson**: Desmos succeeds because it is a TOOL, not a WEBSITE. Build tools, not pages.

### NerdWallet Mortgage Calculator (nerdwallet.com/mortgages/mortgage-calculator)
Fetched and analysed. Key takeaways for our financial tools:
- **Trust palette**: Primary green #008254, dark green #00482f for hover, blue #005fb9
  for links. These are institutional colours — they signal authority without being boring.
- **Typography**: Gotham font family (not Inter/Roboto). Display weights for headings,
  regular for body. Shows intentional font selection.
- **Input design**: 45-56px height inputs, white with 1px #8b8c8f border. Focus state
  uses light blue background (#eef7ff) with blue outline (#4b99e6). This is exactly
  what our ToolInput component should match.
- **Result cards**: White background with subtle multi-depth shadows (0 4px 8px #64666a1a).
  Green highlight backgrounds (#effcf8) for key info. Clear visual hierarchy.
- **Spacing scale**: .25rem, .5rem, 1rem, 1.5rem, 2rem, 4rem — consistent system
  matching our own spacing scale. Never arbitrary values.
- **Breakpoints**: 469px, 768px, 1279px, 1600px — mobile-first with 4 breakpoints.
  We use similar: 320px (min), 768px, 1024px, 1280px.
- **Trust signals**: Security badges, transparent labelling, helpful tooltips,
  proper contrast ratios, focus indicators for accessibility.
- **Smooth transitions**: .15s ease on hover/state changes. Rounded 72px buttons.
  Custom SVG icons matching brand colour.
- **Lesson**: NerdWallet succeeds because every element earns its place. No decoration
  for decoration's sake. Trust comes from consistency and restraint.

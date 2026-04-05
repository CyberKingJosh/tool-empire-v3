# FRONTEND RULES — MANDATORY FOR EVERY TOOL
# Derived from the Claude frontend-design skill plus tool-specific requirements.
# Every agent reads this before writing a single line of UI code.
# This is not optional. This is law.

---

## THE CORE PRINCIPLE

Every tool must feel like it was designed by a professional studio specifically
for that tool category. A world clock should feel different from an invoice
generator. A BMI calculator should feel different from a tax calculator.

The goal: when someone lands on your tool they think "this is the best version
of this tool I have ever seen" — not "another generic calculator site."

This is what separates tools that get shared and linked to from tools that
bounce immediately. Shared tools build domain authority. Domain authority
makes every other tool rank faster on Google.

---

## DESIGN THINKING — DO THIS BEFORE WRITING ANY CODE

Before writing any code, answer these four questions and write them in DECISIONS.md:

1. PURPOSE: What problem does this tool solve? Who is searching for it?
   (A freelancer invoicing a client is different from a student calculating GPA.)

2. TONE: Pick ONE aesthetic direction and commit to it completely.
   Options: brutally minimal | refined luxury | editorial magazine | retro-futuristic |
   organic natural | playful toy-like | industrial utilitarian | art deco geometric |
   soft pastel | dark technical | bold maximalist | clean clinical
   Never pick "modern and clean" — that means nothing. Pick something specific.

3. DIFFERENTIATION: What is the ONE thing someone will remember about this tool?
   The animation when the result appears? The colour that feels unexpected?
   The typography that feels editorial not generic? Decide this upfront.

4. UNFORGETTABLE DETAIL: What micro-interaction or visual detail makes this
   feel genuinely designed? Every tool needs at least one.

---

## TYPOGRAPHY RULES

### The Rule
Never use Inter, Roboto, Arial, or system-ui as primary fonts.
These are the default choices that make every AI-built tool look identical.
Every tool must use fonts that feel chosen, not defaulted.

### Approved Font Pairings (pick one per tool, vary across the portfolio)

Pairing 1 — Editorial Authority (finance, legal, property tools):
Display: 'DM Sans' weight 700-800
Body: 'DM Sans' weight 400
Mono: 'DM Mono' weight 400 (for result numbers only)

Pairing 2 — Technical Precision (dev tools, AI tools, converters):
Display: 'Space Grotesk' weight 600-700
Body: 'Space Grotesk' weight 400
Mono: 'JetBrains Mono' weight 400

Pairing 3 — Warm Human (health, wellness, lifestyle tools):
Display: 'Fraunces' weight 700 (serif with personality)
Body: 'Plus Jakarta Sans' weight 400
No mono needed

Pairing 4 — Playful Energy (education, countdown tools, fun tools):
Display: 'Syne' weight 700-800
Body: 'Outfit' weight 400
No mono needed

Pairing 5 — Minimal Luxury (premium tools, Pro-tier tools):
Display: 'Cormorant Garamond' weight 600 (elegant serif)
Body: 'Jost' weight 300-400
Mono: 'Fira Mono' weight 400

Pairing 6 — Bold Magazine (viral tools, tools designed to be shared):
Display: 'Bebas Neue' weight 400 (all caps display)
Body: 'Nunito' weight 400
No mono needed

### Size Rules
Body text minimum: 16px (prevents iOS auto-zoom on mobile)
H1: 32-48px on desktop, 24-32px on mobile
Result number: 48-72px on desktop, 36-48px on mobile
Label text: 14px maximum, never smaller
Line height body: 1.6
Line height headings: 1.1-1.2

---

## COLOUR RULES

### Never
Never pure white #FFFFFF background — use #FAFAFA or category surface colour
Never pure black #000000 text — use near-black with hue
Never purple gradient on white — most recognisable AI aesthetic, avoid completely
Never more than 3 colours per page (primary, neutral, accent)
Never the default Tailwind blue #3B82F6 without customisation

### Category Palettes (use exact hex values)

TIER ZERO — TIME AND DATE TOOLS
Aesthetic: clean, precise, elegant — like a premium instrument catalogue
Primary: #1B2A4A (deep navy — authority without being black)
Accent: #3B82F6 (clear blue — precise and trustworthy)
Surface: #F8FAFC (cool white — clean, bright, professional)
Text: #1E293B (slate — readable, not harsh)
Result: #0F172A (near-black — maximum contrast for time digits)
Font pairing: Technical Precision (Space Grotesk + JetBrains Mono)
Why: time.is and timeanddate.com both use light backgrounds — the best time tools
     prioritise readability over aesthetic. See DESIGN_RESEARCH.md and TIME_TOOL_PATTERN.md.
Required: font-variant-numeric: tabular-nums on all time displays to prevent digit jitter.

TIER ZERO — UNIT AND CONVERTER TOOLS
Aesthetic: clean, clinical, precise
Primary: #2D3A8C (reliable indigo)
Accent: #4353C0 (bright indigo)
Surface: #F8F9FF (cool white)
Text: #0D1124 (near-black indigo)
Result: #00ACC1 (cyan outputs)
Font pairing: Editorial Authority (DM Sans)

FINANCE AND BUSINESS TOOLS
Primary: #0F4C75 (deep navy trust)
Accent: #1B6CA8 (confident blue)
Surface: #F0F7FF (pale blue)
Text: #0A2540 (near-black navy)
Result: #00A878 (success green)
Font pairing: Editorial Authority (DM Sans)

HEALTH AND FITNESS TOOLS
Primary: #1A5C45 (deep forest green)
Accent: #2D8C6B (medium green)
Surface: #F0FAF5 (pale green)
Text: #0D2B1F (near-black green)
Result: #F4845F (warm orange)
Font pairing: Warm Human (Fraunces + Plus Jakarta Sans)

LEGAL AND COMPLIANCE TOOLS
Primary: #1C1C3A (deep authoritative navy)
Accent: #6B4FA0 (legal purple)
Surface: #F8F7FF (pale purple-white)
Text: #0D0D24 (near-black)
Result: #4A90D9 (document blue)
Font pairing: Editorial Authority (DM Sans)

AI AND TECH TOOLS
Aesthetic: dark, futuristic, technical
Primary: #0D1117 (GitHub dark)
Accent: #58A6FF (electric blue)
Surface: #161B22 (dark card)
Text: #C9D1D9 (soft white)
Result: #3FB950 (terminal green)
Font pairing: Technical Precision (Space Grotesk + JetBrains Mono)
Why: AI tools should feel technical and credible, not consumer-friendly

WRITING AND CONTENT TOOLS
Primary: #8B2FC9 (editorial purple)
Accent: #6225A0 (deep purple)
Surface: #FBF8FF (warm white)
Text: #1A0A2E (near-black purple)
Result: #E8A838 (warm gold)
Font pairing: Editorial Authority or Bold Magazine

PROPERTY AND REAL ESTATE TOOLS
Primary: #1A3A5C (estate navy)
Accent: #C9A84C (property gold)
Surface: #F8F6F0 (warm cream)
Text: #0A1A2A (near-black warm navy)
Result: #00875A (profit green)
Font pairing: Minimal Luxury (Cormorant + Jost)

EDUCATION AND STUDY TOOLS
Primary: #F4511E (energetic orange)
Accent: #BF360C (deep burnt orange)
Surface: #FFF8F5 (warm white)
Text: #1A0900 (near-black warm)
Result: #0288D1 (focus blue)
Font pairing: Playful Energy (Syne + Outfit)

VIRAL AND FUN TOOLS (designed to be shared)
No fixed palette — each viral tool gets its own unique palette
that feels memorable and unexpected. Commit to something bold.
Font pairing: Bold Magazine (Bebas Neue + Nunito)

---

## LAYOUT RULES

### Mobile First — Always
Design for 375px width first. Then scale up to 768px. Then 1200px.
The tool interaction must be visible and usable above the fold on 375px.
Never design desktop first and squeeze it down. Always mobile first.

### Page Structure — Exact Order, Never Change
```
1. ToolLayout wrapper (SEO, Analytics, AdSense auto-ads)
2. Top AdSense slot (max 728x90, Type A and B tools only)
3. H1 — exact keyword match, styled per category palette
4. One-line tool description (16px, category text colour)
5. Tool Input Card (ABOVE FOLD on 375px — non-negotiable)
6. Calculate / Generate button
7. Result Display Card (appears after action, smooth transition)
8. $1 Download button (Type B/D tools, inside result card)
9. How it works (3-4 sentences, explains the formula or logic)
10. Bottom AdSense slot (max 300x250, Type A and B only)
11. Evergreen blog article section (300-500 words, feeds SEO)
12. Related Tools (exactly 4 cards)
13. Affiliate recommendation box (1 product, labelled Sponsored)
14. Footer
```

### The Tool Input Card Rules
Background: white with 1px border using category accent at 20% opacity
Border radius: 12px
Shadow: 0 2px 8px rgba(0,0,0,0.08) — subtle, not dramatic
Padding: 24px desktop, 16px mobile
Input label: 14px, font-weight 600, category primary colour
Input field: 18px, full width, 12px border radius, 12px padding
Focus ring: 2px solid category accent colour — visible, accessible
Error state: red-tinted border + specific helpful error message below field
Placeholder text: specific, not generic. "Enter monthly rent (e.g. $2,500)" not "Enter value"

### The Result Display Card Rules
Background: category surface colour
Border: 2px solid category accent
Border radius: 16px
Padding: 32px desktop, 20px mobile
Result number/text: 48-72px, font-weight 800, DM Mono or JetBrains Mono
Result label: 16px, font-weight 400, category text colour
Explanation: 16px, 24px top margin, explains what the result means
Animation: result number counts up from 0 to final value over 400ms
Copy button: copies result to clipboard, shows tick for 2 seconds
Share button: generates URL with current inputs as query params

---

## ANIMATION RULES

### Use These
Result count-up: number animates from 0 to final value, 400ms, ease-out
Input card lift on focus: translateY(-2px), 150ms, ease
Button press: scale(0.97), 100ms
Page load: tool card fades in with translateY(10px) to 0, 200ms delay
Error slide: error message slides down 150ms from top of field
Result card entrance: scale(0.95) to 1.0 with fade, 250ms

### Never Use
Infinite spinning animations on static pages
Parallax scroll on tool pages (kills mobile performance)
Full-page transitions that delay showing the tool
Skeleton loaders that show for more than 400ms
Confetti or celebration on every single calculation
Animations that loop without user interaction

---

## COMPONENT QUALITY STANDARDS

### Buttons
Primary button: solid category primary colour, white text, 8px radius
Hover: category primary darkened 10%, 200ms transition
Active: scale(0.97), instant
Loading state: spinner replaces icon, text changes to active verb ("Calculating...")
Never: outline-only button as primary CTA
Never: ghost button as the main action

### Input Fields
Height: 48px minimum on mobile (touch target requirement)
Font size: 16px minimum (prevents iOS auto-zoom)
Border: 1px solid #E2E8F0 default, category accent on focus
Always show label above field, never placeholder-only
Validation: on blur, not on every keystroke

### Error Messages
Specific: "Enter a number greater than 0" not "Invalid input"
Position: directly below the field that caused the error
Colour: #DC2626 text, no background colour needed
Icon: small warning triangle before the text
Never: alert() or browser confirm() dialogs

### Empty States
Never a blank white area
Show an illustration or icon relevant to the tool
Show specific instruction: "Enter your details above to see your result"
Use category accent colour for the icon

---

## PERFORMANCE RULES

Page load target: under 1.5 seconds on mobile 4G
JavaScript bundle: under 150KB for Tier Zero tools
Images: always Next.js Image component, always WebP format
Fonts: preload the display font, load body font normally
Never import a full library for one function — import specifically
AdSense: load async, never block page render

---

## ACCESSIBILITY RULES

All inputs must have visible labels (not just placeholders)
All buttons must have descriptive text (not just icons)
Colour contrast: minimum 4.5:1 for body text, 3:1 for large text
Focus states: visible on all interactive elements (keyboard users)
Error messages: linked to input via aria-describedby
Result: announced to screen readers via aria-live region

---

## THE UNFORGETTABLE DETAIL RULE

Every single tool must have one thing that makes a person pause and think
"I have never seen a calculator do that before."

Examples of what this could be:
- The result number counts up from zero with a sound effect (subtle tick)
- The page background colour subtly shifts based on the result value
- The share button generates a beautiful image card not just a URL
- The tool remembers your last 3 calculations without login
- The result explanation changes based on how extreme the number is
- Hovering over the result shows a breakdown tooltip
- The calculation animates step by step so you can see the working

Pick one. Execute it perfectly. This is what gets your tool shared.

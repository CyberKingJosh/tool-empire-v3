# Competitor Research — Invoice Generator Australia
# Date: 2026-03-22
# Keyword: "free invoice generator australia"

---

## Competitor 1: Xero AU Invoice Generator
**URL:** https://www.xero.com/au/templates/invoice-generator/

**Layout:** Single-column centered layout with responsive grid. Clean, professional.
**Colours:** Primary blue #0089DC, secondary cyan #13B5EA, dark navy #213B55, white backgrounds.
**Fonts:** National2 (custom), fallback Helvetica Neue. Weighted hierarchy.
**Inputs:** Clean border-focused inputs with blue focus states (#13B5EA).
**CTAs:** Bold typography (1.5-1.6rem), blue underlines animate on hover, #13B5EA backgrounds.
**Signup:** Does not require signup for basic generator.
**Strengths:** Brand authority (Xero is the #1 accounting software in AU), polished UI, professional colour scheme. Strong trust signals.
**Weaknesses:** The generator is essentially a funnel to sign up for Xero. Limited customisation in the free version. Heavy page weight.

---

## Competitor 2: Billdu Free Invoice Generator Australia
**URL:** https://www.billdu.com/free-invoice-generator-australia/

**Layout:** Single-column full-width, Bootstrap-based card system.
**Colours:** Bootstrap blue #007bff, success green #28a745/#1cc691, dark backgrounds for banners, white primary.
**Fonts:** System font stack (Apple, Segoe UI, Roboto). Generic.
**Inputs:** Standard Bootstrap styling — padding .375rem .75rem, 1px border, blue focus shadow.
**CTAs:** Pill-shaped buttons (64px radius), white background with black text, opacity hover.
**Preview:** Dynamically rendered via JavaScript, lazy-loaded.
**Signup:** No signup required for generator.
**Strengths:** Fast load (WP Rocket), no friction.
**Weaknesses:** Generic Bootstrap look — nothing memorable. Default system fonts. Cookie consent banner is intrusive. No live preview visible in initial load. Feels like a template, not a product.

---

## Competitor 3: RosterElf Invoice Generator
**URL:** https://www.rosterelf.com/free-tools/invoice-generator

**Layout:** Single-column, card-based form. Preview below form.
**Colours:** Green primary #166534, white background, dark gray #1f2937 text, neutral grays for borders.
**Fonts:** Not specified — appears to use Tailwind defaults (system stack).
**Inputs:** Structured with clear labels, asterisks for required, helper text below fields. Segmented sections (Business Details, Invoice Settings, Client Details, Line Items, Payment Details).
**CTAs:** Green "Download PDF" primary button, secondary "Print" and "Save draft".
**Preview:** Live calculation showing subtotal, GST (10% auto), and total. Updates dynamically.
**Signup:** Explicitly no signup. "No signup required — start building your invoice instantly."
**Strengths:** Live GST calculation, clear section structure, ABN validation, ATO compliance disclaimers, save/load draft feature. Most functionally complete competitor.
**Weaknesses:** Green palette feels more "health" than "finance" — doesn't communicate trust/authority the way navy/blue does. Default fonts. No animated preview or memorable detail.

---

## Three Design Decisions for Our Tool

1. **Navy/blue finance palette beats green or generic Bootstrap.** Both Xero (#0089DC) and financial institutions use navy/blue to signal trust. Our #0F4C75 primary is in the right family. RosterElf's green feels off-category. Billdu's Bootstrap blue is generic. Our palette is intentional and correct.

2. **The animated invoice preview is our unforgettable detail.** No competitor has animation in their preview — they all show static results or plain tables. Our line-by-line slide-in with total reveal animation is genuinely unique and creates a moment of delight right before the $1 download CTA.

3. **Section structure and labels must match RosterElf's clarity.** RosterElf has the best form UX of the three — clear section headers, helper text, required field indicators. Our form already has this. But we need to ensure the invoice preview looks more professional than all three — paper-like styling with the gradient top bar, proper From/To layout, and the animated total are our edge.

---

## Screenshot Note
Playwright MCP was not available for this session. Competitor analysis was conducted via WebFetch content analysis. Screenshots should be captured in a follow-up session when Playwright MCP is configured.

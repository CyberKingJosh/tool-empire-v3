# DECISIONS: Invoice Generator Australia

---

## DESIGN THINKING

1. **PURPOSE**: Australian freelancers, sole traders, and small businesses need to generate professional tax invoices with correct ABN, GST, and superannuation fields. They search "free invoice generator australia" because they want an instant, no-signup tool — not a SaaS product requiring a paid plan.

2. **TONE**: Refined luxury — clean, professional, trustworthy. This is a finance tool that handles money documents. It must feel like a premium accounting product, not a free web toy.

3. **DIFFERENTIATION**: Australian data hardcoded with quarterly update labels — GST 10%, superannuation 11.5% (as of Q1 2026), ATO-compliant tax invoice format. Beats all US/UK-defaulting competitors by being Australia-first.

4. **UNFORGETTABLE DETAIL**: The invoice preview animates step-by-step — each line item slides in, subtotals calculate visibly, GST adds on with a highlight flash, and the grand total counts up. Users watch their invoice being "built" in real-time.

## FONT & COLOUR

- **Font pairing**: Editorial Authority — DM Sans 700-800 (headings) + DM Mono (numbers/results)
- **Colour palette**: Finance category
  - Primary: #0F4C75 (deep navy trust)
  - Accent: #1B6CA8 (confident blue)
  - Surface: #F0F7FF (pale blue)
  - Text: #0A2540 (near-black navy)
  - Result: #00A878 (success green)

---

## COMPETITOR RESEARCH

### Top 3 results for "free invoice generator australia":

**1. invoicegenerator.com.au** — Real tool
- Basic form, generates PDF
- Weakness: No ABN field built-in, no GST auto-calculation, generic US-style layout, no live preview

**2. rosterelf.com/free-tools/invoice-generator** — Real tool
- Free, no signup, unlimited invoices
- Weakness: Basic design, no animated preview, no step-by-step breakdown, functional but not memorable

**3. billdu.com/free-invoice-generator-australia/** — Freemium tool
- Heavy upsell, limited free invoices per month
- Weakness: Requires signup for full features, aggressive paid plan pushing, limited free tier

### Top 3 weaknesses we will fix:
1. **No live preview**: Competitors show a static form then generate a PDF. We show a live invoice preview that updates as you type, with animated line items.
2. **No GST auto-calculation**: Most tools make you calculate GST manually. Ours auto-adds 10% GST with toggle for GST-inclusive/exclusive pricing.
3. **Signup walls and upsells**: Billdu and Rounded require accounts. Ours is completely free to preview, $1 AUD only for PDF export. No signup ever.

### API Cost: FREE
Confirmed. No external API needed. Pure client-side invoice generation with hardcoded Australian tax data.

### Australian data to hardcode:
- GST rate: 10% (as of Q1 2026)
- Superannuation guarantee: 11.5% (FY 2025-26, moving to 12% FY 2026-27)
- Medicare levy: 2%
- ABN format validation: 11-digit number
- ATO tax invoice requirements: ABN, date, description, GST amount shown separately

---

## IMAGE GENERATION PROMPTS

### Logo Prompt (for Ideogram — free at ideogram.ai):
"Minimal professional logo for 'Invoice Generator Australia', finance category. Deep navy blue #0F4C75 primary colour. Clean vector style. Icon on left showing a simple document with a tick mark and dollar sign. Text 'Invoice Generator' on right in bold DM Sans style font. White background. No shadows. No gradients. No 3D. Square 1:1. 4K."

### Hero Image Prompt (for Google Imagen 3 — free at aistudio.google.com):
"Clean minimal website hero image for a free Australian invoice generator tool. Corporate trust aesthetic, clean lines, numerical precision. Central visual: elegant white document floating at an angle with clean geometric lines suggesting financial professionalism, subtle Australian blue colour accents. Colour palette: pale blue #F0F7FF background, navy #1B6CA8 accents. No people. No text. No UI chrome. Abstract minimal. Photorealistic studio lighting. Wide 16:9 format. 4K ultra detail."

### OG Image Prompt (for Microsoft Designer — free at designer.microsoft.com):
"Professional Open Graph social card for 'Invoice Generator Australia'. Left side: large document-with-tick icon in deep navy #0F4C75. Right side: bold white text 'Invoice Generator Australia', smaller text 'Free Online Tool' below. Background: deep navy to midnight blue gradient, subtle diagonal line pattern. 1200x630px format. Clean modern corporate design. No photos."

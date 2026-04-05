# SEO RULES — FOLLOW EXACTLY
# These rules apply to every single tool page. No exceptions.

---

## PAGE TITLE FORMAT
'[Tool Name] Free Online — [Domain]'
Example: 'Profit Margin Calculator Free Online — QuickCalc.io'
Max length: 60 characters
Never: include the word 'tool' twice
Never: 'Best Free...' or 'Ultimate...' in title (spam signal)

## META DESCRIPTION FORMAT
'Free [tool name]. [One sentence describing what it calculates/generates]. No signup. Instant results.'
Example: 'Free profit margin calculator. Enter your cost and selling price to get margin percentage instantly. No signup. Instant results.'
Max length: 155 characters
Must include the primary keyword naturally.

## H1 FORMAT
Must exactly match the primary search keyword.
Example primary keyword: 'profit margin calculator'
H1 must be: 'Profit Margin Calculator'
Never add adjectives: not 'Free Profit Margin Calculator' in H1 (save 'Free' for meta)

## URL FORMAT
/tools/[keyword-slug]
Example: /tools/profit-margin-calculator
Never nested: /tools/finance/profit-margin-calculator
Slug uses hyphens only, no underscores

## SCHEMA MARKUP

For calculators (Type A tools):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Tool Name]",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  },
  "description": "[Same as meta description]"
}
```

For generators (Type B tools):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [generate/create X] for free",
  "description": "[Tool description]",
  "step": [
    {"@type": "HowToStep", "name": "Enter your details", "text": "Fill in the form fields"},
    {"@type": "HowToStep", "name": "Generate", "text": "Click the generate button"},
    {"@type": "HowToStep", "name": "Download", "text": "Download your document for £1"}
  ]
}
```

## CANONICAL URL
Always set. Always absolute.
<link rel="canonical" href="https://toolsempire.online/tools/[slug]" />

## OG TAGS (every page)
og:title — same as page title
og:description — same as meta description
og:url — canonical URL
og:type — website
og:image — auto-generated tool preview image (1200x630px)

## INTERNAL LINKS
Every tool page links to exactly 4 related tools.
Related tools must be genuinely related (same category or complementary).
Never link to random tools just to fill 4 slots.
Link text: use the tool name exactly (not 'click here' or 'related tool').

## SITEMAP
Every tool must appear in /sitemap.xml
Priority: 0.8 (higher than blog posts at 0.6, lower than homepage at 1.0)
Change frequency: monthly
Submit sitemap to Google Search Console on the day it is updated.

## AI OVERVIEW PROTECTION STRATEGY (Critical 2026 Update)

Google AI Overviews answer informational queries directly on the search page.
This reduces click-through rates by up to 61% for informational content.
Tool pages are largely IMMUNE because AI cannot answer personalised calculations.

To ensure your tool is immune:
Every tool page must require the user to input their own specific numbers.
"What is compound interest?" = informational = AI Overview answers it = low CTR.
"What is compound interest on MY $50,000 at 4.5% over 7 years?" = personal calc = must click tool.

When writing your tool's H1 and meta description:
Frame it as a personalised calculation, not a general question.
DO: "Calculate YOUR mortgage repayments — enter your loan amount"
DO NOT: "What is a mortgage repayment" (AI Overview answers this)

If your target keyword is getting an AI Overview in Google results:
Add a second H1-level question that requires personal input.
Add input fields immediately below that answer the personal version.
The tool interaction is your protection against AI Overview traffic loss.

---

## GOOGLE SEARCH CONSOLE — MANDATORY STEPS
1. Day of deployment: submit URL via GSC URL inspection tool.
2. This gets the page indexed within 24-48 hours instead of weeks.
3. Check back in 3 days: is it indexed? If not, submit again.
4. After 4 weeks: check which queries it is appearing for.
   Optimise H1 and meta if queries suggest a different keyword is winning.

## INTERNAL LINK STRUCTURE (for domain authority)
Tools in the same category link to each other.
Finance tools link to finance tools.
Health tools link to health tools.
This creates topical clusters which Google rewards heavily.

Finance cluster: profit margin → VAT calculator → invoice generator → break even
Health cluster: BMI → calorie calculator → macro calculator → TDEE calculator
Legal cluster: NDA generator → contract generator → privacy policy → terms generator
Writing cluster: word count → readability → paraphrasing → plagiarism checker
Property cluster: mortgage calc → stamp duty → rental yield → buy-to-let calc

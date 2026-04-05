# IMAGE AND LOGO GENERATION GUIDE
# Every tool gets its own logo, hero image, and OG image.
# Claude Code generates the prompts. You run them in the free AI tools listed.
# Everything outputs at 4K quality where possible.

---

## FREE AI IMAGE TOOLS — USE THESE ONLY

1. IDEOGRAM (ideogram.ai) — USE FOR EVERYTHING
   Free: 10 generations per day, no credit card
   Signup: email only
   Use for: logos, hero images, OG cards, all tool images
   Quality: 4K, best text rendering of any free AI tool
   How: go to ideogram.ai → click Create → paste prompt → select 4K → generate

2. CANVA FREE (canva.com) — USE FOR OG SOCIAL CARDS ONLY
   Free: unlimited designs on free tier
   Signup: email or Google account
   Use for: 1200x630px OG social cards only
   How: New Design → Custom Size → 1200x630 → design → Download PNG

3. FLUX via FAL.AI (fal.ai) — USE FOR ILLUSTRATION STYLE
   Free: credits on signup, no subscription
   Use for: artistic illustration style images when Ideogram is not right
   How: fal.ai → Flux → paste prompt → generate

DO NOT USE: Microsoft Designer (requires Microsoft account), Google AI Studio (paid for image generation)

---

## READY-TO-USE PROMPTS FOR THREE BUILT TOOLS

### INVOICE GENERATOR AUSTRALIA

LOGO — paste into Ideogram, Square 1:1, 4K:
"Minimal professional logo for 'Invoice Generator AU'. Deep navy blue #0F4C75. Clean flat vector icon of a document with a dollar sign and a tick mark on the left. Bold text 'Invoice Generator' to the right. White background. No shadows. No gradients. No 3D effects. Square format. 4K."

HERO — paste into Ideogram, Wide 16:9, 4K:
"Clean minimal website hero image. Abstract floating document with clean geometric lines suggesting Australian financial precision. Deep navy and pale blue colour palette #F0F7FF background. No people. No text. No logos. Professional product photography lighting. Wide 16:9. 4K."

OG CARD — use Canva, 1200x630px:
Background: #0F4C75 navy gradient
Left: white document icon
Right: white text 'Free Invoice Generator Australia' bold, 'No signup. Download PDF for $1 AUD.' smaller
Save as: invoice-generator-australia.png → place in /public/og/

---

### RESUME BUILDER AUSTRALIA

LOGO — paste into Ideogram, Square 1:1, 4K:
"Minimal professional logo for 'Resume Builder AU'. Deep editorial purple #8B2FC9. Clean flat vector icon of a resume document with a star symbol. Bold sans-serif text 'Resume Builder' to the right. White background. No shadows. No gradients. No 3D. Square format. 4K."

HERO — paste into Ideogram, Wide 16:9, 4K:
"Clean minimal website hero for a resume builder tool. Abstract open document morphing into a professional profile. Warm purple and white palette, #FBF8FF background. Editorial magazine aesthetic. No people. No text. No logos. 16:9. 4K."

OG CARD — use Canva, 1200x630px:
Background: #8B2FC9 purple to #6225A0 gradient
Left: white document with star icon
Right: white bold text 'Free Resume Builder Australia', smaller text 'Build your resume in minutes. Download PDF for $1 AUD.'
Save as: resume-cv-builder-australia.png → place in /public/og/

---

### CURRENT TIME IN LONDON

LOGO — paste into Ideogram, Square 1:1, 4K:
"Minimal professional logo for 'Time In London'. Near-black #0A0A0F background. Electric cyan #00D4FF accent colour. Clean flat vector icon of Big Ben clock tower abstracted into simple geometric shapes. Modern sans-serif text 'Time In London' in cyan. Dark square format. No gradients. 4K."

HERO — paste into Ideogram, Wide 16:9, 4K:
"Dark minimal website hero. Abstract digital clock with electric cyan glowing numbers on near-black background #0A0A0F. London skyline as minimal geometric silhouette at bottom. Electric cyan #00D4FF glow effects. No people. No text visible. Wide 16:9. 4K."

OG CARD — use Canva, 1200x630px:
Background: #0A0A0F near-black
Left: electric cyan clock icon
Right: white bold text 'Current Time In London', smaller text 'Exact time with automatic GMT/BST. Free.'
Save as: current-time-in-london.png → place in /public/og/

---

## CLAUDE CODE'S JOB FOR EVERY TOOL

When Claude Code builds a tool, at the end of the build it outputs THREE things:

1. A logo prompt (for Ideogram)
2. A hero image prompt (for Ideogram)
3. An OG/social image prompt (for Canva)

Claude Code adds this at the END of every AGENT_PROMPT.md after the quality checklist:

---

## LOGO GENERATION (add this section to every AGENT_PROMPT.md)

After completing all build steps, generate these image prompts based on the tool's category and name. Output them to DECISIONS.md under the heading IMAGE PROMPTS.

### Logo Prompt Template (for Ideogram)
"Minimal professional logo for '[TOOL NAME]', [CATEGORY] category.
[COLOUR] primary colour. Clean vector style. Icon on left, text on right.
The icon represents [WHAT TOOL DOES IN ONE WORD].
White background. No shadows. No gradients. No 3D effects.
Sans-serif font, bold weight. Square format 1:1. 4K."

Customise by replacing:
[TOOL NAME] = the actual tool name
[CATEGORY] = finance / health / legal / writing / seo / property / education / general
[COLOUR] = the primary colour name from DESIGN_SYSTEM.md for that category
[WHAT TOOL DOES IN ONE WORD] = calculate / generate / check / convert / analyse

### Hero Image Prompt Template (for Ideogram)
"Clean minimal website hero image for a free [TOOL NAME] tool.
[CATEGORY AESTHETIC DESCRIPTION].
Central visual: [SPECIFIC VISUAL METAPHOR].
Colour palette: [SURFACE COLOUR] background, [ACCENT COLOUR] accents.
No people. No text. No UI chrome. Abstract minimal.
Photorealistic lighting. Wide 16:9 format. 4K ultra detail."

Customise:
[CATEGORY AESTHETIC DESCRIPTION] = see table below
[SPECIFIC VISUAL METAPHOR] = see table below

### OG Image Prompt Template (for Canva — 1200x630px)
Create in Canva Free tier:
Background: [PRIMARY COLOUR] gradient
Left side: white icon representing [TOOL FUNCTION]
Right side: bold white text '[TOOL NAME]', smaller text 'Free Online Tool' below
Save as [slug].png → place in /public/og/

---

## CATEGORY VISUAL GUIDE (Claude Code uses this to write prompts)

| Category | Aesthetic Description | Visual Metaphor | Primary Colour Name |
|----------|----------------------|-----------------|---------------------|
| finance | Corporate trust, clean lines, numerical precision | Rising graph line, stacked coins abstraction, calculator grid | deep navy blue |
| health | Organic warmth, clean clinical, nature + science | Leaf morphing into heartbeat line, clean molecular structure | forest green |
| legal | Authoritative, serious, precise, ink and paper | Balance scales abstraction, quill to digital pen, legal document fold | deep charcoal navy |
| writing | Creative, editorial, expressive, ink meets digital | Open book with light beam, pen to cursor transition, flowing text waves | editorial purple |
| seo | Data-driven, growth, analytical, signal and reach | Upward ranking arrows, network nodes, search beam | confident red-orange |
| property | Stable, investment, home, land and value | Architectural blueprint lines, house silhouette in negative space | estate navy with gold |
| education | Energetic, discovery, knowledge, growth | Lightbulb dissolving into stars, book to brain connection | energetic orange |
| general | Reliable, precise, universal utility, clean data | Geometric grid, clean calculator keys abstraction | reliable indigo |

---

## CARTOON/ILLUSTRATION STYLE ALTERNATIVE

If you want a more playful, memorable aesthetic for a specific tool
(works well for education tools and productivity tools):

FLUX ILLUSTRATION PROMPT TEMPLATE:
"Flat vector illustration for '[TOOL NAME]' web tool.
Isometric 3D style. [MAIN OBJECT] as the hero element.
[CATEGORY COLOUR] and white colour scheme.
Character-free. Object-focused. Geometric shapes only.
Reminiscent of early Stripe or Linear illustrations.
Clean white background. Square 1:1. 4K."

---

## WHERE TO PLACE GENERATED IMAGES

After generating:

/public/
  /logos/
    [slug].png               (1:1 square, used in header via logoPath prop)
  /og/
    [slug].png               (1200x630, used in og:image meta tag)
  /hero/
    [slug].jpg               (16:9, used as page background or decorative element)

Naming convention: always use the tool's URL slug as the filename.
Format: PNG for logos and OG images. WebP or JPG for hero images.
Compression: use squoosh.app (free) to compress before adding to /public/.
Target size: logo under 50KB, OG image under 200KB, hero under 300KB.

---

## FAVICON GENERATION

After generating the logo, create the favicon:
1. Go to favicon.io (free)
2. Upload your logo PNG
3. Download the favicon package
4. Place in /public/: favicon.ico, apple-touch-icon.png, site.webmanifest
5. These are already referenced in ToolLayout.tsx

---

## CLAUDE CODE'S EXACT INSTRUCTION FOR IMAGE PROMPTS

Add this to the end of every AGENT_PROMPT.md in the system:

"FINAL STEP — IMAGE GENERATION PROMPTS:
After all code steps are complete, generate image prompts for this tool.
Research: search for '[tool name] logo design inspiration' and '[tool name] website hero image'.
Note the visual conventions for this tool category.
Then write three prompts in DECISIONS.md under heading IMAGE GENERATION PROMPTS:
1. Logo prompt (for Ideogram — free at ideogram.ai)
2. Hero image prompt (for Ideogram — free at ideogram.ai)
3. OG social card (use Canva free tier — canva.com)
Follow the templates in IMAGE_AND_LOGO_PROMPTS.md.
Customise each prompt for this specific tool's category colour palette and visual metaphor.
All prompts must specify 4K quality.
The human will paste these prompts into the free tools to generate the actual images."

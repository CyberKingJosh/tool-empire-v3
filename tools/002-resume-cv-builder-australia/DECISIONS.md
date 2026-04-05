# DECISIONS: Resume CV Builder Australia

## DESIGN THINKING

### PURPOSE
Australian job seekers need a fast, free resume builder that produces ATS-friendly resumes without
forcing signup or payment before seeing a result. The user is typically a freelancer, graduate, or
career changer who wants a professional-looking resume in minutes.

### TONE
Editorial magazine — clean, authoritative, confident typography. The tool should feel like a premium
editorial product, not a generic SaaS form.

### DIFFERENTIATION
Real-time live preview that updates as you type — no submit button needed for the preview.
The resume preview builds itself section by section with smooth animations, giving the feeling
of watching a professional document come together in real time.

### UNFORGETTABLE DETAIL
The resume completion score animates like a speedometer needle swinging to the final percentage.
As users fill in sections, a circular progress indicator sweeps from 0% to 100% with an
easing animation, showing them how complete their resume is. Sections light up gold when complete.

---

## FONT PAIRING
Editorial Authority: DM Sans 700-800 display + DM Mono for numbers/scores

---

## COLOUR PALETTE (Writing & Content category)
Primary: #8B2FC9 (editorial purple)
Accent: #6225A0 (deep purple)
Surface: #FBF8FF (warm white)
Text: #1A0A2E (near-black purple)
Result: #E8A838 (warm gold)

---

## COMPETITOR RESEARCH

### Competitor 1: resume.io
- **Type**: Real interactive tool
- **Weaknesses**:
  1. Requires signup before building — forces account creation
  2. Free tier limited to one template (Vancouver) and .txt export only
  3. No Australian-specific formatting or templates
  4. Heavy marketing/conversion focus obscures actual tool

### Competitor 2: resumeai.com.au
- **Type**: Real interactive tool (AI-focused)
- **Weaknesses**:
  1. AI-only generation with limited manual editing control
  2. Only one free download — then paywall
  3. Privacy concerns with AI processing personal career data
  4. Vague about what premium vs free features are

### Competitor 3: novoresume.com
- **Type**: Real interactive tool
- **Weaknesses**:
  1. No Australian-specific resume format support
  2. Free tier restrictions unclear — feels like bait-and-switch
  3. No mention of ATS compatibility in free tier
  4. Generic global templates, not optimised for Australian job market

### Top 3 weaknesses we will fix:
1. **No signup required** — our tool works instantly, no account needed
2. **Full preview free** — see your complete resume on screen before paying anything
3. **Australian-optimised** — templates follow Australian resume conventions (no photo, no age, skills-first format, Australian English spelling)

### API Cost: FREE
Pure client-side form + template rendering. No external API needed.

### Australian Data: No specific rates needed
But we use Australian resume conventions: no photo requirement, no date of birth, Australian English
spelling, Australian phone format hints, state abbreviations (NSW, VIC, QLD, etc.)

---

## IMAGE GENERATION PROMPTS

### LOGO PROMPT (paste into Ideogram)
"Minimal professional logo for 'Resume Builder Australia', writing category.
Editorial purple #8B2FC9 primary colour. Clean vector style.
Icon on left showing a simple document with horizontal lines and a checkmark.
Text 'Resume Builder' on right in bold DM Sans style font.
White background. No shadows. No gradients. No 3D. Square 1:1. 4K."

### HERO IMAGE PROMPT (paste into Google Imagen 3)
"Clean minimal website hero image for a free resume builder tool.
Creative editorial aesthetic, ink meets digital precision.
Central visual: elegant document page floating with flowing text lines
transforming into golden highlight marks suggesting completion and quality.
Colour palette: warm white #FBF8FF background, deep purple #6225A0 accents.
No people. No text. No UI chrome. Abstract minimal.
Photorealistic studio lighting. Wide 16:9 format. 4K ultra detail."

### OG IMAGE PROMPT (paste into Microsoft Designer)
"Professional Open Graph social card for 'Resume Builder Australia'.
Left side: large document-with-checkmark icon in editorial purple #8B2FC9.
Right side: bold white text 'Resume Builder Australia', smaller text 'Free Online Tool' below.
Background: deep purple to midnight gradient, subtle geometric line pattern.
1200x630px format. Clean modern editorial design."

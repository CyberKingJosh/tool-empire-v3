# DECISIONS — AI Token Counter

## Design Thinking

### PURPOSE
Developers and AI power users need to estimate token counts and costs across multiple LLM providers. They paste text, select models, and instantly see how many tokens it uses and what it costs. Current tools only support one provider (OpenAI Tokenizer) or lack cost calculation (TokenCounter.org).

### TONE
Dark technical — like a real API usage dashboard. GitHub-dark aesthetic with terminal green results. This is a developer tool, not a consumer product.

### DIFFERENTIATION
Compares ALL major models (Claude, GPT-4, Gemini, Llama) side-by-side in one view. No competitor does this comprehensively. Users see token counts AND costs for every major model at once.

### UNFORGETTABLE DETAIL
A terminal-style blinking cursor next to the result, and numbers count up in monospace font like a real API meter ticking. The result area looks like a terminal output with a `>` prompt character.

---

## COMPETITOR RESEARCH

### Competitor 1: platform.openai.com/tokenizer
- Real interactive tool
- Only supports GPT models (no Claude, no Gemini, no Llama)
- Clean minimal UI, dark mode
- No cost calculation at all
- **We fix**: Support ALL major models with cost estimates

### Competitor 2: tokencounter.org
- Real interactive tool
- Basic text input, shows token count
- No cost calculation
- No model comparison
- Simple light UI, no personality
- **We fix**: Add cost calculation and multi-model comparison

### Competitor 3: artificialanalysis.ai
- Data/research focused, not an interactive calculator
- Great data tables but not a paste-and-count tool
- Users can't input their own text
- **We fix**: Make it interactive — paste text, get instant counts for all models

### Three Design Decisions
1. Dark theme with terminal aesthetic — matches developer expectations, competitors use light/neutral
2. Multi-model comparison table — show all models at once, no competitor does this
3. Live character/word count above the textarea as user types — instant feedback loop

---

## API Cost
FREE — all token estimation done client-side using character-based approximation (no API calls needed).

---

## Colour Palette (from DESIGN_SYSTEM.md — AI & Tech Tools)
- Primary: #0D1117 (GitHub dark)
- Accent: #58A6FF (electric blue)
- Surface: #161B22 (dark card)
- Text: #C9D1D9 (soft white)
- Result: #3FB950 (terminal green)

## Font Pairing (from FRONTEND_RULES.md — Pairing 2)
- Display: Space Grotesk 600-700
- Body: Space Grotesk 400
- Mono: JetBrains Mono 400

---

## IMAGE GENERATION PROMPTS

### Logo (Ideogram — 512x512)
"Minimal geometric logo for an AI token counter tool, abstract representation of text being tokenized into segments, electric blue (#58A6FF) on transparent background, clean vector style, no text, no gradients, professional developer tool aesthetic, 4K quality"

### Hero (Google Imagen 3 — 16:9)
"Dark technical dashboard showing code tokens being counted in real-time, terminal-style green numbers on dark background, professional developer tool interface, abstract data visualization, electric blue and green accents on near-black, cinematic lighting, 4K ultra sharp"

### OG Card (Microsoft Designer — 1200x630)
"AI Token Counter - Count tokens for ChatGPT, Claude, Gemini & Llama. Dark background #0D1117 with electric blue #58A6FF accents, terminal green #3FB950 numbers, professional developer tool branding, clean typography"

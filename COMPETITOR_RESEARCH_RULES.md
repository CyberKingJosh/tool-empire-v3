# COMPETITOR RESEARCH RULES
# Every agent runs this research step BEFORE writing any code.
# This is not optional. It is what separates tools that rank from tools that don't.
# Doing this adds 10-15 minutes to the build but saves weeks of failed ranking.

---

## THE RESEARCH STEP — DO THIS BEFORE ANY CODE

Open a browser. Search your tool's exact target keyword.
Look at the top 3 results. For each one answer these questions
and write your answers in DECISIONS.md under heading COMPETITOR RESEARCH.

### Question 1 — Is it a real tool or a blog post?
A real tool: has inputs, produces a result, requires the user's own numbers.
A blog post: gives generic information, no personalised calculation.
If all top 3 results are blog posts: you will rank within 4-8 weeks. Green light.
If top 3 are real tools: you need to beat them on design and features.

### Question 2 — What are the top 3 weaknesses of the best existing tool?
Look for these specific problems that you will fix:
- Requires signup or email before showing result
- Ugly or outdated design (built before 2020, no mobile optimisation)
- Belongs to a company with a commercial agenda (bank, insurance company, retailer)
  — these are trusted less by users who want unbiased results
- Loads slowly on mobile
- Only handles one variable when users need to compare multiple
- No share button or way to save results
- Generic placeholder text in inputs
- Missing Australian-specific data (uses US dollars, US tax rates, etc)
- No explanation of how the result was calculated
- Broken on mobile (horizontal scroll, tiny text, overlapping elements)

### Question 3 — Does this tool require API calls to function?
This is the API cost flag. Some tools cannot be built free.

SAFE — No external API needed, pure calculation or static data:
- All date and time tools (JavaScript handles timezones natively)
- All unit and currency converters (static conversion rates or free ECB API)
- All calculators using formulas (mortgage, BMI, calories, tax)
- All text tools (word count, character count, readability)
- Overlap hours calculators (pure timezone logic)
- EV vs petrol calculators (static fuel price data updated manually quarterly)
- Solar payback calculators (static electricity rate tables by state)
- Salary and superannuation calculators (static ATO rate tables)

YELLOW — Needs a free data source but no paid API:
- Currency converter: use European Central Bank free API (ecb.europa.eu/stats/eurofxref)
- Live gold/petrol prices: scrape public sources or update manually weekly
- Public holiday checker: use open public holiday APIs (free, no key needed)
- AI model pricing: static table updated manually when prices change

RED — Requires paid API, do NOT build as free AdSense tool:
- Real-time stock prices (requires paid financial data API)
- Live property valuations (requires CoreLogic or similar — expensive)
- Real-time flight prices (requires Skyscanner/Amadeus API — costly)
- Live electricity spot prices (requires AEMO API — complex)
- AI text generation inside the tool (requires Anthropic/OpenAI API — costs per use)

If your tool is RED: only build it if it is Type B ($1 export) or Type C (subscription)
so the revenue covers the API costs. Never build a RED tool as Type A (free/AdSense only).

---

## COMPETITOR WEAKNESS TABLE — WHAT WE FOUND FOR THE 30 EMERGING TOOLS

Use this table to understand what you are beating before you build.

| Tool | Top Competitor | Their Weakness | API Needed | Beat Difficulty |
|------|---------------|----------------|------------|-----------------|
| Overlap hours calculator | yayremote.com, nextutils.com, thebigupdate.com | Max 2 timezones, no Australian cities prominent, basic UI | None | 4/10 |
| EV vs petrol Australia | evcostaustralia.com, evdbau.com, mynrma.com.au | NRMA version requires model selection, others are old, none show 5-year total cost of ownership clearly | None (static data) | 5/10 |
| Solar payback QLD | Solar company lead-gen traps requiring phone number | All require contact details, none are truly unbiased | None (static tariff tables) | 3/10 |
| Salary to buy house AU | Bank calculators answer wrong question | Banks answer "how much can I borrow" not "what salary do I need" — completely different framing | None | 3/10 |
| Sleep debt calculator | Whoop/Oura apps only | No clean free web tool exists, all app-gated | None | 2/10 |
| ABN profit after tax | ATO calculator is clunky | ATO tool requires navigation through multiple screens, not instant | None (static ATO rates) | 2/10 |
| Freelance super calculator | Generic super calculators | All assume employee status, none for self-employed ABN holders | None | 2/10 |
| AI token counter | tokenizer.pro, platform.openai.com/tokenizer | OpenAI's own tool only works for GPT models, no Claude/Gemini comparison | None (tiktoken logic) | 3/10 |
| ChatGPT cost calculator | A few GitHub repos, no polished tools | All are developer-focused, ugly, no comparison across models | None (static pricing tables) | 2/10 |
| LLM model comparison | Static blog posts and tables | No interactive tool where you input your actual usage | None | 2/10 |
| Carbon footprint commute AU | Generic global calculators | None are Australia-specific with Australian grid emissions data | None (static AU grid data) | 2/10 |
| Home battery storage NSW | Solar company tools with lead-gen | All require contact details to see results | None | 3/10 |
| Sydney vs Melbourne rent/salary | Numbeo (complex), Budget Direct | Both are overwhelming, not focused on the specific question | None | 3/10 |
| Contractor vs employee super | Legal articles only | No tool exists, only text explanations | None | 1/10 |
| ABN vs TFN comparison | ATO pages | Informational pages only, no interactive comparison calculator | None | 1/10 |
| Biological age calculator | Some apps, few web tools | Most require blood test uploads, simple questionnaire version is underserved | None (algorithm) | 4/10 |
| Gut health score | Quizzes on health blogs | Not data-driven, no calculation logic | None | 3/10 |
| Public holiday clash checker | Manual calendars, no tool | No dedicated tool exists anywhere | Free public holiday APIs | 1/10 |
| Global meeting time optimizer | WorldTimeBuddy (main competitor) | WorldTimeBuddy is functional but dated, no mobile-first design | None | 5/10 |
| AI vs freelancer cost | Thin blog posts | No tool exists | None | 1/10 |
| Hormone cycle predictor | Flo app only | Web version does not exist | None | 3/10 |
| Automation ROI calculator | Enterprise tools only | Nothing simple for small Australian businesses | None | 2/10 |
| AI agent productivity gain | Nothing exists | Brand new category | None | 1/10 |

---

## THE UNFAIR ADVANTAGE — AUSTRALIA-SPECIFIC DATA

Most tools ranking globally use US or UK data.
Australian users are underserved because:
- US tax rates are irrelevant to Australians
- UK mortgage rates don't apply here
- American healthcare costs mean nothing to Medicare users

Your tools use Australian data by default:
- ATO tax rates and brackets (updated annually, hardcoded as static tables)
- Superannuation rate 11.5% (2024-2025), updating to 12% in 2025-2026
- Australian state-specific electricity rates (hardcoded, update quarterly)
- Australian petrol prices by state (hardcode average, note last updated date)
- Australian minimum wage (Fair Work Commission rates, hardcoded)
- Australian property stamp duty by state (hardcoded rate tables)

Label every Australia-specific data point with: "Based on [rate] as of [quarter/year]. Rates updated quarterly."
This builds trust AND gives you a reason to update pages (which Google rewards).

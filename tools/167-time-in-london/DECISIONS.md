# DECISIONS: Time in London

## Competitor Analysis (17 March 2026)
- **time.is/London** — 100px time, pure white bg, minimal, serif body (dated), right-aligned (odd), cleanest layout
- **timeanddate.com** — 48-60px time, analog SVG clock, weather widget, most features, medium clutter
- **24timezones.com** — 62px time, 12h/24h toggle, 4+ accent colours (chaotic), most generic

## Design Decisions

### 1. Light theme with massive time hero (beat time.is at its own game)
time.is wins on time size (100px) but looks bland. We use the DESIGN_SYSTEM light palette (#F8FAFC surface, #1B2A4A primary, #3B82F6 accent) with a 72-96px time display in JetBrains Mono with tabular-nums. Clean white card, generous whitespace, single accent colour. Result: cleaner than time.is, more focused than timeanddate.com, more polished than 24timezones.

### 2. Animated analog clock + 12h/24h toggle (combine best features of all three)
timeanddate.com has the only analog clock. 24timezones.com has the only format toggle. Nobody has both. We build a clean SVG-style analog clock with smooth second hand (navy/blue palette, not red) plus a prominent 12h/24h toggle button. This gives us a visual differentiator no single competitor matches.

### 3. Unforgettable detail: time-of-day ambient colour shift on the clock card
The clock card border subtly shifts colour based on London's time of day — warm gold for morning, bright blue for afternoon, deep indigo for evening, dark navy for night. No competitor does anything like this. It makes the tool feel alive and contextual without being gimmicky.

## Technical Decisions
- useState(null) + useEffect pattern from TIME_TOOL_PATTERN.md to prevent hydration mismatch
- font-variant-numeric: tabular-nums on all numeric displays to prevent digit jitter
- Space Grotesk for headings + JetBrains Mono for time display (Pairing 2: Technical Precision)
- 1-second setInterval for live updates with cleanup on unmount
- Intl.DateTimeFormat with Europe/London timezone for accurate BST/GMT detection

## Trade-offs
- No weather widget (adds API dependency, breaks Tier Zero free constraint)
- No dark mode toggle (light theme is the researched-correct choice for time tools; dark was explicitly wrong per DESIGN_RESEARCH.md)
- Analog clock is CSS-positioned divs not SVG (simpler, same visual result, smaller bundle)

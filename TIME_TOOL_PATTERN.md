# TIME TOOL PATTERN — MANDATORY FOR ALL CLOCK/TIME TOOLS
# Every agent building a time, clock, or "current time in [city]" tool reads this first.
# This file solves the three most common problems with React time displays.

---

## PROBLEM 1: HYDRATION MISMATCH

Next.js renders on the server first, then the client "hydrates" the HTML.
A clock shows different times on server vs client — React throws a hydration error.

### The correct pattern

```typescript
'use client'

import { useState, useEffect } from 'react'

export function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatTime = () => {
      return new Date().toLocaleTimeString('en-AU', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
    }

    // Set initial time after hydration
    setTime(formatTime())

    // Update every second
    const intervalId = setInterval(() => {
      setTime(formatTime())
    }, 1000)

    // CRITICAL: clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [timezone])

  // Placeholder during SSR — must match on server AND client
  if (!time) {
    return <span style={{ fontVariantNumeric: 'tabular-nums' }}>--:--:--</span>
  }

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
}
```

### Why this works

1. `useState(null)` — server renders `--:--:--`, client hydrates `--:--:--` = match
2. `useEffect` only runs on client after hydration — no mismatch possible
3. `return () => clearInterval(intervalId)` — prevents memory leak on unmount
4. Empty deps `[]` or `[timezone]` — interval created once, not on every render

### What NOT to do

```typescript
// WRONG — causes hydration mismatch
const [time, setTime] = useState(new Date().toLocaleTimeString())

// WRONG — causes hydration mismatch
return <div>{new Date().toLocaleTimeString()}</div>

// WRONG — causes memory leak (no cleanup)
useEffect(() => {
  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
}, [])

// WRONG — causes memory leak (no dependency array)
useEffect(() => {
  const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
  return () => clearInterval(id)
}) // missing []
```

---

## PROBLEM 2: DIGIT WIDTH JITTER

When the clock updates, digits like "1" are narrower than "8".
This causes the entire display to shift left and right every second.

### The fix: CSS tabular-nums

```css
.time-display {
  font-variant-numeric: tabular-nums;
}
```

This forces all digits to the same width. The colon and AM/PM stay proportional.
Works in all modern browsers. Tailwind class: `tabular-nums`.

### Font requirements

tabular-nums only works if the font supports the OpenType `tnum` feature.
These fonts support it:
- JetBrains Mono (our approved mono font) — YES
- Space Grotesk — YES
- DM Mono — YES
- System fonts (-apple-system, Segoe UI) — YES
- Most Google Fonts sans-serifs — YES

### Complete styling for time display

```typescript
const timeStyle = {
  fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
  fontVariantNumeric: 'tabular-nums',
  fontSize: 'clamp(48px, 12vw, 96px)',
  fontWeight: 600,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
}
```

---

## PROBLEM 3: TIMEZONE HANDLING

### Use IANA timezone identifiers

Every city time tool must use the correct IANA timezone string.
Do NOT calculate UTC offsets manually — they change with DST.

```typescript
const CITY_TIMEZONES: Record<string, string> = {
  'london': 'Europe/London',
  'new-york': 'America/New_York',
  'los-angeles': 'America/Los_Angeles',
  'tokyo': 'Asia/Tokyo',
  'sydney': 'Australia/Sydney',
  'dubai': 'Asia/Dubai',
  'paris': 'Europe/Paris',
  'singapore': 'Asia/Singapore',
  'toronto': 'America/Toronto',
  'india': 'Asia/Kolkata',
  'hong-kong': 'Asia/Hong_Kong',
  'berlin': 'Europe/Berlin',
  'moscow': 'Europe/Moscow',
  'seoul': 'Asia/Seoul',
  'beijing': 'Asia/Shanghai',
  'bangkok': 'Asia/Bangkok',
  'cairo': 'Africa/Cairo',
  'johannesburg': 'Africa/Johannesburg',
  'mexico-city': 'America/Mexico_City',
  'sao-paulo': 'America/Sao_Paulo',
}
```

### Display the timezone name

```typescript
const timezoneName = new Date().toLocaleDateString('en-AU', {
  timeZone: timezone,
  timeZoneName: 'long',
}).split(',').pop()?.trim()

// Returns: "Greenwich Mean Time" or "British Summer Time"
```

### Show UTC offset

```typescript
const offset = new Date().toLocaleTimeString('en-AU', {
  timeZone: timezone,
  timeZoneName: 'shortOffset',
}).split(' ').pop()

// Returns: "GMT+0" or "GMT+1"
```

---

## COMPLETE TIME TOOL PAGE TEMPLATE

Every "current time in [city]" tool follows this exact structure:

```
[ToolLayout — time category, light theme]
  [H1: "Current Time in [City]"]
  [One-liner: "Exact local time with automatic daylight saving handling."]

  [Time Display Card]
    [Time: 96px on desktop, 48px on mobile, JetBrains Mono, tabular-nums]
    [Date: formatted as "Monday, 17 March 2026"]
    [Timezone: "Greenwich Mean Time (GMT)" or "British Summer Time (BST)"]
    [UTC offset: "UTC+0" or "UTC+1"]
    [DST status: "DST is not active" or "DST is active (clocks forward 1 hour)"]

  [Quick Facts Card]
    [Country and continent]
    [When DST starts/ends this year]
    [Time difference from user's local time]
    [Sunrise and sunset times (approximate)]

  [How It Works — 3-4 sentences]
  [Related Tools — from builtTools.ts]
  [Affiliate Box — Calendly or similar timezone-relevant product]
```

### The time display must be:
- The visually dominant element on the page
- Visible above the fold on 375px mobile
- Updating every second with no visible animation
- Using JetBrains Mono with tabular-nums
- Near-black (#0F172A) on the light surface (#F8FAFC) for maximum contrast

---

## COLOUR PALETTE FOR TIME TOOLS (UPDATED — LIGHT THEME)

The dark theme has been removed. All time tools use this light palette:

Primary: #1B2A4A (deep navy — authority)
Accent: #3B82F6 (clear blue — precision)
Surface: #F8FAFC (cool white — clean background)
Text: #1E293B (slate — readable)
Result: #0F172A (near-black — maximum contrast for time digits)
Font pairing: Space Grotesk 600-700 for headings + JetBrains Mono for time

Why light, not dark:
- time.is uses white background — 100M+ monthly visitors
- timeanddate.com uses light backgrounds for content areas
- Light backgrounds are readable in any lighting condition
- Dark backgrounds create glare, reduce readability for older users
- The time digits need maximum contrast — near-black on white achieves this
- Ordinary people searching "what time is it in London" expect a clean, bright page

---

## ACCESSIBILITY

```typescript
// Screen reader announcement
<div aria-live="polite" aria-atomic="true">
  {time}
</div>

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .time-display { animation: none; transition: none; }
}
```

---

## TESTING

After building any time tool, verify:
1. Time is correct compared to time.is for the same city
2. Time updates every second without page reload
3. No hydration mismatch warning in browser console
4. Digits do not shift width when seconds change (tabular-nums working)
5. Page loads in under 1 second
6. Time is visible above fold on 375px mobile
7. DST label is correct for the current date

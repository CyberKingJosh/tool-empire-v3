/**
 * Time in London — pure calculation logic
 * No React, no side effects, fully testable
 */

export const LONDON_TIMEZONE = 'Europe/London' as const

export interface LondonTimeResult {
  /** Formatted time string e.g. "2:45:30 PM" */
  time: string
  /** Formatted date string e.g. "Saturday, 15 March 2026" */
  date: string
  /** UTC offset string e.g. "GMT+0" or "BST (GMT+1)" */
  utcOffset: string
  /** Whether British Summer Time is active */
  isBST: boolean
  /** IANA timezone name */
  timezone: typeof LONDON_TIMEZONE
  /** ISO 8601 string in London time */
  iso: string
  /** Unix timestamp (ms) */
  timestamp: number
  /** 24-hour formatted time e.g. "14:45:30" */
  time24: string
  /** Greeting based on time of day */
  greeting: string
  /** Period of day: morning, afternoon, evening, night */
  period: 'morning' | 'afternoon' | 'evening' | 'night'
}

/**
 * Get the current time in London with full metadata.
 * Accepts an optional Date for testability.
 */
export function getLondonTime(now: Date = new Date()): LondonTimeResult {
  const timestamp = now.getTime()

  // Format in London timezone
  const londonDate = new Date(now.toLocaleString('en-US', { timeZone: LONDON_TIMEZONE }))

  const hours = londonDate.getHours()
  const minutes = londonDate.getMinutes()
  const seconds = londonDate.getSeconds()

  // 12-hour format
  const h12 = hours % 12 || 12
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const time = `${h12}:${pad(minutes)}:${pad(seconds)} ${ampm}`

  // 24-hour format
  const time24 = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  // Full date
  const date = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: LONDON_TIMEZONE,
  })

  // Determine BST vs GMT
  const isBST = isBritishSummerTime(now)
  const utcOffset = isBST ? 'BST (GMT+1)' : 'GMT+0'

  // ISO string in London time
  const offsetHours = isBST ? 1 : 0
  const iso = formatISOWithOffset(londonDate, offsetHours)

  // Time-of-day greeting and period
  const { greeting, period } = getGreeting(hours)

  return {
    time,
    date,
    utcOffset,
    isBST,
    timezone: LONDON_TIMEZONE,
    iso,
    timestamp,
    time24,
    greeting,
    period,
  }
}

/**
 * Determine if a given date falls within British Summer Time.
 * BST runs from the last Sunday of March at 01:00 UTC to
 * the last Sunday of October at 01:00 UTC.
 */
export function isBritishSummerTime(date: Date): boolean {
  const year = date.getUTCFullYear()

  // Last Sunday of March
  const marchLast = lastSundayOf(year, 2) // month 2 = March (0-indexed)
  const bstStart = new Date(Date.UTC(year, 2, marchLast, 1, 0, 0))

  // Last Sunday of October
  const octLast = lastSundayOf(year, 9) // month 9 = October
  const bstEnd = new Date(Date.UTC(year, 9, octLast, 1, 0, 0))

  return date.getTime() >= bstStart.getTime() && date.getTime() < bstEnd.getTime()
}

/**
 * Convert user's local time to London time for comparison.
 */
export function convertToLondon(localDate: Date): LondonTimeResult {
  return getLondonTime(localDate)
}

/**
 * Calculate the time difference between the user's timezone and London.
 * Returns hours offset (positive = ahead of London).
 */
export function getOffsetFromLondon(now: Date = new Date()): number {
  const localOffset = -now.getTimezoneOffset() / 60 // local UTC offset in hours
  const londonOffset = isBritishSummerTime(now) ? 1 : 0
  return localOffset - londonOffset
}

/**
 * Format a shareable string for the current London time.
 */
export function formatShareText(result: LondonTimeResult): string {
  return `The time in London is ${result.time} (${result.utcOffset}) on ${result.date}`
}

// --- Internal helpers ---

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function lastSundayOf(year: number, month: number): number {
  // Get the last day of the month
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const lastDate = new Date(Date.UTC(year, month, lastDay))
  const dayOfWeek = lastDate.getUTCDay() // 0 = Sunday
  return lastDay - dayOfWeek
}

function formatISOWithOffset(date: Date, offsetHours: number): string {
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const min = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  const offset = offsetHours === 0 ? 'Z' : `+${pad(offsetHours)}:00`
  return `${y}-${m}-${d}T${h}:${min}:${s}${offset}`
}

function getGreeting(hour: number): { greeting: string; period: LondonTimeResult['period'] } {
  if (hour >= 5 && hour < 12) return { greeting: 'Good morning, London', period: 'morning' }
  if (hour >= 12 && hour < 17) return { greeting: 'Good afternoon, London', period: 'afternoon' }
  if (hour >= 17 && hour < 21) return { greeting: 'Good evening, London', period: 'evening' }
  return { greeting: 'Good night, London', period: 'night' }
}

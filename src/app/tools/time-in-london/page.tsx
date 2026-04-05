'use client'

import { useState, useEffect, useCallback } from 'react'
import ToolLayout from '../../../../shared/components/ToolLayout'
import ToolInput from '../../../../shared/components/ToolInput'
import RelatedTools from '../../../../shared/components/RelatedTools'
import {
  getLondonTime,
  getOffsetFromLondon,
  formatShareText,
  type LondonTimeResult,
} from '../../../lib/tools/time-in-london'

// Time palette — Light theme (DESIGN_SYSTEM.md)
const P = {
  primary: '#1B2A4A',
  accent: '#3B82F6',
  surface: '#F8FAFC',
  text: '#1E293B',
  result: '#0F172A',
  border: '#E2E8F0',
  muted: '#64748B',
} as const

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''

// Mono style with tabular-nums (TIME_TOOL_PATTERN.md)
const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontVariantNumeric: 'tabular-nums',
}

// Ambient border colour based on time of day (unforgettable detail)
function getAmbientColor(period: LondonTimeResult['period']): string {
  switch (period) {
    case 'morning': return '#F59E0B'   // warm gold
    case 'afternoon': return '#3B82F6' // bright blue
    case 'evening': return '#6366F1'   // indigo
    case 'night': return '#1E293B'     // dark navy
  }
}

// --- Analog Clock Face ---

function ClockFace({ hours, minutes, seconds, period }: {
  hours: number; minutes: number; seconds: number; period: LondonTimeResult['period']
}) {
  const hourDeg = ((hours % 12) + minutes / 60) * 30
  const minuteDeg = (minutes + seconds / 60) * 6
  const secondDeg = seconds * 6
  const ambient = getAmbientColor(period)

  return (
    <div
      style={{
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: `2px solid ${P.border}`,
        position: 'relative',
        margin: '0 auto 24px',
        backgroundColor: '#FFFFFF',
        boxShadow: `0 0 0 4px ${ambient}15, 0 4px 12px rgba(0,0,0,0.06)`,
        transition: 'box-shadow 2s ease',
      }}
      aria-hidden="true"
    >
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30
        const rad = (angle - 90) * (Math.PI / 180)
        const r = i % 3 === 0 ? 64 : 68
        const x = 80 + r * Math.cos(rad)
        const y = 80 + r * Math.sin(rad)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - (i % 3 === 0 ? 3 : 1.5),
              top: y - (i % 3 === 0 ? 3 : 1.5),
              width: i % 3 === 0 ? 6 : 3,
              height: i % 3 === 0 ? 6 : 3,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? P.primary : P.border,
            }}
          />
        )
      })}

      {/* Hour hand */}
      <div style={{
        position: 'absolute', bottom: '50%', left: '50%',
        width: 4, height: 38, marginLeft: -2,
        backgroundColor: P.primary, borderRadius: 2,
        transformOrigin: 'bottom center',
        transform: `rotate(${hourDeg}deg)`,
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Minute hand */}
      <div style={{
        position: 'absolute', bottom: '50%', left: '50%',
        width: 3, height: 52, marginLeft: -1.5,
        backgroundColor: P.primary, borderRadius: 2,
        transformOrigin: 'bottom center',
        transform: `rotate(${minuteDeg}deg)`,
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Second hand */}
      <div style={{
        position: 'absolute', bottom: '50%', left: '50%',
        width: 1.5, height: 56, marginLeft: -0.75,
        backgroundColor: ambient, borderRadius: 1,
        transformOrigin: 'bottom center',
        transform: `rotate(${secondDeg}deg)`,
        transition: 'box-shadow 2s ease',
      }} />

      {/* Center dot */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 8, height: 8, marginLeft: -4, marginTop: -4,
        borderRadius: '50%', backgroundColor: ambient,
        transition: 'background-color 2s ease',
      }} />
    </div>
  )
}

// --- Main Page ---

export default function TimeInLondonPage() {
  // TIME_TOOL_PATTERN: useState(null) to prevent hydration mismatch
  const [londonTime, setLondonTime] = useState<LondonTimeResult | null>(null)
  const [userCity, setUserCity] = useState('')
  const [copied, setCopied] = useState(false)
  const [offsetHours, setOffsetHours] = useState<number>(0)
  const [use24h, setUse24h] = useState(false)

  // Live clock — update every second, client-only
  useEffect(() => {
    const update = () => {
      setLondonTime(getLondonTime())
      setOffsetHours(getOffsetFromLondon())
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = useCallback(async () => {
    if (!londonTime) return
    try {
      await navigator.clipboard.writeText(formatShareText(londonTime))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }, [londonTime])

  const handleShare = useCallback(() => {
    if (!londonTime) return
    const text = formatShareText(londonTime)
    const url = `${BASE_URL}/tools/time-in-london`
    if (navigator.share) {
      navigator.share({ title: 'Time in London', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`).catch(() => {})
    }
  }, [londonTime])

  const clockHours = londonTime ? parseInt(londonTime.time24.split(':')[0], 10) : 0
  const clockMinutes = londonTime ? parseInt(londonTime.time24.split(':')[1], 10) : 0
  const clockSeconds = londonTime ? parseInt(londonTime.time24.split(':')[2], 10) : 0
  const ambient = londonTime ? getAmbientColor(londonTime.period) : P.accent

  return (
    <ToolLayout
      title="Current Time in London Right Now | Tool Empire"
      description="See the current time in London right now. Live clock with GMT/BST detection, timezone offset, and 12h/24h toggle. Free, no signup."
      canonical={`${BASE_URL}/tools/time-in-london`}
      schemaType="SoftwareApplication"
      toolCategory="time"
      tier={0}
      h1="Current Time in London"
      oneLiner="Live London clock with automatic GMT/BST detection. Updated every second."
      logoPath={null}
      schemaData={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Current Time in London',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
        description: 'See the current time in London right now. Live clock with GMT/BST timezone detection, updated every second. Free, no signup required.',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0ms !important; transition-duration: 0ms !important; }
        }
      `}</style>

      {/* ===== TIME DISPLAY CARD (above fold) ===== */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Current time in London"
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${P.border}`,
          borderLeft: `4px solid ${ambient}`,
          borderRadius: 12,
          padding: 'clamp(24px, 5vw, 40px)',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          animation: 'fadeIn 200ms ease-out',
          transition: 'border-color 2s ease',
        }}
      >
        {londonTime ? (
          <>
            {/* Analog clock */}
            <ClockFace hours={clockHours} minutes={clockMinutes} seconds={clockSeconds} period={londonTime.period} />

            {/* Digital time — hero */}
            <p style={{
              fontSize: 'clamp(48px, 12vw, 96px)',
              fontWeight: 700,
              color: P.result,
              lineHeight: 1,
              margin: '0 0 4px',
              ...MONO,
            }}>
              {use24h ? londonTime.time24 : londonTime.time}
            </p>

            {/* 12h/24h toggle */}
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
              <button
                onClick={() => setUse24h(false)}
                style={{
                  padding: '4px 12px', fontSize: 13, fontWeight: 600,
                  color: !use24h ? '#FFFFFF' : P.muted,
                  backgroundColor: !use24h ? P.primary : 'transparent',
                  border: `1px solid ${!use24h ? P.primary : P.border}`,
                  borderRadius: 6, cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >12h</button>
              <button
                onClick={() => setUse24h(true)}
                style={{
                  padding: '4px 12px', fontSize: 13, fontWeight: 600,
                  color: use24h ? '#FFFFFF' : P.muted,
                  backgroundColor: use24h ? P.primary : 'transparent',
                  border: `1px solid ${use24h ? P.primary : P.border}`,
                  borderRadius: 6, cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >24h</button>
            </div>

            {/* Date */}
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: 500,
              color: P.text,
              marginBottom: 8,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {londonTime.date}
            </p>

            {/* Timezone badge */}
            <span style={{
              display: 'inline-block',
              padding: '5px 14px',
              fontSize: 13,
              fontWeight: 600,
              color: P.accent,
              backgroundColor: `${P.accent}10`,
              border: `1px solid ${P.accent}30`,
              borderRadius: 20,
              marginBottom: 12,
              ...MONO,
            }}>
              {londonTime.utcOffset}
            </span>

            {/* User offset */}
            {offsetHours !== 0 && (
              <p style={{ fontSize: 14, color: P.muted, marginTop: 4 }}>
                London is{' '}
                <strong style={{ color: P.primary }}>
                  {Math.abs(offsetHours)}h
                </strong>{' '}
                {offsetHours > 0 ? 'behind' : 'ahead of'} you
              </p>
            )}

            {/* Live indicator + actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 12, color: P.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Live</span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  padding: '8px 16px', fontSize: 13, fontWeight: 600,
                  color: P.accent, backgroundColor: 'transparent',
                  border: `1px solid ${P.border}`, borderRadius: 8,
                  cursor: 'pointer', minHeight: 40,
                  transition: 'border-color 150ms ease',
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
              <button
                onClick={handleShare}
                style={{
                  padding: '8px 16px', fontSize: 13, fontWeight: 600,
                  color: P.accent, backgroundColor: 'transparent',
                  border: `1px solid ${P.border}`, borderRadius: 8,
                  cursor: 'pointer', minHeight: 40,
                  transition: 'border-color 150ms ease',
                }}
              >
                Share
              </button>
            </div>
          </>
        ) : (
          /* SSR placeholder — no time rendered server-side (TIME_TOOL_PATTERN) */
          <div style={{ padding: 48, textAlign: 'center' }}>
            <p style={{ fontSize: 18, color: P.muted }}>Loading London time...</p>
          </div>
        )}
      </div>

      {/* ===== QUICK FACTS CARD ===== */}
      {londonTime && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
          marginTop: 24,
        }}>
          {[
            { label: 'Timezone', value: londonTime.isBST ? 'BST' : 'GMT' },
            { label: 'UTC Offset', value: londonTime.isBST ? '+01:00' : '+00:00' },
            { label: 'DST Active', value: londonTime.isBST ? 'Yes' : 'No' },
          ].map((fact) => (
            <div key={fact.label} style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${P.border}`,
              borderRadius: 10,
              padding: '14px 16px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: P.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                {fact.label}
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, color: P.primary, ...MONO }}>
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ===== PERSONAL INPUT — Compare your city ===== */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${P.border}`,
        borderRadius: 12,
        padding: 'clamp(16px, 3vw, 24px)',
        marginTop: 24,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: P.primary, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
          Compare With Your City
        </h2>
        <ToolInput
          label="Your City or Label"
          value={userCity}
          onChange={(e) => setUserCity(e.currentTarget.value)}
          placeholder="e.g. Sydney, New York, Tokyo"
          accentColor={P.accent}
          primaryColor={P.primary}
          helpText="Type a label to personalise your time comparison"
        />
        {userCity.trim() && londonTime && (
          <div style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: `${P.accent}08`,
            border: `1px solid ${P.accent}20`,
            marginTop: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: P.muted, marginBottom: 2 }}>London</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: P.result, ...MONO }}>
                  {use24h ? londonTime.time24 : londonTime.time}
                </p>
              </div>
              <div style={{ fontSize: 20, color: P.border, fontWeight: 300 }}>vs</div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: P.muted, marginBottom: 2 }}>{userCity}</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: P.text, ...MONO }}>
                  {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: !use24h }).toUpperCase()}
                </p>
              </div>
            </div>
            {offsetHours !== 0 && (
              <p style={{ fontSize: 13, color: P.muted, marginTop: 8, textAlign: 'center' }}>
                {Math.abs(offsetHours)}h {offsetHours > 0 ? 'ahead of' : 'behind'} London ({londonTime.utcOffset})
              </p>
            )}
          </div>
        )}
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: P.primary, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>How It Works</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: P.text, opacity: 0.85 }}>
          This tool displays the current time in London, England, updated every second using your device clock
          and the Europe/London timezone. It automatically detects whether London is on Greenwich Mean Time (GMT)
          or British Summer Time (BST), which runs from the last Sunday in March to the last Sunday in October.
          The time offset between your location and London is calculated in real time.
        </p>
      </section>

      {/* ===== BLOG ARTICLE (300-500 words) ===== */}
      <article style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: P.primary, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
          Understanding London Time: GMT and BST Explained
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: P.text, opacity: 0.85 }}>
          <p style={{ marginBottom: 16 }}>
            London sits at the heart of the world&apos;s timekeeping system. Greenwich Mean Time (GMT) — named after
            the Royal Observatory in Greenwich, southeast London — has served as the global reference point for
            time since 1884. When people ask &quot;what time is it in London?&quot;, they&apos;re asking about one
            of the most searched time zones on the planet, with over 500,000 monthly searches worldwide.
          </p>
          <p style={{ marginBottom: 16 }}>
            London observes two time zones throughout the year. During winter months (late October through late
            March), the city runs on GMT, which is UTC+0 — the baseline from which all other time zones are
            measured. During the warmer months, the UK switches to British Summer Time (BST), which is UTC+1,
            effectively moving clocks forward by one hour to make better use of daylight.
          </p>
          <p style={{ marginBottom: 16 }}>
            The change happens on the last Sunday of March at 1:00 AM GMT (clocks spring forward to 2:00 AM BST)
            and reverts on the last Sunday of October at 2:00 AM BST (clocks fall back to 1:00 AM GMT). This
            means the time difference between London and other cities can shift throughout the year. For example,
            Sydney is normally 11 hours ahead of London during GMT, but only 10 hours ahead during BST because
            Australia&apos;s daylight saving operates on the opposite schedule.
          </p>
          <p style={{ marginBottom: 16 }}>
            For business, travel, and communication, knowing the exact time in London is essential. London is
            one of the world&apos;s major financial centres — the London Stock Exchange opens at 8:00 AM GMT and
            closes at 4:30 PM GMT. Many international conference calls and meetings are scheduled around London
            time because it bridges Asian and American business hours.
          </p>
          <p style={{ marginBottom: 16 }}>
            If you&apos;re coordinating across time zones, our{' '}
            <a href="/tools/time-zone-converter" style={{ color: P.accent, textDecoration: 'underline' }}>
              Time Zone Converter
            </a>{' '}
            can help you translate times between any two cities, and the{' '}
            <a href="/tools/overlap-hours-calculator" style={{ color: P.accent, textDecoration: 'underline' }}>
              Overlap Hours Calculator
            </a>{' '}
            shows the best meeting windows for teams spread across the globe.
          </p>
          <p>
            This tool uses your device clock combined with the IANA &quot;Europe/London&quot; timezone database
            to display the accurate current time in London, automatically handling the GMT/BST transition so
            you never have to guess which offset applies.
          </p>
        </div>
      </article>

      {/* ===== AFFILIATE BOX — Calendly (HIDDEN — no affiliate agreement yet) =====
      Apply at calendly.com/lp/partners — backup: getclockwise.com partners
      <div style={{
        border: `1px solid ${P.border}`,
        borderRadius: 12,
        padding: 20,
        marginTop: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 200 }}>
          <img
            src="https://logo.clearbit.com/calendly.com"
            alt="Calendly logo"
            width={36}
            height={36}
            style={{ borderRadius: 8, flexShrink: 0 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div>
            <div style={{ fontSize: 11, color: P.muted, marginBottom: 2 }}>Sponsored</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: P.primary, marginBottom: 2 }}>Calendly</div>
            <div style={{ fontSize: 14, color: P.muted, lineHeight: 1.4 }}>Schedule meetings across time zones automatically. Used by 20M+ people worldwide.</div>
          </div>
        </div>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            backgroundColor: P.accent,
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 150ms ease',
          }}
        >
          Try Free
        </a>
      </div>
      AFFILIATE: apply at calendly.com/lp/partners
          When approved, replace href with your real tracking link.
          Backup if rejected: getclockwise.com — Company → Partners
      ===== END HIDDEN AFFILIATE BOX ===== */}

      {/* ===== RELATED TOOLS ===== */}
      <RelatedTools currentSlug="time-in-london" category="time" />
    </ToolLayout>
  )
}

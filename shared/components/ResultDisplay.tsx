'use client'

import { useEffect, useState, useRef, ReactNode } from 'react'

interface ResultDisplayProps {
  value: number | string | null
  label: string
  explanation?: string
  prefix?: string
  suffix?: string
  accentColor: string
  surfaceColor: string
  textColor: string
  resultColor: string
  showStripeExport?: boolean
  toolSlug?: string
  documentTitle?: string
  shareUrl?: string
  children?: ReactNode
}

function useCountUp(target: number, duration: number = 400): number {
  const [current, setCurrent] = useState(0)
  const startTime = useRef<number | null>(null)
  const animFrame = useRef<number>(0)

  useEffect(() => {
    if (target === 0) {
      setCurrent(0)
      return
    }

    startTime.current = null
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCurrent(Math.round(target * eased * 100) / 100)

      if (progress < 1) {
        animFrame.current = requestAnimationFrame(animate)
      }
    }

    animFrame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame.current)
  }, [target, duration])

  return current
}

export default function ResultDisplay({
  value,
  label,
  explanation,
  prefix = '',
  suffix = '',
  accentColor,
  surfaceColor,
  textColor,
  resultColor,
  showStripeExport = false,
  toolSlug,
  documentTitle,
  shareUrl,
  children,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false)
  const numericValue = typeof value === 'number' ? value : 0
  const animatedValue = useCountUp(numericValue)
  const displayValue = typeof value === 'string' ? value : animatedValue

  if (value === null) return null

  const formattedValue = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-AU', { maximumFractionDigits: 2 })
    : displayValue

  const handleCopy = async () => {
    const text = `${prefix}${formattedValue}${suffix}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  const handleShare = () => {
    if (shareUrl && navigator.share) {
      navigator.share({ title: label, url: shareUrl }).catch(() => {})
    } else if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).catch(() => {})
    }
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: surfaceColor,
        border: `2px solid ${accentColor}`,
        borderRadius: 16,
        padding: 'clamp(20px, 4vw, 32px)',
        marginTop: 24,
        animation: 'resultEntrance 250ms ease-out',
      }}
    >
      <style>{`
        @keyframes resultEntrance {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <p style={{ fontSize: 16, fontWeight: 400, color: textColor, marginBottom: 8 }}>
        {label}
      </p>
      <p
        style={{
          fontSize: 'clamp(36px, 8vw, 72px)',
          fontWeight: 800,
          color: resultColor,
          lineHeight: 1.1,
          fontFamily: "'JetBrains Mono', 'DM Mono', monospace",
        }}
      >
        {prefix}{formattedValue}{suffix}
      </p>

      {explanation && (
        <p style={{ fontSize: 16, marginTop: 24, color: textColor, opacity: 0.8, lineHeight: 1.6 }}>
          {explanation}
        </p>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={handleCopy}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
            color: accentColor,
            backgroundColor: 'transparent',
            border: `1px solid ${accentColor}40`,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        {shareUrl && (
          <button
            onClick={handleShare}
            style={{
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 600,
              color: accentColor,
              backgroundColor: 'transparent',
              border: `1px solid ${accentColor}40`,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Share
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

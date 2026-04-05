'use client'

import { useState } from 'react'

interface ProUpgradeProps {
  toolName: string
  primaryColor: string
  accentColor: string
  surfaceColor: string
  monthlyPrice: number // 15 or 19 AUD
}

export default function ProUpgrade({
  toolName,
  primaryColor,
  accentColor,
  surfaceColor,
  monthlyPrice,
}: ProUpgradeProps) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolName, priceAud: monthlyPrice }),
      })

      if (!res.ok) {
        setLoading(false)
        return
      }

      const data = await res.json() as { url?: string }
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  const annualPrice = Math.round(monthlyPrice * 12 * 0.8)

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 16,
        border: `2px solid ${accentColor}`,
        backgroundColor: surfaceColor,
        marginTop: 24,
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: 20, fontWeight: 700, color: primaryColor, marginBottom: 8 }}>
        Upgrade to Pro
      </h3>
      <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.8 }}>
        Unlimited uses, saved history, team sharing, and CSV/PDF export.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            backgroundColor: primaryColor,
            border: 'none',
            borderRadius: 8,
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : `$${monthlyPrice} AUD/month`}
        </button>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 700,
            color: primaryColor,
            backgroundColor: 'transparent',
            border: `2px solid ${primaryColor}`,
            borderRadius: 8,
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          ${annualPrice} AUD/year (save 20%)
        </button>
      </div>
    </div>
  )
}

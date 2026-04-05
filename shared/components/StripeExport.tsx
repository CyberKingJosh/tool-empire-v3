'use client'

import { useState, FormEvent } from 'react'

interface StripeExportProps {
  toolSlug: string
  documentTitle: string
  accentColor: string
  primaryColor: string
}

type ExportState = 'idle' | 'paying' | 'email' | 'sending' | 'success' | 'error'

export default function StripeExport({
  toolSlug,
  documentTitle,
  accentColor,
  primaryColor,
}: StripeExportProps) {
  const [state, setState] = useState<ExportState>('idle')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handlePayment = async () => {
    setState('paying')
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug, documentTitle }),
      })

      if (!res.ok) {
        setState('error')
        setErrorMessage('Payment could not be processed. Please try again.')
        return
      }

      // On successful payment intent creation, show email input
      setState('email')
    } catch {
      setState('error')
      setErrorMessage('Connection error. Please check your internet and try again.')
    }
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setState('sending')
    try {
      const res = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug, email, documentTitle }),
      })

      if (!res.ok) {
        setState('error')
        setErrorMessage('PDF delivery failed. Please contact support.')
        return
      }

      setState('success')
    } catch {
      setState('error')
      setErrorMessage('Connection error. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          border: `2px solid ${accentColor}`,
          textAlign: 'center',
          marginTop: 16,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700, color: accentColor }}>
          ✓ PDF sent to {email}
        </p>
        <p style={{ fontSize: 14, marginTop: 8, opacity: 0.7 }}>
          Check your inbox. It should arrive within 60 seconds.
        </p>
      </div>
    )
  }

  if (state === 'email' || state === 'sending') {
    return (
      <form
        onSubmit={handleEmailSubmit}
        style={{
          padding: 20,
          borderRadius: 12,
          border: `1px solid ${accentColor}40`,
          marginTop: 16,
        }}
      >
        <label
          htmlFor="export-email"
          style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}
        >
          Where should we send your PDF?
        </label>
        <input
          id="export-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            marginBottom: 12,
            minHeight: 48,
          }}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          style={{
            width: '100%',
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            backgroundColor: accentColor,
            border: 'none',
            borderRadius: 8,
            cursor: state === 'sending' ? 'wait' : 'pointer',
            opacity: state === 'sending' ? 0.7 : 1,
          }}
        >
          {state === 'sending' ? 'Sending...' : 'Send PDF'}
        </button>
      </form>
    )
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button
        onClick={handlePayment}
        disabled={state === 'paying'}
        style={{
          width: '100%',
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          backgroundColor: accentColor,
          border: 'none',
          borderRadius: 8,
          cursor: state === 'paying' ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span>↓</span>
        <span>{state === 'paying' ? 'Processing...' : 'Download as PDF — $1'}</span>
      </button>
      <p style={{ fontSize: 12, textAlign: 'center', marginTop: 6, opacity: 0.6 }}>
        Instant download. No account needed.
      </p>
      {state === 'error' && (
        <p style={{ color: '#DC2626', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}

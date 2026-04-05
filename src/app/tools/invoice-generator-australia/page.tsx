'use client'

import { useState, useCallback, useEffect } from 'react'
import ToolLayout from '../../../../shared/components/ToolLayout'
import ToolInput from '../../../../shared/components/ToolInput'
import StripeExport from '../../../../shared/components/StripeExport'
import RelatedTools from '../../../../shared/components/RelatedTools'
import {
  generateInvoice,
  validateABN,
  AU_CONSTANTS,
  type InvoiceInput,
  type InvoiceResult,
  type LineItem,
} from '../../../lib/tools/invoice-generator-australia'

// Finance palette
const PALETTE = {
  primary: '#0F4C75',
  accent: '#1B6CA8',
  surface: '#F0F7FF',
  text: '#0A2540',
  result: '#00A878',
} as const

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''


// --- Line Item Row ---

interface LineItemRowProps {
  item: LineItem
  index: number
  onChange: (index: number, field: keyof LineItem, value: string | number) => void
  onRemove: (index: number) => void
  canRemove: boolean
}

function LineItemRow({ item, index, onChange, onRemove, canRemove }: LineItemRowProps) {
  const lineTotal = item.quantity * item.unitPrice

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 80px 110px 100px 40px',
        gap: 8,
        alignItems: 'end',
        marginBottom: 8,
      }}
    >
      <div>
        {index === 0 && (
          <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.primary, display: 'block', marginBottom: 4 }}>
            Description
          </label>
        )}
        <input
          type="text"
          value={item.description}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          placeholder="Web design services"
          style={{
            width: '100%',
            padding: 10,
            fontSize: 16,
            minHeight: 48,
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            outline: 'none',
          }}
        />
      </div>
      <div>
        {index === 0 && (
          <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.primary, display: 'block', marginBottom: 4 }}>
            Qty
          </label>
        )}
        <input
          type="number"
          value={item.quantity || ''}
          onChange={(e) => onChange(index, 'quantity', parseFloat(e.target.value) || 0)}
          placeholder="1"
          min="0.01"
          step="0.01"
          style={{
            width: '100%',
            padding: 10,
            fontSize: 16,
            minHeight: 48,
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            outline: 'none',
            fontFamily: "'DM Mono', monospace",
          }}
        />
      </div>
      <div>
        {index === 0 && (
          <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.primary, display: 'block', marginBottom: 4 }}>
            Unit Price ($)
          </label>
        )}
        <input
          type="number"
          value={item.unitPrice || ''}
          onChange={(e) => onChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
          placeholder="150.00"
          min="0"
          step="0.01"
          style={{
            width: '100%',
            padding: 10,
            fontSize: 16,
            minHeight: 48,
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            outline: 'none',
            fontFamily: "'DM Mono', monospace",
          }}
        />
      </div>
      <div>
        {index === 0 && (
          <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.primary, display: 'block', marginBottom: 4 }}>
            Total
          </label>
        )}
        <div
          style={{
            padding: 10,
            fontSize: 16,
            minHeight: 48,
            borderRadius: 8,
            backgroundColor: PALETTE.surface,
            fontFamily: "'DM Mono', monospace",
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            color: PALETTE.primary,
          }}
        >
          ${lineTotal.toFixed(2)}
        </div>
      </div>
      <div>
        {index === 0 && <div style={{ height: 20 }} />}
        <button
          type="button"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
          aria-label={`Remove line item ${index + 1}`}
          style={{
            width: 40,
            height: 48,
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            backgroundColor: canRemove ? '#FFF' : '#F8F9FA',
            color: canRemove ? '#DC2626' : '#CBD5E1',
            fontSize: 18,
            cursor: canRemove ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

// --- Mobile Line Item ---

function MobileLineItemRow({ item, index, onChange, onRemove, canRemove }: LineItemRowProps) {
  const lineTotal = item.quantity * item.unitPrice

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 10,
        border: '1px solid #E2E8F0',
        marginBottom: 10,
        backgroundColor: '#FFF',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: PALETTE.primary }}>Item {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label={`Remove item ${index + 1}`}
            style={{
              border: 'none',
              background: 'none',
              color: '#DC2626',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        )}
      </div>
      <input
        type="text"
        value={item.description}
        onChange={(e) => onChange(index, 'description', e.target.value)}
        placeholder="Web design services"
        style={{
          width: '100%',
          padding: 10,
          fontSize: 16,
          minHeight: 44,
          borderRadius: 8,
          border: '1px solid #E2E8F0',
          marginBottom: 8,
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: PALETTE.primary }}>Qty</label>
          <input
            type="number"
            value={item.quantity || ''}
            onChange={(e) => onChange(index, 'quantity', parseFloat(e.target.value) || 0)}
            placeholder="1"
            min="0.01"
            step="0.01"
            style={{
              width: '100%',
              padding: 8,
              fontSize: 16,
              minHeight: 40,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              fontFamily: "'DM Mono', monospace",
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: PALETTE.primary }}>Price ($)</label>
          <input
            type="number"
            value={item.unitPrice || ''}
            onChange={(e) => onChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
            placeholder="150"
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: 8,
              fontSize: 16,
              minHeight: 40,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              fontFamily: "'DM Mono', monospace",
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: PALETTE.primary }}>Total</label>
          <div
            style={{
              padding: 8,
              fontSize: 14,
              minHeight: 40,
              borderRadius: 8,
              backgroundColor: PALETTE.surface,
              fontFamily: "'DM Mono', monospace",
              fontWeight: 600,
              color: PALETTE.primary,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ${lineTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Animated Invoice Preview (the unforgettable detail) ---

function InvoicePreview({ result }: { result: InvoiceResult }) {
  const [visibleLines, setVisibleLines] = useState(0)

  // Animate lines appearing one by one
  useEffect(() => {
    let count = 0
    const total = result.lineItems.length + 3 // items + subtotal + gst + total
    const interval = setInterval(() => {
      count++
      setVisibleLines(count)
      if (count >= total) clearInterval(interval)
    }, 150)
    return () => clearInterval(interval)
  }, [result.lineItems.length])

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: '#FFF',
        borderRadius: 4,
        marginTop: 24,
        animation: 'resultEntrance 250ms ease-out',
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes resultEntrance {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes highlightFlash {
          0% { background-color: transparent; }
          30% { background-color: #00A87820; }
          100% { background-color: transparent; }
        }
        @keyframes totalReveal {
          0% { opacity: 0; transform: scale(0.9); }
          60% { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Coloured top bar — like a real printed invoice */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${PALETTE.primary}, ${PALETTE.accent})` }} />

      <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        {/* Invoice header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: PALETTE.primary, margin: 0, letterSpacing: 2, textTransform: 'uppercase' }}>Tax Invoice</h3>
            <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, marginTop: 6 }}>
              {result.gstRegistered ? 'GST Registered' : 'Not GST Registered'} · Rates as of {result.lastUpdated}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: PALETTE.primary, fontFamily: "'DM Mono', monospace" }}>#{result.invoiceNumber}</p>
            <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, marginTop: 2 }}>Issued: {result.invoiceDate}</p>
            <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, marginTop: 2 }}>Due: {result.dueDate}</p>
          </div>
        </div>

      {/* From / To */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: PALETTE.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>From</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: PALETTE.text }}>{result.businessName}</p>
          {result.abn && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>ABN: {result.abn}</p>}
          {result.businessAddress && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{result.businessAddress}</p>}
          {result.businessEmail && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{result.businessEmail}</p>}
          {result.businessPhone && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{result.businessPhone}</p>}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: PALETTE.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>To</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: PALETTE.text }}>{result.clientName}</p>
          {result.clientAddress && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{result.clientAddress}</p>}
          {result.clientEmail && <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{result.clientEmail}</p>}
        </div>
      </div>

      {/* Line items table */}
      <div style={{ borderTop: `2px solid ${PALETTE.primary}`, marginBottom: 16 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 50px 80px 80px',
            gap: 8,
            padding: '10px 0',
            borderBottom: `1px solid ${PALETTE.accent}30`,
            fontSize: 12,
            fontWeight: 700,
            color: PALETTE.primary,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          <span>Description</span>
          <span style={{ textAlign: 'right' }}>Qty</span>
          <span style={{ textAlign: 'right' }}>Unit Price</span>
          <span style={{ textAlign: 'right' }}>Amount</span>
        </div>

        {result.lineItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 50px 80px 80px',
              gap: 8,
              padding: '10px 0',
              borderBottom: `1px solid ${PALETTE.accent}10`,
              fontSize: 14,
              color: PALETTE.text,
              opacity: i < visibleLines ? 1 : 0,
              transform: i < visibleLines ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
          >
            <span>{item.description}</span>
            <span style={{ textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{item.quantity}</span>
            <span style={{ textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>${item.unitPrice.toFixed(2)}</span>
            <span style={{ textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
              ${item.lineTotal.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals — animate in after line items */}
      <div style={{ maxWidth: 300, marginLeft: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            fontSize: 14,
            color: PALETTE.text,
            opacity: visibleLines > result.lineItems.length - 1 ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        >
          <span>Subtotal</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
            ${result.subtotal.toFixed(2)}
          </span>
        </div>

        {result.gstRegistered && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              fontSize: 14,
              color: PALETTE.text,
              opacity: visibleLines > result.lineItems.length ? 1 : 0,
              transition: 'opacity 300ms ease',
              animation: visibleLines > result.lineItems.length ? 'highlightFlash 600ms ease' : 'none',
            }}
          >
            <span>GST ({(AU_CONSTANTS.GST_RATE * 100).toFixed(0)}%){result.includesGst ? ' (included)' : ''}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
              ${result.gstAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '16px 0 8px',
            borderTop: `2px solid ${PALETTE.primary}`,
            marginTop: 4,
            opacity: visibleLines > result.lineItems.length + 1 ? 1 : 0,
            animation: visibleLines > result.lineItems.length + 1 ? 'totalReveal 400ms ease-out' : 'none',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: PALETTE.primary, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total (AUD)</span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 800,
            color: PALETTE.result,
          }}>
            ${result.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notes */}
      {result.notes && (
        <div style={{ marginTop: 24, padding: 16, backgroundColor: PALETTE.surface, borderRadius: 8, borderLeft: `3px solid ${PALETTE.accent}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: PALETTE.primary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Notes</p>
          <p style={{ fontSize: 14, color: PALETTE.text, opacity: 0.8, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{result.notes}</p>
        </div>
      )}

      {/* Divider before download CTA */}
      <div style={{
        marginTop: 28,
        paddingTop: 24,
        borderTop: `1px solid ${PALETTE.accent}20`,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.5, marginBottom: 4 }}>
          Preview above · Download the polished PDF version
        </p>
        {/* $1 PDF export */}
        <StripeExport
          toolSlug="invoice-generator-australia"
          documentTitle={`Invoice ${result.invoiceNumber}`}
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
      </div>

      </div>{/* end padding wrapper */}
    </div>
  )
}

// --- Main Page ---

const emptyLineItem = (): LineItem => ({ description: '', quantity: 1, unitPrice: 0 })

export default function InvoiceGeneratorAustraliaPage() {
  // Form state
  const [businessName, setBusinessName] = useState('')
  const [abn, setAbn] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString().split('T')[0]
  })
  const [paymentTerms, setPaymentTerms] = useState('Net 30')
  const [lineItems, setLineItems] = useState<LineItem[]>([emptyLineItem()])
  const [includesGst, setIncludesGst] = useState(false)
  const [gstRegistered, setGstRegistered] = useState(true)
  const [notes, setNotes] = useState('')

  // Result + errors
  const [result, setResult] = useState<InvoiceResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleLineItemChange = useCallback((index: number, field: keyof LineItem, value: string | number) => {
    setLineItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  const addLineItem = useCallback(() => {
    setLineItems((prev) => [...prev, emptyLineItem()])
  }, [])

  const removeLineItem = useCallback((index: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleGenerate = () => {
    const newErrors: Record<string, string> = {}

    if (!businessName.trim()) newErrors.businessName = 'Business name is required'
    if (abn && !/^\d{11}$/.test(abn.replace(/\s/g, ''))) newErrors.abn = 'ABN must be exactly 11 digits'
    if (abn && /^\d{11}$/.test(abn.replace(/\s/g, '')) && !validateABN(abn.replace(/\s/g, '')))
      newErrors.abn = 'Invalid ABN — check the number and try again'
    if (!clientName.trim()) newErrors.clientName = 'Client name is required'
    if (!invoiceDate) newErrors.invoiceDate = 'Invoice date is required'
    if (!dueDate) newErrors.dueDate = 'Due date is required'

    const hasValidItem = lineItems.some((item) => item.description.trim() && item.quantity > 0 && item.unitPrice > 0)
    if (!hasValidItem) newErrors.lineItems = 'At least one complete line item is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const validItems = lineItems.filter((item) => item.description.trim() && item.quantity > 0)

    const input: InvoiceInput = {
      businessName: businessName.trim(),
      abn: abn.replace(/\s/g, ''),
      businessAddress,
      businessEmail,
      businessPhone,
      clientName: clientName.trim(),
      clientAddress,
      clientEmail,
      invoiceNumber: invoiceNumber || 'INV-001',
      invoiceDate,
      dueDate,
      paymentTerms,
      lineItems: validItems,
      includesGst,
      gstRegistered,
      notes,
    }

    const generated = generateInvoice(input)
    setResult(generated)

    if (generated) {
      setTimeout(() => {
        document.getElementById('invoice-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  // Detect mobile for responsive line items
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <ToolLayout
      title="Invoice Generator Australia Free Online | Tool Empire"
      description="Free invoice generator australia. Create professional Australian tax invoices with ABN, GST, and superannuation fields. No signup. Instant results."
      canonical={`${BASE_URL}/tools/invoice-generator-australia`}
      schemaType="HowTo"
      toolCategory="finance"
      tier={1}
      h1="Free Invoice Generator Australia"
      oneLiner="Create professional Australian tax invoices with ABN and GST in seconds. Preview free, download PDF for $1 AUD."
      schemaData={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to generate a free Australian tax invoice',
        description: 'Create professional Australian tax invoices with ABN, GST, and superannuation fields. No signup required.',
        step: [
          { '@type': 'HowToStep', name: 'Enter your business details', text: 'Fill in your ABN, business name, and contact details' },
          { '@type': 'HowToStep', name: 'Add client and line items', text: 'Enter client details and add your products or services with quantities and prices' },
          { '@type': 'HowToStep', name: 'Generate invoice', text: 'Click Generate to see your professional tax invoice preview with GST calculated automatically' },
          { '@type': 'HowToStep', name: 'Download PDF', text: 'Download your completed invoice as a professional PDF for $1 AUD' },
        ],
      }}
      ogImage={`${BASE_URL}/og/invoice-generator-australia-og.jpeg`}
      logoPath="/logos/invoice-generator-australia.jpeg"
    >
      {/* ===== TOOL INPUT CARD ===== */}
      <div
        style={{
          backgroundColor: '#FFF',
          border: `1px solid ${PALETTE.accent}33`,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 'clamp(16px, 3vw, 24px)',
        }}
      >
        {/* --- Your Business Details --- */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>Your Business Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
          <ToolInput
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.currentTarget.value)}
            placeholder="e.g. Smith Digital Solutions"
            error={errors.businessName}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="ABN (optional)"
            value={abn}
            onChange={(e) => setAbn(e.currentTarget.value)}
            placeholder="e.g. 12 345 678 901"
            error={errors.abn}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
            helpText="11-digit Australian Business Number"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
          <ToolInput
            label="Business Address (optional)"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.currentTarget.value)}
            placeholder="e.g. 42 Collins St, Melbourne VIC 3000"
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="Email (optional)"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.currentTarget.value)}
            placeholder="e.g. accounts@yourbusiness.com.au"
            type="email"
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
        </div>

        <ToolInput
          label="Phone (optional)"
          value={businessPhone}
          onChange={(e) => setBusinessPhone(e.currentTarget.value)}
          placeholder="e.g. 0412 345 678"
          type="tel"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />

        {/* --- Client Details --- */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: PALETTE.primary, marginTop: 24, marginBottom: 12 }}>Client Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
          <ToolInput
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.currentTarget.value)}
            placeholder="e.g. Acme Corporation Pty Ltd"
            error={errors.clientName}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="Client Email (optional)"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.currentTarget.value)}
            placeholder="e.g. billing@acme.com.au"
            type="email"
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
        </div>

        <ToolInput
          label="Client Address (optional)"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.currentTarget.value)}
          placeholder="e.g. Level 5, 100 King St, Sydney NSW 2000"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />

        {/* --- Invoice Details --- */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: PALETTE.primary, marginTop: 24, marginBottom: 12 }}>Invoice Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 0, columnGap: 16 }}>
          <ToolInput
            label="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.currentTarget.value)}
            placeholder="INV-001"
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="Invoice Date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.currentTarget.value)}
            error={errors.invoiceDate}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.currentTarget.value)}
            error={errors.dueDate}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
          <ToolInput
            label="Payment Terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.currentTarget.value)}
            placeholder="Net 30"
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />
        </div>

        {/* --- GST Settings --- */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 8,
            marginBottom: 20,
            padding: 12,
            backgroundColor: PALETTE.surface,
            borderRadius: 8,
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: PALETTE.primary, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={gstRegistered}
              onChange={(e) => setGstRegistered(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: PALETTE.accent }}
            />
            GST Registered (10%)
          </label>
          {gstRegistered && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: PALETTE.primary, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includesGst}
                onChange={(e) => setIncludesGst(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: PALETTE.accent }}
              />
              Prices include GST
            </label>
          )}
          <span style={{ fontSize: 12, color: PALETTE.text, opacity: 0.6, alignSelf: 'center' }}>
            GST rate {AU_CONSTANTS.GST_RATE * 100}% as of {AU_CONSTANTS.LAST_UPDATED}
          </span>
        </div>

        {/* --- Line Items --- */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>Line Items</h2>

        {errors.lineItems && (
          <p role="alert" style={{ color: '#DC2626', fontSize: 14, marginBottom: 8 }}>
            <span>⚠</span> {errors.lineItems}
          </p>
        )}

        {/* Desktop line items (hidden on mobile) */}
        <div className="hidden-mobile" style={{ display: isMobile ? 'none' : 'block' }}>
          {lineItems.map((item, i) => (
            <LineItemRow
              key={i}
              item={item}
              index={i}
              onChange={handleLineItemChange}
              onRemove={removeLineItem}
              canRemove={lineItems.length > 1}
            />
          ))}
        </div>

        {/* Mobile line items */}
        <div className="hidden-desktop" style={{ display: isMobile ? 'block' : 'none' }}>
          {lineItems.map((item, i) => (
            <MobileLineItemRow
              key={i}
              item={item}
              index={i}
              onChange={handleLineItemChange}
              onRemove={removeLineItem}
              canRemove={lineItems.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addLineItem}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
            color: PALETTE.accent,
            backgroundColor: 'transparent',
            border: `1px dashed ${PALETTE.accent}60`,
            borderRadius: 8,
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          + Add Line Item
        </button>

        {/* --- Notes --- */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="notes"
            style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Payment via bank transfer to BSB 123-456, Account 12345678"
            rows={3}
            style={{
              width: '100%',
              padding: 12,
              fontSize: 16,
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* --- Generate Button --- */}
        <button
          type="button"
          onClick={handleGenerate}
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: 17,
            fontWeight: 700,
            color: '#FFF',
            backgroundColor: PALETTE.primary,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 200ms ease, transform 100ms ease',
            letterSpacing: 0.3,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0A3A5C' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = PALETTE.primary; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Generate Invoice
        </button>
      </div>

      {/* ===== INVOICE PREVIEW (Result) ===== */}
      {result && (
        <div id="invoice-preview">
          <InvoicePreview result={result} />
        </div>
      )}

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>How It Works</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: PALETTE.text, opacity: 0.85 }}>
          Enter your Australian business details including your ABN, add your client information and line items,
          and click Generate. The tool automatically calculates GST at the current rate of {AU_CONSTANTS.GST_RATE * 100}%
          (as of {AU_CONSTANTS.LAST_UPDATED}) and formats a professional tax invoice that meets ATO requirements.
          You can preview the full invoice on screen for free. To download as a polished PDF, it costs $1 AUD — no
          account or subscription needed.
        </p>
      </section>

      {/* ===== BLOG ARTICLE (300-500 words) ===== */}
      <article style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>
          What Makes a Valid Australian Tax Invoice?
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: PALETTE.text, opacity: 0.85 }}>
          <p style={{ marginBottom: 16 }}>
            A valid Australian tax invoice must include specific information required by the ATO. If you are registered
            for GST and the sale is $82.50 or more (including GST), your invoice must show your identity (business name),
            your ABN, the date of issue, a brief description of the items sold, the GST amount for each item, and the
            total price including GST.
          </p>
          <p style={{ marginBottom: 16 }}>
            For sales under $1,000, a simplified tax invoice is acceptable — it only needs to show enough information
            for the buyer to determine the price, GST, and what was sold. For sales of $1,000 or more, the buyer&apos;s
            identity must also appear on the invoice.
          </p>
          <p style={{ marginBottom: 16 }}>
            GST in Australia is currently set at a flat 10% on most goods and services. Some items are GST-free,
            including basic food, medical services, and educational courses. If your business turns over more than
            $75,000 per year (or $150,000 for non-profits), you must register for GST and include it on your invoices.
          </p>
          <p style={{ marginBottom: 16 }}>
            The superannuation guarantee rate for FY 2025-26 is 11.5%, increasing to 12% from 1 July 2026. While super
            is not typically shown on invoices, sole traders and freelancers should factor it into their pricing. You can
            use our{' '}
            <a href="/tools/freelance-superannuation-calculator" style={{ color: PALETTE.accent, textDecoration: 'underline' }}>
              Freelance Superannuation Calculator
            </a>{' '}
            to work out how much to set aside from each invoice.
          </p>
          <p style={{ marginBottom: 16 }}>
            If you operate under an ABN as a sole trader, understanding your tax obligations is essential for setting
            correct invoice rates. Our{' '}
            <a href="/tools/abn-profit-after-tax" style={{ color: PALETTE.accent, textDecoration: 'underline' }}>
              ABN Profit After Tax Calculator
            </a>{' '}
            helps you estimate your take-home pay, while the{' '}
            <a href="/tools/abn-vs-tfn-tax-comparison" style={{ color: PALETTE.accent, textDecoration: 'underline' }}>
              ABN vs TFN Tax Comparison
            </a>{' '}
            shows the difference between contracting and employment structures.
          </p>
          <p>
            This invoice generator uses ATO-compliant formatting with all required fields for Australian tax invoices.
            GST calculations use the current rate of {AU_CONSTANTS.GST_RATE * 100}% as of {AU_CONSTANTS.LAST_UPDATED}.
            Rates are reviewed and updated quarterly. Always consult a registered tax agent for specific advice about
            your tax obligations.
          </p>
        </div>
      </article>

      {/* ===== AFFILIATE BOX (HIDDEN — no affiliate agreement yet) =====
      Affiliate signup: https://www.xero.com/au/affiliate-program/ (hosted on PartnerStack)
      Commission: ~$200 per new paying subscriber, or ~10% recurring — confirm after approval
      <div
        style={{
          marginTop: 48,
          padding: 20,
          borderRadius: 12,
          backgroundColor: PALETTE.surface,
          border: `1px solid ${PALETTE.accent}4D`,
        }}
      >
        <p style={{ fontSize: 12, color: PALETTE.text, opacity: 0.5, marginBottom: 8 }}>Sponsored</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <img
            src="https://logo.clearbit.com/xero.com"
            alt="Xero logo"
            width={40}
            height={40}
            style={{ borderRadius: 8, flexShrink: 0 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: PALETTE.primary }}>Xero Accounting</p>
            <p style={{ fontSize: 14, color: PALETTE.text, opacity: 0.8, marginTop: 4 }}>
              Best cloud accounting software for Australian businesses. Send unlimited invoices, track expenses,
              and manage GST and BAS reporting automatically.
            </p>
          </div>
          <a
            href="https://www.xero.com/au/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 700,
              color: '#FFF',
              backgroundColor: PALETTE.accent,
              borderRadius: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Try Free →
          </a>
        </div>
      </div>
      ===== END HIDDEN AFFILIATE BOX ===== */}

      {/* ===== RELATED TOOLS ===== */}
      <RelatedTools currentSlug="invoice-generator-australia" category="finance" />
    </ToolLayout>
  )
}

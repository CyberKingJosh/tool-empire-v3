import { z } from 'zod'

// Australian financial constants — as of Q1 2026
export const AU_CONSTANTS = {
  GST_RATE: 0.10,
  SUPER_RATE: 0.115, // FY 2025-26, moves to 12% in FY 2026-27
  MEDICARE_LEVY: 0.02,
  ABN_LENGTH: 11,
  LAST_UPDATED: 'Q1 2026',
} as const

// --- Zod Schemas ---

const lineItemSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0').max(1_000_000, 'Quantity too large'),
  unitPrice: z.number().min(0, 'Price cannot be negative').max(100_000_000, 'Price too large'),
})

const invoiceInputSchema = z.object({
  // Business details
  businessName: z.string().min(1, 'Business name is required').max(200),
  abn: z.string()
    .regex(/^\d{11}$/, 'ABN must be exactly 11 digits')
    .optional()
    .or(z.literal('')),
  businessAddress: z.string().max(500).optional().default(''),
  businessEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  businessPhone: z.string().max(30).optional().default(''),

  // Client details
  clientName: z.string().min(1, 'Client name is required').max(200),
  clientAddress: z.string().max(500).optional().default(''),
  clientEmail: z.string().email('Invalid email').optional().or(z.literal('')),

  // Invoice details
  invoiceNumber: z.string().min(1, 'Invoice number is required').max(50),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  paymentTerms: z.string().max(200).optional().default(''),

  // Line items
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required').max(50),

  // GST settings
  includesGst: z.boolean().default(true),
  gstRegistered: z.boolean().default(true),

  // Notes
  notes: z.string().max(2000).optional().default(''),
})

export type InvoiceInput = z.infer<typeof invoiceInputSchema>
export type LineItem = z.infer<typeof lineItemSchema>

export interface LineItemResult {
  description: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface InvoiceResult {
  // Echoed details
  businessName: string
  abn: string
  businessAddress: string
  businessEmail: string
  businessPhone: string
  clientName: string
  clientAddress: string
  clientEmail: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  paymentTerms: string
  notes: string

  // Calculated values
  lineItems: LineItemResult[]
  subtotal: number
  gstAmount: number
  total: number
  gstRegistered: boolean
  includesGst: boolean
  gstRate: number
  lastUpdated: string
}

/**
 * Validates ABN using the ATO's standard weighting algorithm.
 * Returns true if ABN checksum is valid, false otherwise.
 */
export function validateABN(abn: string): boolean {
  if (!/^\d{11}$/.test(abn)) return false

  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  const digits = abn.split('').map(Number)
  digits[0] = digits[0] - 1 // subtract 1 from first digit per ATO algorithm

  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0)
  return sum % 89 === 0
}

/**
 * Pure calculation function — no React, no side effects.
 * Takes validated invoice input, returns structured result with all totals.
 */
export function generateInvoice(input: InvoiceInput): InvoiceResult | null {
  const parsed = invoiceInputSchema.safeParse(input)
  if (!parsed.success) return null

  const data = parsed.data
  const gstRate = data.gstRegistered ? AU_CONSTANTS.GST_RATE : 0

  const lineItems: LineItemResult[] = data.lineItems.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: round(item.quantity * item.unitPrice),
  }))

  const rawTotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0)

  let subtotal: number
  let gstAmount: number
  let total: number

  if (data.gstRegistered) {
    if (data.includesGst) {
      // Prices include GST — extract GST from total
      total = round(rawTotal)
      gstAmount = round(total - total / (1 + gstRate))
      subtotal = round(total - gstAmount)
    } else {
      // Prices exclude GST — add GST on top
      subtotal = round(rawTotal)
      gstAmount = round(subtotal * gstRate)
      total = round(subtotal + gstAmount)
    }
  } else {
    subtotal = round(rawTotal)
    gstAmount = 0
    total = subtotal
  }

  return {
    businessName: data.businessName,
    abn: data.abn ?? '',
    businessAddress: data.businessAddress,
    businessEmail: data.businessEmail ?? '',
    businessPhone: data.businessPhone,
    clientName: data.clientName,
    clientAddress: data.clientAddress,
    clientEmail: data.clientEmail ?? '',
    invoiceNumber: data.invoiceNumber,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate,
    paymentTerms: data.paymentTerms,
    notes: data.notes,
    lineItems,
    subtotal,
    gstAmount,
    total,
    gstRegistered: data.gstRegistered,
    includesGst: data.includesGst,
    gstRate,
    lastUpdated: AU_CONSTANTS.LAST_UPDATED,
  }
}

/** Round to 2 decimal places */
function round(n: number): number {
  return Math.round(n * 100) / 100
}

export { invoiceInputSchema, lineItemSchema }

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// --- Rate Limiting ---

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT = 100
const WINDOW_MS = 60 * 1000

function checkRateLimit(req: NextRequest): boolean {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (record.count >= RATE_LIMIT) return false
  record.count++
  return true
}

// --- Request Schema ---

const generatePdfRequestSchema = z.object({
  contact: z.object({
    fullName: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().max(30).optional().default(''),
    location: z.string().max(200).optional().default(''),
    linkedin: z.string().max(300).optional().default(''),
    website: z.string().max(300).optional().default(''),
  }),
  summary: z.string().max(2000).optional().default(''),
  experience: z
    .array(
      z.object({
        jobTitle: z.string().max(200).default(''),
        company: z.string().max(200).default(''),
        location: z.string().max(200).optional().default(''),
        startDate: z.string().max(50).default(''),
        endDate: z.string().max(50).default(''),
        current: z.boolean().default(false),
        description: z.string().max(3000).optional().default(''),
      })
    )
    .max(20)
    .default([]),
  education: z
    .array(
      z.object({
        degree: z.string().max(200).default(''),
        institution: z.string().max(200).default(''),
        location: z.string().max(200).optional().default(''),
        startDate: z.string().max(50).default(''),
        endDate: z.string().max(50).default(''),
        description: z.string().max(1000).optional().default(''),
      })
    )
    .max(10)
    .default([]),
  skills: z.string().max(2000).optional().default(''),
  certifications: z.string().max(2000).optional().default(''),
  referees: z.string().max(500).optional().default(''),
})

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body: unknown = await req.json()
    const parsed = generatePdfRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data.' },
        { status: 400 }
      )
    }

    // In production, this would generate a PDF via Puppeteer and return it.
    // For now, return success to confirm validation works.
    return NextResponse.json({
      success: true,
      message: 'Resume data validated. PDF generation endpoint ready.',
      name: parsed.data.contact.fullName,
    })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

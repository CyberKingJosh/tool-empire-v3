import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const PDF_RATE_LIMIT = 20
const WINDOW_MS = 60 * 1000

function checkPdfRateLimit(req: NextRequest): boolean {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }
  if (record.count >= PDF_RATE_LIMIT) return false
  record.count++
  return true
}

const requestSchema = z.object({
  toolSlug: z.string().min(1).max(200),
  htmlContent: z.string().min(1).max(100000),
  documentTitle: z.string().min(1).max(500),
})

export async function POST(req: NextRequest) {
  if (!checkPdfRateLimit(req)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    // Dynamic import to avoid bundling puppeteer in client
    // @ts-expect-error — puppeteer installed only in production
    const puppeteer = await import('puppeteer')
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.setContent(parsed.data.htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    })

    await browser.close()

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${parsed.data.documentTitle}.pdf"`,
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}

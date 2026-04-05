import Link from 'next/link'

const tools = [
  {
    name: 'Invoice Generator Australia',
    href: '/tools/invoice-generator-australia',
    description: 'Create professional Australian tax invoices with ABN and GST. Download as PDF.',
    emoji: '\uD83E\uDDFE',
  },
  {
    name: 'Resume CV Builder Australia',
    href: '/tools/resume-cv-builder-australia',
    description: 'Build a professional Australian resume in minutes. Download as PDF.',
    emoji: '\uD83D\uDCC4',
  },
  {
    name: 'Current Time in London',
    href: '/tools/time-in-london',
    description: 'Live London clock with automatic GMT/BST detection. Updated every second.',
    emoji: '\uD83D\uDD70\uFE0F',
  },
]

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0A0A0F', color: '#E8EAED', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(48px, 10vw, 96px) 24px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Tool Empire
          </h1>
          <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: '#9CA3AF', fontWeight: 400 }}>
            Free online tools. No signup required.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                display: 'block',
                padding: 24,
                borderRadius: 12,
                backgroundColor: '#12121A',
                border: '1px solid #1E1E2A',
                textDecoration: 'none',
                color: '#E8EAED',
                transition: 'border-color 150ms ease, transform 150ms ease',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{tool.emoji}</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>
                {tool.name}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#9CA3AF', margin: 0 }}>
                {tool.description}
              </p>
              <span style={{ display: 'inline-block', marginTop: 16, fontSize: 14, fontWeight: 600, color: '#00D4FF' }}>
                Open tool &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

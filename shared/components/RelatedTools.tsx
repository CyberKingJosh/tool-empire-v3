import Link from 'next/link'
import { BUILT_TOOLS, BuiltTool } from '../lib/builtTools'

interface RelatedToolsProps {
  currentSlug: string
  category: string
}

export default function RelatedTools({ currentSlug, category }: RelatedToolsProps) {
  // Filter out current tool
  const others = BUILT_TOOLS.filter(t => t.slug !== currentSlug)

  // Same category first, then others
  const sameCategory = others.filter(t => t.category === category)
  const otherCategory = others.filter(t => t.category !== category)
  const candidates = [...sameCategory, ...otherCategory]

  // Take up to 4
  const related = candidates.slice(0, 4)

  // If nothing to show, render nothing — never show empty cards
  if (related.length === 0) return null

  return (
    <section style={{ marginTop: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Related Tools
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {related.map(tool => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'box-shadow 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>
                {tool.name}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                {tool.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

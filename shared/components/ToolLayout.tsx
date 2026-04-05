'use client'

import { ReactNode, useEffect } from 'react'
import AdSenseSlot from './AdSenseSlot'

type ToolCategory =
  | 'time'
  | 'date'
  | 'converter'
  | 'finance'
  | 'health'
  | 'legal'
  | 'ai'
  | 'writing'
  | 'property'
  | 'education'
  | 'seo'
  | 'general'
  | 'math'
  | 'viral'

type SchemaType = 'SoftwareApplication' | 'HowTo'

interface ToolLayoutProps {
  title: string
  description: string
  canonical: string
  schemaType: SchemaType
  toolCategory: ToolCategory
  tier: 0 | 1 | 2 | 3
  h1: string
  oneLiner: string
  children: ReactNode
  schemaData?: Record<string, unknown>
  ogImage?: string
  logoPath?: string | null
}

const categoryPalettes: Record<ToolCategory, {
  primary: string
  accent: string
  surface: string
  text: string
  result: string
  isDark: boolean
}> = {
  time: { primary: '#1B2A4A', accent: '#3B82F6', surface: '#F8FAFC', text: '#1E293B', result: '#0F172A', isDark: false },
  date: { primary: '#2D3A8C', accent: '#4353C0', surface: '#F8F9FF', text: '#0D1124', result: '#00ACC1', isDark: false },
  converter: { primary: '#2D3A8C', accent: '#4353C0', surface: '#F8F9FF', text: '#0D1124', result: '#00ACC1', isDark: false },
  finance: { primary: '#0F4C75', accent: '#1B6CA8', surface: '#F0F7FF', text: '#0A2540', result: '#00A878', isDark: false },
  health: { primary: '#1A5C45', accent: '#2D8C6B', surface: '#F0FAF5', text: '#0D2B1F', result: '#F4845F', isDark: false },
  legal: { primary: '#1C1C3A', accent: '#6B4FA0', surface: '#F8F7FF', text: '#0D0D24', result: '#4A90D9', isDark: false },
  ai: { primary: '#0D1117', accent: '#58A6FF', surface: '#161B22', text: '#C9D1D9', result: '#3FB950', isDark: true },
  writing: { primary: '#8B2FC9', accent: '#6225A0', surface: '#FBF8FF', text: '#1A0A2E', result: '#E8A838', isDark: false },
  property: { primary: '#1A3A5C', accent: '#C9A84C', surface: '#F8F6F0', text: '#0A1A2A', result: '#00875A', isDark: false },
  education: { primary: '#F4511E', accent: '#BF360C', surface: '#FFF8F5', text: '#1A0900', result: '#0288D1', isDark: false },
  seo: { primary: '#C84B31', accent: '#E05B3A', surface: '#FFF8F6', text: '#2A0F07', result: '#2563EB', isDark: false },
  general: { primary: '#2D3A8C', accent: '#4353C0', surface: '#F8F9FF', text: '#0D1124', result: '#00ACC1', isDark: false },
  math: { primary: '#2D3A8C', accent: '#4353C0', surface: '#F8F9FF', text: '#0D1124', result: '#00ACC1', isDark: false },
  viral: { primary: '#2D3A8C', accent: '#4353C0', surface: '#F8F9FF', text: '#0D1124', result: '#00ACC1', isDark: false },
}

export default function ToolLayout({
  title,
  description,
  canonical,
  schemaType,
  toolCategory,
  tier,
  h1,
  oneLiner,
  children,
  schemaData,
  ogImage,
  logoPath,
}: ToolLayoutProps) {
  const palette = categoryPalettes[toolCategory]
  const adSlotCount = tier === 0 ? 3 : 2
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  const defaultSchema = schemaType === 'SoftwareApplication'
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: h1,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
        description,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use ${h1}`,
        description,
        step: [
          { '@type': 'HowToStep', name: 'Enter your details', text: 'Fill in the form fields' },
          { '@type': 'HowToStep', name: 'Generate', text: 'Click the generate button' },
          { '@type': 'HowToStep', name: 'Download', text: 'Download your document for $1 AUD' },
        ],
      }

  const schema = schemaData ?? defaultSchema

  // App Router: dynamically set head tags from client component
  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonical, true)
    setMeta('og:type', 'website', true)
    if (ogImage) {
      setMeta('og:image', ogImage, true)
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    // Schema.org JSON-LD
    let script = document.querySelector('script[data-tool-schema]') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-tool-schema', 'true')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
  }, [title, description, canonical, schema])

  return (
    <>
      <main
        style={{
          backgroundColor: palette.isDark ? palette.primary : palette.surface,
          color: palette.text,
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
          {/* Top AdSense slot */}
          <AdSenseSlot position="top" className="mb-4" />

          {/* H1 and description */}
          <h1
            style={{
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: palette.isDark ? palette.accent : palette.primary,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {logoPath && (
              <img
                src={logoPath}
                alt="logo"
                width={32}
                height={32}
                style={{ borderRadius: '6px', flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
            {h1}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: palette.text,
              marginBottom: 24,
              opacity: 0.8,
            }}
          >
            {oneLiner}
          </p>

          {/* Tool content */}
          {children}

          {/* Mid AdSense slot (Tier 0 only) */}
          {adSlotCount >= 3 && <AdSenseSlot position="mid" className="my-6" />}

          {/* Bottom AdSense slot */}
          <AdSenseSlot position="bottom" className="mt-6" />
        </div>

        {/* Footer */}
        <footer
          style={{
            borderTop: `1px solid ${palette.accent}20`,
            padding: '24px 16px',
            textAlign: 'center',
            fontSize: 14,
            opacity: 0.6,
            marginTop: 48,
          }}
        >
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {process.env.NEXT_PUBLIC_DOMAIN ?? 'Tool Empire'}. Free online tools. No signup required.
          </p>
        </footer>
      </main>
    </>
  )
}

export { categoryPalettes }
export type { ToolCategory, SchemaType }

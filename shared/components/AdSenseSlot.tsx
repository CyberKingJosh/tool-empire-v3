'use client'

import { useEffect, useRef } from 'react'

interface AdSenseSlotProps {
  position: 'top' | 'mid' | 'bottom'
  className?: string
}

export default function AdSenseSlot({ position, className = '' }: AdSenseSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    if (!publisherId || !adRef.current) return

    try {
      const adsbygoogle = (window as unknown as Record<string, unknown>).adsbygoogle as unknown[]
      if (adsbygoogle) {
        adsbygoogle.push({})
      }
    } catch {
      // Ad blocker active — fail silently, no console errors
    }
  }, [publisherId])

  if (!publisherId) return null

  const dimensions = position === 'top'
    ? { minHeight: 90, maxWidth: 728 }
    : { minHeight: 250, maxWidth: 300 }

  return (
    <div
      ref={adRef}
      className={className}
      style={{
        minHeight: dimensions.minHeight,
        maxWidth: dimensions.maxWidth,
        margin: '0 auto',
        textAlign: 'center',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

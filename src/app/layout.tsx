import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tool Empire — Free Online Tools',
  description: 'Free online tools. No signup required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

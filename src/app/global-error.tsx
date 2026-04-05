'use client'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0F', color: '#E8EAED', margin: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Something went wrong</h1>
          <button onClick={reset} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#0A0A0F', backgroundColor: '#00D4FF', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 16 }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

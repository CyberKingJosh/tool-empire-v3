'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <button onClick={reset} style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}>
        Try again
      </button>
    </div>
  )
}

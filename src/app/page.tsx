import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0F', color: '#E8EAED', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', padding: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Tool Empire</h1>
        <Link href="/tools/time-in-london" style={{ color: '#00D4FF', fontSize: 18, textDecoration: 'underline' }}>
          Time in London →
        </Link>
      </div>
    </main>
  )
}

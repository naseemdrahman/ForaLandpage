import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FORA - Debate like a sport',
  description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fora.app'),
  openGraph: {
    title: 'FORA - Debate like a sport',
    description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORA - Debate like a sport',
    description: 'Competitive player vs player debates with skill-based scoring.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body style={{ scrollBehavior: 'auto' }}>{children}</body>
    </html>
  )
}

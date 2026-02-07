import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FORA',
  description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fora.app'),
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'FORA',
    description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORA',
    description: 'Competitive player vs player debates with skill-based scoring.',
    images: [],
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

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fora',
  description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fora.app'),
  // icon.png and apple-icon.png in app/ are auto-detected by Next.js
  manifest: '/manifest.json',
  openGraph: {
    title: 'Fora',
    description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
    type: 'website',
    siteName: 'Fora',
    images: [
      {
        url: '/Logo.png',
        width: 1536,
        height: 1024,
        alt: 'Fora',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fora',
    description: 'Competitive player vs player debates with skill-based scoring.',
    images: [
      {
        url: '/Logo.png',
        alt: 'Fora',
      },
    ],
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

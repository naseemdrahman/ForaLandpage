import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fora',
  description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fora.llc'),
  manifest: '/manifest.json',
  openGraph: {
    title: 'Fora',
    description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
    type: 'website',
    siteName: 'Fora',
    images: [
      {
        url: '/ForaLogoWhite.png',
        width: 2907,
        height: 1282,
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
        url: '/ForaLogoWhite.png',
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
      <body style={{ scrollBehavior: 'auto' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

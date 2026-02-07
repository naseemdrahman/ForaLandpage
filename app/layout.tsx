import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FORA',
  description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fora.app'),
  icons: {
    icon: [
      { url: '/Logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/Logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/Logo.png', sizes: 'any' },
    ],
    apple: [
      { url: '/Logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'FORA',
    description: 'Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.',
    type: 'website',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 1200,
        alt: 'Fora Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORA',
    description: 'Competitive player vs player debates with skill-based scoring.',
    images: ['/Logo.png'],
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

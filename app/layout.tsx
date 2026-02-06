import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FORA - Debate like a sport',
  description: 'Ranked AI debates, player challenges, and skill-based scoring. Compete, improve, and climb the leaderboards.',
  metadataBase: new URL('https://fora.vercel.app'),
  openGraph: {
    title: 'FORA - Debate like a sport',
    description: 'Ranked AI debates, player challenges, and skill-based scoring. Compete, improve, and climb the leaderboards.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORA - Debate like a sport',
    description: 'Ranked AI debates, player challenges, and skill-based scoring.',
  },
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

import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({
  weight: '400',
  subsets: ['arabic'],
})

export const metadata: Metadata = {
  title: 'Zikr: A voice counter',
  description:
    'A simple tool to help you count your zikr while working, studying, or focusing on something else.',
  metadataBase: new URL('https://zikr-ptbddny9w-muhammadr.vercel.app'),
  openGraph: {
    images: '/opengraph-image.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibm_plex_sans_arabic.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

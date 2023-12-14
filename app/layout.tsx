import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic} from 'next/font/google'
import './globals.css'

const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({ weight: '400', subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibm_plex_sans_arabic.className}>{children}</body>
    </html>
  )
}

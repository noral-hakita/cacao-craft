import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Cacao & Craft – Artisanal Chocolate',
  description: 'Single‑origin, small‑batch chocolate bars crafted with intention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-dark text-brand-cream font-sans antialiased">
        <Navbar />
        <main className="pt-16">{children}</main> {/* pt-16 offsets the fixed navbar */}
      </body>
    </html>
  )
}
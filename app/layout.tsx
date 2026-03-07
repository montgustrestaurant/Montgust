import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MusicPlayer } from '@/components/music-player'
import { LanguageProvider } from '@/context/language-context'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mont-Gust',
  description: 'Mont-Gust - Restaurante de cocina mediterranea. Sabores autenticos, ingredientes frescos y una experiencia gastronomica unica.',
}

export const viewport: Viewport = {
  themeColor: '#8b2635',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <MusicPlayer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

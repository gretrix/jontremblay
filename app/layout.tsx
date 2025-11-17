import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Jonathan Tremblay – Entrepreneur, Technologist & Faith-Driven Leader',
  description: 'Official site of Jonathan Tremblay — entrepreneur, technologist, systems architect, and faith-driven leader dedicated to building people, companies, and systems that honor God and create lasting impact.',
  keywords: ['Jonathan Tremblay', 'entrepreneur', 'technologist', 'faith-driven leader', 'Atlanta', 'Georgia'],
  authors: [{ name: 'Jonathan Tremblay' }],
  openGraph: {
    title: 'Jonathan Tremblay – Entrepreneur, Technologist & Faith-Driven Leader',
    description: 'Official site of Jonathan Tremblay — entrepreneur, technologist, systems architect, and faith-driven leader.',
    url: 'https://jontremblay.com',
    siteName: 'Jonathan Tremblay',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-800`}>
        {children}
      </body>
    </html>
  )
}


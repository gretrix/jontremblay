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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M37FBP9S');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-800`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M37FBP9S"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
      </body>
    </html>
  )
}


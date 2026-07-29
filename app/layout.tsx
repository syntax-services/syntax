// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingSupportWidget from "@/components/FloatingSupportWidget"

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const metadata = {
  metadataBase: new URL("https://syntax.com.ng"),
  title: {
    default: "Syntax Services – High-Speed Web Applications & Enterprise Software Agency",
    template: "%s | Syntax Services Nigeria",
  },
  description:
    "Syntax Services is a leading software and web engineering agency in Nigeria building high-converting web applications, e-commerce stores, custom portals, and digital systems.",
  keywords: [
    "Syntax",
    "Syntax Services",
    "Syntax Nigeria",
    "Web Application Developer Nigeria",
    "E-Commerce Developer Lagos",
    "Custom Software Agency Nigeria",
  ],
  authors: [{ name: "Syntax Services" }],
  creator: "Syntax Services",
  publisher: "Syntax Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Syntax Services – High-Speed Web Applications & Digital Systems",
    description:
      "Syntax Services engineers custom web apps, e-commerce stores, and enterprise systems built for speed and high conversion in Nigeria.",
    url: "https://syntax.com.ng",
    siteName: "Syntax Services",
    images: [
      {
        url: "https://syntax.com.ng/logo.png",
        width: 1200,
        height: 630,
        alt: "Syntax Services Official Brand Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  alternates: {
    canonical: 'https://syntax.com.ng'
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntax Services – High-Speed Web Applications",
    description:
      "Syntax Services engineers custom web apps, e-commerce stores, and digital systems built for speed and conversion in Nigeria.",
    images: ["https://syntax.com.ng/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Syntax Services",
    url: "https://syntax.com.ng",
    logo: "https://syntax.com.ng/logo.png",
    image: "https://syntax.com.ng/logo.png",
    description:
      "Syntax Services is a leading software & web engineering agency in Nigeria building high-speed web applications, e-commerce platforms, and custom software systems.",
    telephone: "+2348051310367",
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    sameAs: [
      "https://wa.me/2348051310367",
      "https://www.facebook.com/profile.php?id=61580792614102",
      "https://www.instagram.com/syntax_service",
      "https://x.com/syntax_services",
    ],
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('syntax-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingSupportWidget />
      </body>
    </html>
  )
}

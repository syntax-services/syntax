// app/layout.tsx
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap Global Import
import { ReactNode } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import { Providers } from "./providers"

// ✅ Optional: prevent “undefined metadata” errors in Next.js 15+
export const metadata = {
  title: "Syntax – Portfolio & Web Services",
  description: "Your one-stop platform for professional portfolio and web services.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* ⚙ Body: consistent theme + smooth transition */}
      <body className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream transition-colors duration-300 min-h-screen flex flex-col antialiased font-sans">

        {/* 🌐 Unified Provider (for Redux, Theme, Chakra, etc.) */}
        <Providers>
          {/* 🧭 Global Header */}
          <Header />

          {/* 🧩 Page Content */}
          <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* 🦶 Global Footer */}
          <footer className="bg-white/80 dark:bg-black/40 backdrop-blur-md mt-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-neutral-600 dark:text-neutral-400 space-y-4">
              <div className="flex flex-wrap justify-center gap-6 mb-2">
                <Link
                  href="/portfolio"
                  className="hover:text-syntaxBlue transition-colors font-medium"
                >
                  Portfolio
                </Link>
                <Link
                  href="/services"
                  className="hover:text-syntaxBlue transition-colors font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/book"
                  className="hover:text-syntaxBlue transition-colors font-medium"
                >
                  Request
                </Link>
                <Link
                  href="/about"
                  className="hover:text-syntaxBlue transition-colors font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-syntaxBlue transition-colors font-medium"
                >
                  Contact
                </Link>
              </div>

              <p className="tracking-wide">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-syntaxBlue">Syntax</span>. All rights
                reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
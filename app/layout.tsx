// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap Global Import
import { Providers } from "./providers"

export const metadata = {
  title: "Syntax – Portfolio & Web Services",
  description: "Your one-stop platform for websites.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream transition-colors min-h-screen flex flex-col">
        {/* Wrap everything in unified provider */}
        <Providers>
          <Header />

          <main className="flex-1">{children}</main>

          <footer className="bg-white/80 dark:bg-black/40 backdrop-blur-md mt-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-center space-x-6 mb-4">
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

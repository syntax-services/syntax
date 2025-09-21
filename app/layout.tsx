// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"
import Link from "next/link"
import Header from "@/components/Header"

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
        <Header />

        <main className="flex-1">{children}</main>

        <footer className="bg-white/80 dark:bg-black/40 backdrop-blur-md mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-center space-x-6 mb-4">
              <Link href="/portfolio" className="hover:text-syntaxBlue transition-colors">
                Portfolio
              </Link>
              <Link href="/services" className="hover:text-syntaxBlue transition-colors">
                Services
              </Link>
              <Link href="/book" className="hover:text-syntaxBlue transition-colors">
                Request
              </Link>
            </div>
            <p>© {new Date().getFullYear()} Syntax. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

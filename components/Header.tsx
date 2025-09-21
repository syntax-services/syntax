// components/Header.tsx
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.png"
              alt="Syntax Logo"
              width={35}
              height={35}
              className="rounded-xl"
            />
            <span className="text-lg md:text-xl font-bold group-hover:text-syntaxBlue transition-colors">
              Syntax
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-6 mt-2 md:mt-0 text-sm md:text-base font-medium">
          <Link href="/portfolio" className="hover:text-syntaxBlue transition-colors">
            Portfolio
          </Link>
          <Link href="/services" className="hover:text-syntaxBlue transition-colors">
            Services
          </Link>
          <Link href="/book" className="hover:text-syntaxBlue transition-colors">
            Request
          </Link>
        </nav>
      </div>
    </header>
  )
}

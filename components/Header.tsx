'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react' // lucide-react icons already installed on Vercel templates

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm md:text-base font-medium">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-syntaxDark dark:text-syntaxCream focus:outline-none"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Syntax Logo"
              width={30}
              height={30}
              className="rounded-xl"
            />
            <span className="text-lg font-bold">Syntax</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-syntaxDark dark:text-syntaxCream focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-6 text-base font-medium">
          <Link
            href="/portfolio"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-syntaxBlue transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/services"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-syntaxBlue transition-colors"
          >
            Services
          </Link>
          <Link
            href="/book"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-syntaxBlue transition-colors"
          >
            Request
          </Link>
        </nav>
      </div>
    </header>
  )
}

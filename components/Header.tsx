'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll direction: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -80 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
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
            <Link href="/" className="hover:text-syntaxBlue transition-colors">
              Home
            </Link>
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

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-syntaxDark dark:text-syntaxCream focus:outline-none"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Sidebar (slide from top, below header) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[64px] left-0 right-0 bg-white dark:bg-neutral-900 shadow-xl z-40 md:hidden"
          >
            <nav className="flex flex-col space-y-2 p-6 text-base font-medium">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-syntaxBlue/10 hover:text-syntaxBlue transition-colors"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setSidebarOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-syntaxBlue/10 hover:text-syntaxBlue transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/services"
                onClick={() => setSidebarOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-syntaxBlue/10 hover:text-syntaxBlue transition-colors"
              >
                Services
              </Link>
              <Link
                href="/book"
                onClick={() => setSidebarOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-syntaxBlue/10 hover:text-syntaxBlue transition-colors"
              >
                Request
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
          }

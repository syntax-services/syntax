// components/Header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
]

export default function GlassmorphicHeader() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.startsWith('/demos') || pathname?.startsWith('/compound')) {
    return null
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -90 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-4 left-0 right-0 z-50 px-4 max-w-5xl mx-auto"
      >
        <div className="rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg px-5 py-2 flex items-center justify-between transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <Image
              src="/logo.png"
              alt="Syntax Logo"
              width={28}
              height={28}
              className="object-contain rounded-md"
            />
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
              Syntax
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href === '/projects' && pathname.startsWith('/demos'))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-extrabold shadow-sm'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 ${
                pathname === '/dashboard'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                  : 'hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Partner Portal
            </Link>
          </nav>

          {/* CTAs & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link
              href="/book"
              className={`hidden sm:inline-flex items-center gap-1 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm border ${
                pathname === '/book'
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                  : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-100'
              }`}
            >
              <span>Book Project</span>
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none border border-neutral-200 dark:border-neutral-800"
              aria-label="Toggle Menu"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Right Slide-Over Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs md:hidden">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-4/5 max-w-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-l border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Syntax Logo" width={28} height={28} className="object-contain" />
                    <span className="font-extrabold text-sm tracking-tight uppercase">SYNTAX SERVICES</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                        pathname === link.href
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link
                    href="/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="px-4 py-3 rounded-2xl text-sm font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Partner Portal</span>
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <Link
                  href="/book"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-lg shadow-orange-500/20"
                >
                  Book Project
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react'
import { SiTiktok } from 'react-icons/si'

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/demos')) {
    return null
  }

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md py-14 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.png"
              alt="Syntax Services Logo"
              width={36}
              height={36}
              className="object-contain rounded-md"
            />
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
              Syntax Services
            </span>
          </Link>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
            Syntax Services engineers high-speed web applications, custom e-commerce stores, and enterprise portals designed for performance, security, and direct sales conversion in Nigeria.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/2348051310367"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-emerald-600 hover:scale-110 transition-transform shadow-sm"
              aria-label="WhatsApp Direct Contact"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@syntax_services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform shadow-sm"
              aria-label="TikTok Profile"
            >
              <SiTiktok className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580792614102"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-blue-600 hover:scale-110 transition-transform shadow-sm"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/syntax_service?igsh=MWlxNDJwMnV5MDdiMA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-pink-500 hover:scale-110 transition-transform shadow-sm"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/syntax_services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-sky-500 hover:scale-110 transition-transform shadow-sm"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation Links matching Navbar */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-orange-500 transition-colors">
                Projects &amp; Demos
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-orange-500 transition-colors">
                Services &amp; Pricing
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-orange-500 transition-colors">
                Partner &amp; Scout Portal
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-orange-500 transition-colors">
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Agency Info */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-4">
            Agency Contact
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
            <li>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Email:</span>{' '}
              <a href="mailto:syntaxservices25@gmail.com" className="hover:underline">
                syntaxservices25@gmail.com
              </a>
            </li>
            <li>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">WhatsApp:</span>{' '}
              <a href="https://wa.me/2348051310367" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-600 dark:text-emerald-400 font-bold">
                +234 805 131 0367
              </a>
            </li>
            <li>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Location:</span> Nigeria (Serving Global &amp; Local Clients)
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
        <p>&copy; {new Date().getFullYear()} Syntax Services. All rights reserved.</p>
      </div>
    </footer>
  )
}

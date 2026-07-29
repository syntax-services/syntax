// components/mimmscartel/CartelFooter.tsx
'use client'

import Link from 'next/link'
import { SiWhatsapp, SiInstagram } from 'react-icons/si'

export default function CartelFooter({ baseUrl = '/demos/mimmscartel' }: { baseUrl?: string }) {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-white py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-lg font-black tracking-tight text-white uppercase">MIMMS CARTEL</span>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Handcrafted luxury footwear &amp; leather goods engineered for distinction.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
          <Link href={baseUrl} className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href={`${baseUrl}/shop`} className="hover:text-amber-400 transition-colors">
            Shop Catalog
          </Link>
          <Link href={`${baseUrl}/about`} className="hover:text-amber-400 transition-colors">
            Craftsmanship
          </Link>
        </div>

        <p className="text-xs text-neutral-600 font-mono">
          &copy; {new Date().getFullYear()} Mimms Cartel. Sample E-Commerce Demo.
        </p>
      </div>
    </footer>
  )
}

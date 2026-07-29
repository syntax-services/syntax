// components/mimmscartel/CartelHeader.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartelHeader({
  cartCount,
  onOpenCart,
  baseUrl = '/demos/mimmscartel',
}: {
  cartCount: number
  onOpenCart: () => void
  baseUrl?: string
}) {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/80 text-white px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={baseUrl} className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-xs text-neutral-950 tracking-tighter">
            MC
          </span>
          <span className="text-lg font-extrabold tracking-tight group-hover:text-amber-400 transition-colors uppercase">
            MIMMS CARTEL
          </span>
        </Link>

        {/* Multipage Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider">
          <Link
            href={baseUrl}
            className={`hover:text-amber-400 transition-colors ${
              pathname === baseUrl ? 'text-amber-400 font-extrabold' : 'text-neutral-400'
            }`}
          >
            Home
          </Link>

          <Link
            href={`${baseUrl}/shop`}
            className={`hover:text-amber-400 transition-colors ${
              pathname === `${baseUrl}/shop` ? 'text-amber-400 font-extrabold' : 'text-neutral-400'
            }`}
          >
            Shop Catalog
          </Link>

          <Link
            href={`${baseUrl}/about`}
            className={`hover:text-amber-400 transition-colors ${
              pathname === `${baseUrl}/about` ? 'text-amber-400 font-extrabold' : 'text-neutral-400'
            }`}
          >
            Craftsmanship
          </Link>
        </nav>

        {/* Cart Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-xs font-bold transition-all flex items-center gap-2 relative shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Bag</span>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-mono text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

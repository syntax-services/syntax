// app/demos/mimmscartel/shop/page.tsx
'use client'

import { Suspense, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { PRODUCTS } from '../data/products'
import { ShoppingBag, Search, X, Check } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

function ShoeCatalog() {
  const [cart, setCart] = useState<typeof PRODUCTS>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => [...prev, product])
    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const filtered = PRODUCTS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const totalAmount = cart.reduce((acc, item) => acc + item.priceNGN, 0)

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return
    const itemsList = cart.map((i) => `• ${i.name} (₦${i.priceNGN.toLocaleString()})`).join('\n')
    const message = `Hello Mimms Cartel! I would like to order:\n\n${itemsList}\n\n*Total:* ₦${totalAmount.toLocaleString()}`
    window.open(`https://wa.me/2348051310367?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      <CartelHeader
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        baseUrl="/demos/mimmscartel"
      />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              HANDMADE FOOTWEAR
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">Shop Catalog</h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search shoe styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {['all', 'drivers', 'oxfords', 'loafers', 'boots'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all"
            >
              <div className="relative h-64 w-full bg-neutral-950 overflow-hidden">
                <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-white">{prod.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-base font-mono font-extrabold text-amber-400">₦{prod.priceNGN.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 text-white h-full p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    Shopping Bag ({cart.length})
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-900">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold">{item.name}</h4>
                        <span className="text-xs font-mono text-amber-400 font-bold">₦{item.priceNGN.toLocaleString()}</span>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="p-1 text-neutral-500 hover:text-red-400">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400 font-mono">Total Due:</span>
                    <span className="text-xl font-mono font-extrabold text-amber-400">₦{totalAmount.toLocaleString()}</span>
                  </div>
                  <button onClick={checkoutWhatsApp} className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                    <SiWhatsapp className="w-4 h-4" />
                    <span>Checkout via WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CartelFooter baseUrl="/demos/mimmscartel" />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>}>
      <ShoeCatalog />
    </Suspense>
  )
}

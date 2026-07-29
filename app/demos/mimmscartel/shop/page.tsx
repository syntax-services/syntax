// app/demos/mimmscartel/shop/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { PRODUCTS } from '../page'
import { Search, ShoppingBag, X } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export default function CartelShopPage({ baseUrl = '/demos/mimmscartel' }: { baseUrl?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<typeof PRODUCTS>([])
  const [cartOpen, setCartOpen] = useState(false)

  const categories = ['All', 'Drivers', 'Oxfords', 'Loafers', 'Boots']

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart((prev) => [...prev, p])
    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0)

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return
    const itemsList = cart.map((i) => `• ${i.title} (${i.formattedPrice})`).join('\n')
    const message = `Hello Mimms Cartel! I would like to place an order from your Shop Catalog:\n\n${itemsList}\n\n*Total Amount:* ₦${totalAmount.toLocaleString()}\n\nPlease confirm availability.`
    window.open(`https://wa.me/2348051310367?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      <CartelHeader
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        baseUrl={baseUrl}
      />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
            FULL FOOTWEAR CATALOG
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Explore All Models</h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-2">
            Handcrafted leather drivers, oxfords, loafers, and boots designed for modern luxury.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-900">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-3" />
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative h-64 w-full bg-neutral-950 overflow-hidden">
                <Image
                  src={prod.img}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{prod.category}</span>
                  <h3 className="font-extrabold text-base text-white mt-0.5">{prod.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{prod.desc}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-lg font-mono font-extrabold text-amber-400">{prod.formattedPrice}</span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

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
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold">{item.title}</h4>
                        <span className="text-xs font-mono text-amber-400 font-bold">{item.formattedPrice}</span>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="p-1 rounded-full text-neutral-500 hover:text-red-400">
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
                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    <span>Checkout via WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CartelFooter baseUrl={baseUrl} />
    </div>
  )
}

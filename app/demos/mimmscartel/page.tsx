// app/demos/mimmscartel/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { ShoppingBag, ArrowRight, Check, X, ShieldCheck, Zap } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export const PRODUCTS = [
  {
    id: '1',
    title: 'The Fine Driver - Brown',
    price: 45000,
    formattedPrice: '₦45,000',
    category: 'Drivers',
    img: '/demos/mimmscartel/driver-brown.jpg',
    desc: 'Hand-finished Italian leather driver shoe — sleek silhouette with soft cushioned lining for all-day luxury comfort.',
  },
  {
    id: '2',
    title: 'Classic Oxford - Black',
    price: 48000,
    formattedPrice: '₦48,000',
    category: 'Oxfords',
    img: '/demos/mimmscartel/oxford-black.jpg',
    desc: 'Timeless polished leather oxford shoe designed for formal galas, boardrooms, and smart-casual evenings.',
  },
  {
    id: '3',
    title: 'Handmade Loafer - Cognac',
    price: 52000,
    formattedPrice: '₦52,000',
    category: 'Loafers',
    img: '/demos/mimmscartel/loafer-cognac.jpg',
    desc: 'Bespoke cognac leather penny loafer featuring hand-stitched detailing and high-durability leather outsole.',
  },
  {
    id: '4',
    title: 'Suede Chelsea Boot - Sand',
    price: 56000,
    formattedPrice: '₦56,000',
    category: 'Boots',
    img: '/demos/mimmscartel/chelsea-tan.jpg',
    desc: 'Premium sand suede chelsea boot crafted with flexible elastic side gussets and weather-resistant finish.',
  },
]

export default function MimmsCartelHomePage({ baseUrl = '/demos/mimmscartel' }: { baseUrl?: string }) {
  const [cart, setCart] = useState<{ id: string; title: string; price: number; formattedPrice: string; img: string }[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null)

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => [...prev, product])
    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0)

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return
    const itemsList = cart.map((i) => `• ${i.title} (${i.formattedPrice})`).join('\n')
    const message = `Hello Mimms Cartel! I would like to place an order from your online store:\n\n${itemsList}\n\n*Total Amount:* ₦${totalAmount.toLocaleString()}\n\nPlease confirm availability and payment details.`
    window.open(`https://wa.me/2348051310367?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Dedicated Header */}
      <CartelHeader
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        baseUrl={baseUrl}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              HANDCRAFTED LUXURY FOOTWEAR
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Minimalist Shoe <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Craftsmanship
              </span>
            </h1>

            <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
              Designed for effortless style and all-day comfort. Each pair is handcrafted from premium full-grain leathers and suede.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`${baseUrl}/shop`}
                className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[440px] rounded-[3rem] overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group"
          >
            <Image
              src="/demos/mimmscartel/driver-brown.jpg"
              alt="The Fine Driver Brown"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent p-8 flex flex-col justify-end">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">FEATURED RELEASE</span>
              <h3 className="text-2xl font-bold text-white mt-1">The Fine Driver — Brown</h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">₦45,000 • In Stock</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Shoe Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">SEASON COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Signature Handcrafted Shoes</h2>
          </div>
          <Link
            href={`${baseUrl}/shop`}
            className="mt-4 md:mt-0 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-bold"
          >
            <span>View All Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden flex flex-col justify-between group shadow-sm hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={prod.img}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/20">
                  {prod.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-white">{prod.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">{prod.desc}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-lg font-mono font-extrabold text-amber-400">{prod.formattedPrice}</span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
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
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs">Your shopping bag is empty.</div>
                  ) : (
                    cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                          <Image src={item.img} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold">{item.title}</h4>
                          <span className="text-xs font-mono text-amber-400 font-bold">{item.formattedPrice}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="p-1 rounded-full text-neutral-500 hover:text-red-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400 font-mono">Total Due:</span>
                    <span className="text-xl font-mono font-extrabold text-amber-400">
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
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

      {/* Dedicated Footer */}
      <CartelFooter baseUrl={baseUrl} />
    </div>
  )
}

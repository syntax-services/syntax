// app/demos/mimmscartel/product/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { PRODUCTS } from '../../data/products'
import { ShieldCheck, ShoppingBag, ArrowLeft, Check, Zap } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0]

  const [cart, setCart] = useState<typeof PRODUCTS>([])
  const [selectedSize, setSelectedSize] = useState('42')
  const [addedNotice, setAddedNotice] = useState(false)

  const handleAddToCart = () => {
    setCart((prev) => [...prev, product])
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2000)
  }

  const openWhatsApp = () => {
    const msg = `Hello Mimms Cartel! I would like to order *${product.name}* (Size: EU ${selectedSize}) for ₦${product.priceNGN.toLocaleString()}. Please confirm availability.`
    window.open(`https://wa.me/2348051310367?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      <CartelHeader cartCount={cart.length} onOpenCart={() => {}} baseUrl="/demos/mimmscartel" />

      <div className="pt-36 pb-24 px-6 max-w-6xl mx-auto">
        <Link
          href="/demos/mimmscartel/shop"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{product.name}</h1>
              <p className="text-2xl font-mono font-bold text-amber-400 mt-2">₦{product.priceNGN.toLocaleString()}</p>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed">{product.description}</p>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono text-neutral-400 font-bold uppercase">Craftsmanship Specs</span>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed">{product.specs}</p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 font-bold uppercase">Select Size (EU)</label>
              <div className="flex gap-2">
                {['40', '41', '42', '43', '44', '45'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-lg shadow-amber-500/20'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={openWhatsApp}
                className="flex-1 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <SiWhatsapp className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CartelFooter baseUrl="/demos/mimmscartel" />
    </div>
  )
}

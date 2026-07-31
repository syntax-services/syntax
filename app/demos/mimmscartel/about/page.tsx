// app/demos/mimmscartel/about/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { ShieldCheck, Award, ArrowRight, Zap, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      <CartelHeader cartCount={0} onOpenCart={() => {}} baseUrl="/demos/mimmscartel" />

      <div className="pt-36 pb-24 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">About Mimms Cartel</h1>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Mimms Cartel is a luxury footwear brand dedicated to hand-finished leathers, ergonomic comfort, and modern minimalist silhouettes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <h3 className="font-bold text-lg">Full-Grain Leather</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We source top-tier calfskins and full-grain hides, ensuring each pair develops a unique patina over time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="font-bold text-lg">Bespoke Fitting</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Built on custom shoe lasts engineered for maximum heel stability, arch support, and comfortable flex.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <Zap className="w-8 h-8 text-amber-400" />
            <h3 className="font-bold text-lg">Blake Stitched Outsoles</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Durable construction that allows flexibility, breathability, and easy resoling for years of wear.
            </p>
          </div>
        </div>

        <div className="rounded-[3rem] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 p-10 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Experience Modern Luxury Footwear</h2>
          <p className="text-xs md:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Discover our collection of drivers, oxfords, penny loafers, and suede chelsea boots crafted for everyday distinction.
          </p>
          <Link
            href="/demos/mimmscartel/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            <span>Explore Shoe Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <CartelFooter baseUrl="/demos/mimmscartel" />
    </div>
  )
}

// app/demos/mimmscartel/about/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CartelHeader from '@/components/mimmscartel/CartelHeader'
import CartelFooter from '@/components/mimmscartel/CartelFooter'
import { ShieldCheck, Award, Sparkles, ArrowRight } from 'lucide-react'

export default function CartelAboutPage({ baseUrl = '/demos/mimmscartel' }: { baseUrl?: string }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      <CartelHeader cartCount={0} onOpenCart={() => {}} baseUrl={baseUrl} />

      <main className="pt-36 pb-24 px-6 max-w-7xl mx-auto space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              OUR CRAFTSMANSHIP STORY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Bespoke Footwear <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Engineered for Distinction
              </span>
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Founded on the principles of Italian leather heritage and modern ergonomic design, Mimms Cartel crafts premium shoes designed to outlast fast-fashion trends.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every driver, oxford, loafer, and boot in our collection is hand-stitched by master artisans using full-grain hides selected for durability and patina development.
            </p>

            <Link
              href={`${baseUrl}/shop`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[420px] rounded-[3rem] overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl"
          >
            <Image src="/demos/mimmscartel/loafer-cognac.jpg" alt="Mimms Cartel Craftsmanship" fill className="object-cover" />
          </motion.div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-900">
          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">100% Full-Grain Leather</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sourced from certified tanneries in Tuscany, yielding natural breathing room and rich patina over time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Artisanal Hand Stitching</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every sole pattern is Goodyear-welted or Blake-stitched for flexibility and recraftability.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Lifetime Fit Guarantee</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Complimentary size exchanges and dedicated care instructions provided with every shoe delivery.
            </p>
          </div>
        </div>
      </main>

      <CartelFooter baseUrl={baseUrl} />
    </div>
  )
}

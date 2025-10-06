// app/demos/mimmscartel/shop/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiPhone, FiShoppingCart } from 'react-icons/fi'
import { SiWhatsapp, SiInstagram } from 'react-icons/si'
import Lenis from 'lenis'
import clsx from 'clsx'

const products = [
  {
    id: '1',
    title: 'The Fine Driver - Brown',
    price: '₦45,000',
    img: '/demos/mimmscartel/1.jpg',
    desc: 'Hand-finished leather driver — stylish & durable. Premium quality built to last.',
  },
  {
    id: '2',
    title: 'Classic Oxford - Black',
    price: '₦48,000',
    img: '/demos/mimmscartel/2.jpg',
    desc: 'Timeless silhouette for formal and smart-casual looks. A true gentleman’s piece.',
  },
  {
    id: '3',
    title: 'Casual Slip-on - Tan',
    price: '₦40,000',
    img: '/demos/mimmscartel/3.jpg',
    desc: 'Comfort-first everyday shoe, breathable and light for long wear.',
  },
  {
    id: '4',
    title: 'Handmade Loafer - Cognac',
    price: '₦52,000',
    img: '/demos/mimmscartel/4.jpg',
    desc: 'Premium stitchwork and leather — a luxury statement handcrafted with passion.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function MimmsCartelDemo() {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const whatsappNumber = '2349169381916'
  const whatsappText = encodeURIComponent(
    'Hi, I saw your shoes on this demo site and I want to order / ask a question.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <main className="min-h-screen bg-[#fffaf6] dark:bg-[#0b0b0b] text-[#0b0b0b] dark:text-[#fffaf6] selection:bg-black/80 selection:text-white">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-14">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              MimmsCartel — <span className="text-amber-700">Handcrafted Shoes</span>
            </h1>
            <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every pair tells a story of craftsmanship and class. Hand-stitched, bold,
              and made for confident Nigerian men.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-5 py-3 rounded-full shadow-lg font-semibold transition-all duration-300 active:scale-95"
              >
                <SiWhatsapp size={18} /> Chat on WhatsApp
              </a>

              <Link
                href="#products"
                className="inline-flex items-center gap-2 border border-neutral-400 dark:border-neutral-700 px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                <FiShoppingCart /> View Collection
              </Link>
            </div>

            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/mimmscartel" target="_blank" rel="noreferrer">
                <SiInstagram size={20} className="opacity-70 hover:opacity-100 transition" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <SiWhatsapp size={20} className="opacity-70 hover:opacity-100 transition" />
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <Image
              src="/demos/mimmscartel/hero.jpg"
              alt="MimmsCartel Hero"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              title: 'Premium Craftsmanship',
              desc: 'Each shoe is handmade from the finest leathers for lasting comfort.',
            },
            {
              title: 'Custom Fit',
              desc: 'Choose your size, color, and finishing — made uniquely for you.',
            },
            {
              title: 'Direct Orders',
              desc: 'Browse easily and order instantly through WhatsApp. Simple.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="rounded-3xl p-6 bg-white/90 dark:bg-neutral-900 shadow-lg backdrop-blur-md hover:shadow-2xl transition"
            >
              <h4 className="font-bold mb-2 text-lg">{f.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Grid */}
        <section id="products" className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Featured <span className="text-amber-700">Collection</span>
          </h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
                  <article
                    className={clsx(
                      'relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-white dark:bg-neutral-900 transition-all duration-500'
                    )}
                  >
                    <div className="relative h-56 md:h-64 w-full overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-4 md:p-5">
                      <h3 className="font-semibold text-base">{p.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
                        {p.desc}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-amber-700">{p.price}</span>

                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-4 py-2 rounded-full text-xs font-semibold transition"
                        >
                          <SiWhatsapp size={14} /> Order
                        </a>
                      </div>
                    </div>
                  </article>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold mb-6 text-center">What Customers Say</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { text: '“Excellent craftsmanship! These shoes turn heads.”', name: '— E. Obi' },
              { text: '“Great fit, solid feel, and fast delivery via WhatsApp.”', name: '— T. Ade' },
              { text: '“I’ve never worn something this comfortable and classy.”', name: '— J. Musa' },
            ].map((t, i) => (
              <blockquote
                key={i}
                className="bg-white/90 dark:bg-neutral-900 rounded-2xl p-5 shadow hover:shadow-2xl transition"
              >
                <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">{t.text}</p>
                <cite className="text-xs block mt-3 font-semibold text-right">{t.name}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white/90 dark:bg-neutral-900 rounded-3xl shadow-lg text-center p-8 md:p-10"
        >
          <h4 className="font-bold text-xl md:text-2xl mb-3">
            Want this kind of site for your brand?
          </h4>
          <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-6">
            We can build your full website with your images, logo, and custom domain so
            customers can buy or contact you directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-6 py-3 rounded-full inline-flex items-center gap-2 shadow font-semibold hover:bg-[#1ebe5a] transition-all duration-300"
            >
              <SiWhatsapp /> Message Now
            </a>
            <Link
              href="/book"
              className="px-6 py-3 border rounded-full inline-flex items-center gap-2 font-semibold hover:shadow-lg transition-all duration-300"
            >
              <FiPhone /> Request a Demo
            </Link>
          </div>
        </motion.section>
      </section>
    </main>
  )
}

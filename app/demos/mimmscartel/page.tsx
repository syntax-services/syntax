// app/demos/mimmscartel/shop/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiPhone, FiShoppingCart } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

const products = [
  {
    id: '1',
    title: 'The Fine Driver - Brown',
    price: '₦45,000',
    img: '/demos/mimmscartel/1.jpg',
    desc: 'Hand-finished leather driver — stylish & durable.',
  },
  {
    id: '2',
    title: 'Classic Oxford - Black',
    price: '₦48,000',
    img: '/demos/mimmscartel/2.jpg',
    desc: 'Timeless silhouette for formal and smart-casual looks.',
  },
  {
    id: '3',
    title: 'Casual Slip-on - Tan',
    price: '₦40,000',
    img: '/demos/mimmscartel/3.jpg',
    desc: 'Comfort-first everyday shoe, breathable and light.',
  },
  {
    id: '4',
    title: 'Handmade Loafer - Cognac',
    price: '₦52,000',
    img: '/demos/mimmscartel/4.jpg',
    desc: 'Premium stitchwork and leather — statement piece.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function MimmsCartelDemo() {
  const [selected, setSelected] = useState<string | null>(null)

  // put the WA number you have (without +)
  const whatsappNumber = '2349169381916'
  const whatsappText = encodeURIComponent(
    'Hi, I saw your shoes on this demo site and I want to order / ask a question.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <main className="min-h-screen bg-[#fffaf6] dark:bg-[#0b0b0b] text-[#0b0b0b] dark:text-[#fffaf6]">
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* top: hero */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              MimmsCartel — Handcrafted Shoes
            </h1>
            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 mb-6 max-w-xl">
              Premium, handmade men’s shoes — designed and crafted with attention to
              detail. This demo shows how your online shop could present products,
              allow customers to browse and contact you directly via WhatsApp to place orders.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-4 py-3 rounded-full shadow-lg font-semibold transition"
              >
                <SiWhatsapp size={18} /> Message on WhatsApp
              </a>

              <Link
                href="#products"
                className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-full hover:shadow-md transition"
              >
                <FiShoppingCart /> View Products
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs">
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Handmade</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Two-week lead</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Worldwide shipping</div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/demos/mimmscartel/hero.jpg"
                alt="MimmsCartel hero"
                width={900}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/90 dark:bg-neutral-900 p-5 rounded-2xl shadow">
            <h4 className="font-bold mb-2">Craftsmanship</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Each pair is hand-finished using durable leathers and traditional stitching
              techniques for comfort and longevity.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-neutral-900 p-5 rounded-2xl shadow">
            <h4 className="font-bold mb-2">Customizable</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Color, size and finishing options to match your style.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-neutral-900 p-5 rounded-2xl shadow">
            <h4 className="font-bold mb-2">Direct Orders</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Customers can browse and message you instantly via WhatsApp to order.
            </p>
          </div>
        </div>

        {/* Products grid */}
        <section id="products" className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Featured Shoes</h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {products.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  transitionSpeed={250}
                  className={`rounded-2xl`}
                >
                  <article
                    className={`relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition`}
                  >
                    <div className="relative h-44 w-full">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-sm">{p.title}</h3>
                      <p className="text-[13px] text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
                        {p.desc}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{p.price}</span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400"> • Handmade</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-3 py-2 rounded-full text-xs font-semibold transition"
                            title="Order on WhatsApp"
                          >
                            <SiWhatsapp size={14} /> Order
                          </a>
                          <button
                            onClick={() => setSelected(p.id)}
                            className="ml-2 border px-2 py-1 rounded text-xs"
                          >
                            Quick look
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* quick overlay */}
                    {selected === p.id && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-neutral-900 rounded p-4 max-w-xs">
                          <h4 className="font-semibold mb-2">{p.title}</h4>
                          <p className="text-xs text-neutral-700 dark:text-neutral-300">{p.desc}</p>
                          <div className="mt-3 flex gap-2">
                            <a href={whatsappLink} className="bg-[#25D366] text-white px-3 py-2 rounded text-xs">Message</a>
                            <button onClick={() => setSelected(null)} className="px-3 py-2 border rounded text-xs">Close</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials (mock) */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">What customers say</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <blockquote className="bg-white/90 dark:bg-neutral-900 p-4 rounded-xl shadow">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">"Excellent workmanship. My go-to shoes for events."</p>
              <cite className="text-xs block mt-3 font-semibold">— E. Obi</cite>
            </blockquote>
            <blockquote className="bg-white/90 dark:bg-neutral-900 p-4 rounded-xl shadow">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">"Great fit and quick response on WhatsApp."</p>
              <cite className="text-xs block mt-3 font-semibold">— T. Ade</cite>
            </blockquote>
            <blockquote className="bg-white/90 dark:bg-neutral-900 p-4 rounded-xl shadow">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">"Worth the wait — top quality leather."</p>
              <cite className="text-xs block mt-3 font-semibold">— J. Musa</cite>
            </blockquote>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-12 bg-white/90 dark:bg-neutral-900 p-6 rounded-2xl shadow text-center">
          <h4 className="font-bold text-lg">Want this look for your brand?</h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mt-2">
            I can build a full demo website that uses your brand, images and a proper domain
            so customers can buy directly. Demo sits on your domain or ours for review.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={whatsappLink} className="bg-[#25D366] text-white px-4 py-2 rounded-full inline-flex items-center gap-2 shadow">
              <SiWhatsapp /> Message now
            </a>
            <Link href="/book" className="px-4 py-2 border rounded-full inline-flex items-center gap-2">
              <FiPhone /> Request demo
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}

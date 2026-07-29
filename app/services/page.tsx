// app/services/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import FaintParticleBackground from '@/components/ParticleBackground'
import TechMarquee from '@/components/TechMarquee'
import { CustomWebIcon, CustomStoreIcon, CustomAppIcon, CustomVaultIcon } from '@/components/CustomIcons'
import {
  ArrowRight,
  CheckCircle2,
  Sliders,
  X,
  Send,
  Zap,
  Shield,
  Smartphone,
  Sparkles,
} from 'lucide-react'

const SERVICES = [
  {
    icon: CustomWebIcon,
    title: 'High-Speed Business Website',
    tagline: 'Engineered to load in under 1.5 seconds and turn visitors into paying clients.',
    desc: 'Perfect for businesses, agencies, clinics, law firms, and service providers. Includes mobile-first layout, custom domain connection, contact form, and instant WhatsApp booking integration.',
    price: '₦280,000',
    marketPrice: '₦350,000',
    savings: 'Save 20%',
    features: [
      'Loads under 1.5s on mobile & desktop',
      'Mobile-first responsive design',
      'Instant WhatsApp booking integration',
      'Contact form & lead tracking',
      'Google SEO setup & meta tags',
      'Free SSL security certificate',
    ],
  },
  {
    icon: CustomStoreIcon,
    title: 'E-Commerce Store & Retail Platform',
    tagline: 'Complete digital shop with product catalog, automated cart, and payment gateway.',
    desc: 'Ideal for fashion brands, electronics, grocery, and retail businesses. Includes automated inventory tracking, WhatsApp checkout, Paystack/Flutterwave online payments, and order tracking.',
    price: '₦450,000',
    marketPrice: '₦550,000',
    savings: 'Save 18%',
    features: [
      'Unlimited product catalog upload',
      'Paystack & Flutterwave card payment',
      'WhatsApp direct cart order dispatch',
      'Customer account & order tracking',
      'Sales analytics & inventory manager',
      'High-speed mobile checkout flow',
    ],
  },
  {
    icon: CustomAppIcon,
    title: 'Custom Web Application & SaaS Portal',
    tagline: 'Tailored web portals, client dashboards, and custom web software systems.',
    desc: 'Built for startups, academies, booking portals, real estate, and financial tools. Includes user authentication, role-based dashboards, database integrations, and automated workflows.',
    price: '₦680,000',
    marketPrice: '₦800,000',
    savings: 'Save 15%',
    features: [
      'Custom user authentication & logins',
      'Role-based dashboards & control panels',
      'Real-time database (Supabase)',
      'Automated email & SMS notifications',
      'API integrations & custom logic',
      'Full source code ownership',
    ],
  },
  {
    icon: Sliders,
    title: 'Custom Enterprise Solutions',
    tagline: 'Large-scale portals, testing systems, search engines, and AI web platforms.',
    desc: 'Engineered for national institutions, high-concurrency portals, and AI platforms requiring custom architecture, maximum security, and dedicated database clusters.',
    price: '₦850,000+',
    marketPrice: '₦1,000,000+',
    savings: 'Custom Scope',
    isCustom: true,
    features: [
      'High-concurrency database architecture',
      'National registration & testing portals',
      'Custom AI & search engine integration',
      'Dedicated cloud hosting deployment',
      '24/7 technical maintenance & support',
    ],
  },
]

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Custom Enterprise Solution',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pt-32 pb-24 px-4 overflow-hidden">
      <FaintParticleBackground />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20 inline-flex items-center gap-1.5 mb-4">
            TRANSPARENT AGENCY PRICING
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            High-Performance Web Solutions{' '}
            <span className="text-neutral-900 dark:text-white underline decoration-orange-500/40 decoration-4">
              Engineered for Sales
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            We build websites and digital systems that load fast, look stunning on mobile, and turn site visitors into paying customers — Engineered to deliver enterprise-grade performance at transparent, accessible rates.
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {srv.savings}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {srv.title}
                  </h2>
                  <p className="text-xs font-semibold text-orange-500 mb-3">{srv.tagline}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800 mb-8">
                    {srv.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
                      {srv.price}
                    </span>
                    {srv.marketPrice && (
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {srv.marketPrice}
                      </span>
                    )}
                  </div>

                  {srv.isCustom ? (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md"
                    >
                      Custom Quote
                    </button>
                  ) : (
                    <Link
                      href={`/book?type=${encodeURIComponent(srv.title)}`}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tech Marquee */}
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-400 block mb-6">
            Engineered with Premier Open-Source Technologies
          </span>
          <TechMarquee />
        </div>
      </div>

      {/* Custom Enterprise Scope Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Custom Enterprise Scope Request">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white w-11 h-11 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-2xl font-bold mb-2">Request Custom Enterprise Scope</h2>
              <p className="text-xs text-neutral-500 mb-6">
                Tell us about your custom portal, testing system, or AI platform requirement.
              </p>

              {submitted ? (
                <div className="p-6 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold text-sm">Request Submitted!</p>
                  <p className="text-xs mt-1">Our engineering team will contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name-input" className="block text-xs font-bold uppercase mb-1">Your Name *</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="e.g. Tobi Adeyemi"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-bold uppercase mb-1">Email</label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone-input" className="block text-xs font-bold uppercase mb-1">WhatsApp *</label>
                      <input
                        id="phone-input"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="+234 805..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="details-input" className="block text-xs font-bold uppercase mb-1">Project Details *</label>
                    <textarea
                      id="details-input"
                      rows={3}
                      required
                      placeholder="Describe features, target user base, or system requirements..."
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Submit Custom Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
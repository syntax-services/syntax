// app/book/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { logPageView } from '@/lib/analytics'
import ParticleBackground from '@/components/ParticleBackground'
import {
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Send,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { SiTiktok } from 'react-icons/si'

function BookingPageContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') || 'Web Application'
  
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_type: initialType,
    preferred_contact: 'WhatsApp',
    details: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    logPageView('/book')
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const validateForm = () => {
    if (!form.email && !form.phone) {
      setErrorMsg('Please provide at least an email or WhatsApp number.')
      return false
    }
    if (!form.details) {
      setErrorMsg('Please describe your project or request details.')
      return false
    }
    setErrorMsg('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      
      if (!res.ok) {
        throw new Error('Failed to submit booking')
      }

      setSuccess(true)
      setForm({
        full_name: '',
        email: '',
        phone: '',
        project_type: 'Web Application',
        preferred_contact: 'WhatsApp',
        details: '',
      })
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const businessNumber = '2348051310367'
  const whatsappText = encodeURIComponent(
    `Hello Syntax Services! I'd like to consult on a project:
Name: ${form.full_name || 'N/A'}
Email: ${form.email || 'N/A'}
Phone: ${form.phone || 'N/A'}
Project Type: ${form.project_type}
Preferred Contact: ${form.preferred_contact}

Details:
${form.details || 'Interested in building a custom web project.'}`
  )
  const whatsappLink = `https://wa.me/${businessNumber}?text=${whatsappText}`

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pt-32 pb-24 px-4 overflow-hidden">
      <ParticleBackground />

      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-5 py-2 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/30 inline-flex items-center gap-1.5 mb-4 shadow-lg shadow-orange-500/10">
            <Calendar className="w-3.5 h-3.5" />
            <span>START YOUR PROJECT</span>
          </span>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Book a Project{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Consultation
            </span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Fill out the form below or message us directly on WhatsApp to discuss your web application, e-commerce store, or custom platform requirements.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-orange-500/20 p-8 md:p-12 shadow-2xl"
        >
          {errorMsg && (
            <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold text-center">
              {errorMsg}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Request received! Our team will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  Full Name *
                </label>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  required
                  placeholder="e.g. Tobi Adeyemi"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  WhatsApp / Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  name="phone"
                  placeholder="e.g. +234 805 131 0367"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="project_type" className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  Project Type *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={form.project_type}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                >
                  <option value="Business Website">Business Website</option>
                  <option value="E-Commerce Store">E-Commerce Store</option>
                  <option value="Web Application">Web Application / SaaS Portal</option>
                  <option value="SEO & Branding">SEO & Branding Upgrade</option>
                  <option value="Custom Project">Custom Enterprise Project</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['WhatsApp', 'Email', 'Phone Call'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm({ ...form, preferred_contact: method })}
                    className={`py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider border transition-all ${
                      form.preferred_contact === method
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                        : 'bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-orange-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="details" className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                Project Details &amp; Requirements *
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                required
                placeholder="Describe your project goals, preferred timelines, or specific feature requirements..."
                value={form.details}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-3xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full font-extrabold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-xs"
              >
                <span>{loading ? 'Submitting...' : 'Send Request'}</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full font-extrabold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Booking</span>
              </a>
            </div>
          </form>

          {/* Social Links Bar */}
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-4">
              Connect Directly on Social Media
            </span>
            <div className="flex justify-center items-center gap-4">
              <a
                href="https://wa.me/2348051310367"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 text-emerald-500 hover:scale-110 transition-transform shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://vm.tiktok.com/ZSHnyjdAL8rxV-SjJcY/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform shadow-md"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580792614102"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 text-blue-600 hover:scale-110 transition-transform shadow-md"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/syntax_service?igsh=MWlxNDJwMnV5MDdiMA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 text-pink-500 hover:scale-110 transition-transform shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/syntax_services?t=4GYMy9Ztff6-9PW9EBLvmw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 text-sky-500 hover:scale-110 transition-transform shadow-md"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function RedesignedSignatureBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  )
}

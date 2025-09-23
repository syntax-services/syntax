'use client'

import { useState } from 'react'
import Head from 'next/head'
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'
import { SiTiktok } from 'react-icons/si'
import { supabase } from '@/lib/supabaseClient'

export default function ContactRequestPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_type: '',
    preferred_contact: '',
    details: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const validateForm = () => {
    if (!form.email && !form.phone) {
      setErrorMsg('Please provide at least email or phone.')
      return false
    }
    if (!form.project_type || !form.details) {
      setErrorMsg('Please fill in project type and details.')
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
      const insertPayload = {
        name: form.full_name,
        email: form.email || null,
        phone: form.phone || null,
        project_type: form.project_type,
        preferred_contact: form.preferred_contact || null,
        message: form.details
      }

      const { data, error } = await supabase
        .from('contact')
        .insert([insertPayload])
        .select()

      if (error) {
        console.error('Supabase insert error object:', error)
        throw new Error(error.message || JSON.stringify(error))
      }

      // optional email function
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).catch((err) => {
        console.warn('Email function failed (non-blocking):', err)
      })

      setSuccess(true)
      setForm({
        full_name: '',
        email: '',
        phone: '',
        project_type: '',
        preferred_contact: '',
        details: ''
      })
    } catch (err: any) {
      console.error('handleSubmit error:', err)
      setErrorMsg(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const businessNumber = '2348051310367'
  const whatsappText = encodeURIComponent(
    `New Booking from Syntax:
Name: ${form.full_name || 'N/A'}
Email: ${form.email || 'N/A'}
Phone: ${form.phone || 'N/A'}
Project Type: ${form.project_type}
Preferred Contact: ${form.preferred_contact || 'N/A'}

Details:
${form.details}`
  )
  const whatsappLink = `https://wa.me/${businessNumber}?text=${whatsappText}`

  return (
    <>
      <Head>
        <title>Book a Web Designer | Syntax Services</title>
        <meta
          name="description"
          content="Request website design, web development, or digital services from Syntax. Get in touch for responsive and modern websites."
        />
        <meta
          name="keywords"
          content="book website designer, hire web developer, Syntax tech, Syntax services, website management, web design near me, web developer near me"
        />
        <meta property="og:title" content="Book Syntax Services" />
        <meta
          property="og:description"
          content="Contact Syntax to request top-notch web design & development services. We respond fast."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syntax.com.ng/book" />
        <meta property="og:image" content="/syntax-og.png" />
        <link rel="canonical" href="https://syntax.com.ng/book" />
      </Head>

      <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-2xl rounded-3xl p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              Book / Request a Service
            </h1>
            <p className="text-lg mb-6 text-center">
              Have a question or a project in mind? Fill the form below or reach out on our socials.
            </p>

            {errorMsg && <div className="text-red-600 text-center mb-4">{errorMsg}</div>}
            {success && (
              <div className="text-green-600 text-center mb-4">
                ✅ Thanks! We’ve received your message.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="full_name"
                placeholder="Your full name"
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.full_name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.email}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="WhatsApp / phone number"
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                name="project_type"
                placeholder="Project type (e.g. e-commerce)"
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.project_type}
                onChange={handleChange}
                required
              />
              <select
                name="preferred_contact"
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.preferred_contact}
                onChange={handleChange}
              >
                <option value="">Preferred contact method</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
              </select>
              <textarea
                name="details"
                placeholder="Tell us about your project / message"
                rows={4}
                className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
                value={form.details}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700 text-black dark:text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-orange-300/30"
              >
                {loading ? 'Submitting…' : 'Send'}
              </button>
            </form>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-green-300/30"
            >
              Book via WhatsApp
            </a>

            <div className="mt-8 text-center">
              <p className="font-semibold mb-4">Connect with us:</p>
              <div className="flex justify-center gap-4">
                <a href="https://wa.me/2348051310367" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-7 h-7 text-syntaxBlue hover:opacity-70 transition" />
                </a>
                <a
                  href="https://vm.tiktok.com/ZSHnyjdAL8rxV-SjJcY/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiTiktok className="w-7 h-7 text-syntaxBlue hover:opacity-70 transition" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61580792614102"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-7 h-7 text-syntaxBlue hover:opacity-70 transition" />
                </a>
                <a
                  href="https://www.instagram.com/syntax_service?igsh=MWlxNDJwMnV5MDdiMA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-7 h-7 text-syntaxBlue hover:opacity-70 transition" />
                </a>
                <a
                  href="https://x.com/syntax_services?t=4GYMy9Ztff6-9PW9EBLvmw&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-7 h-7 text-syntaxBlue hover:opacity-70 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

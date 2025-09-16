'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    project_type: '',
    details: '',
    preferred_contact: '' // new field
  })
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    // Only phone and project_type are strictly required
    if (!form.phone || !form.project_type || !form.details) {
      setErrorMsg('Please provide at least phone, project type and details.')
      return false
    }
    if (!/^\d+$/.test(form.phone)) {
      setErrorMsg('Please enter a valid phone number (digits only).')
      return false
    }
    setErrorMsg('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Error saving booking.')
      } else {
        setSuccess(true)
        setForm({
          full_name: '',
          phone: '',
          project_type: '',
          details: '',
          preferred_contact: ''
        })
        window.open(whatsappLink, '_blank')
      }
    } catch (err: any) {
      setErrorMsg(err.message)
    }
    setLoading(false)
  }

  const businessNumber = '2348069343332'
  const whatsappText = encodeURIComponent(
    `New Website Booking from Syntax:

Full Name: ${form.full_name || 'N/A'}
WhatsApp Number: ${form.phone}
Project Type: ${form.project_type}

Preferred Contact: ${form.preferred_contact || 'N/A'}

Project Details:
${form.details}`
  )
  const whatsappLink = `https://wa.me/${businessNumber}?text=${whatsappText}`

  if (success) {
    return (
      <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen flex items-center justify-center">
        <div className="max-w-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Thank you!</h1>
          <p className="text-lg">
            We’ve received your request. We’ll contact you soon.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Request a Website</h1>

        {errorMsg && (
          <div className="text-red-600 text-center mb-4">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="full_name"
            placeholder="Your full name (optional)"
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            value={form.full_name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="WhatsApp number"
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            value={form.phone}
            onChange={handleChange}
            required
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
            placeholder="Describe your project"
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            rows={4}
            value={form.details}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full 
              bg-syntaxOrange
              hover:bg-orange-600
              active:bg-orange-700
              text-black dark:text-white
              font-semibold 
              rounded-4xl 
              px-6 py-4 
              transition 
              shadow-lg shadow-orange-300/30
            "
          >
            {loading ? 'Submitting…' : 'Submit Request on Syntax'}
          </button>
        </form>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-4 
            block 
            text-center 
            w-full 
            bg-green-600 
            hover:bg-green-700 
            active:bg-green-800 
            text-white 
            font-semibold 
            rounded-4xl 
            px-6 py-4 
            transition 
            shadow-lg shadow-green-300/30
          "
        >
          Book via WhatsApp
        </a>
      </div>
    </main>
  )
}

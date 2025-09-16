'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'
import { SiTiktok } from 'react-icons/si'
import { supabase } from '@/lib/supabaseClient'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!name || !email || !message) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('contact').insert([{ name, email, message }])
      if (error) {
        console.error(error)
        setError('Something went wrong. Please try again later.')
      } else {
        setSuccess(true)
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-8 text-center">
          Have a question or a project in mind? Fill the form below or reach out on our socials.
        </p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">✅ Thanks! We’ll get back to you soon.</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your full name"
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Tell us a bit about your project..."
            rows={4}
            className="w-full bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream rounded-4xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/50 transition"
            value={message}
            onChange={e => setMessage(e.target.value)}
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
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="font-semibold mb-4">Connect with us:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/2348069343332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-green-300/30"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href="https://vm.tiktok.com/ZSHnyjdAL8rxV-SjJcY/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-black/30"
            >
              <SiTiktok className="w-5 h-5" /> TikTok
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580792614102"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-blue-300/30"
            >
              <Facebook className="w-5 h-5" /> Facebook
            </a>
            <a
              href="https://www.instagram.com/syntax_service?igsh=MWlxNDJwMnV5MDdiMA=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-pink-300/30"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
            <a
              href="https://x.com/syntax_services?t=4GYMy9Ztff6-9PW9EBLvmw&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-4xl px-6 py-4 transition shadow-lg shadow-neutral-500/30"
            >
              <Twitter className="w-5 h-5" /> X / Twitter
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-4 bg-neutral-200 dark:bg-neutral-800 rounded-4xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

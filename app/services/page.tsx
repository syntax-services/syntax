'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

// animations
import webAnimation from '@/public/animations/laptop.json'
import appAnimation from '@/public/animations/rocket.json'
import ecommerceAnimation from '@/public/animations/shopping-cart.json'
import brandingAnimation from '@/public/animations/paint-brush.json'
import seoAnimation from '@/public/animations/growth-chart.json'
import customAnimation from '@/public/animations/custom.json'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function ServicesPage() {
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // match the API route fields
    const payload = {
      name: 'Custom Project Request', // you can make this a real name field if you want
      email: formData.get('email') as string,
      message: `
Project type: ${formData.get('project_type')}
Features: ${formData.get('features')}
Budget: ₦${formData.get('budget')}
`,
    }

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error(errText)
        alert('Something went wrong.')
      } else {
        alert('Your request has been sent!')
        setShowCustomForm(false)
        e.currentTarget.reset()
      }
    } catch (err) {
      console.error(err)
      alert('Could not reach server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
        >
          Our <span className="text-syntaxBlue">Services</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto"
        >
          From simple landing pages to full-scale applications — we design,
          build and launch high-performing digital experiences.
        </motion.p>
      </section>

      {/* SERVICE CARDS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'Business & Portfolio Websites',
              desc: 'Responsive sites for small businesses, creatives and professionals. Includes profile, services, gallery, contact forms and more.',
              anim: webAnimation,
              price: 'Starting from ₦80,000',
            },
            {
              title: 'E-commerce Stores',
              desc: 'Fully-featured online shops with secure payments, product management, shipping integrations and customer dashboards.',
              anim: ecommerceAnimation,
              price: 'Starting from ₦180,000',
            },
            {
              title: 'Web Applications',
              desc: 'Custom dashboards, SaaS platforms, portals, CRM tools and complex apps tailored to your workflow.',
              anim: appAnimation,
              price: 'Starting from ₦350,000',
            },
            {
              title: 'Branding & UI/UX Design',
              desc: 'Logos, style guides, mockups, wireframes and user-focused interfaces that elevate your brand experience.',
              anim: brandingAnimation,
              price: 'Packages from ₦70,000',
            },
            {
              title: 'SEO & Growth Optimisation',
              desc: 'Get found on Google and convert visitors with data-driven SEO, content strategy, analytics and optimisation.',
              anim: seoAnimation,
              price: 'Custom pricing',
            },
            {
              title: 'Custom / Big Projects',
              desc: 'Want a website like Jumia, JAMB portal, a search engine, an AI platform or any large-scale product? Click below to tell us exactly what you need.',
              anim: customAnimation,
              price: 'Let’s discuss your budget',
              custom: true,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-[2.5rem] p-5 sm:p-8 shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition flex flex-col items-center text-center gap-3 sm:gap-4"
            >
              <Lottie animationData={s.anim} loop className="w-16 sm:w-24 h-16 sm:h-24" />
              <h3 className="text-lg sm:text-2xl font-bold">{s.title}</h3>
              <p className="text-xs sm:text-sm md:text-base">{s.desc}</p>
              <span className="mt-2 text-syntaxBlue font-semibold">{s.price}</span>
              {s.custom && (
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="mt-3 bg-syntaxBlue hover:bg-blue-600 text-white rounded-full px-6 py-3 text-xs sm:text-base shadow-lg shadow-blue-300/30 transition"
                >
                  Open Custom Project Form
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FULL SCREEN CUSTOM FORM */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowCustomForm(false)}
              className="absolute top-3 right-4 text-xl text-syntaxBlue hover:text-blue-600"
            >
              ✕
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Custom Project Request</h3>
            <p className="text-xs sm:text-base mb-6">
              Tell us what kind of site or application you’re looking for. Select features and describe your idea so we can build exactly what you want.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-full px-4 py-3 bg-white/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Project Type</label>
                <select
                  name="project_type"
                  className="w-full rounded-full px-4 py-3 bg-white/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/30"
                >
                  <option>Website like Jumia (E-commerce)</option>
                  <option>Portal like JAMB</option>
                  <option>Search Engine</option>
                  <option>AI Website</option>
                  <option>Other (describe below)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Desired Features</label>
                <textarea
                  name="features"
                  rows={3}
                  placeholder="List key features you need..."
                  className="w-full rounded-3xl px-4 py-3 bg-white/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/30"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Budget (₦)</label>
                <input
                  type="number"
                  name="budget"
                  className="w-full rounded-full px-4 py-3 bg-white/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-4 focus:ring-syntaxBlue/30"
                  placeholder="e.g. 500000"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-syntaxBlue hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-300/30 transition w-full font-semibold"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

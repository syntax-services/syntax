// app/about/page.tsx
'use client'

import React from 'react'
import {
  Lightbulb,
  Rocket,
  Globe,
  TrendingUp,
  Palette,
  ShieldCheck,
  Users,
} from 'lucide-react'

export default function AboutPage() {
  // Define a palette of Tailwind classes for random icon colors
  const iconColors = [
    'text-syntaxOrange',
    'text-orange-400',
    'text-amber-500',
    'text-yellow-500',
    'text-rose-500',
    'text-indigo-500',
    'text-teal-500',
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-syntaxCream via-orange-50 to-syntaxCream dark:from-syntaxDark dark:via-black dark:to-syntaxDark" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 text-syntaxDark dark:text-syntaxCream">
        <h1 className="text-5xl font-bold mb-4 text-center drop-shadow-sm">
          About <span className="text-syntaxOrange">Syntax</span>
        </h1>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Turning imagination into digital experiences that grow your business.
        </p>

        {/* Story */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-7 h-7 text-syntaxOrange" />
              Our Story
            </h2>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>Syntax</strong> — a creative web studio built on imagination,
              strategy, and measurable results. We’re not just developers; we’re storytellers,
              designers, and growth partners. Every project we take on starts with a bold idea
              and ends with a high-performing digital experience.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We believe every business has a unique story to tell. That’s why our process blends
              deep research, bold creativity and cutting-edge technology. We imagine first, then
              bring concepts to life with pixel-perfect websites, apps, and campaigns that convert
              visitors into loyal customers.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-3xl shadow-2xl p-8 text-center border border-white/20 dark:border-white/10">
            <Rocket className="w-16 h-16 mx-auto text-syntaxOrange mb-4" />
            <p className="text-xl font-semibold">
              “We don’t just build websites — we launch digital growth.”
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-7 h-7 text-syntaxOrange" />
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: 'Custom Websites', desc: 'Fast, secure, and scalable solutions built to your exact needs.' },
              { icon: TrendingUp, title: 'Conversion Funnels', desc: 'Landing pages & sales funnels designed to grow your sales.' },
              { icon: ShieldCheck, title: 'SEO & Performance', desc: 'Optimised for search and speed right from day one.' },
              { icon: Users, title: 'Branding & UX', desc: 'Design and content strategy to make you unforgettable.' },
              { icon: Rocket, title: 'E-commerce Automation', desc: 'Streamline your store, orders, and marketing with smart integrations.' },
              { icon: Lightbulb, title: 'Ongoing Support', desc: 'We stay with you to keep everything running at its best.' },
            ].map((item, i) => {
              const Icon = item.icon
              const color = iconColors[i % iconColors.length]
              return (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-3xl shadow-md p-6 flex flex-col items-start gap-3 hover:shadow-2xl hover:scale-[1.02] transition border border-white/20 dark:border-white/10"
                >
                  <Icon className={`w-8 h-8 ${color}`} />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-base">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Why choose */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-syntaxOrange" />
            Why Choose Syntax
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            With Syntax you get more than a website; you get a partner invested in your success.
            We measure our wins by how much we increase your visibility, your leads, and your revenue.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: 'Imagination-Driven', desc: 'We explore ideas without limits before bringing them to life in code.' },
              { icon: TrendingUp, title: 'Results-Focused', desc: 'Helping you convert more visitors, book more calls, and close more sales.' },
              { icon: Users, title: 'Full-Service', desc: 'From concept and design to development and launch — we handle it all.' },
            ].map((item, i) => {
              const Icon = item.icon
              const color = iconColors[(i + 3) % iconColors.length] // shift to vary
              return (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-3xl shadow-md p-6 text-center border border-white/20 dark:border-white/10 hover:shadow-2xl hover:scale-[1.02] transition"
                >
                  <Icon className={`w-10 h-10 mx-auto ${color} mb-2`} />
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Let’s Build Your Next Big Thing</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Whether you’re a startup looking for your first digital presence or an
            established business ready to scale, Syntax has the tools, talent and creativity
            to make it happen. We’d love to imagine your next project with you — and then
            build it better than you ever thought possible.
          </p>
          <a
            href="/book"
            className="inline-block bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700 text-black dark:text-white font-semibold rounded-4xl px-8 py-4 transition shadow-lg shadow-orange-300/30"
          >
            Start Your Project with Syntax
          </a>
        </section>
      </div>
    </main>
  )
}

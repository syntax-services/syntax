'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

// animations
import mailAnimation from '@/public/animations/mail.json'
import rocketAnimation from '@/public/animations/rocket.json'
import growthChartAnimation from '@/public/animations/growth-chart.json'
import worldMapAnimation from '@/public/animations/world-map.json'
import laptopAnimation from '@/public/animations/laptop.json'
import lightningAnimation from '@/public/animations/lightning.json'
import lockGreenAnimation from '@/public/animations/lock-green.json'
import paintBrushAnimation from '@/public/animations/paint-brush.json'
import shoppingCartAnimation from '@/public/animations/shopping-cart.json'

type Project = {
  id: string
  title: string
  description: string
  image_url: string | null
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, image_url')
        .order('created_at', { ascending: false })
        .limit(3)
      if (error) console.error(error)
      else setProjects(data as Project[])
    }
    fetchProjects()
  }, [])

  return (
    <>
      {/* ✅ SEO Meta */}
      <Head>
        <title>
          Syntax | Web Designer & Developer Nigeria – Websites, Branding & SEO
        </title>
        <meta
          name="description"
          content="Professional web designer & developer in Nigeria. Syntax builds modern, affordable websites, branding and SEO solutions. Website developer near you."
        />
        <meta
          name="keywords"
          content="Syntax, Syntax Services, Syntax Tech, web designer Nigeria, website developer near me, web developer Nigeria, branding, SEO, website management, web apps, affordable websites"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://syntax.com.ng/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syntax.com.ng/" />
        <meta
          property="og:title"
          content="Syntax – Web Design & Development in Nigeria"
        />
        <meta
          property="og:description"
          content="Modern websites, apps, branding & SEO. Affordable and fast delivery. Book Syntax today."
        />
        <meta property="og:image" content="https://syntax.com.ng/syntax-og.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syntax" />
        <meta
          name="twitter:title"
          content="Syntax – Web Design & Development"
        />
        <meta
          name="twitter:description"
          content="Professional websites, apps & branding in Nigeria."
        />
        <meta name="twitter:image" content="https://syntax.com.ng/logo.png" />
      </Head>

      {/* ✅ JSON-LD Business Schema */}
      <Script
        id="schema-org"
        type="application/ld+json"
        strategy="afterInteractive"
      >{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Syntax",
          "image": "https://syntax.com.ng/logo.png",
          "url": "https://syntax.com.ng",
          "telephone": "+2348051310367",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "NG"
          },
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61580792614102",
            "https://www.instagram.com/syntax_service?igsh=MWlxNDJwMnV5MDdiMA==",
            "https://x.com/syntax_services?t=4GYMy9Ztff6-9PW9EBLvmw&s=09"
          ],
          "description": "Professional web design, web development, SEO and branding services in Nigeria. Website developer near you."
        }
      `}</Script>

      <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen">
        {/* HERO */}
        <motion.section
          className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={fadeUp} className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Web Designer & Developer in Nigeria –{' '}
              <span className="text-syntaxBlue">Syntax</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto md:mx-0">
              Professional websites, apps, branding, SEO & website management —
              all in one place.
            </p>
            <Link
              href="/book"
              className="bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700 text-black dark:text-white font-semibold rounded-3xl px-6 py-3 sm:px-8 sm:py-4 transition shadow-lg shadow-orange-300/30 inline-block"
            >
              Request a Website
            </Link>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex justify-center md:justify-end"
          >
            <Lottie
              animationData={mailAnimation}
              loop
              className="w-52 sm:w-64 md:w-72 h-52 sm:h-64 md:h-72"
            />
          </motion.div>
        </motion.section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Modern Design', desc: 'Clean, responsive and user-focused layouts.', anim: laptopAnimation },
              { title: 'Fast Delivery', desc: 'We deliver projects quickly and efficiently.', anim: lightningAnimation },
              { title: 'Affordable Pricing', desc: 'Get premium quality without breaking the bank.', anim: shoppingCartAnimation },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition flex flex-col items-center text-center gap-4"
              >
                <Lottie animationData={f.anim} loop className="w-20 sm:w-24 h-20 sm:h-24" />
                <h3 className="text-xl sm:text-2xl font-bold">{f.title}</h3>
                <p className="text-sm sm:text-base">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-white/80 dark:bg-black/40 backdrop-blur-md py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">Our Services</h2>
            {[
              { title: 'Web Development', desc: 'From landing pages to full-stack apps.', animation: rocketAnimation },
              { title: 'Branding & UI/UX', desc: 'Logos, style guides, and seamless experiences.', animation: paintBrushAnimation },
              { title: 'SEO & Growth', desc: 'Optimized to rank higher and convert better.', animation: growthChartAnimation },
              { title: 'Secure Hosting', desc: 'We keep your site safe with top-notch security.', animation: lockGreenAnimation },
              { title: 'Global Reach', desc: 'Our infrastructure supports worldwide users.', animation: worldMapAnimation },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="grid md:grid-cols-2 gap-8 items-center mb-12"
              >
                <div className="p-6 sm:p-8 rounded-3xl shadow-2xl bg-syntaxCream dark:bg-neutral-900">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">{s.desc}</p>
                </div>
                <div className="flex justify-center">
                  <Lottie animationData={s.animation} loop className="w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-10 text-center"
          >
            Our Work
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl hover:-translate-y-1 transition"
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="h-36 sm:h-40 w-full object-cover rounded-2xl mb-4"
                  />
                ) : (
                  <div className="h-36 sm:h-40 bg-neutral-200 dark:bg-neutral-700 rounded-2xl mb-4" />
                )}
                <h3 className="text-lg sm:text-xl font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="bg-syntaxBlue hover:bg-blue-700 active:bg-blue-800 text-black dark:text-white font-semibold rounded-3xl px-6 py-3 sm:px-8 sm:py-4 transition shadow-lg shadow-blue-300/30 inline-block"
            >
              View All Work
            </Link>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-white/80 dark:bg-black/40 backdrop-blur-md py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">What Clients Say</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { name: 'Jane Doe', feedback: 'Syntax transformed our online presence. Highly recommended!' },
                { name: 'John Smith', feedback: 'Quick delivery and top-notch design.' },
                { name: 'Ada Lovelace', feedback: 'Amazing support and beautiful UI.' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  className="p-6 sm:p-8 rounded-3xl shadow-2xl bg-syntaxCream dark:bg-neutral-900 hover:-translate-y-1 transition"
                >
                  <p className="italic mb-3 text-sm sm:text-base">“{t.feedback}”</p>
                  <h4 className="font-bold text-sm sm:text-base">{t.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="bg-syntaxBlue py-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-white"
            >
              Let’s start your project today
            </motion.h2>
            <Link
              href="/book"
              className="bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700 text-black dark:text-white font-semibold rounded-3xl px-6 py-3 sm:px-8 sm:py-4 transition shadow-lg shadow-orange-300/30 inline-block"
            >
              Get Started
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  )
}

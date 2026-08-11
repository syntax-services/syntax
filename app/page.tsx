// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { logPageView } from '@/lib/analytics'
import FaintParticleBackground from '@/components/ParticleBackground'
import TechMarquee from '@/components/TechMarquee'
import TechStackGrid from '@/components/TechStackGrid'
import { CustomWebIcon, CustomVaultIcon, CustomPartnerIcon } from '@/components/CustomIcons'
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'

const safeUrl = (url: string | null) => { if (!url) return '#'; return (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) ? url : `https://${url}` }

type Project = {
  id: string
  title: string
  client_name: string
  description: string
  image_url: string | null
  live_url: string
  category: string
}

export default function RedesignedFramerHomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  useEffect(() => {
    // Detect Compound Supabase OAuth return hash fragment (#access_token=...)
    if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          localStorage.setItem('cum_session_exp', String(Date.now() + 7 * 86400 * 1000))
          if (session.user.email) localStorage.setItem('cum_user_email', session.user.email)
          if (session.user.user_metadata?.full_name) {
            localStorage.setItem('cum_user_name', session.user.user_metadata.full_name)
          }
          window.location.href = '/compound'
        }
      })
    }
  }, [])

  useEffect(() => {
    logPageView('/')
    const fetchTopProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_live', true)
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setFeaturedProjects(data as Project[])
    }
    fetchTopProjects()
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden">
      {/* Faint, barely noticeable background connecting dots */}
      <FaintParticleBackground />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-4 max-w-7xl mx-auto text-center z-10">
        {/* Compound Bot Launch Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center"
        >
          <Link
            href="/compound"
            className="group flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 shadow-xl hover:border-orange-500/50 transition-all duration-300"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-orange-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              UPCOMING LAUNCH
            </span>
            <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
              ⚡ <strong className="text-white">Compound Trading Bot</strong> launches <span className="text-orange-400 font-bold">Monday, August 17th WAT</span> — Giveaway &amp; Allocation Protocol
            </span>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        {/* Status Pill Badge with Framer Silver Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-700 dark:text-neutral-300">
            WEB APPLICATIONS &amp; DIGITAL SYSTEMS AGENCY
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.08]"
        >
          We Build High-Speed{' '}
          <span className="text-neutral-900 dark:text-white underline decoration-orange-500/40 decoration-4">
            Web Applications
          </span>{' '}
          &amp; Enterprise Platforms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Syntax Services engineers production web apps, e-commerce stores, and custom software systems designed for peak speed, high conversion, and seamless multi-device user experiences.
        </motion.p>

        {/* Framer Silver & Neutral Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          <Link
            href="/projects"
            className="px-8 py-3.5 rounded-full font-bold uppercase tracking-wider bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 shadow-sm border border-neutral-300 dark:border-neutral-700 flex items-center gap-2 text-xs"
          >
            <span>Explore Live Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/book"
            className="px-8 py-3.5 rounded-full font-bold uppercase tracking-wider bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-300 shadow-sm text-xs flex items-center gap-2"
          >
            <span>Request Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Real Tech Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-4">
            Engineered with Industry-Standard Tools
          </span>

          <TechMarquee />
        </motion.div>
      </section>

      {/* Dribbble-Inspired Technology Stack Section */}
      <TechStackGrid />

      {/* Signature Module Showcase */}
      <section className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-inner">
                <CustomWebIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Live Client Portfolio</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Explore real, active production client websites built and maintained by Syntax Services since last year.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:underline"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-inner">
                <CustomVaultIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Interactive Demo Vault</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Interactive showcase of pre-built web applications and live feature walkthroughs.
              </p>
            </div>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>Access Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-inner">
                <CustomPartnerIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Partner &amp; Scout Portal</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Secure partner portal for tracking project introductions, referral analytics, and performance milestones.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Partner Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Production Builds */}
      {featuredProjects.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto z-10 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                PROVEN PRODUCTION DELIVERIES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">Featured Production Builds</h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:underline flex items-center gap-1.5 mt-3 md:mt-0"
            >
              <span>See All Live Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {p.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 text-neutral-900 dark:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Live
                  </span>
                  <a
                    href={safeUrl(p.live_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

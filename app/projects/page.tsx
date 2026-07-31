// app/projects/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { logPageView } from '@/lib/analytics'
import FaintParticleBackground from '@/components/ParticleBackground'
import Image from 'next/image'
import {
  ExternalLink,
  ShieldCheck,
  Vault,
  Globe,
} from 'lucide-react'

const safeUrl = (url: string | null) => { if (!url) return '#'; return (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) ? url : `https://${url}` }

type Project = {
  id: string
  title: string
  client_name: string
  description: string
  image_url: string | null
  video_url: string | null
  demo_url: string | null
  live_url: string | null
  category: string
  year: number
}

type Demo = {
  id: string
  title: string
  niche: string
  demo_url: string
  image_url: string | null
  video_url: string | null
  description?: string
}

export default function TabbedProjectsPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'demos'>('live')

  const [projects, setProjects] = useState<Project[]>([])
  const [demos, setDemos] = useState<Demo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    logPageView('/projects')

    const fetchProjectsAndDemos = async () => {
      // 1. Fetch Live Projects
      const { data: pData, error: pErr } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (pErr) console.warn('Projects fetch note:', pErr.message)
      else setProjects((pData as Project[]) || [])

      // 2. Fetch Demos
      const { data: dData, error: dErr } = await supabase
        .from('demos')
        .select('*')
        .order('created_at', { ascending: false })

      if (dErr || !dData || dData.length === 0) {
        setDemos([])
      } else {
        setDemos((dData as Demo[]) || [])
      }

      setLoading(false)
    }

    fetchProjectsAndDemos()
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pt-32 pb-24 px-4 overflow-hidden">
      <FaintParticleBackground />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20 inline-flex items-center gap-1.5 mb-4">
            FEATURED PROJECTS &amp; LIVE DEMOS
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Our Work &amp;{' '}
            <span className="text-neutral-900 dark:text-white underline decoration-orange-500/40 decoration-4">
              Demo Vault
            </span>
          </h1>

          <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            Explore live production builds delivered to real clients alongside pre-built sample demos for pitches.
          </p>

          {/* Clean Tab Switcher (Live Projects vs Demo Vault) */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('live')}
              className={`min-h-[44px] px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'live'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md scale-105'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/40'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Live Client Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('demos')}
              className={`min-h-[44px] px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'demos'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md scale-105'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/40'
              }`}
            >
              <Vault className="w-4 h-4 text-purple-500" />
              <span>Sample Demo Vault ({demos.length})</span>
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Live Client Projects */}
        {activeTab === 'live' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <h2 className="sr-only">Live Client Projects</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-[2rem] bg-neutral-200 dark:bg-neutral-900 animate-pulse border border-neutral-300 dark:border-neutral-800"
                  />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900/60 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm max-w-md mx-auto">
                <Globe className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold">No Live Projects Published</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Live client builds added in the Admin Panel will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -5 }}
                    className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Media Preview (Video or Image) */}
                    <div className="relative h-52 w-full bg-neutral-950 overflow-hidden">
                      {p.video_url ? (
                        <video
                          src={safeUrl(p.video_url)}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : p.image_url ? (
                        <Image
                          src={safeUrl(p.image_url)}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-neutral-400 p-6 text-center">
                          <Globe className="w-10 h-10 mb-2 text-orange-500" />
                          <span className="text-xs font-mono font-semibold text-neutral-400">
                            Verified Live Web System
                          </span>
                        </div>
                      )}

                      {p.year && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {p.year}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                            {p.category || 'Web Application'}
                          </span>
                          <span className="text-xs text-neutral-400">•</span>
                          <span className="text-xs text-neutral-500 font-medium">{p.client_name}</span>
                        </div>

                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {p.title}
                        </h3>

                        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="w-4 h-4" />
                          Verified Client
                        </span>

                        <a
                          href={safeUrl(p.demo_url || p.live_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Visit Build</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 2: Clean Sample Demo Vault */}
        {activeTab === 'demos' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <h2 className="sr-only">Sample Demo Vault</h2>
            {demos.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900/60 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm max-w-md mx-auto">
                <Vault className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold">No Demos Available</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Sample demos will appear here once added in the Admin Panel.
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => (
                <motion.div
                  key={demo.id}
                  whileHover={{ y: -5 }}
                  className="rounded-[2.5rem] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Media Preview (Video or Image) */}
                  <div className="relative h-52 w-full bg-neutral-950 overflow-hidden">
                    {demo.video_url ? (
                      <video
                        src={safeUrl(demo.video_url)}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : demo.image_url ? (
                      <Image
                        src={safeUrl(demo.image_url)}
                        alt={demo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/30 via-neutral-900 to-neutral-950 text-neutral-400 p-6 text-center">
                        <Vault className="w-10 h-10 mb-2 text-purple-400" />
                        <span className="text-xs font-mono font-semibold text-purple-300">
                          Pre-Built Sample Demo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clean Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {demo.niche}
                      </span>

                      <h3 className="text-xl font-bold mt-3 text-neutral-900 dark:text-neutral-100">
                        {demo.title}
                      </h3>

                      {demo.description && (
                        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                          {demo.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        Sample Build
                      </span>

                      <a
                        href={safeUrl(demo.demo_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-1.5 shadow-md"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

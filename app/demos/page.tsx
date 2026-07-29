// app/demos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { logPageView } from '@/lib/analytics'
import { ExternalLink, Vault, Sparkles, Code2, BookOpen, MessageSquare, Copy, Check } from 'lucide-react'

type Demo = {
  id: string
  title: string
  niche: string
  demo_url: string
  thumbnail_url: string | null
  pitch_script: string
  objection_handlers: string
}

export default function DemoVaultPage() {
  const [demos, setDemos] = useState<Demo[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    logPageView('/demos')
    const fetchDemos = async () => {
      const { data, error } = await supabase
        .from('demos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase demo vault query note:', error.message || error)
        setDemos([
          {
            id: 'demo-1',
            title: 'Mimms Cartel Fashion E-Commerce Store',
            niche: 'Fashion & E-Commerce',
            demo_url: 'https://tml-topaz.vercel.app',
            thumbnail_url: null,
            pitch_script: 'Hello! I noticed your brand online. We built a fast, seamless e-commerce store demo that loads instantly and collects WhatsApp orders directly. Take 15 seconds to check it out.',
            objection_handlers: 'Client: "We already have a website." -> Response: "That is great! Most existing sites take 5-8 seconds to load on mobile. Our custom builds load under 1.5 seconds, directly increasing completed orders."',
          },
        ])
      } else {
        setDemos((data as Demo[]) || [])
      }
      setLoading(false)
    }
    fetchDemos()
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 text-xs font-mono font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 inline-flex items-center gap-1.5 mb-3">
            <Vault className="w-3.5 h-3.5" />
            <span>SYNTAX_DEMO_VAULT</span>
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Sample Demo Vault &{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Pitch Library
            </span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Dedicated vault of pre-built sample demos for client pitches, complete with proven pitch scripts and objection handling guides for Closers & Partners.
          </p>
        </div>

        {/* Demos List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-neutral-200 dark:bg-neutral-900 animate-pulse border border-neutral-300 dark:border-neutral-800"
              />
            ))}
          </div>
        ) : demos.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900/60 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm max-w-2xl mx-auto">
            <Vault className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold">Demo Vault Empty</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Sample demo builds added in the Admin panel will appear here for Closers and Partners.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demos.map((demo) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar / Thumbnail Header */}
                  <div className="p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {demo.niche}
                      </span>
                      <h2 className="text-2xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">
                        {demo.title}
                      </h2>
                    </div>

                    <a
                      href={demo.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      Open Live Demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Body Scripts */}
                  <div className="p-6 space-y-5">
                    {/* Pitch Script Box */}
                    <div className="rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          Recommended Pitch Script
                        </span>

                        <button
                          onClick={() => copyToClipboard(demo.pitch_script, demo.id + '-pitch')}
                          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1"
                        >
                          {copiedId === demo.id + '-pitch' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedId === demo.id + '-pitch' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed font-mono">
                        &quot;{demo.pitch_script}&quot;
                      </p>
                    </div>

                    {/* Objection Handler Box */}
                    <div className="rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4" />
                          Objection Handling Guide
                        </span>

                        <button
                          onClick={() => copyToClipboard(demo.objection_handlers, demo.id + '-obj')}
                          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1"
                        >
                          {copiedId === demo.id + '-obj' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedId === demo.id + '-obj' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed font-mono">
                        &quot;{demo.objection_handlers}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

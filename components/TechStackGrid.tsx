// components/TechStackGrid.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TechItem = {
  name: string
  category: 'Frontend' | 'Backend' | 'Databases' | 'Cloud & Infra'
  color: string
  desc: string
  svg: React.ReactNode
}

const TECH_DATA: TechItem[] = [
  {
    name: 'Next.js 15',
    category: 'Frontend',
    color: '#FF7A00',
    desc: 'App Router, Turbopack, and Server Actions for ultra-fast web apps.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.55 16.95l-5.7-8.1v8.1H10V7.05h2.1l5.4 7.8v-7.8h1.95v9.9h-1.95z" />
      </svg>
    ),
  },
  {
    name: 'React 19',
    category: 'Frontend',
    color: '#61DAFB',
    desc: 'Declarative component architecture for dynamic user interfaces.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2" />
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS v4',
    category: 'Frontend',
    color: '#06B6D4',
    desc: 'Utility-first CSS engine for ultra-sleek, responsive layouts.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    color: '#3178C6',
    desc: 'Type-safe codebase ensuring zero runtime type errors.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.864 13.13c.48 0 .96.115 1.344.344.384.23.67.57.854 1.01.185.44.277.96.277 1.56 0 .61-.097 1.14-.29 1.59-.193.45-.48.8-.86 1.04-.383.24-.86.36-1.43.36-.57 0-1.04-.12-1.41-.36-.37-.24-.65-.58-.84-1.02-.19-.44-.28-.97-.28-1.58 0-.61.09-1.14.28-1.58.19-.44.47-.78.84-1.02.37-.24.84-.36 1.41-.36zm-7.66 0c.48 0 .96.115 1.34.344.38.23.67.57.85 1.01.19.44.28.96.28 1.56 0 .61-.09 1.14-.28 1.59-.19.45-.48.8-.85 1.04-.38.24-.86.36-1.43.36-.57 0-1.04-.12-1.41-.36-.37-.24-.65-.58-.84-1.02-.19-.44-.28-.97-.28-1.58 0-.61.09-1.14.28-1.58.19-.44.47-.78.84-1.02.37-.24.84-.36 1.41-.36z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend',
    color: '#339933',
    desc: 'High-concurrency JavaScript runtime for backend services.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.608L1.608 7.608v12L12 25.608l10.392-6v-12L12 1.608zm0 2.308l8.392 4.846v9.692L12 23.3 3.608 18.454v-9.692L12 3.916z" />
      </svg>
    ),
  },
  {
    name: 'Supabase DB',
    category: 'Databases',
    color: '#3ECF8E',
    desc: 'PostgreSQL database with real-time subscriptions & security.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.359 1.137L2.43 14.86c-.46.58-.04 1.44.71 1.44h7.52l-1.02 6.57c-.12.78.85 1.25 1.35.66l10.93-13.72c.46-.58.04-1.44-.71-1.44h-7.52l1.02-6.57c.12-.79-.85-1.26-1.35-.67z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Databases',
    color: '#4169E1',
    desc: 'Relational database management system with JSONB indexing.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm3.5 17.5l-3.5-2.1-3.5 2.1 1-3.9-3-2.6 4-.3 1.5-3.7 1.5 3.7 4 .3-3 2.6 1 3.9z" />
      </svg>
    ),
  },
  {
    name: 'Vercel Edge',
    category: 'Cloud & Infra',
    color: '#FF7A00',
    desc: 'Global Edge Network for zero-latency serverless rendering.',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
]

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Databases', 'Cloud & Infra'] as const

export default function TechStackGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeItem, setActiveItem] = useState<TechItem | null>(null)

  const filteredTech =
    activeCategory === 'All'
      ? TECH_DATA
      : TECH_DATA.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-5 py-2 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/30 inline-flex items-center gap-1.5 mb-4 shadow-lg shadow-orange-500/10">
          ENTERPRISE TECH STACK
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Powered by Industry-Leading{' '}
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          Explore our battle-tested technology stack engineered for ultra-fast performance, high availability, and effortless scaling.
        </p>

        {/* Category Pill Filters (Dribbble Inspired) */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Cards Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <AnimatePresence>
          {filteredTech.map((tech) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={tech.name}
              onClick={() => setActiveItem(tech)}
              whileHover={{ y: -5 }}
              className="group cursor-pointer rounded-[2rem] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/60 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start justify-between"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <div
                  style={{ color: tech.color }}
                  className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"
                >
                  {tech.svg}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  {tech.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

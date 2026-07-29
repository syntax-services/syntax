// components/TechMarquee.tsx
'use client'

import { motion } from 'framer-motion'

const TECH_ITEMS = [
  {
    name: 'VS Code',
    color: '#007ACC',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.999.999 0 0 0-1.276.064L.366 7.24a.999.999 0 0 0 .074 1.492l3.99 3.268-3.99 3.268a.999.999 0 0 0-.074 1.492l1.283 1.166a.999.999 0 0 0 1.276.064l4.12-3.12 9.46 8.63c.48.438 1.18.558 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.94a1.5 1.5 0 0 0-.85-1.353zM18 16.541l-6.22-4.541L18 7.459v9.082z" />
      </svg>
    ),
  },
  {
    name: 'React 19',
    color: '#61DAFB',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
    name: 'Next.js 15',
    color: '#000000',
    svg: (
      <svg className="w-5 h-5 dark:text-white text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.55 16.95l-5.7-8.1v8.1H10V7.05h2.1l5.4 7.8v-7.8h1.95v9.9h-1.95z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Supabase DB',
    color: '#3ECF8E',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.359 1.137L2.43 14.86c-.46.58-.04 1.44.71 1.44h7.52l-1.02 6.57c-.12.78.85 1.25 1.35.66l10.93-13.72c.46-.58.04-1.44-.71-1.44h-7.52l1.02-6.57c.12-.79-.85-1.26-1.35-.67z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.864 13.13c.48 0 .96.115 1.344.344.384.23.67.57.854 1.01.185.44.277.96.277 1.56 0 .61-.097 1.14-.29 1.59-.193.45-.48.8-.86 1.04-.383.24-.86.36-1.43.36-.57 0-1.04-.12-1.41-.36-.37-.24-.65-.58-.84-1.02-.19-.44-.28-.97-.28-1.58 0-.61.09-1.14.28-1.58.19-.44.47-.78.84-1.02.37-.24.84-.36 1.41-.36zm-7.66 0c.48 0 .96.115 1.34.344.38.23.67.57.85 1.01.19.44.28.96.28 1.56 0 .61-.09 1.14-.28 1.59-.19.45-.48.8-.85 1.04-.38.24-.86.36-1.43.36-.57 0-1.04-.12-1.41-.36-.37-.24-.65-.58-.84-1.02-.19-.44-.28-.97-.28-1.58 0-.61.09-1.14.28-1.58.19-.44.47-.78.84-1.02.37-.24.84-.36 1.41-.36z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.608L1.608 7.608v12L12 25.608l10.392-6v-12L12 1.608zm0 2.308l8.392 4.846v9.692L12 23.3 3.608 18.454v-9.692L12 3.916z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    color: '#0055FF',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
]

export default function TechMarquee() {
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Gradient Mask Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scroll Container */}
      <div className="flex w-max space-x-4 animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span style={{ color: item.color }} className="shrink-0">
              {item.svg}
            </span>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

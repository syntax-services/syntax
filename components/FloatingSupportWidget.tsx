// components/FloatingSupportWidget.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, X, Zap, ChevronRight, CheckCircle2, PhoneCall } from 'lucide-react'

export default function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const whatsappLink = `https://wa.me/2348051310367?text=${encodeURIComponent(
    'Hello Syntax Services! I would like to consult on a web development project.'
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Glass Consultation Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 md:w-96 rounded-[2.5rem] bg-neutral-900/95 border border-orange-500/30 p-6 shadow-2xl backdrop-blur-2xl text-white relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden shadow-lg">
                <img
                  src="/logo.png"
                  alt="Syntax Consultant"
                  className="w-full h-full object-cover bg-neutral-950 p-1"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-neutral-900" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Full Project Support</h4>
                <p className="text-[11px] text-neutral-400 font-mono">Syntax Lead Architect</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              Have an idea but don&apos;t know where to start? We provide end-to-end support from architecture design to live deployment.
            </p>

            <div className="space-y-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full font-extrabold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-lg shadow-orange-500/30 text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Consultation</span>
              </a>

              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-full font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Partner &amp; Scout Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular Widget Trigger Pill (Dribbble Floating Widget Style) */}
      <div className="relative group flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-neutral-900 border-2 border-orange-500/60 hover:border-orange-500 p-1 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Toggle Project Support"
        >
          <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="Syntax Icon"
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-neutral-950 animate-pulse" />
        </button>
      </div>
    </div>
  )
}

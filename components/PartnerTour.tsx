// components/PartnerTour.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2 } from 'lucide-react'

type TourStep = {
  targetId: string
  title: string
  content: string
  position: 'bottom' | 'top' | 'left' | 'right'
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-role-badge',
    title: 'Your Partner Role & Payout Ledger',
    content: 'This shows your assigned role (Scout, Closer, or Executive) and your commission calculation rate (3%, 5%, or 8%).',
    position: 'bottom',
  },
  {
    targetId: 'tour-lead-form',
    title: 'Institutional Lead Registration',
    content: 'Submit prospective business clients with full company location, Instagram page, and decision-maker details to lock in your payout.',
    position: 'bottom',
  },
  {
    targetId: 'tour-demo-request',
    title: 'Request Custom Demo Build',
    content: 'If a prospective client requires a pre-built demo before committing, submit a custom demo build request to our engineering team.',
    position: 'bottom',
  },
  {
    targetId: 'tour-support',
    title: 'Partner Support Desk',
    content: 'Send complaints, payout verification requests, or questions directly to Syntax Admin.',
    position: 'bottom',
  },
]

export default function PartnerTour({
  onClose,
  role,
}: {
  onClose: () => void
  role: string
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const step = TOUR_STEPS[currentStepIndex]

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-4">
        {/* Semi-transparent Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto" onClick={onClose} />

        {/* Interactive Tour Tooltip Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative z-50 w-full max-w-md p-6 rounded-3xl bg-neutral-900 text-white border border-emerald-500/40 shadow-2xl pointer-events-auto overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              GUIDED TOUR ({currentStepIndex + 1}/{TOUR_STEPS.length})
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
          <p className="text-xs text-neutral-300 leading-relaxed mb-6">
            {step.content}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:underline"
            >
              Skip Tour
            </button>

            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-full text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1"
              >
                <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

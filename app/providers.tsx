'use client'

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'sonner' // or 'react-hot-toast'
import { cn } from '@/lib/utils'

// ✅ Create a MUI theme that syncs with Tailwind and Radix
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#fff' },
    text: { primary: '#111' },
  },
  typography: { fontFamily: 'var(--font-sans)' },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0a0a0a' },
    text: { primary: '#f5f5f5' },
  },
  typography: { fontFamily: 'var(--font-sans)' },
})

// ✅ Detect and sync system color scheme (Tailwind + MUI)
function useSystemTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      const mode = mq.matches ? 'dark' : 'light'
      setTheme(mode)
      document.documentElement.classList.toggle('dark', mode === 'dark')
    }
    updateTheme()
    mq.addEventListener('change', updateTheme)
    return () => mq.removeEventListener('change', updateTheme)
  }, [])

  return theme
}

// ✅ Unified App Providers
export default function Providers({ children }: { children: ReactNode }) {
  const themeMode = useSystemTheme()
  const muiTheme = themeMode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <TooltipProvider delayDuration={100}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={cn("min-h-screen bg-background text-foreground transition-colors")}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <Toaster position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  )
}

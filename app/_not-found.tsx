// app/_not-found.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-center px-6">
      <motion.h1
        className="text-8xl font-bold text-syntaxBlue mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back home.
      </motion.p>

      <Link href="/" className="inline-block">
        <Button className="bg-syntaxBlue hover:bg-syntaxDark text-white font-semibold px-6 py-3 rounded-xl transition-all">
          Go Home
        </Button>
      </Link>
    </main>
  )
}

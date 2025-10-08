// app/_not-found/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-extrabold tracking-tight mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg mb-8 text-neutral-600 dark:text-neutral-400"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-white transition-colors"
        >
          Go back home
        </Link>
      </motion.div>
    </main>
  )
}

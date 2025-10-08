"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export const metadata = {
  title: "404 – Page Not Found | Syntax",
  description: "This page could not be found.",
}
export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream transition-colors">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-7xl font-bold mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
      >
        The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/"
          className="px-6 py-3 bg-syntaxBlue text-white rounded-xl hover:bg-syntaxBlue/80 transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  )
}

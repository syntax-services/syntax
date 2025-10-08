// app/_not-found/page.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4">404</h1>
        <p className="text-base sm:text-lg mb-6 text-neutral-700 dark:text-neutral-300">
          The page you’re looking for can’t be found.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-3xl bg-syntaxBlue text-white font-semibold hover:opacity-95 transition"
          >
            Go home
          </Link>

          <Link
            href="/book"
            className="inline-block px-6 py-3 rounded-3xl border border-neutral-300 dark:border-neutral-700 text-syntaxDark dark:text-syntaxCream hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Request a website
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
          If you think this is an error, please try the links above or refresh the page.
        </p>
      </div>
    </main>
  )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6 bg-white dark:bg-black">
      <Link href="/">
        <Image src="/logo.png" alt="Syntax Logo" width={120} height={40} />
      </Link>
      <nav className="flex items-center space-x-6">
        <Link href="/portfolio" className="hover:text-orange-500">Portfolio</Link>
        <Link href="/contact" className="hover:text-blue-500">Contact</Link>
      </nav>
    </header>
  )
}

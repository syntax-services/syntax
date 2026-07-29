// components/CustomIcons.tsx
import React from 'react'

export function CustomWebIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="28" height="24" rx="6" className="fill-orange-500/10 stroke-orange-500" strokeWidth="2" />
      <path d="M2 10H30" className="stroke-orange-500/40" strokeWidth="1.5" />
      <circle cx="6" cy="7" r="1.2" className="fill-orange-500" />
      <circle cx="9.5" cy="7" r="1.2" className="fill-amber-500" />
      <circle cx="13" cy="7" r="1.2" className="fill-emerald-500" />
      <path d="M10 16L14 20L10 24" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 24H22" className="stroke-blue-500" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CustomStoreIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10L8 26C8 27.1 8.9 28 10 28H22C23.1 28 24 27.1 24 26L26 10H6Z" className="fill-orange-500/10 stroke-orange-500" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 10V7C11 4.2 13.2 2 16 2C18.8 2 21 4.2 21 7V10" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="18" r="3" className="fill-orange-500/20 stroke-orange-500" strokeWidth="1.5" />
      <path d="M16 16.5V19.5" className="stroke-orange-500" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CustomAppIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="11" height="11" rx="4" className="fill-orange-500/20 stroke-orange-500" strokeWidth="2" />
      <rect x="18" y="3" width="11" height="11" rx="4" className="fill-blue-500/20 stroke-blue-500" strokeWidth="2" />
      <rect x="3" y="18" width="11" height="11" rx="4" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="2" />
      <rect x="18" y="18" width="11" height="11" rx="4" className="fill-orange-500/10 stroke-orange-500" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="2" className="fill-orange-500" />
      <path d="M22 23.5L25 20.5" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CustomVaultIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="24" height="22" rx="6" className="fill-orange-500/10 stroke-orange-500" strokeWidth="2" />
      <circle cx="16" cy="16" r="5" className="stroke-orange-500" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" className="fill-orange-500" />
      <path d="M22 10H24" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 22H10" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CustomPartnerIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3L28 9V23L16 29L4 23V9L16 3Z" className="fill-orange-500/10 stroke-orange-500" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 11V21" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 16H21" className="stroke-orange-500" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

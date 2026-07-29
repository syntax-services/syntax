"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl",
          title: "font-medium text-sm",
          description: "text-xs opacity-80",
          actionButton: "bg-syntaxBlue text-white text-xs px-2 py-1 rounded-md",
        },
      }}
    />
  )
}

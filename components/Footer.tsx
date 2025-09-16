export default function Footer() {
  return (
    <footer className="p-6 text-center border-t dark:border-neutral-800">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Syntax. All rights reserved.
      </p>
    </footer>
  )
}

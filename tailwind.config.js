/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables dark/light toggle
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        syntaxBlue: '#0A84FF',    // cool blue
        syntaxDark: '#1A1A1A',    // almost black grey
        syntaxOrange: '#FF7A00',  // accent orange (buttons etc.)
        syntaxCream: '#FFF6CC',   // cream/light background
        syntaxGray: '#2D2D2D',    // optional darker gray for text/accents
      },
      borderRadius: {
        '4xl': '2rem', // pill-like radius for inputs/buttons
      },
      boxShadow: {
        'syntax': '0 4px 14px rgba(0, 0, 0, 0.15)', // a clean default shadow
      },
    },
  },
  plugins: [],
}

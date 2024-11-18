/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-yellow-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-gray-100',
    'bg-blue-500',
    'text-blue-500',
    'hover:bg-blue-600'
  ],
  plugins: [],
}

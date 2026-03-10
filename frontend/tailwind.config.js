/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        card: '#141417',
        primary: '#b91c1c', // red-700
        secondary: '#1e1e1e',
        accent: '#2563eb', // blue-600
        zombie: '#ef4444', // red-500
        deprecated: '#f59e0b', // amber-500
        active: '#10b981', // emerald-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(185, 28, 28, 0.3)',
        'neon-blue': '0 0 10px rgba(37, 99, 235, 0.3)',
      }
    },
  },
  plugins: [],
}

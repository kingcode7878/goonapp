/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This creates that "Premium" Red Glow
        accent: {
          DEFAULT: '#ff3b30',
          glow: 'rgba(255, 59, 48, 0.5)',
        },
        zinc: {
          950: '#09090b', // Deepest black for backgrounds
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
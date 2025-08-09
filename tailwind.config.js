// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',     // Deep Navy
        secondary: '#1E293B',   // Steel Gray
        accent: '#38BDF8',      // Vibrant Sky Blue
        highlight: '#F472B6',   // Rosy Pink
        text: '#F1F5F9',        // Snow White
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
         'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
         'slide-down': 'slideDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
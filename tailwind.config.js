/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['monospace'],
      },
      colors: {
        'brand-dark': '#000000',
        'brand-light': '#FFFFFF',
        'brand-secondary': '#888888',
        'brand-accent': '#00FF7F', // Vibrant Green
        'brand-border': '#222222',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
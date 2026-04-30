/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noir': '#0a0604',
        'cocoa': '#1a0e0a',
        'cocoa-soft': '#2a1a12',
        'cocoa-warm': '#3d2418',
        'gold': '#c9a961',
        'gold-bright': '#e8c878',
        'gold-deep': '#8a6f3d',
        'cream': '#f5ead4',
        'cream-mute': '#a89880',
        'rose-dust': '#c9a89a',
        'plum-dust': '#6b4a5e',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Clash Display', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'site': '1600px',
      }
    },
  },
  plugins: [],
}
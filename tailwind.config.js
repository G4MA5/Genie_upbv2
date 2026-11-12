/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        upb: {
          night: '#0A1430',
          marine: '#0E1E4A',
          orange: '#E8742A',
          gold: '#E8B33D',
          paper: '#F6F8FC',
          tech: 'oklch(0.58 0.15 258)',
          inno: 'oklch(0.62 0.15 50)',
          eco: 'oklch(0.58 0.12 170)',
          droit: 'oklch(0.55 0.15 340)'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}

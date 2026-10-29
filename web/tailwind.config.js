/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#528F33', dark: '#467A2B', accent: '#4D9B43', soft: '#A3C78B', tint: '#EEF5E8' },
        cream: '#FFFCEF',
        ink: { DEFAULT: '#212134', muted: '#5E5E75' },
      },
      boxShadow: {
        card: '0 2px 12px rgba(33,33,52,0.06)',
      },
    },
  },
  plugins: [],
};

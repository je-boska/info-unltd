/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Neue-Haas-Grotesk'],
    },
    extend: {
      colors: {
        infoGray: '#e0e0e0',
      },
    },
  },
  plugins: [],
};

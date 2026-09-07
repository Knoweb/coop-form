/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slncc-blue': '#312783',
        'slncc-red': '#a31636',
        'slncc-orange': '#f37021',
        'slncc-gray': '#f4f4f5',
      }
    },
  },
  plugins: [],
}

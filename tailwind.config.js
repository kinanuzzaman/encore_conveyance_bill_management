/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        'green': '#3AB44B',
        'golden': '#CA9B2D',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors: {
        'black-dark': '#00000050',
        'dull-white': '#FFFFFFB3'
      }
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
}


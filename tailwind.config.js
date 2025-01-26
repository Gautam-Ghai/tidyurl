/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgBrown: {
          100: '#f4f7fd',
          200: '#9f9fed',
        },
        customBtn: {
          100: '#736ced'
        }
      }
    },
  },
  plugins: [],
}
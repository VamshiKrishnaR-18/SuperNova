/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        brush: ["Brush Script MT", "cursive"],
        condiment: ["Condiment", "cursive"]
      },
    },
  },
  plugins: [],
}

const { Nunito_Sans } = require("next/font/google");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   Nunito_Sans: ["Nunito Sans", "sans-serif"],
      // },
    },
  },
  plugins: [],
};

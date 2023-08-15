/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#F0E8E6",
          dark: "#9F9F9F"
        },
        back: {
          primary: "#121212",
          secondary: "#282828",
          illustration: "#B45130",
          navbar: "rgb(36, 37, 60)",
          navbarhover: "rgb(62, 63, 86)",
        }
      }
    },
  },
  plugins: [],
}

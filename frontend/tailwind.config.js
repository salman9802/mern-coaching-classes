const colors = require("tailwindcss/colors");

const PRIMARY_CLR = colors.yellow;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(var(--tw-color-blue-500))", // Blue 500 as primary color
        primary: {
          50: PRIMARY_CLR[50],
          100: PRIMARY_CLR[100],
          200: PRIMARY_CLR[200],
          300: PRIMARY_CLR[300],
          400: PRIMARY_CLR[400],
          500: PRIMARY_CLR[500],
          600: PRIMARY_CLR[600],
          700: PRIMARY_CLR[700],
          800: PRIMARY_CLR[800],
          900: PRIMARY_CLR[900],
          950: PRIMARY_CLR[950],
        },
      },
    },
  },
  plugins: [],
};

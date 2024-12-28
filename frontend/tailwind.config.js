const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(var(--tw-color-blue-500))", // Blue 500 as primary color
        primary: {
          // ...colors.blue,
          ...colors.green,
        },
        accent: {
          // ...colors.orange,
          ...colors.yellow,
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        gray: "rgb(85, 85, 85);",
        darkGray: "rgb(53, 53, 53)",
        extraDarkGray: "rgb(250, 250, 250)",
      },
    },
  },
  plugins: [],
};

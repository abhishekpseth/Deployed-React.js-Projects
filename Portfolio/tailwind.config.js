/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "rgb(85, 85, 85);",
        darkGray: "rgb(53,53,53)",
        extraDrakGray: "rgb(250,250,250)",
      },
    },
  },
  plugins: [],
};

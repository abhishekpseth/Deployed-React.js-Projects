/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundBlack: "#060606",
        tabGray: "#1d1e22",
        tabBorderColor: "#34363e",
      },
    },
  },
  plugins: [],
};

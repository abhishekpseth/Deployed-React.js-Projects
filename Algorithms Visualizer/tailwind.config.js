/** @type {import('tailwindcss').Config} */
import {
  gridLight,
  gridDark,
  wallNodeLight,
  wallNodeDark,
  visitedNodeLight,
  visitedNodeDark,
  shortestPathLight,
  shortestPathDark,
} from "./src/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navbarTextLight: "#13005A",
        navbarTextDark: "white",
        btnLight: "#3795BD",
        btnDark: "#4c1d95",
        playBtnLight: "#03C988",
        playBtnDark: "#fbbf24",
        startNodeLight: "#9400FF",
        startNodeDark: "red",
        endNodeLight: "#eab308",
        endNodeDark: "purple",
        gridLight: gridLight,
        gridDark: gridDark,
        wallNodeLight: wallNodeLight,
        wallNodeDark: wallNodeDark,
        visitedNodeLight: visitedNodeLight,
        visitedNodeDark: visitedNodeDark,
        shortestPathLight: shortestPathLight,
        shortestPathDark: shortestPathDark,
      },
    },
  },
  plugins: [],
};

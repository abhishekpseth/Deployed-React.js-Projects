import React from "react";
import useTheme from "../contexts/theme";

export default function ThemeBtn({ direction }) {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <button
      className={`p-[4px] rounded-lg border-none ${
        themeMode === "light"
          ? "bg-black text-white"
          : direction === "vertical"
          ? "bg-white text-black"
          : "bg-yellow-400 text-black"
      }`}
      onClick={onChangeBtn}
    >
      {themeMode === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

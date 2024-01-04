import React from "react";
import ThemeBtn from "./ThemeBtn";

const NavigationOptions = ({ direction }) => {
  return (
    <ul
      className={`flex justify-between items-center text-[24px] ${
        direction === "vertical"
          ? "flex-col gap-[8px] dark:text-black"
          : "gap-[16px] "
      }`}
    >
      <a href="#about">
        <li>About</li>
      </a>
      <a href="#projects">
        <li>Projects</li>
      </a>
      <a href="#contact">
        <li>Contact</li>
      </a>
      <li>
        <ThemeBtn direction={direction} />
      </li>
    </ul>
  );
};

export default NavigationOptions;

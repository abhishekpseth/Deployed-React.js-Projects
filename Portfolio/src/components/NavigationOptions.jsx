import React from "react";
import ThemeBtn from "./ThemeBtn";

const NavigationOptions = ({ direction }) => {
  return (
    <ul
      className={`flex justify-between items-center text-[20px] sm:text-[24px] ${
        direction === "vertical"
          ? "flex-col gap-[8px] dark:text-black"
          : "gap-[16px]"
      }`}
    >
      <a href="#about">
        <li
          className={`${
            direction !== "vertical"
              ? "hover:underline dark:hover:line-through"
              : ""
          }`}
        >
          About
        </li>
      </a>
      <a href="#projects">
        <li
          className={`${
            direction !== "vertical"
              ? "hover:underline dark:hover:line-through"
              : ""
          }`}
        >
          Projects
        </li>
      </a>
      <a href="#contact">
        <li
          className={`${
            direction !== "vertical"
              ? "hover:underline dark:hover:line-through"
              : ""
          }`}
        >
          Contact
        </li>
      </a>
      <li>
        <ThemeBtn direction={direction} />
      </li>
    </ul>
  );
};

export default NavigationOptions;

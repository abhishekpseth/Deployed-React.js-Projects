import React from "react";

const NavigationOptions = ({ direction }) => {
  return (
    <ul
      className={`flex justify-between items-center text-[24px] ${
        direction === "vertical"
          ? "flex-col text-white gap-[8px]"
          : "gap-[16px]"
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
    </ul>
  );
};

export default NavigationOptions;

import React from "react";

const NavigationOptions = () => {
  return (
    <ul className="flex justify-between gap-[2rem] text-[24px]">
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

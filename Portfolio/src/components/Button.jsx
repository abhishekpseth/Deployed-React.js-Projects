import React from "react";

const Button = ({ section, text, color, link, target }) => {
  return (
    <a href={link} target={target}>
      <button
        className={`${
          section === "introduction" ? "p-3" : "w-[95px] h-[50px]"
        } border rounded-3xl font font-medium dark:text-white dark:border-gray ${
          color === "dark" ? "text-white bg-darkGray dark:bg-black" : ""
        }`}
      >
        {text}
      </button>
    </a>
  );
};

export default Button;

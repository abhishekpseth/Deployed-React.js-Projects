import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Button = ({ children, onClick, btnName }) => {
  const isBtnDisabled = useSelector((state) => state.dijsktra.isBtnDisabled);
  
  return (
    <button
      disabled={isBtnDisabled}
      className={`flex items-center justify-center gap-1 px-2 py-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] bg-btnLight dark:bg-btnDark rounded-md relative ${
        isBtnDisabled
          ? btnName === "visualize"
            ? "dark:bg-playBtnLight bg-playBtnLight cursor-not-allowed text-black"
            : "cursor-not-allowed"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import AdressBar from "./addressBar/AdressBar";
import FunctionsBox from "./FunctionsBox/FunctionsBox";

const Operations = () => {
  return (
    <div className="py-[5px] px-[10px] flex items-center justify-center gap-[10px]">
      <AdressBar />
      <div className="h-[20px] w-[0.5px] bg-gray-400"></div>
      <FunctionsBox />
    </div>
  );
};

export default Operations;

import React from "react";

export const ResizeBar = ({ label }) => {
  return (
    <div
      className="flex items-center justify-center gap-[8px]"
      style={{
        rotate: label === "row" ? "90deg" : "",
      }}
    >
      <div className="w-[4px] h-[20px] bg-gray-700 rounded-xl"></div>
      <div className="w-[4px] h-[20px] bg-gray-700 rounded-xl"></div>
    </div>
  );
};

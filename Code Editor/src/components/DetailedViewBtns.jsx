import React from "react";

const DetailedViewBtns = ({ layout, setCodeSpaceSize }) => {
  return (
    <div className="fixed top-[80px] left-[20px] flex gap-1 text-white">
      <button
        className="px-3 py-1 bg-gray-700 active:bg-gray-400"
        onClick={() => setCodeSpaceSize(50)}
      >
        Code
      </button>
      <button className="px-3 py-1 bg-gray-700 active:bg-gray-400">
        Result
      </button>
    </div>
  );
};

export default DetailedViewBtns;

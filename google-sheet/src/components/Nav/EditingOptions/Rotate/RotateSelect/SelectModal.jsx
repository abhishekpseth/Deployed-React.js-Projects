import React from "react";

const SelectModal = ({ setSelectValue }) => {
  const rotationArray = [
    "-90°",
    "-75°",
    "-60°",
    "-45°",
    "-30°",
    "-15°",
    "0°",
    "15°",
    "30°",
    "45°",
    "60°",
    "75°",
    "90°",
  ];

  return (
    <div className="absolute z-50 top-[100%] w-[60px] py-[5px] bg-white text-[12px] flex flex-col shadow-2xl border border-white px-0 rounded-md">
      {rotationArray.map((rotation) => (
        <div
          key={rotation}
          onClick={() => setSelectValue(rotation)}
          className="w-full grid place-content-center cursor-pointer hover:bg-blue-100 h-[28px]"
        >
          {rotation}
        </div>
      ))}
    </div>
  );
};

export default SelectModal;

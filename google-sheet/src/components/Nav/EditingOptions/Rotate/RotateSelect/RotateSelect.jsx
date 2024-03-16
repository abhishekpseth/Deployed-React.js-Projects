import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import SelectModal from "./SelectModal";

const RotateSelect = ({ selectDirection }) => {
  const [selectValue, setSelectValue] = useState("0°");
  const [isSelectFocussed, setSelectFocussed] = useState(false);
  const inputRef = useRef();

  const isValidInput = (direction) => {
    const number = parseInt(direction.slice("°")[0]);
    const symbol = direction.slice("°")[1];
    return symbol === "°" && number >= -360 && number <= 360;
  };

  useEffect(() => {
    if (isValidInput(selectValue)) {
      const direction = selectValue.replace("°", "deg");
      selectDirection(direction);
    }
  }, [selectValue]);

  return (
    <div
      onMouseLeave={() => {
        setSelectFocussed(false);
        inputRef.current.blur();
      }}
      onClick={() => setSelectFocussed(!isSelectFocussed)}
      className="relative h-[25px] flex items-center bg-white hover:bg-gray-300"
      style={{ backgroundColor: isSelectFocussed ? "#d1d5db" : "" }}
    >
      <input
        ref={inputRef}
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        onClick={() => setSelectFocussed(true)}
        className="text-center text-[12px] border-none focus:outline-4 focus:outline-blue-700 w-[40px] h-[20px] bg-transparent focus:bg-white"
      />
      <IoMdArrowDropdown className="cursor-pointer" />
      {isSelectFocussed && <SelectModal setSelectValue={setSelectValue} />}
    </div>
  );
};

export default RotateSelect;

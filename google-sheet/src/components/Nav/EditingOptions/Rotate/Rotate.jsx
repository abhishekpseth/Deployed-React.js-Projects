import React, { useState } from "react";
import { MdOutlineTextRotationNone } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import RotateModal from "./RotateModal";

const Rotate = () => {
  const [isRotateModalOpen, setRotateModalOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setRotateModalOpen(!isRotateModalOpen)}
        className="h-[28px] px-[5px] flex items-center justify-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300"
        style={{
          backgroundColor: isRotateModalOpen ? "#badfea" : "",
        }}
      >
        <MdOutlineTextRotationNone />
        <IoMdArrowDropdown />
      </button>

      {isRotateModalOpen && (
        <RotateModal onClick={() => setRotateModalOpen(false)} />
      )}
    </div>
  );
};

export default Rotate;

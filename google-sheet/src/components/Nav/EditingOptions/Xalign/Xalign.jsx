import React, { useState } from "react";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignCenter } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import XalignModalOptions from "./XalignModalOptions";
import useSheetStore from "../../../../SheetStore";

const Xalign = () => {
  const grid = useSheetStore((state) => state.grid);
  const selectedCell = useSheetStore((state) => state.selectedCell);

  const [isAlignOptionModalOpen, setAlignOptionsModalOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setAlignOptionsModalOpen(!isAlignOptionModalOpen)}
        className="h-[28px] px-[5px] flex items-center justify-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300"
        style={{
          backgroundColor: isAlignOptionModalOpen ? "#badfea" : "",
        }}
      >
        {grid[selectedCell.row]?.[selectedCell.col]?.xAlign === "start" ? (
          <MdFormatAlignLeft />
        ) : grid[selectedCell.row]?.[selectedCell.col]?.xAlign === "center" ? (
          <MdFormatAlignCenter />
        ) : (
          <MdFormatAlignRight />
        )}

        <IoMdArrowDropdown />
      </button>
      {isAlignOptionModalOpen && (
        <XalignModalOptions onClick={() => setAlignOptionsModalOpen(false)} />
      )}
    </div>
  );
};

export default Xalign;

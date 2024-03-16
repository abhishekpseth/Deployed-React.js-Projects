import React, { useState } from "react";
import { MdOutlineVerticalAlignTop } from "react-icons/md";
import { MdOutlineVerticalAlignCenter } from "react-icons/md";
import { MdOutlineVerticalAlignBottom } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import useSheetStore from "../../../../SheetStore";
import YalignModalOptions from "./YalignModalOptions";

const Yalign = () => {
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
        {grid[selectedCell.row]?.[selectedCell.col]?.yAlign === "start" ? (
          <MdOutlineVerticalAlignTop />
        ) : grid[selectedCell.row]?.[selectedCell.col]?.yAlign === "center" ? (
          <MdOutlineVerticalAlignCenter />
        ) : (
          <MdOutlineVerticalAlignBottom />
        )}

        <IoMdArrowDropdown />
      </button>
      {isAlignOptionModalOpen && (
        <YalignModalOptions onClick={() => setAlignOptionsModalOpen(false)} />
        // <XalignModalOptions onClick={() => setAlignOptionsModalOpen(false)} />
      )}
    </div>
  );
};

export default Yalign;

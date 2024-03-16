import React, { useState } from "react";
import ColorModal from "../ColorModal";
import { BiSolidColorFill } from "react-icons/bi";
import useSheetStore from "../../../../../SheetStore";

const CellColor = () => {
  const grid = useSheetStore((state) => state.grid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const cellColor =
    grid[selectedCell.row]?.[selectedCell.col]?.cellColor || "#000000";

  const [isColorModalShown, setColorModalShown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setColorModalShown(!isColorModalShown)}
        className="h-[28px] w-[32px] rounded-md flex flex-col items-center justify-center text-[#1f1f1f] hover:bg-gray-300"
        style={{ backgroundColor: isColorModalShown ? "#badfea" : "" }}
      >
        <BiSolidColorFill className="h-[20px]" />
        <div
          className="h-[4px] w-[24px]"
          style={{
            backgroundColor: cellColor === "transparent" ? "white" : cellColor,
          }}
        ></div>
      </button>
      {isColorModalShown && (
        <ColorModal src="cell" onClick={() => setColorModalShown(false)} />
      )}
    </div>
  );
};

export default CellColor;

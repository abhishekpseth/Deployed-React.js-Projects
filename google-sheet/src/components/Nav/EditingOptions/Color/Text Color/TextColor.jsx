import React, { useState } from "react";
import ColorModal from "../ColorModal";
import useSheetStore from "../../../../../SheetStore";

const TextColor = () => {
  const grid = useSheetStore((state) => state.grid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const textColor =
    grid[selectedCell.row]?.[selectedCell.col]?.textColor || "#000000";

  const [isColorModalShown, setColorModalShown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setColorModalShown(!isColorModalShown)}
        className="h-[28px] w-[32px] rounded-md flex flex-col items-center justify-center text-[#1f1f1f] hover:bg-gray-300"
        style={{ backgroundColor: isColorModalShown ? "#badfea" : "" }}
      >
        <p className="text-[14px] font-bold">A</p>
        <div
          className="h-[4px] w-[24px]"
          style={{ backgroundColor: textColor }}
        ></div>
      </button>
      {isColorModalShown && (
        <ColorModal src="text" onClick={() => setColorModalShown(false)} />
      )}
    </div>
  );
};

export default TextColor;

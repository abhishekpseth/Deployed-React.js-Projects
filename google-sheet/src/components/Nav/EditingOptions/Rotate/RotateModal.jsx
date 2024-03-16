import React, { useEffect, useState } from "react";
import useSheetStore from "../../../../SheetStore";
import ClickAwayListener from "react-click-away-listener";
import { MdOutlineTextRotationNone } from "react-icons/md";
import RotateSelect from "./RotateSelect/RotateSelect";

const RotateModal = ({ onClick }) => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const range = useSheetStore((state) => state.range);

  const [rangeMaxMinValues, setRangeMaxMinValues] = useState({
    minRow: -1,
    maxRow: -1,
    minCol: -1,
    maxCol: -1,
  });

  useEffect(() => {
    setRangeMaxMinValues({
      minRow: Math.min(range.rowStart, range.rowEnd),
      maxRow: Math.max(range.rowStart, range.rowEnd),
      minCol: Math.min(range.colStart, range.colEnd),
      maxCol: Math.max(range.colStart, range.colEnd),
    });
  }, [range]);

  const isCellInsideRange = (row, col) => {
    const minRow = rangeMaxMinValues.minRow;
    const maxRow = rangeMaxMinValues.maxRow;
    const minCol = rangeMaxMinValues.minCol;
    const maxCol = rangeMaxMinValues.maxCol;
    if (range.rowStart !== -1 && range.colStart !== -1) {
      if (range.rowStart != range.rowEnd || range.colStart != range.colEnd) {
        if (row >= minRow && row <= maxRow && col >= minCol && col <= maxCol) {
          return true;
        }
      }
    }
    return false;
  };

  const handleClick = (rotation) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (
          range.rowStart === range.rowEnd &&
          range.colStart === range.colEnd
        ) {
          return rIndex === selectedCell.row && cIndex === selectedCell.col
            ? { ...cell, rotate: rotation }
            : cell;
        } else {
          return isCellInsideRange(rIndex, cIndex)
            ? {
                ...cell,
                rotate: rotation,
              }
            : cell;
        }
      })
    );
    setGrid(newGrid);
  };

  const rotationIconsArray = ["0deg", "-45deg", "45deg", "-90deg", "90deg"];

  return (
    <ClickAwayListener onClickAway={onClick}>
      <div
        className="absolute top-[100%] z-50 bg-white p-[5px] flex gap-[10px] text-[20px] items-center justify-center rounded-sm"
        style={{
          backgroundColor: "#edf2fa",
          boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.1)",
        }}
      >
        {rotationIconsArray.map((direction) => (
          <div
            key={direction}
            onClick={() => handleClick(direction)}
            className="hover:bg-gray-300 p-[5px]"
            style={{
              borderRadius: "2px",
              backgroundColor:
                grid[selectedCell.row]?.[selectedCell.col]?.rotate === direction
                  ? "#badfea"
                  : "",
            }}
          >
            <MdOutlineTextRotationNone
              style={{ transform: `rotate(${direction})` }}
            />
          </div>
        ))}
        <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
        <RotateSelect selectDirection={handleClick} />
      </div>
    </ClickAwayListener>
  );
};

export default RotateModal;

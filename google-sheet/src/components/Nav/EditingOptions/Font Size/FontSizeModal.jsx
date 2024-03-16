import React, { useEffect, useState } from "react";
import useSheetStore from "../../../../SheetStore";
import ClickAwayListener from "react-click-away-listener";

const FontSizeModal = () => {
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

  const sizeArray = ["10", "11", "12", "13", "14", "18", "24", "36"];

  const handleClick = (size, e) => {
    e.stopPropagation();
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (
          range.rowStart === range.rowEnd &&
          range.colStart === range.colEnd
        ) {
          return rIndex === selectedCell.row && cIndex === selectedCell.col
            ? { ...cell, fontSize: parseInt(size) }
            : cell;
        } else {
          return isCellInsideRange(rIndex, cIndex)
            ? { ...cell, fontSize: parseInt(size) }
            : cell;
        }
      })
    );
    setGrid(newGrid);
  };

  return (
    <div
      className="absolute z-50 top-[100%] w-[60px] py-[5px] bg-white text-[12px] flex flex-col shadow-2xl border border-white px-0 rounded-md"
      //   style={{ zIndex: 100 }}
    >
      {sizeArray.map((size) => (
        <div
          key={size}
          onClick={(e) => {
            e.preventDefault();
            handleClick(size, e);
          }}
          className="w-full grid place-content-center cursor-pointer hover:bg-blue-100 h-[28px]"
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default FontSizeModal;

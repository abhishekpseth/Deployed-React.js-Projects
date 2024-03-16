import React, { useEffect, useState } from "react";
import useSheetStore from "../../../../SheetStore";
import { MdOutlineFormatItalic } from "react-icons/md";

const Italic = () => {
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

  const handleClick = () => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (
          range.rowStart === range.rowEnd &&
          range.colStart === range.colEnd
        ) {
          return rIndex === selectedCell.row && cIndex === selectedCell.col
            ? { ...cell, isItalic: !cell?.isItalic }
            : cell;
        } else {
          return isCellInsideRange(rIndex, cIndex)
            ? {
                ...cell,
                isItalic: !grid[selectedCell.row][selectedCell.col]?.isItalic,
              }
            : cell;
        }
      })
    );
    setGrid(newGrid);
  };

  return (
    <button
      className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]"
      style={{
        backgroundColor: grid[selectedCell.row]?.[selectedCell.col]?.isItalic
          ? "#badfea"
          : "",
      }}
      onClick={handleClick}
    >
      <MdOutlineFormatItalic />
    </button>
  );
};

export default Italic;

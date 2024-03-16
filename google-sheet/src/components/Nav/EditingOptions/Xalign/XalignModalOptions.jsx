import React, { useEffect, useState } from "react";
import useSheetStore from "../../../../SheetStore";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignCenter } from "react-icons/md";
import ClickAwayListener from "react-click-away-listener";

const XalignModalOptions = ({ onClick }) => {
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

  const handleClick = (alignment) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (
          range.rowStart === range.rowEnd &&
          range.colStart === range.colEnd
        ) {
          return rIndex === selectedCell.row && cIndex === selectedCell.col
            ? { ...cell, xAlign: alignment }
            : cell;
        } else {
          return isCellInsideRange(rIndex, cIndex)
            ? {
                ...cell,
                xAlign: alignment,
              }
            : cell;
        }
      })
    );
    setGrid(newGrid);
  };

  return (
    <ClickAwayListener onClickAway={onClick}>
      <div
        className="absolute top-[100%] z-10 bg-white p-[5px] flex gap-[10px] text-[20px] items-center justify-center rounded-sm"
        style={{
          backgroundColor: "#edf2fa",
          boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          onClick={() => handleClick("start")}
          className="hover:bg-gray-300 p-[5px]"
          style={{
            backgroundColor:
              grid[selectedCell.row]?.[selectedCell.col]?.xAlign === "start"
                ? "#badfea"
                : "",
          }}
        >
          <MdFormatAlignLeft />
        </div>
        <div
          onClick={() => handleClick("center")}
          className="hover:bg-gray-300 p-[5px]"
          style={{
            backgroundColor:
              grid[selectedCell.row]?.[selectedCell.col]?.xAlign === "center"
                ? "#badfea"
                : "",
          }}
        >
          <MdFormatAlignCenter />
        </div>
        <div
          onClick={() => handleClick("end")}
          className="hover:bg-gray-300 p-[5px]"
          style={{
            backgroundColor:
              grid[selectedCell.row]?.[selectedCell.col]?.xAlign === "end"
                ? "#badfea"
                : "",
          }}
        >
          <MdFormatAlignRight />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default XalignModalOptions;

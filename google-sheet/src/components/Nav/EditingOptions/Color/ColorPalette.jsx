import React, { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import useSheetStore from "../../../../SheetStore";

const ColorPalette = ({ src, colorArray, palette, onClick }) => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const range = useSheetStore((state) => state.range);
  const setCustomColorPickerShown = useSheetStore(
    (state) => state.setCustomColorPickerShown
  );

  const storedColor =
    src === "text"
      ? grid[selectedCell.row]?.[selectedCell.col]?.textColor || "#000000"
      : grid[selectedCell.row]?.[selectedCell.col]?.cellColor || "#000000";
  const colorPalette =
    src === "text"
      ? grid[selectedCell.row]?.[selectedCell.col]?.textColorPalette || "all"
      : grid[selectedCell.row]?.[selectedCell.col]?.cellColorPalette || "all";

      
  // useEffect(() => {
  //   console.log(storedColor);
  // }, [storedColor]);

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

  const handleClick = (color, palette) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (src === "text") {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, textColor: color, textColorPalette: palette }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? {
                  ...cell,
                  textColor: color,
                  textColorPalette: palette,
                }
              : cell;
          }
        } else {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, cellColor: color, cellColorPalette: palette }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? {
                  ...cell,
                  cellColor: color,
                  cellColorPalette: palette,
                }
              : cell;
          }
        }
      })
    );
    setGrid(newGrid);
  };

  const getLuminance = (color) => {
    // Convert hex to RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  };

  return (
    <div className="grid items-center grid-cols-10 gap-1">
      {colorArray.map((color, index) => (
        <div
          key={index}
          className={
            "h-[20px] w-[20px] rounded-full border cursor-pointer hover:scale-110 hover:drop-shadow-2xl"
          }
          style={{
            backgroundColor: color,
            border: color === "#ffffff" ? "1px solid #d1d5db" : "none",
          }}
          onClick={() => {
            handleClick(color, palette);
          }}
        >
          {storedColor === color && colorPalette === palette ? (
            <div
              className="grid w-full h-full text-white rounded-full place-content-center"
              style={{
                color: getLuminance(color) > 0.8 ? "black" : "white",
              }}
            >
              <MdCheck />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      {palette === "custom" && (
        <div
          className="cursor-pointer hover:bg-blue-50 h-[23px] w-[23px] grid place-content-center"
          onClick={() => {
            onClick();
            setCustomColorPickerShown(src);
          }}
        >
          <BsPlusCircle />
        </div>
      )}
    </div>
  );
};

export default ColorPalette;

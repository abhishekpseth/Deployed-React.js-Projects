import React, { useEffect, useState } from "react";
import { MdFormatColorReset } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import ClickAwayListener from "react-click-away-listener";
import ColorPalette from "./ColorPalette";
import useSheetStore from "../../../../SheetStore";

const ColorModal = ({ src, onClick }) => {
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
        if (src === "text") {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, textColor: "black", textColorPalette: "all" }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? {
                  ...cell,
                  textColor: "black",
                  textColorPalette: "all",
                }
              : cell;
          }
        } else {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, cellColor: "black", cellColorPalette: "all" }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? {
                  ...cell,
                  cellColor: "black",
                  cellColorPalette: "all",
                }
              : cell;
          }
        }
      })
    );
    setGrid(newGrid);
  };

  const allColors = [
    // Grayscale
    "#000000", // black
    "#434343", // dark gray 4
    "#666666", // dark gray 3
    "#999999", // dark gray 2
    "#b7b7b7", // dark gray 1
    "#cccccc", // gray
    "#d9d9d9", // light gray 1
    "#efefef", // light gray 2
    "#f3f3f3", // light gray 3
    "#ffffff", // white

    // Colors
    "#980000", // red berry
    "#ff0000", // red
    "#ff9900", // orange
    "#ffff00", // yellow
    "#00ff00", // green
    "#00ffff", // cyan
    "#4a86e8", // cornflower blue
    "#0000ff", // blue
    "#9900ff", // purple
    "#ff00ff", // magenta

    // Light colors
    "#e6b8af", // light red berry 3
    "#f4cccc", // light red 3
    "#fce5cd", // light orange 3
    "#fff2cc", // light yellow 3
    "#d9ead3", // light green 3
    "#d0e0e3", // light cyan 3
    "#c9daf8", // light cornflower blue 3
    "#cfe2f3", // light blue 3
    "#d9d2e9", // light purple 3
    "#ead1dc", // light magenta 3

    "#dd7e6b", // light red berry 2
    "#ea9999", // light red 2
    "#f9cb9c", // light orange 2
    "#ffe599", // light yellow 2
    "#b6d7a8", // light green 2
    "#a2c4c9", // light cyan 2
    "#a4c2f4", // light cornflower blue 2
    "#9fc5e8", // light blue 2
    "#b4a7d6", // light purple 2
    "#d5a6bd", // light magenta 2

    "#cc4125", // light red berry 1
    "#e06666", // light red 1
    "#f6b26b", // light orange 1
    "#ffd966", // light yellow 1
    "#93c47d", // light green 1
    "#76a5af", // light cyan 1
    "#6d9eeb", // light cornflower blue 1
    "#6fa8dc", // light blue 1
    "#8e7cc3", // light purple 1
    "#c27ba0", // light magenta 1

    // Dark colors
    "#a61c00", // dark red berry 1
    "#cc0000", // dark red 1
    "#e69138", // dark orange 1
    "#f1c232", // dark yellow 1
    "#6aa84f", // dark green 1
    "#45818e", // dark cyan 1
    "#3c78d8", // dark cornflower blue 1
    "#3d85c6", // dark blue 1
    "#674ea7", // dark purple 1
    "#a64d79", // dark magenta 1

    "#85200c", // dark red berry 2
    "#990000", // dark red 2
    "#b45f06", // dark orange 2
    "#bf9000", // dark yellow 2
    "#38761d", // dark green 2
    "#134f5c", // dark cyan 2
    "#1155cc", // dark cornflower blue 2
    "#0b5394", // dark blue 2
    "#351c75", // dark purple 2
    "#741b47", // dark magenta 2

    "#5b0f00", // dark red berry 3
    "#660000", // dark red 3
    "#783f04", // dark orange 3
    "#7f6000", // dark yellow 3
    "#274e13", // dark green 3
    "#0c343d", // dark cyan 3
    "#1c4587", // dark cornflower blue 3
    "#073763", // dark blue 3
    "#20124d", // dark purple 3
    "#4c1130", // dark magenta 3
  ];

  const standardColors = [
    "#000000",
    "#ffffff",
    "#4285f4",
    "#ea4335",
    "#fbbc04",
    "#34a853",
    "#ff6d01",
    "#46bdc6",
  ];

  const customColors = useSheetStore((state) => state.customColors);

  // useEffect(() => {
  //   console.log(customColors);
  // }, [customColors]);
  
  return (
    <ClickAwayListener onClickAway={onClick}>
      <div className="w-[250px] h-[420px] bg-white shadow-lg z-50 absolute top-[100%] p-[15px] rounded-md cursor-pointer">
        {/* Reset */}
        <div
          className="flex items-center gap-3 h-[30px] mb-[10px] select-none hover:bg-blue-50"
          onClick={handleClick}
        >
          <div className="text-[22px] text-gray-700">
            <MdFormatColorReset />
          </div>
          <div className="text-[16px]">Reset</div>
        </div>

        {/* All colors*/}
        <ColorPalette
          src={src}
          colorArray={allColors}
          palette="all"
          onClick={onClick}
        />

        {/* Standard palette */}
        <div className="flex items-center gap-2 px-[3px] h-[20px] text-[11px] text-gray-600 font-semibold mt-2">
          <div className="select-none">STANDARD</div>
          <div className="hover:bg-blue-50 h-[20px] w-[20px] grid place-content-center">
            <FaPen />
          </div>
        </div>
        <ColorPalette
          src={src}
          colorArray={standardColors}
          palette="standard"
          onClick={onClick}
        />

        {/* separator */}
        <div className="w-full h-[0.5px] bg-gray-300 my-[8px]"></div>

        {/* custom palette */}
        <div className="w-full h-[30px] my-[5px] px-[3px] text-[12px] text-gray-600 font-semibold flex items-center select-none hover:bg-blue-50">
          CUSTOM
        </div>

        <ColorPalette
          src={src}
          colorArray={customColors}
          palette="custom"
          onClick={onClick}
        />

        {/* separator */}
        <div className="w-full h-[0.5px] bg-gray-300 my-[12px]"></div>

        {/* conditional formatting */}
        <div className="flex justify-center">Conditional Formatting</div>
      </div>
    </ClickAwayListener>
  );
};

export default ColorModal;

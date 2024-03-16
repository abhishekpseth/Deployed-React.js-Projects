import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import useSheetStore from "../../../../SheetStore";
import FontSizeModal from "./FontSizeModal";
import ClickAwayListener from "react-click-away-listener";

const FontSize = () => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const range = useSheetStore((state) => state.range);

  const [fontSize, setFontSize] = useState(
    parseInt(grid[selectedCell.row]?.[selectedCell.col]?.fontSize) || 18
  );

  useEffect(() => {
    const storedSize = parseInt(
      grid[selectedCell.row]?.[selectedCell.col]?.fontSize || 18
    );

    if (storedSize != fontSize) {
      setFontSize(storedSize);
    }
  }, [grid, selectedCell]);

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

  const handleDecreaseFontSize = () => {
    if (fontSize > 10) {
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, fontSize: (parseInt(cell.fontSize) || 18) - 1 }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? { ...cell, fontSize: (parseInt(cell.fontSize) || 18) - 1 }
              : cell;
          }
        })
      );
      setGrid(newGrid);
    }
  };

  const handleIncreaseFontSize = () => {
    if (fontSize < 40) {
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (
            range.rowStart === range.rowEnd &&
            range.colStart === range.colEnd
          ) {
            return rIndex === selectedCell.row && cIndex === selectedCell.col
              ? { ...cell, fontSize: (parseInt(cell.fontSize) || 18) + 1 }
              : cell;
          } else {
            return isCellInsideRange(rIndex, cIndex)
              ? { ...cell, fontSize: (parseInt(cell.fontSize) || 18) + 1 }
              : cell;
          }
        })
      );
      setGrid(newGrid);
    }
  };

  const [isInputFocussed, setInputFocussed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isInputFocussed && event.key === "Enter") {
        const parsedFontSize = parseInt(event.target.value);
        if (parsedFontSize >= 10 && parsedFontSize <= 40) {
          const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) => {
              if (
                range.rowStart === range.rowEnd &&
                range.colStart === range.colEnd
              ) {
                return rIndex === selectedCell.row &&
                  cIndex === selectedCell.col
                  ? { ...cell, fontSize: parsedFontSize }
                  : cell;
              } else {
                return isCellInsideRange(rIndex, cIndex)
                  ? { ...cell, fontSize: parsedFontSize }
                  : cell;
              }
            })
          );
          setGrid(newGrid);
        } else {
          const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) => {
              if (
                range.rowStart === range.rowEnd &&
                range.colStart === range.colEnd
              ) {
                return rIndex === selectedCell.row &&
                  cIndex === selectedCell.col
                  ? { ...cell, fontSize: 18 }
                  : cell;
              } else {
                return isCellInsideRange(rIndex, cIndex)
                  ? { ...cell, fontSize: 18 }
                  : cell;
              }
            })
          );
          setGrid(newGrid);
          setFontSize(18);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInputFocussed, setGrid]);

  const [showSelectModal, setShowSelectModal] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowSelectModal(false)}>
      <div className="flex items-center justify-center gap-[4px] relative">
        <button
          className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]"
          onClick={handleDecreaseFontSize}
        >
          <TiMinus />
        </button>
        <input
          value={fontSize}
          onChange={(e) => {
            const editedValue = e.target.value;
            setFontSize(editedValue);
          }}
          onFocus={() => {
            setInputFocussed(true);
            setShowSelectModal(true);
          }}
          onBlur={() => setInputFocussed(false)}
          className="h-[28px] w-[36px] text-center outline-blue-800 rounded-md grid place-content-center text-[#1f1f1f] text-[18px]"
          style={{ border: "1px solid #1f1f1f" }}
        />
        <button
          className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]"
          onClick={handleIncreaseFontSize}
        >
          <FaPlus />
        </button>

        {showSelectModal && <FontSizeModal />}
      </div>
    </ClickAwayListener>
  );
};

export default FontSize;

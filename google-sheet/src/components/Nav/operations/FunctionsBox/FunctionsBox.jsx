import React, { useEffect, useState } from "react";
import { TbMathFunction } from "react-icons/tb";
import useSheetStore from "../../../../SheetStore";

const FunctionsBox = () => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);
  const selectedCell = useSheetStore((state) => state.selectedCell);

  const getText = () => {
    if (selectedCell && selectedCell.row >= 0 && selectedCell.col >= 0) {
      return grid[selectedCell.row][selectedCell.col]?.value || "";
    }
    return ""; // Return default value if selectedCell is not defined or has invalid indices
  };

  const [text, setText] = useState("");

  useEffect(() => {
    setText(getText());
  }, [selectedCell, grid]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    const newGrid = [...grid];
    newGrid[selectedCell.row][selectedCell.col] = {
      value: e.target.value,
    };
    setGrid(newGrid);
  };

  return (
    <div className="flex items-center justify-center gap-[10px] w-[90%]">
      <TbMathFunction />
      <textarea
        value={text}
        onChange={handleChange}
        className="flex-1 h-[25px] overflow-x-hidden overflow-y-auto outline-none border-none"
        resize="none"
      ></textarea>
    </div>
  );
};

export default FunctionsBox;

import React from "react";
import useSheetStore from "../../../../SheetStore";

const Undo = () => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);

  return <div>Undo</div>;
};

export default Undo;

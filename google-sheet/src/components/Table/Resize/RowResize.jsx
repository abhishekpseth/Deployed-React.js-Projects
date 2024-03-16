import React, { useEffect, useMemo, useRef, useState } from "react";
import { ResizeBar } from "./ResizeBar";

const RowResize = ({
  rowIndex,
  hoveringRow,
  setHoveringRow,
  selectedRow,
  rowProperty,
  setSelectedRow,
  setRowProperty,
}) => {
  const isRowResized = useRef(false);
  const [rowResizeBarPosition, setRowResizeBarPosition] = useState(0);
  const [minHeight, maxHeight] = [20, 400];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isRowResized.current) {
        return;
      }

      let maxi =
        selectedRow === -1
          ? maxHeight
          : maxHeight - parseInt(rowProperty[selectedRow].height);

      let mini =
        selectedRow === -1
          ? minHeight
          : minHeight - parseInt(rowProperty[selectedRow].height);

      const newPosition = rowResizeBarPosition + e.movementY;
      const clampedPosition = Math.min(Math.max(newPosition, mini), maxi);
      setRowResizeBarPosition(clampedPosition);
    };

    const updateRowProperties = () => {
      setRowProperty((prevRowProperties) => {
        const updatedRowProperties = prevRowProperties.map((row, index) => {
          if (index === selectedRow && selectedRow >= 0) {
            const newHeight = rowResizeBarPosition + parseInt(row.height);
            return {
              ...row,
              height: `${newHeight}px`,
            };
          }
          return row;
        });
        return updatedRowProperties;
      });
    };

    const handleMouseUp = (e) => {
      updateRowProperties(e);
      isRowResized.current = false;
      setHoveringRow(-1);
      setSelectedRow(-1);
      setRowResizeBarPosition(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rowResizeBarPosition, setRowProperty, setRowResizeBarPosition]);

  return (
    <>
      <div
        className="absolute left-2 h-[30px] w-[30px] cursor-row-resize grid place-content-center"
        style={{ bottom: -6 - rowResizeBarPosition }}
        onMouseDown={() => {
          isRowResized.current = true;
          setHoveringRow(hoveringRow);
          setSelectedRow(hoveringRow);
        }}
      >
        <ResizeBar label="row" />
      </div>
      {selectedRow === hoveringRow ? (
        <div
          className="absolute left-0 w-[100vw] h-[8px] bg-gray-400 cursor-row-resize"
          style={{ bottom: 5 - rowResizeBarPosition }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default RowResize;

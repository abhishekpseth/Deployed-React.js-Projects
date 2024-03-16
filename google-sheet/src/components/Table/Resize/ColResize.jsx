import React, { useEffect, useMemo, useRef, useState } from "react";
import { ResizeBar } from "./ResizeBar";

const ColResize = ({
  colIndex,
  hoveringCol,
  setHoveringCol,
  selectedCol,
  colProperty,
  setSelectedCol,
  setColProperty,
}) => {
  const isColResized = useRef(false);
  const [colResizeBarPosition, setColResizeBarPosition] = useState(0);
  const [minWidth, maxWidth] = [50, 1000];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isColResized.current) {
        return;
      }

      let maxi =
        selectedCol === -1
          ? maxWidth
          : maxWidth - parseInt(colProperty[selectedCol].width);

      let mini =
        selectedCol === -1
          ? minWidth
          : minWidth - parseInt(colProperty[selectedCol].width);

      const newPosition = colResizeBarPosition + e.movementX;
      const clampedPosition = Math.min(Math.max(newPosition, mini), maxi);
      setColResizeBarPosition(clampedPosition);
    };

    const updateColProperties = () => {
      setColProperty((prevColProperties) => {
        const updatedColProperties = prevColProperties.map((col, index) => {
          if (index === selectedCol && selectedCol >= 0) {
            const newWidth = colResizeBarPosition + parseInt(col.width);
            return {
              ...col,
              width: `${newWidth}px`,
            };
          }
          return col;
        });
        return updatedColProperties;
      });
    };

    const handleMouseUp = (e) => {
      updateColProperties(e);
      isColResized.current = false;
      setHoveringCol(-1);
      setSelectedCol(-1);
      setColResizeBarPosition(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [colResizeBarPosition, setColProperty, setColResizeBarPosition]);

  return (
    <>
      <div
        className="absolute top-0 z-30 h-[30px] w-[30px] cursor-col-resize grid place-content-center"
        style={{ right: -colResizeBarPosition }}
        onMouseDown={() => {
          isColResized.current = true;
          setHoveringCol(hoveringCol);
          setSelectedCol(hoveringCol);
        }}
      >
        <ResizeBar />
      </div>
      {selectedCol === colIndex ? (
        <div
          className="absolute top-0 w-[8px] h-[75vh] bg-gray-400 z-50 cursor-col-resize"
          style={{ right: 11 - colResizeBarPosition }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default ColResize;

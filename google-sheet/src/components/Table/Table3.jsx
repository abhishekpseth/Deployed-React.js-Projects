import React, { useEffect, useRef, useState } from "react";
import { ResizeBar } from "./Resize/ResizeBar";
import ColResize from "./Resize/ColResize";
import RowResize from "./Resize/RowResize";
import useSheetStore from "../../SheetStore";
import Cell from "./Cell";
import { FixedSizeGrid } from "react-window";
import { FixedSizeList } from "react-window";

const Table3 = () => {
  // const addCourse = useSheetStore((state) => state.addCourse);
  // const [totalRows, setTotalRows] = useState(100);
  // const [totalCols, setTotalCols] = useState(26);

  const totalRows = useSheetStore((state) => state.totalRows);
  const totalCols = useSheetStore((state) => state.totalCols);

  // const [grid, setGrid] = useState(
  //   Array.from({ length: totalRows }, () =>
  //     Array(totalCols).fill({ value: "", fontSize: 40 })
  //   )
  // );

  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);

  const selectedCell = useSheetStore((state) => state.selectedCell);
  const setSelectedCell = useSheetStore((state) => state.setSelectedCell);

  const range = useSheetStore((state) => state.range);
  const setRange = useSheetStore((state) => state.setRange);

  // const [range, setRange] = useState({
  //   rowStart: -1,
  //   rowEnd: -1,
  //   colStart: -1,
  //   colEnd: -1,
  // });
  const [rangeMaxMinValues, setRangeMaxMinValues] = useState({
    minRow: -1,
    maxRow: -1,
    minCol: -1,
    maxCol: -1,
  });
  const [isMouseDownPressed, setMouseDownPressed] = useState(false);
  const [isRangeBorderColored, setRangeBorderColored] = useState(false);
  const [clickTime, setClickTime] = useState(0);

  // *****************For Activating Input**************
  useEffect(() => {
    if (clickTime === 2) {
      const input = document.getElementById("grid-input");
      if (input) {
        input.focus();
        input.style.outline = "3px solid #a8c7fa";
        input.style.outlineOffset = "3px";
      }
    }
  }, [clickTime]);

  const handleClick = (event) => {
    if (event.detail === 1) {
      setClickTime(2);
    } else if (event.detail === 2) {
      setClickTime(2);
    } else {
      setClickTime(2);
    }
  };

  // *****************For Range selection setting (mouse + keypad)**************

  const [isTableFocused, setTableFocused] = useState(false);
  useEffect(() => {
    setRangeMaxMinValues({
      minRow: Math.min(range.rowStart, range.rowEnd),
      maxRow: Math.max(range.rowStart, range.rowEnd),
      minCol: Math.min(range.colStart, range.colEnd),
      maxCol: Math.max(range.colStart, range.colEnd),
    });
  }, [range]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (selectedCell.row != -1 && selectedCell.col != -1 && isTableFocused) {
  //       event.preventDefault();
  //       if (
  //         event.shiftKey &&
  //         (event.key === "ArrowDown" ||
  //           event.key === "ArrowUp" ||
  //           event.key === "ArrowLeft" ||
  //           event.key === "ArrowRight")
  //       ) {
  //         if (
  //           event.shiftKey &&
  //           event.key === "ArrowDown" &&
  //           selectedCell.row < totalRows - 1
  //         ) {
  //           setRange((prevRange) => ({
  //             rowStart: selectedCell.row,
  //             rowEnd:
  //               prevRange.rowEnd === -1
  //                 ? selectedCell.row + 1
  //                 : prevRange.rowEnd + 1,
  //             colStart: selectedCell.col,
  //             colEnd:
  //               prevRange.colEnd === -1 ? selectedCell.col : prevRange.colEnd,
  //           }));
  //         } else if (
  //           event.shiftKey &&
  //           event.key === "ArrowUp" &&
  //           selectedCell.row > 0
  //         ) {
  //           setRange((prevRange) => ({
  //             rowStart: selectedCell.row,
  //             rowEnd:
  //               prevRange.rowEnd === -1
  //                 ? selectedCell.row - 1
  //                 : prevRange.rowEnd - 1,
  //             colStart: selectedCell.col,
  //             colEnd:
  //               prevRange.colEnd === -1 ? selectedCell.col : prevRange.colEnd,
  //           }));
  //         } else if (
  //           event.shiftKey &&
  //           event.key === "ArrowLeft" &&
  //           selectedCell.col > 0
  //         ) {
  //           setRange((prevRange) => ({
  //             rowStart: selectedCell.row,
  //             rowEnd:
  //               prevRange.rowEnd === -1 ? selectedCell.row : prevRange.rowEnd,
  //             colStart: selectedCell.col,
  //             colEnd:
  //               prevRange.colEnd === -1
  //                 ? selectedCell.col - 1
  //                 : prevRange.colEnd - 1,
  //           }));
  //         } else if (
  //           event.shiftKey &&
  //           event.key === "ArrowRight" &&
  //           selectedCell.col < totalCols - 1
  //         ) {
  //           setRange((prevRange) => ({
  //             rowStart: selectedCell.row,
  //             rowEnd:
  //               prevRange.rowEnd === -1 ? selectedCell.row : prevRange.rowEnd,
  //             colStart: selectedCell.col,
  //             colEnd:
  //               prevRange.colEnd === -1
  //                 ? selectedCell.col + 1
  //                 : prevRange.colEnd + 1,
  //           }));
  //         }
  //         setRangeBorderColored(true);
  //       } else {
  //         if (event.key === "ArrowDown" && selectedCell.row < totalRows - 1) {
  //           setSelectedCell({
  //             row: selectedCell.row + 1,
  //             col: selectedCell.col,
  //           });
  //         } else if (event.key === "ArrowUp" && selectedCell.row > 0) {
  //           setSelectedCell({
  //             row: selectedCell.row - 1,
  //             col: selectedCell.col,
  //           });
  //         } else if (event.key === "ArrowLeft" && selectedCell.col > 0) {
  //           setSelectedCell({
  //             row: selectedCell.row,
  //             col: selectedCell.col - 1,
  //           });
  //         } else if (
  //           event.key === "ArrowRight" &&
  //           selectedCell.col < totalCols - 1
  //         ) {
  //           setSelectedCell({
  //             row: selectedCell.row,
  //             col: selectedCell.col + 1,
  //           });
  //         }
  //         setRangeBorderColored(false);
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   // Clean up the event listener when the component unmounts or when selectedCell changes
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedCell.row, selectedCell.col, isTableFocused]);

  const onMouseDownHandler = (row, col) => {
    setMouseDownPressed(true);
    setSelectedCell({ row: row, col: col });
    setRange({ rowStart: -1, rowEnd: -1, colStart: -1, colEnd: -1 });
    setRangeBorderColored(false);
  };

  const onMouseEnterHandler = (row, col) => {
    if (isMouseDownPressed) {
      setRange({
        rowStart: selectedCell.row,
        rowEnd: row,
        colStart: selectedCell.col,
        colEnd: col,
      });
    }
  };

  const onMouseUpHandler = (row, col) => {
    setMouseDownPressed(false);
    setRangeBorderColored(true);
  };

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

  const colorRangeBorder = (row, col) => {
    if (!isRangeBorderColored) {
      return [
        colorOtherBorders(row, col),
        colorOtherBorders(row, col),
        colorOtherBorders(row, col),
        colorOtherBorders(row, col),
      ];
    }

    const minRow = rangeMaxMinValues.minRow;
    const maxRow = rangeMaxMinValues.maxRow;
    const minCol = rangeMaxMinValues.minCol;
    const maxCol = rangeMaxMinValues.maxCol;

    if (row === range.rowStart && col === range.colStart) {
      // range hoga to usme starting cell ka border color
      return [
        "2px solid blue",
        "2px solid blue",
        "2px solid blue",
        "2px solid blue",
      ];
    }

    if (minRow === maxRow && minCol === maxCol) {
      // when cell is clicked (range or not) it decides the border of cell
      if (row === selectedCell.row && col == selectedCell.col) {
        return [
          "2px solid blue",
          "2px solid blue",
          "2px solid blue",
          "2px solid blue",
        ];
      }
    } else if (minRow === maxRow) {
      // same row
      if (row === minRow && col === minCol) {
        return [
          "2px solid blue",
          "1px solid #817a7a83",
          "2px solid blue",
          "2px solid blue",
        ];
      } else if (row === minRow && col === maxCol) {
        return [
          "2px solid blue",
          "2px solid blue",
          "2px solid blue",
          "1px solid #817a7a83",
        ];
      } else if (row === minRow && col > minCol && col < maxCol) {
        return [
          "2px solid blue",
          "1px solid #817a7a83",
          "2px solid blue",
          "1px solid #817a7a83",
        ];
      }
    } else if (minCol === maxCol) {
      // same col
      if (col === minCol && row === minRow) {
        return [
          "2px solid blue",
          "2px solid blue",
          "1px solid #817a7a83",
          "2px solid blue",
        ];
      } else if (col === minCol && row === maxRow) {
        return [
          "1px solid #817a7a83",
          "2px solid blue",
          "2px solid blue",
          "2px solid blue",
        ];
      } else if (col === minCol && row > minRow && row < maxRow) {
        return [
          "1px solid #817a7a83",
          "2px solid blue",
          "1px solid #817a7a83",
          "2px solid blue",
        ];
      } else {
        return [
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
        ];
      }
    } else {
      if (row === minRow && col === minCol)
        // top-left
        return [
          "2px solid blue",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "2px solid blue",
        ];
      else if (row === maxRow && col === minCol)
        //bottom-left
        return [
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "2px solid blue",
          "2px solid blue",
        ];
      else if (row === minRow && col === maxCol)
        // top-right
        return [
          "2px solid blue",
          "2px solid blue",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
        ];
      else if (row === maxRow && col === maxCol)
        // bottom-right
        return [
          "1px solid #817a7a83",
          "2px solid blue",
          "2px solid blue",
          "1px solid #817a7a83",
        ];
      else if (row === minRow && col >= minCol && col <= maxCol)
        // top side
        return [
          "2px solid blue",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
        ];
      else if (row === maxRow && col >= minCol && col <= maxCol)
        // bottom side
        return [
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "2px solid blue",
          "1px solid #817a7a83",
        ];
      else if (col === minCol && row >= minRow && row <= maxRow)
        // left side
        return [
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "2px solid blue",
        ];
      else if (col === maxCol && row >= minRow && row <= maxRow)
        // right side
        return [
          "1px solid #817a7a83",
          "2px solid blue",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
        ];
      else {
        return [
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
          "1px solid #817a7a83",
        ];
      }
    }

    return [
      "1px solid #817a7a83",
      "1px solid #817a7a83",
      "1px solid #817a7a83",
      "1px solid #817a7a83",
    ];
  };

  const colorOtherBorders = (row, col) => {
    // this is for range when mouseEnter is active
    if (row == selectedCell.row && col == selectedCell.col) {
      return "2px solid rgba(0,0,255,0.8)";
    } else return "1px solid #817a7a83";
  };

  const colorOutline = (row, col) => {
    if (range.rowStart != -1 && range.colStart != -1) {
      if (row === range.rowStart && col === range.colStart) {
        return "2px solid #a8c7fa";
      }
    }
    return "";
  };

  const colorLabelCells = (cellIndex, type) => {
    const minRow = rangeMaxMinValues.minRow;
    const maxRow = rangeMaxMinValues.maxRow;
    const minCol = rangeMaxMinValues.minCol;
    const maxCol = rangeMaxMinValues.maxCol;

    if (type === "labelRow") {
      return selectedCell.col === cellIndex ||
        (cellIndex >= minCol && cellIndex <= maxCol)
        ? "skyblue"
        : "transparent";
    } else if (type === "labelCol") {
      return selectedCell.row === cellIndex ||
        (cellIndex >= minRow && cellIndex <= maxRow)
        ? "skyblue"
        : "transparent";
    }
  };

  // ***********changing Grid size*****************

  const [rowProperty, setRowProperty] = useState(
    Array(totalRows).fill({ height: "40px" })
  );

  const [colProperty, setColProperty] = useState(
    Array(totalCols).fill({ width: "200px" })
  );

  const [hoveringRow, setHoveringRow] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(-1);

  const [hoveringCol, setHoveringCol] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  return (
    <div className="flex">
      <FixedSizeGrid
        columnCount={100}
        rowCount={1000}
        rowHeight={30}
        columnWidth={70}
        height={574}
        width={1485}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCell({ row: rowIndex, col: columnIndex });
              handleClick(e);
            }}
            onMouseDown={() => onMouseDownHandler(rowIndex, colIndex)}
            onMouseUp={() => onMouseUpHandler(rowIndex, colIndex)}
            onMouseEnter={() => onMouseEnterHandler(rowIndex, colIndex)}
            className="text-center h-[30px] caret-transparent relative"
            style={{
              ...style,
              backgroundColor: grid[rowIndex][columnIndex]?.cellColor,
              opacity: isCellInsideRange(rowIndex, columnIndex) ? "0.9" : "1",
              borderTop: colorRangeBorder(rowIndex, columnIndex)[0],
              borderRight: colorRangeBorder(rowIndex, columnIndex)[1],
              borderBottom: colorRangeBorder(rowIndex, columnIndex)[2],
              borderLeft: colorRangeBorder(rowIndex, columnIndex)[3],
              outline: colorOutline(rowIndex, columnIndex),
            }}
          >
            <div
              className="flex w-full h-full"
              style={{
                // borderTop: colorRangeBorder(rowIndex, colIndex)[0],
                // borderRight: colorRangeBorder(rowIndex, colIndex)[1],
                // borderBottom: colorRangeBorder(rowIndex, colIndex)[2],
                // borderLeft: colorRangeBorder(rowIndex, colIndex)[3],
                fontSize: grid[rowIndex][columnIndex]?.fontSize || "inherit",
                fontWeight: grid[rowIndex][columnIndex]?.isBold
                  ? "bold"
                  : "normal",
                fontStyle: grid[rowIndex][columnIndex]?.isItalic
                  ? "italic"
                  : "normal",
                textDecoration: grid[rowIndex][columnIndex]?.isLineThrough
                  ? "line-through"
                  : "",
                color: grid[rowIndex][columnIndex]?.textColor,
                // backgroundColor: grid[rowIndex][columnIndex]?.cellColor,
                backgroundColor: isCellInsideRange(rowIndex, columnIndex)
                  ? "rgba(14,101,235,0.1)"
                  : "transparent",
                justifyContent: grid[rowIndex][columnIndex]?.xAlign,
                alignItems: grid[rowIndex][columnIndex]?.yAlign,
                opacity: "1",
              }}
            >
              <span
                style={{
                  display: "inline",
                  transform: `rotate(${grid[rowIndex][columnIndex]?.rotate})`,
                }}
              >
                {grid[rowIndex][columnIndex]?.value || ""}
              </span>
            </div>
          </div>
        )}
      </FixedSizeGrid>
    </div>
  );
};

export default Table3;

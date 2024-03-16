import React, { useEffect, useRef, useState } from "react";
import { ResizeBar } from "./Resize/ResizeBar";
import ColResize from "./Resize/ColResize";
import RowResize from "./Resize/RowResize";
import useSheetStore from "../../SheetStore";

const Table = () => {
  const addCourse = useSheetStore((state) => state.addCourse);
  const [totalRows, setTotalRows] = useState(100);
  const [totalCols, setTotalCols] = useState(26);

  const [grid, setGrid] = useState(
    Array.from({ length: totalRows }, () => Array(totalCols).fill(""))
  );

  const selectedCell = useSheetStore((state) => state.selectedCell);
  const setSelectedCell = useSheetStore((state) => state.setSelectedCell);

  const [range, setRange] = useState({
    rowStart: -1,
    rowEnd: -1,
    colStart: -1,
    colEnd: -1,
  });
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
      setClickTime(1);
    } else if (event.detail === 2) {
      setClickTime(2);
    } else {
      setClickTime(0);
    }
  };

  // *****************For Range selection setting (mouse + keypad)**************
  useEffect(() => {
    setRangeMaxMinValues({
      minRow: Math.min(range.rowStart, range.rowEnd),
      maxRow: Math.max(range.rowStart, range.rowEnd),
      minCol: Math.min(range.colStart, range.colEnd),
      maxCol: Math.max(range.colStart, range.colEnd),
    });
  }, [range]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (selectedCell.row != -1 && selectedCell.col != -1) {
        if (
          event.shiftKey &&
          (event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight")
        ) {
          if (
            event.shiftKey &&
            event.key === "ArrowDown" &&
            selectedCell.row < totalRows - 1
          ) {
            setRange((prevRange) => ({
              rowStart: selectedCell.row,
              rowEnd:
                prevRange.rowEnd === -1
                  ? selectedCell.row + 1
                  : prevRange.rowEnd + 1,
              colStart: selectedCell.col,
              colEnd:
                prevRange.colEnd === -1 ? selectedCell.col : prevRange.colEnd,
            }));
          } else if (
            event.shiftKey &&
            event.key === "ArrowUp" &&
            selectedCell.row > 0
          ) {
            setRange((prevRange) => ({
              rowStart: selectedCell.row,
              rowEnd:
                prevRange.rowEnd === -1
                  ? selectedCell.row - 1
                  : prevRange.rowEnd - 1,
              colStart: selectedCell.col,
              colEnd:
                prevRange.colEnd === -1 ? selectedCell.col : prevRange.colEnd,
            }));
          } else if (
            event.shiftKey &&
            event.key === "ArrowLeft" &&
            selectedCell.col > 0
          ) {
            setRange((prevRange) => ({
              rowStart: selectedCell.row,
              rowEnd:
                prevRange.rowEnd === -1 ? selectedCell.row : prevRange.rowEnd,
              colStart: selectedCell.col,
              colEnd:
                prevRange.colEnd === -1
                  ? selectedCell.col - 1
                  : prevRange.colEnd - 1,
            }));
          } else if (
            event.shiftKey &&
            event.key === "ArrowRight" &&
            selectedCell.col < totalCols - 1
          ) {
            setRange((prevRange) => ({
              rowStart: selectedCell.row,
              rowEnd:
                prevRange.rowEnd === -1 ? selectedCell.row : prevRange.rowEnd,
              colStart: selectedCell.col,
              colEnd:
                prevRange.colEnd === -1
                  ? selectedCell.col + 1
                  : prevRange.colEnd + 1,
            }));
          }
          setRangeBorderColored(true);
        } else {
          if (event.key === "ArrowDown" && selectedCell.row < totalRows - 1) {
            setSelectedCell((prevCell) => ({
              row: prevCell.row + 1,
              col: prevCell.col,
            }));
          } else if (event.key === "ArrowUp" && selectedCell.row > 0) {
            setSelectedCell((prevCell) => ({
              row: prevCell.row - 1,
              col: prevCell.col,
            }));
          } else if (event.key === "ArrowLeft" && selectedCell.col > 0) {
            setSelectedCell((prevCell) => ({
              row: prevCell.row,
              col: prevCell.col - 1,
            }));
          } else if (
            event.key === "ArrowRight" &&
            selectedCell.col < totalCols - 1
          ) {
            setSelectedCell((prevCell) => ({
              row: prevCell.row,
              col: prevCell.col + 1,
            }));
          }
          setRangeBorderColored(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts or when selectedCell changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell.row, selectedCell.col]);

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
    Array(totalRows).fill({ height: "30px" })
  );

  const [colProperty, setColProperty] = useState(
    Array(totalCols).fill({ width: "200px" })
  );

  const [hoveringRow, setHoveringRow] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(-1);

  const [hoveringCol, setHoveringCol] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  return (
    <div className="h-[75vh] w-[97vw] relative">
      <div className="absolute bg-gray-400 w-[50px] h-[30px] top-0 z-50"></div>
      <div className="relative w-full h-full overflow-x-auto overflow-y-auto">
        <div className="sticky top-0 z-20">
          <table
            className="relative w-full border-collapse table-fixed text-lightgrey"
            style={{ userSelect: "none" }}
          >
            <thead>
              <tr>
                <th className="z-3 w-[50px] border border-gray-400 bg-gray-400"></th>
                {grid[0].map((col, colIndex) => (
                  <th
                    key={colIndex}
                    className="h-[30px] w-[200px] border border-gray-500 relative"
                    style={{
                      backgroundColor: colorLabelCells(colIndex, "labelRow"),
                      width: colProperty[colIndex].width,
                    }}
                  >
                    {String.fromCharCode(colIndex + 65)}
                    <div className="absolute top-0 right-[-15px] w-[30px] h-full z-10 grid place-content-center">
                      <div
                        className="w-[30px] h-[30px] relative"
                        onMouseEnter={() => {
                          if (selectedCol === -1) setHoveringCol(colIndex);
                        }}
                        onMouseLeave={() => {
                          if (selectedCol === -1) setHoveringCol(-1);
                        }}
                      >
                        {colIndex === hoveringCol ? (
                          <ColResize
                            colIndex={colIndex}
                            hoveringCol={hoveringCol}
                            setHoveringCol={setHoveringCol}
                            selectedCol={selectedCol}
                            colProperty={colProperty}
                            setSelectedCol={setSelectedCol}
                            setColProperty={setColProperty}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <table className="w-full border-collapse table-fixed text-lightgrey">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* row number cell */}
                <td
                  className="sticky left-0 w-[50px] border border-gray-400 grid place-content-center"
                  style={{
                    backgroundColor: colorLabelCells(rowIndex, "labelCol"),
                    userSelect: "none",
                    height: rowProperty[rowIndex].height,
                  }}
                >
                  {rowIndex + 1}
                  <div className="absolute left-0 bottom-[-10px] w-[50px] h-[20px] grid place-content-center">
                    <div
                      className="w-[50px] h-[20px] relative z-30"
                      onMouseEnter={() => {
                        if (selectedRow === -1) setHoveringRow(rowIndex);
                      }}
                      onMouseLeave={() => {
                        if (selectedRow === -1) setHoveringRow(-1);
                      }}
                    >
                      {rowIndex === hoveringRow ? (
                        <RowResize
                          RowIndex={rowIndex}
                          hoveringRow={hoveringRow}
                          setHoveringRow={setHoveringRow}
                          selectedRow={selectedRow}
                          rowProperty={rowProperty}
                          setSelectedRow={setSelectedRow}
                          setRowProperty={setRowProperty}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </td>
                <td className="w-[50px] relative z-[-10]"></td>
                {/* row */}
                {row.map((col, colIndex) => (
                  // cell
                  <td
                    key={colIndex}
                    className="text-center h-[30px] caret-transparent relative"
                    style={{
                      backgroundColor: isCellInsideRange(rowIndex, colIndex)
                        ? "rgba(14,101,235,0.1)"
                        : "",
                      borderTop: colorRangeBorder(rowIndex, colIndex)[0],
                      borderRight: colorRangeBorder(rowIndex, colIndex)[1],
                      borderBottom: colorRangeBorder(rowIndex, colIndex)[2],
                      borderLeft: colorRangeBorder(rowIndex, colIndex)[3],
                      outline: colorOutline(rowIndex, colIndex),
                      outlineOffset: "1px",
                      width: colProperty[colIndex].width,
                      height: rowProperty[rowIndex].height,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCell({ row: rowIndex, col: colIndex });
                      handleClick(e);
                    }}
                    onMouseDown={() => onMouseDownHandler(rowIndex, colIndex)}
                    onMouseUp={() => onMouseUpHandler(rowIndex, colIndex)}
                    onMouseEnter={() => onMouseEnterHandler(rowIndex, colIndex)}
                  >
                    {selectedCell.row === rowIndex &&
                    selectedCell.col === colIndex &&
                    clickTime === 2 ? (
                      <input
                        id="grid-input"
                        type="text"
                        className="w-full h-full text-black border-none outline-none cursor-default highlight-border caret-black"
                        value={grid[rowIndex][colIndex]}
                        onChange={(e) => {
                          const newGrid = [...grid];
                          newGrid[rowIndex][colIndex] = e.target.value;
                          setGrid(newGrid);
                        }}
                      />
                    ) : (
                      <div className="w-[90%] h-[90%]">
                        {grid[rowIndex][colIndex]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

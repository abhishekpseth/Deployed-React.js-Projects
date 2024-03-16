import React, { useEffect, useState, useMemo } from "react";
import useSheetStore from "../../SheetStore";

const Cell = ({ rowIndex, colIndex, clickTime }) => {
  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);

  // useEffect(() => {
  //   console.log(grid);
  // }, [grid]);

  const selectedCell = useSheetStore((state) => state.selectedCell);

  const setSelectedCell = useSheetStore((state) => state.setSelectedCell);

  const range = useSheetStore((state) => state.range);
  const setRange = useSheetStore((state) => state.setRange);

  const [currentCellValue, setCurrentCellValue] = useState(
    grid[rowIndex][colIndex]?.value
  );

  const [isRangeBorderColored, setRangeBorderColored] = useState(false);

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

  // const computeFunction = (inputStr) => {
  //   const matches = inputStr.match(/=(\w+)\((.*?)\)/);

  //   if (!matches || matches.length < 3) {
  //     return NaN; // Return NaN if the input format is incorrect
  //   }

  //   const operation = matches[1].toUpperCase();
  //   const numbers = matches[2]
  //     .split(",")
  //     .map((num) => parseInt(eval(num.trim())));

  //   // Perform the specified operation on the numbers
  //   let result;
  //   switch (operation) {
  //     case "SUM":
  //       result = numbers.reduce((acc, num) => acc + num, 0);
  //       break;
  //     case "AVERAGE":
  //       result = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  //       break;
  //     // Add more cases for other operations as needed
  //     default:
  //       result = NaN; // Return NaN if the operation is not recognized
  //   }

  //   return result;
  // };

  const computeFunction = (inputStr) => {
    const matches = inputStr.match(/=(\w+)\((.*?)\)/);

    if (!matches || matches.length < 3) {
      return NaN; // Return NaN if the input format is incorrect
    }

    const operation = matches[1].toUpperCase();
    const args = matches[2].split(",").map((arg) => arg.trim());

    // Perform the specified operation on the arguments
    let result;

    switch (operation) {
      case "SUM":
        result = args.reduce((acc, arg) => {
          if (arg.includes(":")) {
            // Range case
            const [startCell, endCell] = arg.toUpperCase().split(":");
            const [startRow, startCol] = [
              parseInt(startCell.substring(1)) - 1,
              startCell.charCodeAt(0) - 65,
            ];
            const [endRow, endCol] = [
              parseInt(endCell.substring(1)) - 1,
              endCell.charCodeAt(0) - 65,
            ];
            let sum = 0;
            for (let i = startRow; i <= endRow; i++) {
              for (let j = startCol; j <= endCol; j++) {
                if (grid[i] && grid[i][j] && grid[i][j].value !== undefined) {
                  if (grid[i][j].value === "") sum += 0;
                  else sum += parseInt(grid[i][j].value);
                } else {
                  return "#ERROR";
                }
              }
            }
            return acc + sum;
          } else {
            // Cell case
            const cellAddress = arg.toUpperCase();
            const row = parseInt(cellAddress.substring(1)) - 1;
            const col = cellAddress.charCodeAt(0) - 65;

            if (
              grid[row] &&
              grid[row][col] &&
              grid[row][col].value !== undefined
            ) {
              const cellValue = grid[row][col].value;
              if (cellValue === "") {
                return 0;
              } else {
                return cellValue;
              }
            } else {
              // console.log(grid[row][col].value);
              return "#ERROR";
            }
          }
        }, 0);
        break;
      case "AVERAGE":
        // Similar logic for average, you can implement it if needed
        result = args.reduce((acc, arg) => {
          if (arg.includes(":")) {
            // Range case
            const [startCell, endCell] = arg.toUpperCase().split(":");
            const [startRow, startCol] = [
              parseInt(startCell.substring(1)) - 1,
              startCell.charCodeAt(0) - 65,
            ];
            const [endRow, endCol] = [
              parseInt(endCell.substring(1)) - 1,
              endCell.charCodeAt(0) - 65,
            ];
            let sum = 0;
            let count = 0;
            for (let i = startRow; i <= endRow; i++) {
              for (let j = startCol; j <= endCol; j++) {
                if (grid[i] && grid[i][j] && grid[i][j].value !== undefined) {
                  if (grid[i][j].value === "") {
                    sum += 0;
                  } else {
                    sum += parseInt(grid[i][j].value);
                    count++;
                  }
                } else {
                  return "#ERROR";
                }
              }
            }
            return acc + sum / count; // Return the average
          } else {
            // Cell case
            const cellAddress = arg.toUpperCase();
            const row = parseInt(cellAddress.substring(1)) - 1;
            const col = cellAddress.charCodeAt(0) - 65;

            if (
              grid[row] &&
              grid[row][col] &&
              grid[row][col].value !== undefined
            ) {
              const cellValue = grid[row][col].value;
              if (cellValue === "") {
                return acc + 0;
              } else {
                return acc + parseInt(cellValue);
              }
            } else {
              return "#ERROR";
            }
          }
        }, 0);
        break;
      default:
        result = NaN; // Return NaN if the operation is not recognized
    }
    return result;
  };

  const getValue = useMemo(() => {
    return () => {
      const cellValue = grid[rowIndex][colIndex]?.value || "";
      if (cellValue && cellValue[0] === "=") {
        return computeFunction(cellValue);
      }
      return cellValue;
    };
  }, [grid, rowIndex, colIndex]);

  const [isInputFocused, setInputFocused] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (isInputFocused && event.key === "Enter") {
  //       setInputFocused(false);
  //       setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isInputFocused]);

  const debouncedEffect = (fn, delay) => {
    let timer;
    const debouncedFn = function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };

    debouncedFn.cancel = () => {
      clearTimeout(timer);
    };

    return debouncedFn;
  };

  // useEffect(() => {
  //   const debouncedFunction = debouncedEffect(() => {
  //     const newGrid = grid.map((row, rIndex) =>
  //       row.map((cell, cIndex) =>
  //         rIndex === rowIndex && cIndex === colIndex
  //           ? { ...cell, value: currentCellValue }
  //           : cell
  //       )
  //     );
  //     setGrid(newGrid);
  //   }, 2000);

  //   // Call the debounced function only when necessary
  //   debouncedFunction();

  //   // Cleanup function to clear the timeout when the dependencies change
  //   return () => debouncedFunction.cancel();
  // }, [currentCellValue]); // Added currentCellValue as a dependency

  return (
    <>
      {selectedCell.row === rowIndex && selectedCell.col === colIndex ? (
        <input
          id="grid-input"
          type="text"
          value={grid[rowIndex][colIndex]?.value || ""}
          onChange={(e) => {
            const newGrid = grid.map((row, rIndex) =>
              row.map((cell, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex
                  ? { ...cell, value: e.target.value }
                  : cell
              )
            );
            setGrid(newGrid);
            // setCurrentCellValue(e.target.value);
            // setInputFocused(true);
          }}
          // onFocus={() => setInputFocused(true)}
          // onBlur={() => setInputFocused(false)}
          className="absolute top-0 left-0 flex border-none outline-none cursor-default highlight-border caret-black"
          style={{
            // borderTop: colorRangeBorder(rowIndex, colIndex)[0],
            // borderRight: colorRangeBorder(rowIndex, colIndex)[1],
            // borderBottom: colorRangeBorder(rowIndex, colIndex)[2],
            // borderLeft: colorRangeBorder(rowIndex, colIndex)[3],
            fontSize: grid[rowIndex][colIndex]?.fontSize || "inherit",
            fontWeight: grid[rowIndex][colIndex]?.isBold ? "bold" : "normal",
            fontStyle: grid[rowIndex][colIndex]?.isItalic ? "italic" : "normal",
            textDecoration: grid[rowIndex][colIndex]?.isLineThrough
              ? "line-through"
              : "",
            color: grid[rowIndex][colIndex]?.textColor,
            // backgroundColor: grid[rowIndex][colIndex]?.cellColor,
            backgroundColor: isCellInsideRange(rowIndex, colIndex)
              ? "rgba(14,101,235,0.1)"
              : "transparent",
            textAlign: grid[rowIndex][colIndex]?.xAlign,
            alignItems: grid[rowIndex][colIndex]?.yAlign,
            opacity: "1",
            overflow: "auto",
            // minWidth: "100%",
            width: "100%",
            height: "100%",
            zIndex: "100",
          }}
        />
      ) : (
        <div
          className="flex w-full h-full"
          style={{
            // borderTop: colorRangeBorder(rowIndex, colIndex)[0],
            // borderRight: colorRangeBorder(rowIndex, colIndex)[1],
            // borderBottom: colorRangeBorder(rowIndex, colIndex)[2],
            // borderLeft: colorRangeBorder(rowIndex, colIndex)[3],
            fontSize: grid[rowIndex][colIndex]?.fontSize || "inherit",
            fontWeight: grid[rowIndex][colIndex]?.isBold ? "bold" : "normal",
            fontStyle: grid[rowIndex][colIndex]?.isItalic ? "italic" : "normal",
            textDecoration: grid[rowIndex][colIndex]?.isLineThrough
              ? "line-through"
              : "",
            color: grid[rowIndex][colIndex]?.textColor,
            // backgroundColor: grid[rowIndex][colIndex]?.cellColor,
            backgroundColor: isCellInsideRange(rowIndex, colIndex)
              ? "rgba(14,101,235,0.1)"
              : "transparent",
            justifyContent: grid[rowIndex][colIndex]?.xAlign,
            alignItems: grid[rowIndex][colIndex]?.yAlign,
            opacity: "1",
          }}
        >
          <span
            style={{
              display: "inline",
              transform: `rotate(${grid[rowIndex][colIndex]?.rotate})`,
            }}
          >
            {getValue()}
          </span>
        </div>
      )}
    </>
  );
};

export default Cell;

import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import useSheetStore from "../../../../SheetStore";

const AddressBar = () => {
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const setSelectedCell = useSheetStore((state) => state.setSelectedCell);
  const totalRows = useSheetStore((state) => state.totalRows);
  const totalCols = useSheetStore((state) => state.totalCols);
  const range = useSheetStore((state) => state.range);
  const setRange = useSheetStore((state) => state.setRange);
  const isTableFocussed = useSheetStore((state) => state.isTableFocussed);

  // useEffect(() => {
  //   console.log(range);
  // }, [range]);

  const getSelectedCellAddress = () => {
    const { row, col } = selectedCell;
    if (row === -1 || col === -1) return "";
    const columnChar = String.fromCharCode(col + 65);
    const rowNumber = row + 1;
    return `${columnChar}${rowNumber}`;
  };

  const getSelectedRangeAddress = () => {
    const { rowStart, rowEnd, colStart, colEnd } = range;
    const columnStartChar = String.fromCharCode(colStart + 65);
    const rowStartNumber = rowStart + 1;
    const columnEndChar = String.fromCharCode(colEnd + 65);
    const rowEndNumber = rowEnd + 1;
    return `${columnStartChar}${rowStartNumber}:${columnEndChar}${rowEndNumber}`;
  };

  const [address, setAddress] = useState(getSelectedCellAddress());
  const [showRangeErrorModal, setShowRangeErrorModal] = useState(false);

  useEffect(() => {
    if (range.rowStart === range.rowEnd && range.colStart === range.colEnd) {
      setAddress(getSelectedCellAddress());
    } else {
      setAddress(getSelectedRangeAddress());
    }
  }, [selectedCell, range]);

  const handleChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value === "") {
      // If input value is empty, update the selected cell to indicate no selection
      setSelectedCell({ row: -1, col: -1 });
    }
  };

  const [isInputFocused, setInputFocused] = useState(false);

  const handleBlur = (event) => {
    if (!isTableFocussed) {
      const trimmedAddress = address.trim(); // Trim leading and trailing spaces
      if (!trimmedAddress.includes(":")) {
        if (trimmedAddress !== getSelectedCellAddress()) {
          const col = trimmedAddress.charCodeAt(0) - 65;
          const row = parseInt(trimmedAddress.slice(1)) - 1;
          if (col >= 0 && col < totalCols && row >= 0 && row < totalRows) {
            setSelectedCell({ row, col });
          } else {
            setShowRangeErrorModal(true);
          }
        }
        setAddress(getSelectedCellAddress());
      } else {
        if (trimmedAddress !== getSelectedRangeAddress()) {
          const startPart = trimmedAddress.split(":")[0];
          const endPart = trimmedAddress.split(":")[1];
          const colStart = startPart.charCodeAt(0) - 65;
          const rowStart = parseInt(startPart.slice(1)) - 1;
          const colEnd = endPart.charCodeAt(0) - 65;
          const rowEnd = parseInt(endPart.slice(1)) - 1;

          setSelectedCell({ row: rowStart, col: colStart });
          setRange({
            rowStart: rowStart,
            rowEnd: rowEnd,
            colStart: colStart,
            colEnd: colEnd,
          });
          setAddress(getSelectedRangeAddress());
        }
      }
      setInputFocused(false);
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (isInputFocused && event.key === "Enter") {
  //       const trimmedAddress = address.trim();
  //       if (trimmedAddress !== getSelectedCellAddress()) {
  //         if (!trimmedAddress.includes(":")) {
  //           const col = trimmedAddress.charCodeAt(0) - 65;
  //           const row = parseInt(trimmedAddress.slice(1)) - 1;
  //           if (row >= 0 && row < totalRows && col >= 0 && col < totalCols) {
  //             setSelectedCell({ row, col });
  //             setAddress(trimmedAddress);
  //           }
  //         } else {
  //           const startPart = trimmedAddress.split(":")[0];
  //           const endPart = trimmedAddress.split(":")[1];
  //           const colStart = startPart.charCodeAt(0) - 65;
  //           const rowStart = parseInt(startPart.slice(1)) - 1;
  //           const colEnd = endPart.charCodeAt(0) - 65;
  //           const rowEnd = parseInt(endPart.slice(1)) - 1;

  //           setSelectedCell({ row: rowStart, col: colStart });
  //           setRange({
  //             rowStart: rowStart,
  //             rowEnd: rowEnd,
  //             colStart: colStart,
  //             colEnd: colEnd,
  //           });
  //           setAddress(trimmedAddress);
  //         }
  //       }
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isInputFocused, address, getSelectedCellAddress, setSelectedCell]);

  return (
    <div className="w-[100px] h-[25px] bg-white flex justify-between items-center hover:bg-gray-200">
      <input
        className="w-[80px] hover:bg-gray-200 outline-blue-500"
        value={address}
        onChange={handleChange}
        onFocus={() => setInputFocused(true)}
        onBlur={handleBlur}
      />
      <div>
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export default AddressBar;

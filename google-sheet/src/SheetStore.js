import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const sheetStore = (set) => ({
  totalRows: 20,
  totalCols: 26,
  grid: Array.from({ length: 20 }, () =>
    //row
    Array(26).fill({
      //col
      value: "",
      fontSize: "14px",
      // backgroundColor: "transparent",
      isBold: false,
      isItalic: false,
      isLineThrough: false,
      textColor: "#000000",
      textColorPalette: "all",
      cellColor: "transparent",
      cellColorPalette: "all",
      xAlign: "center",
      yAlign: "center",
      rotate: "0deg",
    })
  ),
  isTableFocussed: false,
  selectedCell: { row: -1, col: -1 },
  range: { rowStart: -1, rowEnd: -1, colStart: -1, colEnd: -1 },
  isCustomColorPickerShown: "",
  customColors: ["#f3f2ef", "#f8f8f8", "#5a5b6a", "#303030", "#d3e3fd"],
  calculationMode: false,
  showCurrentFeaturesModal: false,
  setTableFocussed: (newValue) => {
    set((state) => ({
      isTableFocussed: newValue,
    }));
  },
  setGrid: (newGrid) => {
    set((state) => ({
      grid: newGrid,
    }));
  },
  setSelectedCell: ({ row, col }) => {
    set((state) => ({
      selectedCell: { row, col },
    }));
  },
  setRange: (newRange) => {
    set((state) => ({
      range: newRange,
    }));
  },
  setCustomColorPickerShown: (newValue) => {
    set((state) => ({
      isCustomColorPickerShown: newValue,
    }));
  },
  setCustomColors: (newCustomColorArray) => {
    set((state) => ({
      customColors: newCustomColorArray,
    }));
  },
  enterCalculationMode: (newValue) => {
    // means = likha hai input me
    set((state) => ({
      calculationMode: newValue,
    }));
  },
  setShowCurrentFeaturesModal: (newValue) => {
    set((state) => ({
      showCurrentFeaturesModal: newValue,
    }));
  },
});

// const useSheetStore = create(devtools(persist(sheetStore, { name: "sheet" })));
const useSheetStore = create(devtools(sheetStore, { name: "sheet" }));
export default useSheetStore;

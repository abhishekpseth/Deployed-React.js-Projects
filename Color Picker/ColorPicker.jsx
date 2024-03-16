import React, { useEffect, useState } from "react";
import StripColorPicker from "./StripColorPicker";
import { BiSolidEyedropper } from "react-icons/bi";
import ColorValues from "./ColorValues/ColorValues";
import useSheetStore from "../../../SheetStore";
import Square from "./ColorPalette/Square";
import { convertRGBtoHSL, HSLToRGB } from "./Utils";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState({
    h: 0,
    s: 100,
    l: 100,
  });
  const [rgbColor, setRgbColor] = useState({ r: 255, g: 255, b: 255 });
  const [hue, setHue] = useState(0);

  // useEffect(() => {
  //   // Convert HSL to RGB
  //   const { h, s, l } = selectedColor;
  //   const rgb = HSLToRGB(h, s, l);
  //   if (
  //     rgb[0] !== rgbColor.r ||
  //     rgb[1] !== rgbColor.g ||
  //     rgb[2] !== rgbColor.b
  //   ) {
  //     setRgbColor({ r: rgb[0], g: rgb[1], b: rgb[2] });
  //   }
  // }, [selectedColor]);

  useEffect(() => {
    const hsl = convertRGBtoHSL([rgbColor.r, rgbColor.g, rgbColor.b]);
    if (
      hsl[0] !== selectedColor.h ||
      hsl[1] !== selectedColor.s ||
      hsl[2] !== selectedColor.l
    ) {
      setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
    }
  }, [rgbColor]);

  const grid = useSheetStore((state) => state.grid);
  const setGrid = useSheetStore((state) => state.setGrid);
  const selectedCell = useSheetStore((state) => state.selectedCell);
  const range = useSheetStore((state) => state.range);
  const isCustomColorPickerShown = useSheetStore(
    (state) => state.isCustomColorPickerShown
  );
  const setCustomColorPickerShown = useSheetStore(
    (state) => state.setCustomColorPickerShown
  );
  const setCustomColors = useSheetStore((state) => state.setCustomColors);
  const customColors = useSheetStore((state) => state.customColors);

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

  const rgbToHex = (rgbString) => {
    // Extracting the RGB values from the string
    const regex = /\((\d+),\s*(\d+),\s*(\d+)\)/;
    const matches = rgbString.match(regex);

    if (!matches || matches.length !== 4) {
      // Invalid input format
      return null;
    }

    // Converting RGB values to hexadecimal
    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);

    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const colorText = () => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        setCustomColors([
          ...customColors.filter((color) => color !== rgbToHex(selectedColor)),
          rgbToHex(selectedColor),
        ]);
        if (
          range.rowStart === range.rowEnd &&
          range.colStart === range.colEnd
        ) {
          return rIndex === selectedCell.row && cIndex === selectedCell.col
            ? {
                ...cell,
                textColor: rgbToHex(selectedColor),
                textColorPalette: "custom",
              }
            : cell;
        } else {
          return isCellInsideRange(rIndex, cIndex)
            ? {
                ...cell,
                textColor: rgbToHex(selectedColor),
                textColorPalette: "custom",
              }
            : cell;
        }
      })
    );
    setGrid(newGrid);
  };

  return (
    <div
      className="absolute left-[100px] top-[250px] w-[326px] h-[385px] p-[25px] bg-white flex flex-col gap-[16px] rounded-xl"
      style={{ boxShadow: "0 0 10px 4px rgb(0,0,0,0.1)" }}
    >
      <div className=" flex flex-col gap-[10px]">
        <Square
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          hue={hue}
          setHue={setHue}
        />
        <div className="h-[36px] w-full flex items-center justify-between">
          <div
            className="h-[32px] w-[32px] rounded-full border border-gray-300"
            style={{
              backgroundColor: `hsl(${selectedColor.h},${selectedColor.s}%,${selectedColor.l}%)`,
            }}
          ></div>
          <div className="rounded-md h-[36px] w-[36px] grid place-content-center hover:bg-blue-50 border border-gray-300 text-[20px]">
            <BiSolidEyedropper />
          </div>
          <StripColorPicker hue={hue} setHue={setHue} />
        </div>
        <ColorValues
          setHue={setHue}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <div className="flex-1 flex gap-[10px] justify-end items-center">
        <button
          style={{
            borderRadius: "4px",
            fontWeight: "500",
            fontSize: "15px",
            height: "36px",
            letterSpacing: "0.25px",
            lineHeight: "16px",
            padding: "9px 24px 11px",
            background: "#fff",
            border: "1px solid #dadce0",
            color: "#137333",
          }}
          onClick={() => setCustomColorPickerShown(false)}
        >
          Cancel
        </button>
        <button
          style={{
            borderRadius: "4px",
            fontWeight: "500",
            fontSize: "15px",
            height: "36px",
            letterSpacing: "0.25px",
            lineHeight: "16px",
            padding: "9px 24px 11px",
            color: "#fff",
            border: "1px solid #dadce0",
            backgroundColor: "#137333",
          }}
          onClick={() => {
            if (isCustomColorPickerShown === "text") {
              colorText();
            }
            setCustomColorPickerShown(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;

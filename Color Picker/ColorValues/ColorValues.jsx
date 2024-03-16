import React, { useEffect, useState } from "react";
import ColorInputBox from "./ColorInputBox";
import { HSLToRGB, convertRGBtoHSL } from "../Utils";

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const ColorValues = ({ setHue, selectedColor, setSelectedColor }) => {
  const rgb = HSLToRGB(selectedColor.h, selectedColor.s, selectedColor.l);
  const [hexColorValue, setHexColorValue] = useState(
    rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]))
  );
  const [redColorValue, setRedColorValue] = useState(rgb[0]);
  const [greenColorValue, setGreenColorValue] = useState(rgb[1]);
  const [blueColorValue, setBlueColorValue] = useState(rgb[2]);
  const [isHexInputFocussed, setHexInputFocussed] = useState(false);
  const [isRedInputFocussed, setRedInputFocussed] = useState(false);
  const [isGreenInputFocussed, setGreenInputFocussed] = useState(false);
  const [isBlueInputFocussed, setBlueInputFocussed] = useState(false);
  const [colorChangeMode, setColorChangeMode] = useState("out");

  // color changes from outside
  useEffect(() => {
    if (colorChangeMode === "out") {
      const rgb = HSLToRGB(selectedColor.h, selectedColor.s, selectedColor.l);
      if (!isRedInputFocussed) setRedColorValue(rgb[0]);
      if (!isGreenInputFocussed) setGreenColorValue(rgb[1]);
      if (!isBlueInputFocussed) setBlueColorValue(rgb[2]);
    }
  }, [selectedColor]);

  // R input changes

  useEffect(() => {
    if (isRedInputFocussed) {
      if (redColorValue.length === 0) {
        const hsl = convertRGBtoHSL([
          0,
          parseInt(greenColorValue),
          parseInt(blueColorValue),
        ]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
        setHue(hsl[0]);
        if (!isHexInputFocussed)
          setHexColorValue(
            rgbToHex(0, parseInt(greenColorValue), parseInt(blueColorValue))
          );
      } else {
        if (
          parseInt(redColorValue) >= 0 &&
          parseInt(redColorValue) <= 255 &&
          parseInt(greenColorValue) >= 0 &&
          parseInt(greenColorValue) <= 255 &&
          parseInt(blueColorValue) >= 0 &&
          parseInt(blueColorValue) <= 255
        ) {
          const hsl = convertRGBtoHSL([
            parseInt(redColorValue),
            parseInt(greenColorValue),
            parseInt(blueColorValue),
          ]);
          setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
          setHue(hsl[0]);
          if (!isHexInputFocussed)
            setHexColorValue(
              rgbToHex(
                parseInt(redColorValue),
                parseInt(greenColorValue),
                parseInt(blueColorValue)
              )
            );
        }
      }
      setColorChangeMode("in");
    }
  }, [redColorValue]);

  // G input changes

  useEffect(() => {
    if (isGreenInputFocussed) {
      if (greenColorValue.length === 0) {
        const hsl = convertRGBtoHSL([
          parseInt(redColorValue),
          0,
          parseInt(blueColorValue),
        ]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
        setHue(hsl[0]);
        if (!isHexInputFocussed)
          setHexColorValue(
            rgbToHex(parseInt(redColorValue), 0, parseInt(blueColorValue))
          );
      } else {
        if (
          parseInt(redColorValue) >= 0 &&
          parseInt(redColorValue) <= 255 &&
          parseInt(greenColorValue) >= 0 &&
          parseInt(greenColorValue) <= 255 &&
          parseInt(blueColorValue) >= 0 &&
          parseInt(blueColorValue) <= 255
        ) {
          const hsl = convertRGBtoHSL([
            parseInt(redColorValue),
            parseInt(greenColorValue),
            parseInt(blueColorValue),
          ]);
          setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
          setHue(hsl[0]);
          if (!isHexInputFocussed)
            setHexColorValue(
              rgbToHex(
                parseInt(redColorValue),
                parseInt(greenColorValue),
                parseInt(blueColorValue)
              )
            );
        }
      }
      setColorChangeMode("in");
    }
  }, [greenColorValue]);

  // B input changes

  useEffect(() => {
    if (isBlueInputFocussed) {
      if (blueColorValue.length === 0) {
        const hsl = convertRGBtoHSL([
          parseInt(redColorValue),
          parseInt(greenColorValue),
          0,
        ]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
        setHue(hsl[0]);
        if (!isHexInputFocussed)
          setHexColorValue(
            rgbToHex(parseInt(redColorValue), parseInt(greenColorValue), 0)
          );
      } else {
        if (
          parseInt(redColorValue) >= 0 &&
          parseInt(redColorValue) <= 255 &&
          parseInt(greenColorValue) >= 0 &&
          parseInt(greenColorValue) <= 255 &&
          parseInt(blueColorValue) >= 0 &&
          parseInt(blueColorValue) <= 255
        ) {
          const hsl = convertRGBtoHSL([
            parseInt(redColorValue),
            parseInt(greenColorValue),
            parseInt(blueColorValue),
          ]);
          setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
          setHue(hsl[0]);
          if (!isHexInputFocussed)
            setHexColorValue(
              rgbToHex(
                parseInt(redColorValue),
                parseInt(greenColorValue),
                parseInt(blueColorValue)
              )
            );
        }
      }
      setColorChangeMode("in");
    }
  }, [blueColorValue]);

  // color changes by hex input
  useEffect(() => {
    if (isHexInputFocussed) {
      const hex = hexColorValue.replace(/^#/, "");
      let r, g, b;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        const hsl = convertRGBtoHSL([r, g, b]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
        setColorChangeMode("in");
        setHue(hsl[0]);
        setRedColorValue(r);
        setGreenColorValue(g);
        setBlueColorValue(b);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        const hsl = convertRGBtoHSL([r, g, b]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
        setHexChangeMode("in");
        setHue(hsl[0]);
        setRedColorValue(r);
        setGreenColorValue(g);
        setBlueColorValue(b);
      }
    }
  }, [hexColorValue]);

  return (
    <div className="flex gap-[10px]">
      <div>
        <div
          style={{
            color: "#5f6368",
            fontSize: "11px",
            fontWeight: "500",
          }}
        >
          Hex
        </div>
        <input
          maxLength={7} // # ko leke 7 characters honge
          value={hexColorValue}
          onChange={(e) => {
            setHexColorValue(e.target.value);
          }}
          onFocus={() => setHexInputFocussed(true)}
          onBlur={() => {
            setHexInputFocussed(false);
            if (hexColorValue.length === 0) {
              setHexColorValue(0);
            } else if (parseInt(hexColorValue) > 255) {
              setHexColorValue(hexColorValue.substring(0, 6));
            }
          }}
          style={{
            width: "75px",
            height: "36px",
            padding: "1px 8px",
            fontSize: "14px",
            margin: "8px 0px",
            color: "#3c4043",
            border: "1px solid #dadce0",
            borderRadius: "4px",
          }}
        ></input>
      </div>
      <ColorInputBox
        text="R"
        colorValue={redColorValue}
        setColorValue={setRedColorValue}
        setInputFocussed={setRedInputFocussed}
      />
      <ColorInputBox
        text="G"
        colorValue={greenColorValue}
        setColorValue={setGreenColorValue}
        setInputFocussed={setGreenInputFocussed}
      />
      <ColorInputBox
        text="B"
        colorValue={blueColorValue}
        setColorValue={setBlueColorValue}
        setInputFocussed={setBlueInputFocussed}
      />
    </div>
  );
};

export default ColorValues;

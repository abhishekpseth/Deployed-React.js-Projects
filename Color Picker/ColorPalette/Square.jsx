import React, { useRef, useEffect, useState } from "react";
import { convertRGBtoHSL, HSLToRGB } from "../Utils";

const Square = ({ selectedColor, setSelectedColor, hue, setHue }) => {
  const squareWidth = 276;
  const squareHeight = 150;
  const handleSize = 16;
  const square = useRef(null);
  const canvas = useRef(null);

  const [isColorPaletteFocussed, setColorPaletteFocussed] = useState(false);
  const [handlePosition, setHandlePosition] = useState({
    top: -handleSize / 2 - 1,
    left: -handleSize / 2 - 1,
  });

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, squareWidth, squareHeight);

    const gradientWhite = ctx.createLinearGradient(0, 0, squareWidth, 0);
    gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`);
    gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0, 0, squareWidth, squareHeight);

    const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareHeight);
    gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`);
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0, 0, squareWidth, squareHeight);
  }, [canvas, hue]);

  const [text, setText] = useState("");

  // changes handle position on changing handle color
  useEffect(() => {
    if (!isColorPaletteFocussed) {
      const s = selectedColor.s,
        l = selectedColor.l,
        h = selectedColor.h;
      let x = 0,
        y = 0;
      if (l == 0 && s == 0) {
        x = -1;
        y = 150;
      } else if (l == 100) {
        x = -1;
        y = -1;
      } else {
        if (s == 100 && l >= 50 && l <= 100) {
          const val = Math.round(((100 - l) / 50) * 276);
          x = val;
          y = -1;
        } else if (s == 100 && l < 50 && l >= 0) {
          const val = Math.round(((50 - l) / 50) * 150);
          x = 276;
          y = val;
        } else if (s == 0 && l < 100 && l >= 0) {
          const val = 150 - Math.round((l / 100) * 150);
          x = -1;
          y = val;
        } else {
          const t = (s * (l < 50 ? l : 100 - l)) / 100;
          const s1 = Math.round((200 * t) / (l + t)) | 0;
          const b1 = Math.round(t + l);
          x = Math.round((276 / 100) * s1);
          y = Math.round(150 - (150 / 100) * b1);
        }
      }
      setHandlePosition({ top: y - 8, left: x - 8 });
      setText(`left:${x} top:${y}`);
    }
  }, [selectedColor]);

  const mouseDownHandler = (event) => {
    setColorPaletteFocussed(true);
  };

  const [rgbValue, setRgbValue] = useState({ r: 255, g: 0, b: 0 });

  // changes color on changing handle position
  useEffect(() => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");

    const handleMouseMove = (e) => {
      if (isColorPaletteFocussed) {
        const newPositionX = handlePosition.left + e.movementX;
        const newPositionY = handlePosition.top + e.movementY;
        const clampedPositionX = Math.min(Math.max(newPositionX, -9), 276 - 8);
        const clampedPositionY = Math.min(Math.max(newPositionY, -9), 150 - 8);

        setHandlePosition((prevPosition) => ({
          top: clampedPositionY,
          left: clampedPositionX,
        }));

        const extremeX = clampedPositionX + 8; // -1 to 276
        const extremeY = clampedPositionY + 8; // -1 to 150
        if (extremeX == -1 && extremeY == -1) {
          setRgbValue({ r: 255, g: 255, b: 255 });
        } else if (extremeX == 276 && extremeY == -1) {
          const rgb = HSLToRGB(hue, 100, 50);
          setRgbValue({ r: rgb[0], g: rgb[1], b: rgb[2] });
        } else {
          if (extremeX >= 0 && extremeX < 276 && extremeY == -1) {
            let [r, g, b] = ctx.getImageData(extremeX, 0, 1, 1).data;
            if (hue >= 0 && hue < 90) {
              setRgbValue({ r: 255, g: g, b: b });
            } else if (hue >= 90 && hue < 180) {
              setRgbValue({ r: r, g: 255, b: b });
            } else if (hue >= 180 && hue < 270) {
              setRgbValue({ r: r, g: g, b: 255 });
            } else {
              setRgbValue({ r: 255, g: g, b: b });
            }
          } else if (extremeX == -1) {
            const val = 255 - Math.round((extremeY / 150) * 255);
            setRgbValue({ r: val, g: val, b: val });
          } else if (extremeX === 276 && extremeY >= 0) {
            if (hue == 0 || hue == 360) {
              const val = 255 - Math.round((extremeY / 150) * 255);
              setRgbValue({ r: val, g: 0, b: 0 });
            } else {
              // let [r, g, b] = ctx.getImageData(276, -1, 1, 1).data;
              const rgb = HSLToRGB(hue, 100, 50);
              let [r, g, b] = [rgb[0], rgb[1], rgb[2]];
              if (r == 0) {
                const valG = g - Math.round((extremeY / 150) * g);
                const valB = b - Math.round((extremeY / 150) * b);
                setRgbValue({ r: 0, g: valG, b: valB });
              } else if (g == 0) {
                const valG = g - Math.round((extremeY / 150) * g);
                const valB = b - Math.round((extremeY / 150) * b);
                setRgbValue({ r: 0, g: valG, b: valB });
              } else {
                const valG = g - Math.round((extremeY / 150) * g);
                const valB = b - Math.round((extremeY / 150) * b);
                setRgbValue({ r: 0, g: valG, b: valB });
              }
            }
          }
        }

        if (
          extremeX >= 0 &&
          extremeX < 276 &&
          extremeY >= 0 &&
          extremeY < 150
        ) {
          let [r, g, b] = ctx.getImageData(extremeX, extremeY, 1, 1).data;
          setRgbValue({ r: r, g: g, b: b });
        }
        const hsl = convertRGBtoHSL([rgbValue.r, rgbValue.g, rgbValue.b]);
        setSelectedColor({ h: hsl[0], s: hsl[1], l: hsl[2] });
      }
    };

    const handleMouseUp = (event) => {
      setColorPaletteFocussed(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isColorPaletteFocussed,
    setColorPaletteFocussed,
    handlePosition,
    setHandlePosition,
    hue,
    setHue,
    canvas,
    setText,
    text,
  ]);

  return (
    <div className="relative">
      <canvas ref={canvas} />
      <div
        onMouseDown={mouseDownHandler}
        className="absolute z-10 bg-transparent h-[16px] w-[16px] rounded-full grid place-content-center cursor-pointer"
        style={{
          border: "2px solid white",
          boxShadow: "0 0 3px 1px #bdc1c6",
          top: handlePosition.top,
          left: handlePosition.left,
        }}
      ></div>
      <div className="absolute top-[100%]">{text}</div>
    </div>
  );
};

export default Square;

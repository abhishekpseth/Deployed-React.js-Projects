import React, { useEffect, useRef, useState } from "react";

const StripColorPicker = ({ hue, setHue }) => {
  const [colorStripPosition, setColorStripPosition] = useState(0);
  const [isColorStripFocussed, setColorStripFocussed] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.rect(0, 0, 160, 10);

    const gradient = ctx.createLinearGradient(0, 0, 160, 0);
    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [canvas]);

  useEffect(() => {
    if (!isColorStripFocussed && hue >= 0 && hue <= 360)
      // boundary conditions added
      setColorStripPosition((hue / 360) * 140);
  }, [hue]);

  const mouseDownHandler = () => {
    setColorStripFocussed(true);
  };

  useEffect(() => {
    function computeHue(x) {
      return Math.round(x * (360 / 140));
    }

    const handleMouseMove = (e) => {
      if (isColorStripFocussed) {
        const newPosition = colorStripPosition + e.movementX;
        const clampedPosition = Math.min(Math.max(newPosition, 0), 140);
        setColorStripPosition(clampedPosition);
        const updatedHue = computeHue(clampedPosition);
        // setSelectedColor({ h: updatedHue, s: 100, l: 50 });
        setHue(updatedHue);
      }
    };

    const handleMouseUp = () => {
      setColorStripFocussed(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isColorStripFocussed, colorStripPosition, setColorStripPosition]);

  return (
    <div className="relative w-[160px] h-[10px] rounded-[4px] cursor-pointer flex items-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden border">
        <canvas ref={canvas}></canvas>
      </div>
      <div
        onMouseDown={mouseDownHandler}
        className="absolute h-[20px] w-[20px] bg-white rounded-full grid place-content-center"
        style={{
          left: colorStripPosition,
          backgroundColor: `hsl(${hue},${100}%,${50}%)`,
          boxShadow: "0 0 3px 1px #bdc1c6",
          border: "2px solid #fff",
        }}
      ></div>
    </div>
  );
};

export default StripColorPicker;

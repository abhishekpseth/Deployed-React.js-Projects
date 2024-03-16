import React from "react";

const ColorInputBox = ({
  text,
  colorValue,
  setColorValue,
  setInputFocussed,
}) => {
  return (
    <div>
      <div
        style={{
          color: "#5f6368",
          fontSize: "11px",
          fontWeight: "500",
        }}
      >
        {text}
      </div>
      <input
        value={colorValue}
        onChange={(e) => {
          if (e.target.value.length <= 3) {
            setColorValue(e.target.value);
          }
        }}
        onFocus={() => setInputFocussed(true)}
        onBlur={() => {
          setInputFocussed(false);
          if (colorValue.length === 0) {
            setColorValue(0);
          } else if (parseInt(colorValue) > 255) {
            setColorValue(colorValue.substring(0, 2));
          }
        }}
        style={{
          width: "42.5px",
          height: "36px",
          padding: "1px 8px",
          fontSize: "14px",
          margin: "8px 0px",
          color: "#3c4043",
          border: "1px solid #dadce0",
          borderRadius: "4px",
        }}
        maxLength={3}
      ></input>
    </div>
  );
};

export default ColorInputBox;

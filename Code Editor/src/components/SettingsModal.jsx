import React, { useContext, useEffect, useState } from "react";
import EditorContext from "../context/EditorContext";

const SettingsModal = ({ isSettingsModalOpen }) => {
  const {fontSize, setFontSize, theme, setTheme} = useContext(EditorContext);
  const fontSizesArray = [12, 14, 16, 18, 20, 22, 24];

  const themeOptions = [
    { value: "vs-code", label: "VS Code" },
    { value: "material", label: "Material" },
    { value: "dracula", label: "Dracula" },
  ];

  return (
    isSettingsModalOpen && (
      <div
        className="absolute bg-tabGray top-[120%] right-0 flex flex-col justify-center px-4 py-3 gap-3 rounded-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-start text-[20px] font-bold">
            <h1>Settings</h1>
          </div>
          <hr
            style={{
              background: "#6F38C5",
              height: "5px",
              border: "none",
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start gap-10">
            <label
              htmlFor="fontSizes"
              className="flex flex-col justify-start items-start"
            >
              <h1>Font Size</h1>
              <p className="text-gray-400 whitespace-nowrap">
                Choose your preferred font size.
              </p>
            </label>

            <select
              name="fontSizes"
              onChange={(e) => {
                setFontSize(e.target.value);
              }}
              value={fontSize}
              className="cursor-pointer outline-none bg-tabGray"
            >
              {fontSizesArray.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-start gap-10">
            <label
              htmlFor="themes"
              className="flex flex-col justify-start items-start"
            >
              <h1>Themes</h1>
              <p className="text-gray-400 whitespace-nowrap">
                Choose your preferred theme.
              </p>
            </label>
            <select
              name="themes"
              onChange={(e) => {
                setTheme(e.target.value);
              }}
              value={theme}
              className="cursor-pointer outline-none bg-tabGray"
            >
              {themeOptions.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsModal;

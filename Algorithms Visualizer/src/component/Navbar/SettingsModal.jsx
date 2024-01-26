import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullScreen,
  setSimulationSpeed,
  setThemeMode,
} from "../../features/dijsktraSlice";
import { GoScreenFull } from "react-icons/go";
import { RiFullscreenExitLine } from "react-icons/ri";

const SettingsModal = () => {
  const simulationSpeed = useSelector(
    (state) => state.dijsktra.simulationSpeed
  );

  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.dijsktra.isFullScreen);
  const themeMode = useSelector((state) => state.dijsktra.themeMode);

  useEffect(() => {
    localStorage.setItem("stored-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("stored-simulationSpeed", simulationSpeed);
  }, [simulationSpeed]);

  return (
    <div
      className="absolute bg-gray-900 top-[120%] right-0 flex flex-col justify-center px-4 py-3 gap-3 rounded-lg z-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-start text-[12px] sm:text-[18px] font-bold">
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
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex items-start justify-between gap-4 sm:gap-10">
          <label
            htmlFor="speed"
            className="flex flex-col items-start justify-start"
          >
            <h1 className="whitespace-nowrap text-[10px] sm:text-[16px]">
              Set Speed
            </h1>
          </label>

          <select
            name="fontSizes"
            onChange={(e) => {
              dispatch(setSimulationSpeed(e.target.value));
            }}
            value={simulationSpeed}
            className="bg-transparent outline-none cursor-pointer text-[10px] sm:text-[16px]"
          >
            <option value="fast" className="text-white bg-gray-900">
              Fast
            </option>
            <option value="average" className="text-white bg-gray-900">
              Average
            </option>
            <option value="slow" className="text-white bg-gray-900">
              Slow
            </option>
          </select>
        </div>

        <div className="flex items-start justify-between gap-4 sm:gap-10">
          <label
            htmlFor="theme"
            className="flex flex-col items-start justify-start"
          >
            <h1 className="whitespace-nowrap text-[10px] sm:text-[16px]">
              Set Theme
            </h1>
          </label>

          <select
            name="fontSizes"
            onChange={(e) => {
              dispatch(setThemeMode(e.target.value));
            }}
            value={themeMode}
            className="bg-transparent outline-none cursor-pointer text-[10px] sm:text-[16px]"
          >
            <option value="light" className="text-white bg-gray-900">
              Light
            </option>
            <option value="dark" className="text-white bg-gray-900">
              Dark
            </option>
          </select>
        </div>

        <div className="flex items-start justify-between gap-4 sm:gap-10">
          <h1
            className="whitespace-nowrap text-[10px] sm:text-[16px] text-left"
            onClick={() => {
              dispatch(setFullScreen(!isFullScreen));
            }}
          >
            {isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </h1>
          {isFullScreen ? (
            <RiFullscreenExitLine
              onClick={() => {
                dispatch(setFullScreen(!isFullScreen));
              }}
            />
          ) : (
            <GoScreenFull
              onClick={() => {
                dispatch(setFullScreen(!isFullScreen));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

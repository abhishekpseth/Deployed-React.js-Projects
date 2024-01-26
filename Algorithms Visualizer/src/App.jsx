import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar/Navbar";
import Grid from "./component/Grid";
import { useDispatch, useSelector } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  setFullScreen,
  setSimulationSpeed,
  setThemeMode,
} from "./features/dijsktraSlice";
import GridSm from "./component/GridSm";
import Footer from "./component/Footer";

const App = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("stored-theme");
    const storedSimulationSpeed = localStorage.getItem(
      "stored-simulationSpeed"
    );

    if (storedTheme) dispatch(setThemeMode(storedTheme));
    if (storedSimulationSpeed)
      dispatch(setSimulationSpeed(storedSimulationSpeed));
  }, []);

  const isFullScreen = useSelector((state) => state.dijsktra.isFullScreen);
  const dispatch = useDispatch();

  const handle = useFullScreenHandle();

  useEffect(() => {
    if (!handle.active) {
      dispatch(setFullScreen(false));
    }
  }, [handle]);

  useEffect(() => {
    if (isFullScreen && !DocumentType.fullscreenElement) {
      handle.enter();
    } else {
      handle.exit();
    }
  }, [isFullScreen]);

  const themeMode = useSelector((state) => state.dijsktra.themeMode);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <FullScreen handle={handle}>
      <div
        className={`flex flex-col min-h-screen overflow-scroll-y relative ${
          themeMode === "light"
            ? "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-500"
            : "bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"
        } `}
      >
        <div>
          <Navbar />
        </div>
        <div className="flex items-start justify-center w-full h-full pb-[50px]">
          <Grid />
        </div>
        <Footer />
      </div>
    </FullScreen>
  );
};

export default App;

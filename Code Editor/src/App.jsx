import React, { useContext, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import EditorContext from "./context/EditorContext";

const App = () => {
  const { isFullScreen, setFullScreen } = useContext(EditorContext);

  const handle = useFullScreenHandle();

  useEffect(() => {
    if (!handle.active) {
      setFullScreen(false);
    }
  }, [handle]);

  useEffect(() => {
    if (isFullScreen && !document.fullscreenElement) {
      handle.enter();
    } else {
      handle.exit();
    }
  }, [isFullScreen]);

  return (
    <FullScreen handle={handle}>
      <div
        className={`h-screen ${
          isFullScreen ? "fullscreen" : ""
        } grid grid-rows-[min-content_auto]`}
      >
        <NavBar />
        <Outlet />
      </div>
    </FullScreen>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import EditorContext from "./EditorContext";

const EditorContextProvider = ({ children }) => {
  const [clearAll, setClearAll] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState("vs-code");
  const [saveData, setSaveData] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isDownloading, setDownload] = useState(false);
  const [device, setDevice] = useState("pc");

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDevice("mobile");
      } else if (screenSize < 768) {
        setDevice("tablet");
      } else {
        setDevice("pc");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <EditorContext.Provider
      value={{
        fontSize,
        setFontSize,
        theme,
        setTheme,
        clearAll,
        setClearAll,
        saveData,
        setSaveData,
        autoSave,
        setAutoSave,
        isFullScreen,
        setFullScreen,
        isDownloading,
        setDownload,
        device,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;

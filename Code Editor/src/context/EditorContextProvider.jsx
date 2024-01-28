import React, { useState } from "react";
import EditorContext from "./EditorContext";

const EditorContextProvider = ({ children }) => {
  const [clearAll, setClearAll] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState("vs-code");
  const [saveData, setSaveData] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isDownloading, setDownload] = useState(false);
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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;

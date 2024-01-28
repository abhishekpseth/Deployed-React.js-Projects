import React from "react";
import EditorContextProvider from "./context/EditorContextProvider";
import App from "./App";

const Layout = () => {
  return (
    <EditorContextProvider>
      <App />
    </EditorContextProvider>
  );
};

export default Layout;

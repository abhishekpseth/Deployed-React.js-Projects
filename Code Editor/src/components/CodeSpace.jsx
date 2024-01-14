import React, { useContext, useEffect, useState } from "react";
import { DiHtml5, DiVim } from "react-icons/di";
import { FaCss3Alt } from "react-icons/fa";
import { DiJavascript } from "react-icons/di";
import { FaTrash } from "react-icons/fa";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";

import { xmlLanguage } from "@codemirror/lang-xml";
import { cssLanguage } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { material } from "@uiw/codemirror-theme-material";
import { dracula } from "@uiw/codemirror-theme-dracula";
import EditorContext from "../context/EditorContext";
import JSZip from "jszip";

const CodeSpace = ({ layout, setSrcDoc }) => {
  const [html, setHtml] = useState(
    () => JSON.parse(localStorage.getItem("html-code")) || ""
  );
  const [css, setCss] = useState(
    () => JSON.parse(localStorage.getItem("css-code")) || ""
  );
  const [js, setJs] = useState(
    () => JSON.parse(localStorage.getItem("js-code")) || ""
  );

  const [currentTheme, setCurrentTheme] = useState(vscodeDark); // values here is object
  const {
    fontSize,
    setFontSize,
    clearAll,
    theme,
    setTheme,
    saveData,
    setSaveData,
    autoSave,
    setAutoSave,
    setClearAll,
    isDownloading,
    setDownload,
  } = useContext(EditorContext);

  useEffect(() => {
    const storedTheme = localStorage.getItem("stored-theme");
    const storedFontSize = localStorage.getItem("stored-fontSize");
    const storedAutoSave = localStorage.getItem("stored-autoSave");

    if (storedTheme) setTheme(storedTheme);
    if (storedFontSize) setFontSize(+storedFontSize);
    if (storedAutoSave) setAutoSave(storedAutoSave === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("stored-theme", theme);
    switch (theme) {
      case "material":
        setCurrentTheme(material);
        break;
      case "dracula":
        setCurrentTheme(dracula);
        break;
      default:
        setCurrentTheme(vscodeDark);
        break;
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("stored-fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (clearAll) {
      setHtml("");
      setCss("");
      setJs("");
      setClearAll(false);
    }
  }, [clearAll]);

  useEffect(() => {
    setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);

    localStorage.setItem("stored-autoSave", autoSave.toString());
    if (autoSave === true) {
      localStorage.setItem("html-code", JSON.stringify(html));
      localStorage.setItem("css-code", JSON.stringify(css));
      localStorage.setItem("js-code", JSON.stringify(js));
    }
  }, [html, css, js, autoSave]);

  useEffect(() => {
    if (saveData) {
      localStorage.setItem("html-code", JSON.stringify(html));
      localStorage.setItem("css-code", JSON.stringify(css));
      localStorage.setItem("js-code", JSON.stringify(js));
      setSaveData(false);
    }
  }, [saveData]);

  const handleDownload = async () => {
    const zip = new JSZip();

    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.zip";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isDownloading) {
      if (html == "" && css == "" && js == "") {
        alert("Please write some code in the editor");
      } else {
        handleDownload();
      }
      setDownload(false);
    }
  }, [isDownloading]);

  const langList = [
    {
      name: "HTML",
      iconColor: "text-red-500",
      icon: <DiHtml5 />,
      value: html,
      function: (value) => setHtml(value),
    },
    {
      name: "CSS",
      iconColor: "text-blue-500",
      icon: <FaCss3Alt />,
      value: css,
      function: (value) => setCss(value),
    },
    {
      name: "JS",
      iconColor: "text-yellow-500",
      icon: <DiJavascript />,
      value: js,
      function: (value) => setJs(value),
    },
  ];

  return (
    <Split
      sizes={[33.3, 33.3, 33.3]}
      minSize={60}
      className={`${
        layout === "left" || layout === "right"
          ? "h-[calc(100vh-60px)] flex-col"
          : "h-full flex"
      }`}
      direction={`${
        layout === "left" || layout === "right" ? "vertical" : "horizontal"
      }`}
    >
      {langList.map((lang, index) => (
        <div key={lang.name} className="flex flex-col">
          <div className="bg-backgroundBlack flex justify-between items-center">
            <div className="bg-tabGray w-[15vw] sm:w-[12vw] md:w-[9vw] flex items-center justify-center gap-[5px] py-[8px] border-t-2 border-gray-300">
              <div className={lang.iconColor} style={{ fontSize: "20px" }}>
                {lang.icon}
              </div>
              <div className="text-gray-400 text-[12px] sm:text-[16px]">
                {lang.name}
              </div>
            </div>
            <div
              className="animated-icon text-gray-500 mr-6"
              onClick={() => lang.function("")}
            >
              <FaTrash />
            </div>
          </div>
          <div className="bg-tabGray h-full overflow-auto">
            <CodeMirror
              onChange={(value) => lang.function(value)}
              value={lang.value}
              theme={currentTheme}
              extensions={[xmlLanguage, cssLanguage, javascript()]}
              style={{ fontSize: +fontSize }}
            />
          </div>
        </div>
      ))}
    </Split>
  );
};

export default CodeSpace;

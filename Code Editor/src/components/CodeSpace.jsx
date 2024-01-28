import React, { useContext, useEffect, useState } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { DiHtml5, DiJavascript } from "react-icons/di";
import { FaCss3Alt, FaTrash } from "react-icons/fa";

import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";

import { cssLanguage } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { xmlLanguage } from "@codemirror/lang-xml";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { material } from "@uiw/codemirror-theme-material";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import JSZip from "jszip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorContext from "../context/EditorContext";
import DetailedViewBtns from "./DetailedViewBtns";

const CodeSpace = ({ layout, setSrcDoc, codeSpaceSize, setCodeSpaceSize }) => {
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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [langTabActive, setLangTabActive] = useState("HTML");
  const [isResultTabActive, setResultTabActive] = useState(true);

  useEffect(() => {
    if (isResultTabActive) {
      setCodeSpaceSize(50);
    } else {
      // close the i frame means change codespace areat to 100% width
      if (layout === "left" || layout === "top") setCodeSpaceSize(100);
      else setCodeSpaceSize(0);
    }
  }, [isResultTabActive]);

  if (isSmallScreen) {
    return (
      <div className="h-full bg-backgroundBlack">
        <div className="flex gap-1 text-white text-[14px]">
          {langList.map((lang, index) => (
            <button
              key={index}
              className={`px-4 py-1 ${
                langTabActive === lang.name ? "bg-gray-400" : "bg-gray-600"
              }`}
              onClick={() => {
                if (lang.name === langTabActive) {
                  if (layout === "left" || layout === "top")
                    setCodeSpaceSize(0);
                  else setCodeSpaceSize(100);
                } else {
                  setLangTabActive(lang.name);
                  setCodeSpaceSize(50);
                }
              }}
            >
              {lang.name}
            </button>
          ))}

          <button
            className={`px-4 py-1  ${
              isResultTabActive ? "bg-gray-400" : "bg-gray-600"
            }`}
            onClick={() => setResultTabActive(!isResultTabActive)}
          >
            Result
          </button>
        </div>
        <div
          className={`h-full overflow-auto bg-tabGray ${
            layout === "left" || layout === "right" ? "h-screen" : "h-full"
          }`}
        >
          <CodeMirror
            onChange={(value) => {
              const activeLang = langList.find(
                (lang) => lang.name === langTabActive
              );
              if (activeLang) {
                activeLang.function(value);
              }
            }}
            value={
              langList.find((lang) => lang.name === langTabActive)?.value || ""
            }
            theme={currentTheme}
            extensions={[xmlLanguage, cssLanguage, javascript()]}
            style={{ fontSize: +fontSize }}
          />
        </div>
        {(((layout === "left" || layout === "top") && codeSpaceSize === 0) ||
          ((layout === "right" || layout === "bottom") &&
            codeSpaceSize === 100)) && (
          <DetailedViewBtns
            layout={layout}
            setCodeSpaceSize={setCodeSpaceSize}
          />
        )}
      </div>
    );
  }

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
          <div className="flex items-center justify-between bg-backgroundBlack">
            <div className="bg-tabGray w-[15vw] sm:w-[12vw] md:w-[9vw] flex items-center justify-center gap-[5px] py-[8px] border-t-2 border-gray-300">
              <div className={lang.iconColor} style={{ fontSize: "20px" }}>
                {lang.icon}
              </div>
              <div className="text-gray-400 text-[12px] sm:text-[16px]">
                {lang.name}
              </div>
            </div>
            <div className="flex gap-4 mr-4">
              <div
                className="text-gray-500 animated-icon"
                onClick={() => lang.function("")}
              >
                <FaTrash />
              </div>
              <div
                className="text-lg text-gray-500 animated-icon"
                onClick={() => {
                  if (lang.value) {
                    navigator.clipboard.writeText(lang.value);
                    toast(`Copied ${lang.name} to clipboard`);
                  } else {
                    alert(`${lang.name} is empty`);
                  }
                }}
              >
                <BiSolidCopy />
              </div>
            </div>
          </div>
          <div className="h-full overflow-auto bg-tabGray">
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

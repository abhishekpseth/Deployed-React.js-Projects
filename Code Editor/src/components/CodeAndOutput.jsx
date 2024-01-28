import React, { useEffect } from "react";
import Split from "react-split";
import CodeSpace from "./CodeSpace";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CodeAndOutput = () => {
  const [srcDoc, setSrcDoc] = useState("");
  let { layout } = useParams();
  if (layout === undefined) layout = "left";
  const [codeSpaceSize, setCodeSpaceSize] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (layout === "left" && screenSize < 600) {
        window.location.replace("/layout/top");
      } else if (layout === "right" && screenSize < 600) {
        window.location.replace("/layout/bottom");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Split
      sizes={[codeSpaceSize, 100 - codeSpaceSize]}
      minSize={0}
      className={`-z-1 flex ${
        layout === "right"
          ? "flex-col-reverse max-h-[calc(100vh-60px)] sm:flex-row-reverse"
          : layout === "top"
          ? "flex-col max-h-[calc(100vh-60px)]" // max height ko simple height kr doge to hmesha 40% pe rhega
          : layout === "bottom"
          ? "flex-col-reverse max-h-[calc(100vh-60px)]"
          : "flex-col max-h-[calc(100vh-60px)] sm:flex-row"
      } h-full`}
      direction={`${
        layout === "left" || layout === "right" ? "horizontal" : "vertical"
      }`}
    >
      <div className="h-full">
        <CodeSpace
          layout={layout}
          setSrcDoc={setSrcDoc}
          codeSpaceSize={codeSpaceSize}
          setCodeSpaceSize={setCodeSpaceSize}
        />
      </div>
      <div>
        <iframe
          srcDoc={srcDoc}
          className="w-full h-full bg-white"
          allowFullScreen
        ></iframe>
      </div>
    </Split>
  );
};

export default CodeAndOutput;

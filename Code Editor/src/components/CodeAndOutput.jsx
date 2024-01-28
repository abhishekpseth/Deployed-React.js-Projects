import React, { useContext, useEffect } from "react";
import Split from "react-split";
import CodeSpace from "./CodeSpace";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EditorContext from "../context/EditorContext";

const CodeAndOutput = () => {
  const [srcDoc, setSrcDoc] = useState("");
  const { device } = useContext(EditorContext);
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  const [codeSpaceSize, setCodeSpaceSize] = useState(50);

  useEffect(() => {
    if (layout === "left" && (device == "mobile" || device === "tablet")) {
      window.location.replace("/layout/top");
    } else if (
      layout === "right" &&
      (device == "mobile" || device === "tablet")
    ) {
      window.location.replace("/layout/bottom");
    }
  }, [device]);

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

import React from "react";
import Split from "react-split";
import CodeSpace from "./CodeSpace";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const CodeAndOutput = () => {
  const [srcDoc, setSrcDoc] = useState("");
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  return (
    <Split
      sizes={[40, 60]}
      minSize={60}
      className={`-z-1 flex ${
        layout === "right"
          ? "flex-row-reverse"
          : layout === "top"
          ? "flex-col max-h-[calc(100vh-60px)]" // max height ko simple height kr doge to hmesha 40% pe rhega
          : layout === "bottom"
          ? "flex-col-reverse max-h-[calc(100vh-60px)]"
          : ""
      } h-full`}
      direction={`${
        layout === "left" || layout === "right" ? "horizontal" : "vertical"
      }`}
    >
      <div className="h-full">
        <CodeSpace layout={layout} setSrcDoc={setSrcDoc}/>
      </div>
      <div>
        <iframe srcDoc={srcDoc} className="bg-white w-full h-full" allowFullScreen></iframe>
      </div>
    </Split>
  );
};

export default CodeAndOutput;

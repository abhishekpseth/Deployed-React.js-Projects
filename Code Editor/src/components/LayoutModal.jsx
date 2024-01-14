import React from "react";
import { LuLayoutPanelTop } from "react-icons/lu";
import { useParams } from "react-router-dom";

const LayoutModal = ({ isLayoutModalOpen, setLayoutChange }) => {
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  return (
    isLayoutModalOpen && (
      <div
        className="absolute top-[120%] right-0 px-4 py-2 bg-tabGray flex flex-col border border-backgroundBlack rounded-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3 className=" whitespace-nowrap text-[20px]">Change View</h3>
        <div className="flex items-center justify-center mt-4 text-[24px] border border-gray-600 rounded-lg">
          <a
            href={`/layout/left`}
            className={`px-3 py-2 border-r border-gray-600 rounded-l ${
              layout === "left" ? "bg-gray-600" : ""
            } hover:bg-gray-500`}
            onClick={() => setLayoutChange("left")}
          >
            <LuLayoutPanelTop className="rotate-90" />
          </a>

          <a
            href={`/layout/top`}
            className={`px-3 py-2 border-r border-gray-600 ${
              layout === "top" ? "bg-gray-600" : ""
            } hover:bg-gray-500`}
            onClick={() => setLayoutChange("top")}
          >
            <LuLayoutPanelTop className="rotate-180" />
          </a>

          <a
            href={`/layout/right`}
            className={`px-3 py-2 border-r border-gray-600 ${
              layout === "right" ? "bg-gray-600" : ""
            } hover:bg-gray-500`}
            onClick={() => setLayoutChange("bottom")}
          >
            <LuLayoutPanelTop className="-rotate-90" />
          </a>

          <a
            href={`/layout/bottom`}
            className={`px-3 py-2 rounded-r ${
              layout === "bottom" ? "bg-gray-600" : ""
            } hover:bg-gray-500`}
            onClick={() => setLayoutChange("right")}
          >
            <LuLayoutPanelTop />
          </a>
        </div>
      </div>
    )
  );
};

export default LayoutModal;

import React, { useContext, useEffect, useState } from "react";
import { LuLayoutPanelTop } from "react-icons/lu";
import { useParams } from "react-router-dom";
import EditorContext from "../context/EditorContext";

const LayoutModal = ({ isLayoutModalOpen }) => {
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  const { device } = useContext(EditorContext);

  const layoutsArray = [
    {
      direction: "left",
      rotate: "rotate-90",
      extraClass: "border-r rounded-l",
    },
    {
      direction: "top",
      rotate: "rotate-180",
      extraClass: "border-r rounded-l sm:rounded-none",
    },
    {
      direction: "right",
      rotate: "-rotate-90",
      extraClass: "sm:border-r rounded-r sm:rounded-none",
    },
    {
      direction: "bottom",
      rotate: "",
      extraClass: "rounded-r",
    },
  ];

  return (
    isLayoutModalOpen && (
      <div
        className="absolute sm:top-[120%] right-[130%] sm:right-0 px-4 py-2 bg-tabGray flex flex-col gap-2 sm:gap-3 border border-backgroundBlack rounded-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex justify-start text-[16px] sm:text-[20px] font-bold">
            <h1>Layout</h1>
          </div>
          <hr
            style={{
              background: "#6F38C5",
              height: "5px",
              border: "none",
            }}
          />
        </div>

        <div className="flex items-center justify-center text-[24px] border border-gray-600 rounded-lg">
          {layoutsArray.map((layoutElement, index) => {
            if (
              device === "mobile" &&
              (layoutElement.direction === "left" ||
                layoutElement.direction === "right")
            )
              return;

            return (
              <a
                key={index}
                href={`/layout/${layoutElement.direction}`}
                className={`px-3 w-full grid place-content-center py-2 border-gray-600 ${
                  layoutElement.extraClass
                }  ${
                  layout === layoutElement.direction ? "bg-gray-600" : ""
                } hover:bg-gray-500`}
              >
                <LuLayoutPanelTop className={layoutElement.rotate} />
              </a>
            );
          })}
        </div>
      </div>
    )
  );
};

export default LayoutModal;

import React from "react";
import useSheetStore from "../../SheetStore";
import { RxCrossCircled } from "react-icons/rx";
import ClickAwayListener from "react-click-away-listener";

const CurrentFeatures = () => {
  const setShowCurrentFeaturesModal = useSheetStore(
    (state) => state.setShowCurrentFeaturesModal
  );

  const featuresArray = [
    "UI similar to Google Sheets",
    "Height and Width resizer for rows and columns",
    "Range selection",
    "Dynamic document title (project name can be edited)",
    "Adjustable Font Size",
    "Bold, Italics & Strike through options",
    "Font & Background colors with custom color selection option using color picker built from scratch (no dependencies)",
    "Horizontal and Vertical Align",
    "Adjustable text direction",
    "Editable Address bar (for selected cell and range)",
    "Editable function bar (to show current cell data and functions)",
    "SUM and AVERAGE keywords for computations over a range",
  ];

  return (
    <div className="fixed top-0 left-0 z-50 grid w-screen h-screen border border-none place-content-center">
      <ClickAwayListener onClickAway={() => setShowCurrentFeaturesModal(false)}>
        <div className="bg-white h-[50vh] w-[50vw] shadow-lg rounded-lg">
          <div className="text-green-700 font-bold text-[22px] h-[20%] flex items-center justify-between px-[20px] bg-gray-50 rounded-lg">
            <div>Current Features</div>
            <RxCrossCircled
              onClick={() => setShowCurrentFeaturesModal(false)}
              className="cursor-pointer text-[30px]"
            />
          </div>
          <div className="p-[20px] h-[80%] overflow-auto">
            <ul>
              {featuresArray.map((feature, index) => (
                <li key={feature}>{`${index + 1}. ${feature}`}</li>
              ))}
            </ul>

            <div className="p-[20px] w-full text-black flex justify-center">
              <div className="text-right">
                <h1 className="text-[32px] font-bold text-gray-500">
                  New <span className="text-green-500">features</span>
                </h1>
                <h2
                  className="text-[24px] font-bold text-yellow-600"
                  style={{ lineHeight: "24px" }}
                >
                  coming soon!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default CurrentFeatures;

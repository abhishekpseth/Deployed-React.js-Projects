import React, { useContext, useEffect, useRef, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import LayoutModal from "./LayoutModal";
import { IoMdSettings } from "react-icons/io";
import SettingsModal from "./SettingsModal";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { IoMdCloudDownload } from "react-icons/io";
import EditorContext from "../context/EditorContext";

const OptionButtons = () => {
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  const [isLayoutModalOpen, setLayoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [layoutChange, setLayoutChange] = useState();

  const {
    setClearAll,
    setSaveData,
    autoSave,
    setAutoSave,
    isFullScreen,
    setFullScreen,
    isDownloading,
    setDownload,
  } = useContext(EditorContext);

  useEffect(() => {
    if (isLayoutModalOpen === true) setSettingsModalOpen(false);
  }, [isLayoutModalOpen]);

  return (
    <>
      {/* Auto Save */}
      <button
        className="cursor-pointer px-4 py-2 flex justify-center items-center gap-2 rounded-md relative bg-gray-600 active:bg-gray-500"
        onClick={() => {
          setAutoSave(!autoSave);
        }}
      >
        <FaCloud className={`${autoSave ? "text-yellow-400" : "text-white"}`} />
        <h1>Auto Save</h1>
      </button>

      {/* Save */}
      <button
        className="cursor-pointer px-4 py-2 flex justify-center items-center gap-2 rounded-md relative bg-gray-600 active:bg-gray-500 delay-300"
        onClick={() => {
          setSaveData(true);
        }}
      >
        <FaSave />
        <h1>Save</h1>
      </button>

      {/* Clear All*/}
      <button
        className="cursor-pointer px-4 py-2 flex justify-center items-center gap-2 rounded-md relative bg-gray-600 active:bg-gray-500 delay-300"
        onClick={() => {
          setClearAll(true);
        }}
      >
        <FaTrash />
        <h1>Clear All</h1>
      </button>

      {/* Download */}
      <button
        className="cursor-pointer px-4 py-2 flex justify-center items-center gap-2 rounded-md relative bg-gray-600 active:bg-gray-500 delay-300"
        onClick={() => setDownload(true)}
      >
        <IoMdCloudDownload className="text-[20px]" />
        <h1>Download</h1>
      </button>

      {/* Settings */}
      <button
        className={`cursor-pointer px-4 py-2 flex justify-center items-center gap-2 rounded-md relative ${
          isSettingsModalOpen ? "bg-gray-400" : "bg-gray-600"
        }`}
        onClick={() => {
          setSettingsModalOpen(!isSettingsModalOpen);
        }}
      >
        <IoMdSettings
          className={`text-[20px] ${
            isSettingsModalOpen ? "rotate-90 delay-2000" : ""
          }`}
        />
        <h1 className="text-[18px]">Settings</h1>
        <SettingsModal
          isSettingsModalOpen={isSettingsModalOpen}
          setSettingsModalOpen={setSettingsModalOpen}
        />
      </button>

      {/* Layout */}
      <button
        className={`cursor-pointer relative px-3 py-3 text-[20px] rounded-md ${
          isLayoutModalOpen ? "bg-gray-400" : "bg-gray-600"
        }`}
        onClick={() => {
          setLayoutModalOpen(!isLayoutModalOpen);
        }}
      >
        <LuLayoutDashboard />
        <LayoutModal
          isLayoutModalOpen={isLayoutModalOpen}
          setLayoutChange={setLayoutChange}
        />
      </button>

      {/* FullScreen */}
      <button
        className="cursor-pointer relative px-3 py-3 text-[24px] rounded-md bg-gray-600"
        onClick={() => {
          setFullScreen(!isFullScreen);
        }}
      >
        <AiOutlineFullscreen className={isFullScreen ? "scale-125 " : ""} />
      </button>
    </>
  );
};

export default OptionButtons;

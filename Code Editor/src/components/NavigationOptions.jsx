import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaCloud, FaSave, FaTrash } from "react-icons/fa";
import { IoMdCloudDownload, IoMdSettings } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { useParams } from "react-router-dom";
import EditorContext from "../context/EditorContext";
import Button from "./Button";
import LayoutModal from "./LayoutModal";
import SettingsModal from "./SettingsModal";

const NavigationOptions = () => {
  let { layout } = useParams();
  if (layout === undefined) layout = "left";

  const [isLayoutModalOpen, setLayoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

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
    if (isLayoutModalOpen === true) {
      setSettingsModalOpen(false);
    }
  }, [isLayoutModalOpen]);

  useEffect(() => {
    if (isSettingsModalOpen === true) {
      setLayoutModalOpen(false);
    }
  }, [isSettingsModalOpen]);

  const buttonData = [
    {
      bntName: "auto-save",
      text: "Auto Save",
      icon: (
        <FaCloud className={`${autoSave ? "text-yellow-400" : "text-white"}`} />
      ),
      additionalClass: "",
      function: () => setAutoSave(!autoSave),
    },
    {
      bntName: "save",
      text: "Save",
      icon: <FaSave />,
      additionalClass: "",
      function: () => setSaveData(true),
    },
    {
      bntName: "clear-all",
      text: "Clear All",
      icon: <FaTrash />,
      additionalClass: "",
      function: () => setClearAll(true),
    },
    {
      bntName: "download",
      text: "Download",
      icon: <IoMdCloudDownload />,
      additionalClass: "",
      function: () => setDownload(true),
    },
    {
      bntName: "settings",
      text: "Settings",
      icon: (
        <IoMdSettings
          className={`text-[20px] ${
            isSettingsModalOpen ? "rotate-90 delay-2000" : ""
          }`}
        />
      ),
      additionalClass: `cursor-pointer px-3 min-w-[50px] lg:min-h-[45px] min-h-[35px] md:px-4 md:py-2 flex justify-center items-center gap-2 rounded-md relative ${
        isSettingsModalOpen ? "bg-gray-400" : "bg-gray-600"
      }`,
      additionalComponent: (
        <SettingsModal
          isSettingsModalOpen={isSettingsModalOpen}
          setSettingsModalOpen={setSettingsModalOpen}
        />
      ),
      function: () => setSettingsModalOpen(!isSettingsModalOpen),
    },
    {
      bntName: "layout",
      text: "",
      icon: <LuLayoutDashboard />,
      additionalClass: `grid place-content-center cursor-pointer relative px-3 min-w-[50px] lg:min-h-[45px] min-h-[35px] text-[20px] rounded-md ${
        isLayoutModalOpen ? "bg-gray-400" : "bg-gray-600"
      }`,
      additionalComponent: (
        <LayoutModal isLayoutModalOpen={isLayoutModalOpen} />
      ),
      function: () => setLayoutModalOpen(!isLayoutModalOpen),
    },
    {
      bntName: "fullscreen",
      text: "",
      icon: (
        <AiOutlineFullscreen className={isFullScreen ? "scale-125 " : ""} />
      ),
      additionalClass:
        "grid place-content-center cursor-pointer relative px-3 min-w-[50px] lg:min-h-[45px] min-h-[35px] text-[24px] rounded-md bg-gray-600",
      function: () => setFullScreen(!isFullScreen),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row items">
      {buttonData.map((btn, index) => (
        <Button
          key={index}
          btnName={btn.bntName}
          icon={btn.icon}
          text={btn.text}
          additionalClass={btn.additionalClass}
          additionalComponent={btn.additionalComponent}
          onClick={() => btn.function()}
        />
      ))}
    </div>
  );
};

export default NavigationOptions;

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { GiBroom } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux"; // Corrected this line
import {
  setClearBtnPressed,
  setFullScreen,
  setSimulationStart,
} from "../../features/dijsktraSlice";
import SettingsModal from "./SettingsModal";
import InstructionModal from "./InstructionModal";
import Button from "./Button";

const NavOptions = () => {
  const dispatch = useDispatch();
  const isSimulationStart = useSelector(
    (state) => state.dijsktra.isSimulationStarted
  );

  const isBoardClear = useSelector((state) => state.dijsktra.isBoardClear);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isInstructionModalOpen, setInstructionModalOpen] = useState(false);

  const isFullScreen = useSelector((state) => state.dijsktra.isFullScreen);

  return (
    <div className="flex flex-wrap justify-center gap-4 text-white text-[18px]">
      <Button
        onClick={() => {
          dispatch(setSimulationStart(!isSimulationStart));
        }}
        btnName="visualize"
      >
        {isSimulationStart ? <FaPause /> : <FaPlay />}
        Visualize
      </Button>

      <Button
        onClick={() => {
          dispatch(setClearBtnPressed(true));
        }}
      >
        {isBoardClear ? (
          <>
            <FaCheckCircle /> Cleared
          </>
        ) : (
          <>
            <GiBroom /> Clear
          </>
        )}
      </Button>

      <Button onClick={() => setSettingsModalOpen(!isSettingsModalOpen)}>
        <IoMdSettings />
        Settings
        {isSettingsModalOpen && <SettingsModal />}
      </Button>

      <Button onClick={() => setInstructionModalOpen(!isInstructionModalOpen)}>
        <FaQuestionCircle />
        How to
        {isInstructionModalOpen && (
          <InstructionModal setInstructionModalOpen={setInstructionModalOpen} />
        )}
      </Button>
    </div>
  );
};

export default NavOptions;

import React, { useEffect, useRef, useState } from "react";
import { MdHistory } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import { MdLockOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { BsCloudCheck } from "react-icons/bs";
import useSheetStore from "../../../SheetStore";
import SheetsIcon from "./SheetsIcon.jsx";

const NavBar = () => {
  const [isNameEditable, setNameEditable] = useState(false);
  const [name, setName] = useState(
    () => localStorage.getItem("project-name") || "Untitled"
  );
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("project-name", name);
    inputRef.current?.style?.setProperty("width", `${(name.length + 4) * 8}px`);
    document.title = name;
  }, [name]);

  const setShowCurrentFeaturesModal = useSheetStore(
    (state) => state.setShowCurrentFeaturesModal
  );

  return (
    <div className="w-full px-[20px] py-[10px] flex justify-between items-center">
      <div className="flex gap-[10px] items-center">
        <div className="h-[30px] w-[30px]">
          <SheetsIcon />
        </div>
        <div>
          <div className="flex items-center">
            <input
              type="text"
              ref={inputRef}
              onChange={(event) => {
                if (isNameEditable) {
                  setName(event.target.value);
                }
              }}
              value={name}
              contentEditable={isNameEditable}
              onFocus={() => setNameEditable(true)}
              onBlur={() => setNameEditable(false)} // when input looses focus
              spellCheck="false"
              className="text-black bg-transparent px-[10px] hover:border hover:border-black rounded-md outline-none max-w-[60vw] overflow-hidden focus:border-2 focus:border-blue-700"
            />
            <div className="flex gap-[5px] items-center ">
              <div className="p-[6px] hover:bg-gray-200 hover:rounded-full">
                <IoStarOutline className="w-[16px] h-[16px]" />
              </div>
              <div className="p-[6px] hover:bg-gray-200 hover:rounded-full">
                <MdOutlineDriveFileMove className="w-[20px] h-[20px]" />
              </div>
              <div className="p-[6px] hover:bg-gray-200 hover:rounded-full">
                <BsCloudCheck className="w-[20px] h-[20px]" />
              </div>
            </div>
          </div>
          <div className="flex gap-[6px] pl-[5px] relative">
            <button className="hover:bg-gray-200 px-[5px]">File</button>
            <button className="hover:bg-gray-200 px-[5px]">Edit</button>
            <button className="hover:bg-gray-200 px-[5px]">View</button>
            <button className="hover:bg-gray-200 px-[5px]">Insert</button>
            <button className="hover:bg-gray-200 px-[5px]">Format</button>
            <button className="hover:bg-gray-200 px-[5px]">Data</button>
            <button className="hover:bg-gray-200 px-[5px]">Tools</button>
            <button className="hover:bg-gray-200 px-[5px]">Extensions</button>
            <button className="hover:bg-gray-200 px-[5px]">Help</button>
            <button
              onClick={() => setShowCurrentFeaturesModal(true)}
              className="bg-yellow-400 font-semibold absolute left-[500px] top-[-6px] rounded-lg text-nowrap  px-[5px] py-[6px]"
            >
              Current Features
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-center text-[#333]">
        <button className="p-[10px] hover:bg-gray-200 hover:rounded-full">
          <MdHistory className="h-[28px] w-[28px]" />
        </button>
        <button className="p-[10px] hover:bg-gray-200 hover:rounded-full">
          <MdOutlineMessage className="h-[28px] w-[28px] scale-x-[-1]" />
        </button>
        <button className="flex gap-[5px] items-center hover:bg-gray-200 px-[15px] py-[10px] hover:rounded-3xl">
          <SiGooglemeet className="h-[28px] w-[28px]" />
          <IoMdArrowDropdown />
        </button>
        <div className="flex items-center justify-center gap-[1px] h-[40px]">
          <button className="flex items-center bg-blue-200 pr-[10px] pl-[20px] rounded-l-3xl h-full gap-[5px] hover:bg-blue-300">
            <MdLockOutline className="h-[18px] w-[18px]" />
            <p className="text-[16px] font-semibold">Share</p>
          </button>
          <button className="bg-blue-200 px-[8px] rounded-r-3xl h-full flex items-center hover:bg-blue-300">
            <IoMdArrowDropdown />
          </button>
        </div>
        <div className="h-[35px] w-[35px] bg-red-500 rounded-full">
          <a href="https://abhishekpseth.github.io/Portfolio/" target="_blank">
            <img src="profile-pic2.JPG" className="rounded-full"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

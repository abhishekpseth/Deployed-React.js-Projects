import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCodepen, FaPen } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorContext from "../context/EditorContext";
import NavigationOptions from "./NavigationOptions";

const NavBar = () => {
  const [isNameEditable, setNameEditable] = useState(false);
  const [name, setName] = useState(
    () => localStorage.getItem("project-name") || "Untitled"
  );
  const inputRef = useRef(null);
  const penRef = useRef(null);
  const { clearAll, saveData } = useContext(EditorContext);

  useEffect(() => {
    if (clearAll) toast("Cleared All");
    if (saveData) toast("Data Saved in Local Storage");
  }, [clearAll, saveData]);

  useEffect(() => {
    localStorage.setItem("project-name", name);
    inputRef.current?.style?.setProperty("width", `${(name.length + 1) * 8}px`);
    document.title = name;
  }, [name]);

  useEffect(() => {
    isNameEditable && inputRef.current?.focus();
    isNameEditable
      ? penRef?.current?.style.setProperty("color", "orange")
      : penRef?.current?.style.setProperty("color", "white");
  }, [isNameEditable]);

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white bg-black border border-gray-700 lg:border-none">
      <div className="flex items-center justify-start gap-2">
        <div className="text-2xl lg:text-3xl">
          <FaCodepen />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center sm:gap-2 text-[14px] sm:text-[16px] lg:text-[18px]">
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
              onBlur={() => setNameEditable(false)} // when input looses focus
              spellCheck="false"
              className="text-white bg-transparent border-none outline-none max-w-[60vw] sm:max-w-[20vw] lg:max-w=[20vw] xl:max-w-[40vw] overflow-hidden"
            /> 
            <button ref={penRef}>
              <FaPen
                onClick={() => {
                  setNameEditable(!isNameEditable);
                }}
              />
            </button>
          </div>
          <h6 className="text-gray-400 text-[12px] sm:text-[14px] lg:text-[16px]">
            Abhisek Seth
          </h6>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
      <div className="hidden sm:block">
        <NavigationOptions />
      </div>

      {!showDrawer && (
        <div
          className="text-[18px] sm:hidden mr-3 cursor-pointer"
          onClick={() => {
            setShowDrawer((prev) => !prev);
          }}
        >
          <FaBars />
        </div>
      )}
      <div
        className={`z-10 flex flex-col items-center gap-[20px] fixed left-[100vw] top-[0px] w-[20vw] h-[100%] pt-[30px] bg-backgroundBlack transition-left ${
          showDrawer ? "left-[80vw]" : ""
        } sm:hidden`}
      >
        <div className="bg-white text-[10px] p-[8px] rounded-full grid place-content-center dark:text-black cursor-pointer">
          <ImCross onClick={() => setShowDrawer((prev) => !prev)} />
        </div>
        <NavigationOptions />
      </div>
    </div>
  );
};

export default NavBar;

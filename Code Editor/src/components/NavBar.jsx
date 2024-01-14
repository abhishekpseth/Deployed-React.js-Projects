import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCodepen, FaPen } from "react-icons/fa";
import OptionButtons from "./OptionButtons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorContext from "../context/EditorContext";

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
    inputRef.current?.style?.setProperty("width", `${name.length * 8}px`);
  }, [name]);

  useEffect(() => {
    isNameEditable && inputRef.current?.focus();
    isNameEditable
      ? penRef?.current?.style.setProperty("color", "orange")
      : penRef?.current?.style.setProperty("color", "white");
  }, [isNameEditable]);

  return (
    <div className="flex justify-between items-center bg-black text-white px-4 py-3">
      <div className="flex items-center justify-center gap-2">
        <div className="text-3xl">
          <FaCodepen />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center ">
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
              className="text-white bg-transparent border-none outline-none"
            />
            <button ref={penRef}>
              <FaPen
                onClick={() => {
                  setNameEditable(!isNameEditable);
                }}
              />
            </button>
          </div>
          <h6 className="text-gray-400 text-[16px]">Abhisek Seth</h6>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
        style={{ top: "10%", transform: "translateY(-10%)" }}
      />
      <div className="flex gap-2">
        <OptionButtons />
      </div>
    </div>
  );
};

export default NavBar;

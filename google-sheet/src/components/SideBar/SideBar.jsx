import React from "react";
import { FaPlus } from "react-icons/fa6";

const SideBar = () => {
  return (
    <div className="px-[5px] h-screen items-center justify-start gap-[30px] flex flex-col">
      <div className="items-center justify-start gap-[22px] flex flex-col">
        <div className="w-[40px] h-[40px] grid place-content-center hover:bg-gray-200 hover:rounded-full">
          <img src="././google-calender.png" className="h-[20px] w-[20px]" />
        </div>
        <div className="w-[40px] h-[40px] grid place-content-center hover:bg-gray-200 hover:rounded-full">
          <img src="././google-keep.jpg" className="h-[20px] w-[18px]" />
        </div>
        <div className="w-[40px] h-[40px] grid place-content-center hover:bg-gray-200 hover:rounded-full">
          <img src="././google-tasks.png" className="h-[18px] w-[18px]" />
        </div>
        <div className="w-[40px] h-[40px] grid place-content-center hover:bg-gray-200 hover:rounded-full">
          <img src="././google-contacts.png" className="h-[20px] w-[15x]" />
        </div>
        <div className="w-[40px] h-[40px] grid place-content-center hover:bg-gray-200 hover:rounded-full">
          <img src="././google-maps.jpg" className="h-[20px] w-[15px]" />
        </div>
      </div>
      <div className="w-[20px] h-[0.5px] bg-gray-400"></div>
      <button className="h-[40px] w-[40px] rounded-full grid place-content-center text-[#1f1f1f] bg-gray-100 text-[18px]">
        <FaPlus />
      </button>
    </div>
  );
};

export default SideBar;

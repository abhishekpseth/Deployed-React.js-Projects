import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { SlPrinter } from "react-icons/sl";
import { BiPaintRoll } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiPercentDuotone } from "react-icons/pi";
import { Bs123 } from "react-icons/bs";
import { MdBorderAll } from "react-icons/md";
import { RiMergeCellsHorizontal } from "react-icons/ri";
import { RiTextWrap } from "react-icons/ri";
import { IoLinkOutline } from "react-icons/io5";
import { BiCommentAdd } from "react-icons/bi";
import { MdOutlineInsertChart } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import FontSize from "./Font Size/FontSize";
import Bold from "./Bold/Bold";
import Italic from "./Italic/Italic";
import Linethrough from "./Line Through/Linethrough";
import TextColor from "./Color/Text Color/TextColor";
import CellColor from "./Color/Cell color/CellColor";
import Xalign from "./Xalign/Xalign";
import Yalign from "./Yalign/Yalign";
import Rotate from "./Rotate/Rotate";

const EditingOptions = () => {
  return (
    <div className="px-[10px] py-[5px]">
      <div
        className="h-[40px] rounded-3xl px-[10px] flex justify-between"
        style={{
          backgroundColor: "#edf2fa",
        }}
      >
        <div className="flex items-center justify-center gap-[4px]">
          <button className="h-[28px] w-[36px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <AiOutlineSearch />
          </button>
          <button className="`h-[28px] w-[28px]` rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[15px]">
            <RiArrowGoBackLine />
          </button>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[15px]">
            <RiArrowGoForwardLine />
          </button>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <SlPrinter />
          </button>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <BiPaintRoll />
          </button>
          <button className="h-[28px] px-[5px] flex items-center gap-[10px] rounded-md text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <div className="text-[16px]">100%</div>
            <div>
              <IoMdArrowDropdown />
            </div>
          </button>
          <div className="h-[24px] w-[1px] bg-gray-400"></div>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[14px]">
            <BsCurrencyDollar />
          </button>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[14px]">
            <PiPercentDuotone />
          </button>
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <Bs123 />
          </button>
          <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
          <div className="h-[28px] px-[5px] flex items-center gap-[10px] rounded-md text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <div className="text-[16px]">Default</div>
            <div>
              <IoMdArrowDropdown />
            </div>
          </div>
          <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
          <FontSize />
          <div className="h-[24px] w-[1px] bg-gray-400"></div>
          <Bold />
          <Italic />
          <Linethrough />
          <TextColor />
          <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
          <CellColor />
          <button className="h-[28px] w-[28px] rounded-md grid place-content-center text-[#1f1f1f] hover:bg-gray-300 text-[18px]">
            <MdBorderAll />
          </button>
          <div className="flex items-center text-[#1f1f1f] text-[18px]">
            <button className="h-[28px] w-[28px] grid place-content-center rounded-md hover:bg-gray-300 ">
              <RiMergeCellsHorizontal />
            </button>
            <button className="h-[28px] w-[13px] grid place-content-center rounded-sm hover:bg-gray-300">
              <IoMdArrowDropdown />
            </button>
          </div>
          <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
          <Xalign />
          <Yalign />
          <button className="h-[28px] px-[5px] flex items-center justify-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <RiTextWrap />
            <IoMdArrowDropdown />
          </button>
          <Rotate />
          <div className="h-[24px] w-[0.5px] bg-gray-400"></div>
          <button className="h-[28px] px-[5px] grid place-content-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <IoLinkOutline />
          </button>
          <button className="h-[28px] px-[5px] grid place-content-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <BiCommentAdd />
          </button>
          <button className="h-[28px] px-[5px] grid place-content-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <MdOutlineInsertChart />
          </button>
          <button className="h-[28px] px-[5px] grid place-content-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <MdOutlineFilterAlt />
          </button>
          <button className="h-[28px] px-[5px] grid place-content-center text-[#1f1f1f] text-[18px] rounded-md  hover:bg-gray-300">
            <TbSum />
          </button>
          <div></div>
          <div></div>
        </div>
        <div className="flex items-center h-full">
          <IoIosArrowUp />
          {/* <IoIosArrowDown /> */}
        </div>
      </div>
    </div>
  );
};

export default EditingOptions;

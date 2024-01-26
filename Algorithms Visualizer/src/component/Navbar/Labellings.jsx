import React from "react";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { LuBoxSelect } from "react-icons/lu";
import { RiCheckboxBlankFill } from "react-icons/ri";

const Labellings = () => {
  const LabelArray = [
    {
      id: 1,
      icon: <FaPlay className="text-startNodeLight dark:text-startNodeDark" />,
      text: "Start Node",
    },
    {
      id: 2,
      icon: <FaStar className="text-endNodeLight dark:text-endNodeDark" />,
      text: "End Node",
    },
    {
      id: 3,
      icon: <LuBoxSelect />,
      text: "Unvisited Node",
    },
    {
      id: 4,
      icon: (
        <RiCheckboxBlankFill className="text-wallNodeLight dark:text-wallNodeDark" />
      ),
      text: "Wall Node",
    },
    {
      id: 5,
      icon: (
        <RiCheckboxBlankFill className="text-visitedNodeLight dark:text-visitedNodeDark" />
      ),
      text: "Visited Node",
    },
    {
      id: 6,
      icon: (
        <RiCheckboxBlankFill className="text-shortestPathLight dark:text-shortestPathDark" />
      ),
      text: "Shortest Path",
    },
  ];

  return (
    <div className="text-black  bg-white w-[80%] sm:w-fit self-center px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-[8px] sm:text-[12px] md:text-[14px] lg:text-[18px] flex gap-2 sm:gap-4 md:gap-6 lg:gap-10 items-center justify-center flex-wrap">
      {LabelArray.map((element, index) => (
        <div key={element.id} className="flex items-center gap-1">
          <div>{element.icon}</div>
          <div>{element.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Labellings;

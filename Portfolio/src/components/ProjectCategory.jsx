import React, { useEffect } from "react";
import { useState } from "react";
import Projects from "./Projects";

const ProjectCategory = ({ stack }) => {
  const [sortOption, setSortOption] = useState("dateDec");

  return (
    <>
      <div className="relative flex justify-center items-center flex-col gap-[40px] sm:flex-row sm:justify-between sm:items-center w-[100%] mt-[60px]">
        <h1 className="bg-yellow-400 p-[10px] text-[24px] sm:text-[32px] whitespace-nowrap">
          {stack} Projects
        </h1>
        <div className="w-full flex justify-end">
          <div className=" justify-end">
            <label htmlFor="projects" className="dark:text-white -z-10">
              Sort by:
            </label>
            <select
              name="projects"
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
              className="dark:bg-black dark:text-white cursor-pointer outline-none -z-10"
            >
              <option value="dateDec">Newest First</option>
              <option value="dateInc">Oldest First</option>
              <option value="alphaInc">A-Z</option>
              <option value="alphaDec">Z-A</option>
            </select>
          </div>
        </div>
      </div>
      <Projects sortOption={sortOption} stack={stack} />
    </>
  );
};

export default ProjectCategory;

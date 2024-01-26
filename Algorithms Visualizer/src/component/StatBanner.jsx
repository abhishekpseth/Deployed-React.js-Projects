import React from "react";

const StatBanner = ({ nodesVisitedCount, shortestPathNodeCount }) => {
  return (
    <div className="flex items-center justify-center gap-2 px-3 py-1 text-center rounded-lg sm:gap-5 w-fit bg-gradient-to-r from-rose-500 to-pink-600">
      <div className="flex items-center gap-2">
        <p className="text-[12px] sm:text-[18px]">Nodes Visited:</p>
        <h1 className="text-[14px] sm:text-[24px] text-white">{nodesVisitedCount}</h1>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[12px] sm:text-[18px]">Nodes in Shortest Path: </p>
        <h1 className="text-[14px] sm:text-[24px] text-white">{shortestPathNodeCount}</h1>
      </div>
    </div>
  );
};

export default StatBanner;

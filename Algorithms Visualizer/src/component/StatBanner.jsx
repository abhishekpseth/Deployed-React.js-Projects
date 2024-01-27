import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "animate.css";

const StatBanner = () => {
  const isStatsHidden = useSelector((state) => state.dijsktra.isStatsHidden);
  const nodesVisitedCount = useSelector(
    (state) => state.dijsktra.nodesVisitedCount
  );
  const shortestPathNodeCount = useSelector(
    (state) => state.dijsktra.shortestPathNodeCount
  );

  return (
    <CSSTransition
      in={!isStatsHidden}
      timeout={500}
      classNames="animate__animated animate__swing animate__delay-4s"
      unmountOnExit
    >
      <div>
        <div className="flex items-center justify-center gap-2 px-3 text-center rounded-lg sm:py-1 sm:gap-5 w-fit bg-gradient-to-r from-rose-500 to-pink-600 banner">
          <div className="flex items-center gap-2">
            <p className="text-[10px] sm:text-[18px]">Nodes Visited:</p>
            <h1 className="text-[12px] sm:text-[24px] text-white">
              {nodesVisitedCount}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] sm:text-[18px]">
              Nodes in Shortest Path:{" "}
            </p>
            <h1 className="text-[12px] sm:text-[24px] text-white">
              {shortestPathNodeCount}
            </h1>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default StatBanner;

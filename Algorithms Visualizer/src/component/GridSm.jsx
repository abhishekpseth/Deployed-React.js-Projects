import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

import Dijkstra from "./Dijkstra";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoardClear,
  setSimulationStart,
  setBtnDisable,
} from "../features/dijsktraSlice";
import { wallNodeLight, visitedNodeLight, shortestPathLight } from "../colors";

const GridSm = () => {
  const [totalRows, setTotalRows] = useState(24);
  const [totalCols, setTotalCols] = useState(16);
  const [grid, setGrid] = useState(
    Array.from({ length: totalRows }, () => Array(totalCols).fill(1))
  );

  const isSimulationStart = useSelector(
    (state) => state.dijsktra.isSimulationStarted
  );
  const isBoardClear = useSelector((state) => state.dijsktra.isBoardClear);
  const simulationSpeed = useSelector(
    (state) => state.dijsktra.simulationSpeed
  );
  const [isStatsHidden, setStatsHidden] = useState(true);

  const speeds = {
    fast: [5, 40],
    average: [10, 50],
    slow: [20, 70],
  };

  const dispatch = useDispatch();

  const [nodesVistedCount, setNodesVisitedCount] = useState(0);
  const [shortestPathNodeCount, setShortestPathNdeCount] = useState(0);

  const randomNumber = (min, max, excludedValue) => {
    const result = Math.floor(Math.random() * (max - min) + min);
    return excludedValue && result === excludedValue
      ? randomNumber(min, max, excludedValue)
      : result;
  };

  const [{ originRow, originCol }, setOrigin] = useState({
    originRow: randomNumber(0, totalRows),
    originCol: randomNumber(0, totalCols),
  });
  const [{ targetRow, targetCol }, setTarget] = useState({
    targetRow: randomNumber(0, totalRows),
    targetCol: randomNumber(0, totalCols),
  });

  useEffect(() => {
    setOrigin({
      originRow: randomNumber(0, totalRows),
      originCol: randomNumber(0, totalCols),
    });
    setTarget({
      targetRow: randomNumber(0, totalRows),
      targetCol: randomNumber(0, totalCols),
    });
  }, [totalRows, totalCols]);

  const [isStartClicked, setStartClicked] = useState(false);
  const [isStopClicked, setStopClicked] = useState(false);
  const [isOtherClicked, setOtherClicked] = useState(false);
  const gridParentRef = useRef();

  const onMouseDownHandler = (event) => {
    event.stopPropagation();
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);

    if (row === originRow && col === originCol) setStartClicked(true);
    else if (row === targetRow && col === targetCol) setStopClicked(true);
    else {
      setOtherClicked(true);
      event.target.style.backgroundColor =
        event.target.style.backgroundColor === "white"
          ? wallNodeLight
          : "white";
      grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    }
    dispatch(setBoardClear(false));
  };

  const onMouseOverHandler = (event) => {
    event.stopPropagation();
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);

    if (row === originRow && col === originCol) {
    } else if (row === targetRow && col === targetCol) {
    } else {
      if (isStartClicked && !(row === originRow && col === originCol))
        setOrigin({ originRow: row, originCol: col });
      if (isStopClicked && !(row === targetRow && col === targetCol))
        setTarget({ targetRow: row, targetCol: col });
      if (isOtherClicked) {
        event.target.style.backgroundColor =
          event.target.style.backgroundColor === "white"
            ? wallNodeLight
            : "white";
        grid[row][col] = grid[row][col] === 0 ? 1 : 0;
      }
    }
  };

  const onMouseUpHandler = (event) => {
    event.stopPropagation();
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);

    if (row === originRow && col === originCol) {
      setStartClicked(false);
    } else if (row === targetRow && col === targetCol) {
      setStopClicked(false);
    } else {
      if (isStartClicked && !(row === originRow && col === originCol))
        setOrigin({ originRow: row, originCol: col });
      if (isStopClicked && !(row === targetRow && col === targetCol))
        setTarget({ targetRow: row, targetCol: col });
      setOtherClicked(false);
    }
    dispatch(setBoardClear(false));
  };

  //  simulation Control
  useEffect(() => {
    if (isSimulationStart) {
      dispatch(setBoardClear(false));
      dispatch(setBtnDisable(true));
      const source = [originRow, originCol];
      const destination = [targetRow, targetCol];

      const { visitedNodes, shortestPath } = Dijkstra(
        grid,
        source,
        destination
      );
      setNodesVisitedCount(visitedNodes.length);
      setShortestPathNdeCount(shortestPath.length);
      // Simulate the algorithm visualization
      for (let index = 0; index <= visitedNodes.length; index++) {
        if (index === visitedNodes.length) {
          setTimeout(() => {
            // Simulate the shortest path visualization
            for (let i = 0; i < shortestPath.length; i++) {
              setTimeout(() => {
                const [row, col] = shortestPath[i];
                const nodeIndex = row * totalCols + col;
                gridParentRef.current.children[
                  nodeIndex
                ].style.backgroundColor = shortestPathLight;
              }, speeds[simulationSpeed][1] * (shortestPath.length - 1 - i));
            }

            // Enable the button after the simulation ends
            setTimeout(() => {
              dispatch(setBtnDisable(false));
              dispatch(setSimulationStart(false));
              setStatsHidden(false);
            }, speeds[simulationSpeed][1] * shortestPath.length);
          }, speeds[simulationSpeed][0] * index);

          return;
        }

        setTimeout(() => {
          const [row, col] = visitedNodes[index];
          gridParentRef.current.children[
            row * totalCols + col
          ].style.backgroundColor = visitedNodeLight;
        }, speeds[simulationSpeed][0] * index);
      }
    }
  }, [isSimulationStart]);

  // clear board control

  useEffect(() => {
    if (isBoardClear) {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map(() => 1));
        newGrid.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            gridParentRef.current.children[
              rowIndex * totalCols + colIndex
            ].style.backgroundColor = "white";
          });
        });
        return newGrid;
      });
      dispatch(setSimulationStart(false));
      dispatch(setBtnDisable(false));
      setStatsHidden(true);
    }
  }, [isBoardClear]);

  return (
    <div className="flex flex-col justify-center h-[95%] gap-4 sm:hidden">
      {!isStatsHidden && (
        <div className="flex justify-center gap-5 bg-yellow-400">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[18px]">Nodes Visited:</p>
            <h1 className="text-[24px]">{nodesVistedCount}</h1>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-[18px]">Nodes in Shortest Path: </p>
            <h1 className="text-[24px]">{shortestPathNodeCount}</h1>
          </div>
        </div>
      )}
      <div
        ref={gridParentRef}
        className="grid h-full w-[90vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw]"
        style={{
          gridTemplateColumns: `repeat(${totalCols},1fr)`,
        }}
      >
        {grid.map((row, rowIndex) => {
          return row.map((node, colIndex) => {
            return (
              <div
                key={rowIndex - colIndex}
                data-row={rowIndex}
                data-col={colIndex}
                onMouseUp={onMouseUpHandler}
                onMouseOver={onMouseOverHandler}
                onMouseDown={onMouseDownHandler}
                className="relative grid w-full h-full border place-content-center aspect-square"
              >
                {rowIndex === originRow && colIndex === originCol ? (
                  <div className="absolute grid w-full h-full text-startNodeLight place-content-center">
                    <FaPlay />
                  </div>
                ) : rowIndex === targetRow && colIndex === targetCol ? (
                  <div className="absolute grid w-full h-full text-yellow-500 place-content-center">
                    <FaStar />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default GridSm;

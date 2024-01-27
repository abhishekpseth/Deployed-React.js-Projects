import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import {
  gridLight,
  gridDark,
  wallNodeLight,
  wallNodeDark,
  visitedNodeLight,
  visitedNodeDark,
  shortestPathLight,
  shortestPathDark,
} from "../colors";
import Dijkstra from "./Dijkstra";

import {
  setBoardClear,
  setSimulationStart,
  setBtnDisable,
  setClearBtnPressed,
  setStatHidden,
  setNodesVisitedCount,
  setShortestPathNodeCount,
} from "../features/dijsktraSlice";

const Grid = () => {
  const [totalRows, setTotalRows] = useState(getTotalRows());
  const [totalCols, setTotalCols] = useState(getTotalCols());
  const [grid, setGrid] = useState(
    Array.from({ length: totalRows }, () => Array(totalCols).fill(1))
  );

  useEffect(() => {
    setGrid(Array.from({ length: totalRows }, () => Array(totalCols).fill(1)));
  }, [totalRows, totalCols]);

  function getTotalRows() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 370) {
      return 29;
    } else if (screenWidth < 600) {
      return 25;
    } else if (screenWidth < 900) {
      return 30;
    } else if (screenWidth < 1024) {
      return 30;
    } else {
      return 20;
    }
  }

  function getTotalCols() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      return 20;
    } else if (screenWidth < 1024) {
      return 40;
    } else {
      return 40;
    }
  }

  useEffect(() => {
    function handleResize() {
      setTotalRows(getTotalRows());
      setTotalCols(getTotalCols());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const gridParentRef = useRef();
  const dispatch = useDispatch();

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

  let gridColor, wallNodeColor, visitedNodeColor, shortestPathColor;
  const themeMode = useSelector((state) => state.dijsktra.themeMode);
  if (themeMode === "light") {
    gridColor = gridLight;
    wallNodeColor = wallNodeLight;
    visitedNodeColor = visitedNodeLight;
    shortestPathColor = shortestPathLight;
  } else {
    gridColor = gridDark;
    wallNodeColor = wallNodeDark;
    visitedNodeColor = visitedNodeDark;
    shortestPathColor = shortestPathDark;
  }

  const [isStartClicked, setStartClicked] = useState(false);
  const [isStopClicked, setStopClicked] = useState(false);
  const [isOtherClicked, setOtherClicked] = useState(false);

  const onMouseDownHandler = (event) => {
    event.stopPropagation();
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);

    if (row === originRow && col === originCol) setStartClicked(true);
    else if (row === targetRow && col === targetCol) setStopClicked(true);
    else {
      setOtherClicked(true);
      event.target.style.backgroundColor =
        event.target.style.backgroundColor === gridColor
          ? wallNodeColor
          : gridColor;
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
          event.target.style.backgroundColor === gridColor
            ? wallNodeColor
            : gridColor;
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

  const isSimulationStart = useSelector(
    (state) => state.dijsktra.isSimulationStarted
  );

  const isClearBtnPressed = useSelector(
    (state) => state.dijsktra.isClearBtnPressed
  );

  const simulationSpeed = useSelector(
    (state) => state.dijsktra.simulationSpeed
  );

  const speeds = {
    fast: [5, 40],
    average: [10, 50],
    slow: [20, 70],
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
      dispatch(setNodesVisitedCount(visitedNodes.length));
      dispatch(setShortestPathNodeCount(shortestPath.length));
      for (let index = 0; index <= visitedNodes.length; index++) {
        if (index === visitedNodes.length) {
          setTimeout(() => {
            for (let i = 0; i < shortestPath.length; i++) {
              setTimeout(() => {
                const [row, col] = shortestPath[i];
                const nodeIndex = row * totalCols + col;
                gridParentRef.current.children[
                  nodeIndex
                ].style.backgroundColor = shortestPathColor;
              }, speeds[simulationSpeed][1] * (shortestPath.length - 1 - i));
            }

            setTimeout(() => {
              dispatch(setBtnDisable(false));
              dispatch(setSimulationStart(false));
              dispatch(setStatHidden(false));
            }, speeds[simulationSpeed][1] * shortestPath.length);
          }, speeds[simulationSpeed][0] * index);

          return;
        }

        setTimeout(() => {
          const [row, col] = visitedNodes[index];
          gridParentRef.current.children[
            row * totalCols + col
          ].style.backgroundColor = visitedNodeColor;
        }, speeds[simulationSpeed][0] * index);
      }
    }
  }, [isSimulationStart]);

  useEffect(() => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.map(() => 1));
      newGrid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          gridParentRef.current.children[
            rowIndex * totalCols + colIndex
          ].style.backgroundColor = gridColor;
        });
      });
      return newGrid;
    });
    dispatch(setSimulationStart(false));
    dispatch(setBtnDisable(false));
    dispatch(setStatHidden(true));
  }, [themeMode]);

  // clear board control

  useEffect(() => {
    if (isClearBtnPressed) {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map(() => 1));
        newGrid.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            gridParentRef.current.children[
              rowIndex * totalCols + colIndex
            ].style.backgroundColor = gridColor;
          });
        });
        return newGrid;
      });
      dispatch(setSimulationStart(false));
      dispatch(setBtnDisable(false));
      dispatch(setStatHidden(true));
      dispatch(setClearBtnPressed(false));
      dispatch(setBoardClear(true));
    }
  }, [isClearBtnPressed]);

  return (
    <div className="h-full grid place-content-center sm:pt-[20px] pb-[50px]">
      <div
        ref={gridParentRef}
        className="grid w-[90vw] sm:w-[90vw] md:w-[80vw] lg:w-[80vw]"
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
                className="relative grid w-full h-full border bg-gridLight dark:bg-gridDark place-content-center aspect-square"
              >
                {rowIndex === originRow && colIndex === originCol ? (
                  <div className="absolute grid w-full h-full text-startNodeLight dark:text-startNodeDark place-content-center">
                    <FaPlay />
                  </div>
                ) : rowIndex === targetRow && colIndex === targetCol ? (
                  <div className="absolute grid w-full h-full text-endNodeLight dark:text-endNodeDark place-content-center">
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

export default Grid;

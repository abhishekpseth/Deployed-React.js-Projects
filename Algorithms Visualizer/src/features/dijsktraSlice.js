import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSimulationStarted: false,
  isBtnDisabled: false,
  isClearBtnPressed: false,
  isBoardClear: true,
  simulationSpeed: "average",
  isFullScreen: false,
  themeMode: "dark",
  isStatsHidden: true,
  nodesVisitedCount: 0,
  shortestPathNodeCount: 0,
};

const dijsktraSlice = createSlice({
  name: "dijsktra",
  initialState,
  reducers: {
    setSimulationStart: (state, action) => {
      state.isSimulationStarted = action.payload;
    },
    setClearBtnPressed: (state, action) => {
      state.isClearBtnPressed = action.payload;
    },
    setBoardClear: (state, action) => {
      state.isBoardClear = action.payload;
    },
    setBtnDisable: (state, action) => {
      state.isBtnDisabled = action.payload;
    },
    setSimulationSpeed: (state, action) => {
      state.simulationSpeed = action.payload;
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setStatHidden: (state, action) => {
      state.isStatsHidden = action.payload;
    },
    setNodesVisitedCount: (state, action) => {
      state.nodesVisitedCount = action.payload;
    },
    setShortestPathNodeCount: (state, action) => {
      state.shortestPathNodeCount = action.payload;
    },
  },
});

export const {
  setSimulationStart,
  setClearBtnPressed,
  setBoardClear,
  setBtnDisable,
  setSimulationSpeed,
  setFullScreen,
  setThemeMode,
  setStatHidden,
  setNodesVisitedCount,
  setShortestPathNodeCount,
} = dijsktraSlice.actions;
export default dijsktraSlice;

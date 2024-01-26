import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSimulationStarted: false,
  isBtnDisabled: false,
  isClearBtnPressed: false,
  isBoardClear: true,
  simulationSpeed: "average",
  isFullScreen: false,
  themeMode: "dark",
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
} = dijsktraSlice.actions;
export default dijsktraSlice;

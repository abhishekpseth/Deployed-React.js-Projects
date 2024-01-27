import { configureStore } from "@reduxjs/toolkit";
import dijsktraSlice from "../features/dijsktraSlice";

export const store = configureStore({
  reducer: {
    dijsktra: dijsktraSlice.reducer,
  },
});

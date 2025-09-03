import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/color/colorSlice.js";

export const store = configureStore({
  reducer: {
    color: colorReducer,
  },
});

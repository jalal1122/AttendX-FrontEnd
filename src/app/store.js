import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/color/colorSlice.js";
import userReducer from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    user: userReducer,
  },
});

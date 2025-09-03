import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  // Theme Mode
  mode: localStorage.getItem("mode"),

  //   Colors
  colors: {
    Background: "#F9FAFB",
    Primary: "#2563EB",
    Secondary: "#E5E7EB",
    Text: {
      Primary: "#111827",
      Secondary: "#6B7280",
    },
    Success: "#16A34A",
    Error: "#DC2626",
    Warning: "#F59E0B",
  },
};

// Slice Definition
const colorSlice = createSlice({
  name: "color",
  initialState,

  //   Reducers
  reducers: {
    changeMode: (state) => {
      // Toggle Mode to Dark
      if (localStorage.getItem("mode") === "light") {
        localStorage.setItem("mode", "dark");
        state.mode = "dark";
        state.colors = {
          Background: "#111827",
          Primary: "#3B82F6",
          Secondary: "#1F2937",
          Text: {
            Primary: "#F9FAFB",
            Secondary: "#9CA3AF",
          },
          Success: "#22C55E",
          Error: "#F87171",
          Warning: "#FBBF24",
        };
      }
      // Toggle Mode to Light
      else {
        localStorage.setItem("mode", "light");
        state.mode = "light";
        state.colors = {
          Background: "#F9FAFB",
          Primary: "#2563EB",
          Secondary: "#E5E7EB",
          Text: {
            Primary: "#111827",
            Secondary: "#6B7280",
          },
          Success: "#16A34A",
          Error: "#DC2626",
          Warning: "#F59E0B",
        };
      }
    },
  },
});

// Action Exports
export const { changeMode } = colorSlice.actions;

export default colorSlice.reducer;

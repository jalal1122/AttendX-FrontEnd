import { createSlice } from "@reduxjs/toolkit";

// Palette helper
const getPalette = (mode) =>
  mode === "dark"
    ? {
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
      }
    : {
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

// Initialize mode from storage and derive colors from mode to avoid mismatch
const initialMode = localStorage.getItem("mode") || "light";

// initial state
const initialState = {
  // Theme Mode
  mode: initialMode,

  // Colors based on current mode
  colors: getPalette(initialMode),
};

// Slice Definition
const colorSlice = createSlice({
  name: "color",
  initialState,

  //   Reducers
  reducers: {
    changeMode: (state) => {
      // Flip based on current state to avoid relying on storage
      const nextMode = state.mode === "light" ? "dark" : "light";
      state.mode = nextMode;
      state.colors = getPalette(nextMode);
      // persist
      localStorage.setItem("mode", nextMode);
    },
  },
});

// Action Exports
export const { changeMode } = colorSlice.actions;

export default colorSlice.reducer;

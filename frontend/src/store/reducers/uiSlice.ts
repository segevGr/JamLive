import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ViewMode } from "types";

interface UIState {
  mode: ViewMode;
  scrollSpeed: number;
}

const initialState: UIState = {
  mode: "browse",
  scrollSpeed: 2,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload;
    },
    setScrollSpeed: (state, action) => {
      state.scrollSpeed = action.payload;
    },
  },
});

export const { setMode, setScrollSpeed } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

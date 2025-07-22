import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ViewMode } from "types";

interface UIState {
  mode: ViewMode;
}

const initialState: UIState = {
  mode: "browse",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Song } from "types";

export interface SongSessionState {
  currentSong: Song | null;
  sessionId: string | null;
  browseSong: Song | null;
}

const initialState: SongSessionState = {
  currentSong: null,
  sessionId: null,
  browseSong: null,
};

const songSessionSlice = createSlice({
  name: "songSession",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song | null>) => {
      state.currentSong = action.payload;
    },
    clearSession: (state) => {
      state.currentSong = null;
      state.sessionId = null;
    },
    setBrowseSong: (state, action: PayloadAction<Song | null>) => {
      state.browseSong = action.payload;
    },
    clearBrowseSong: (state) => {
      state.browseSong = null;
    },
  },
});

export const { setCurrentSong, clearSession, setBrowseSong, clearBrowseSong } =
  songSessionSlice.actions;
export const songSessionReducer = songSessionSlice.reducer;

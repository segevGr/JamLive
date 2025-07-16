import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Song } from "types/song.types";

export interface SongSessionState {
  currentSong: Song | null;
  sessionId: string | null;
}

const initialState: SongSessionState = {
  currentSong: null,
  sessionId: null,
};

const songSessionSlice = createSlice({
  name: "songSession",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
    clearSession: (state) => {
      state.currentSong = null;
      state.sessionId = null;
    },
  },
});

export const { setCurrentSong, clearSession } = songSessionSlice.actions;
export default songSessionSlice.reducer;

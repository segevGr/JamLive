import { createSlice } from "@reduxjs/toolkit";

export interface SongLine {
  lyrics: string;
  chords?: string;
}

export interface SongData {
  id: string;
  title: string;
  artist: string;
  image: string;
  lyrics: SongLine[][];
}

interface SongSessionState {
  currentSong: SongData | null;
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
    setCurrentSong: (state, action) => {
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

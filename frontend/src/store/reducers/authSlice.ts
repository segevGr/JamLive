import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Instrument, UserRole } from "types";

interface AuthState {
  userName: string | null;
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole;
  token: string | null;
  instrument: Instrument | null;
}

const initialState: AuthState = {
  userName: null,
  isAuthenticated: false,
  userId: null,
  role: null,
  token: null,
  instrument: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        userName: string;
        userId: string;
        role: UserRole;
        token: string;
        instrument: Instrument;
      }>
    ) {
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.instrument = action.payload.instrument;
    },
    logout(state) {
      state.userName = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      state.token = null;
      state.instrument = null;
    },
    changeInstrument(
      state,
      action: PayloadAction<{
        instrument: Instrument;
      }>
    ) {
      state.instrument = action.payload.instrument;
    },
    changeToken(
      state,
      action: PayloadAction<{
        token: string;
      }>
    ) {
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, changeInstrument, changeToken } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "admin" | "user" | null;

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userId: string; role: UserRole; token: string }>) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

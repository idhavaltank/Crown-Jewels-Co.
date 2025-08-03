import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  token: string | null;
  email: string | null;
  isStaff: boolean;
  permissions: string[];
}

const initialState: UserState = {
  token: null,
  email: null,
  isStaff: false,
  permissions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        token: string;
        email: string | null;
        isStaff: boolean;
        permissions: string[];
      }>
    ) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isStaff = action.payload.isStaff;
      state.permissions = action.payload.permissions;
    },
    clearUser(state) {
      state.token = null;
      state.email = null;
      state.isStaff = false;
      state.permissions = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = (state: RootState) => state?.user;

export default userSlice.reducer;

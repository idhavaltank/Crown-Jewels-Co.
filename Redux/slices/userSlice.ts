// 1. Import Redux Toolkit utilities and RootState for typing
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 2. Define UserState interface representing the user authentication and profile data
export interface UserState {
  token: string | null;
  email: string | null;
  isStaff: boolean;
  permissions: string[];
}

// 3. Initial state with null token/email, isStaff false, and empty permissions array
const initialState: UserState = {
  token: null,
  email: null,
  isStaff: false,
  permissions: [],
};

// 4. Create user slice with reducers to set and clear user data
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user info and token from payload
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
    // Clear user data (logout)
    clearUser(state) {
      state.token = null;
      state.email = null;
      state.isStaff = false;
      state.permissions = [];
    },
  },
});

// 5. Export action creators for dispatching
export const { setUser, clearUser } = userSlice.actions;

// 6. Selector to access the user slice from the Redux store
export const getUser = (state: RootState) => state.user;

// 7. Export the reducer to include in the Redux store
export default userSlice.reducer;

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registrationThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
};
const slice = createSlice({
  name: "authorization",
  initialState,
  extraReducers: (builder) =>
    builder

      .addCase(registrationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(
          registrationThunk.pending,
          loginThunk.pending,
          refreshUserThunk.pending,
          logoutThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          registrationThunk.rejected,
          loginThunk.rejected,
          refreshUserThunk.rejected,
          logoutThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      ),
});
export const authorizationReducer = slice.reducer;

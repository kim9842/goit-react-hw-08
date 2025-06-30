import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from "./operations";
import { logoutThunk } from "../auth/operations";

const initialState = {
  items: [],
  isError: false,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,

  reducers: {
    fetchSuccess: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          deleteContactThunk.pending,
          addContactThunk.pending,
          logoutThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          deleteContactThunk.rejected,
          addContactThunk.rejected,
          logoutThunk.rejected
        ),
        (state, action) => {
          state.isError = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const contactReducer = contactsSlice.reducer;

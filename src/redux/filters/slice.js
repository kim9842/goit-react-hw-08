import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

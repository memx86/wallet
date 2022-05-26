import { createSlice } from "@reduxjs/toolkit";

const localeSlice = createSlice({
  name: "locale",
  initialState: {
    language: "",
  },
  reducers: {
    setLocale(state, { payload }) {
      state.language = payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export const localeReducer = localeSlice.reducer;

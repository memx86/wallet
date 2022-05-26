import { createSlice } from "@reduxjs/toolkit";

import LANGUAGES from "assets/constants/LANGUAGES";

const localeSlice = createSlice({
  name: "locale",
  initialState: {
    language: LANGUAGES.EN,
  },
  reducers: {
    setLocale(state, { payload }) {
      state.language = payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export const localeReducer = localeSlice.reducer;

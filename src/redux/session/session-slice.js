import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = " https://wallet.goit.ua/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isAuth: false,
    token: null,
  },
  reducers: {
    loggedIn(state) {
      state.isAuth = true;
    },
    loggedOff(state) {
      state.isAuth = false;
      state.token = null;
      token.unset();
    },
    setToken(state, { payload }) {
      token.set(payload);
      state.token = payload;
    },
  },
});

export const { loggedIn, loggedOff, setToken } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

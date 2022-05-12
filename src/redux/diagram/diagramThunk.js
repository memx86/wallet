import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = " https://wallet.goit.ua";

// const tok =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIzMTQ0ZjQzMy0wYzA4LTQxYTUtYjQ3Zi01NDBhOTNjNzc2NDYiLCJpYXQiOjE2NTIzMzI4ODUsImV4cCI6MTAwMDAwMDE2NTIzMzI4ODR9.WJqzbDD6HstQdODAs50cUDjfRnEM1YI7z6ohvnnG8RU";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const getTransactionSummary = createAsyncThunk(
  "refresh",
  async (_, thunkApi) => {
    try {
      token.set(thunkApi.getState().session.token);
      const res = await axios.get("/api/transactions-summary");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("bad");
    }
  }
);

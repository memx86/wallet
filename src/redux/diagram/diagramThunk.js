import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = " https://wallet.goit.ua";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const getTransactionSummary = createAsyncThunk(
  "transactionsSummary",
  async (date, thunkApi) => {
    const { month, year } = date;
    try {
      token.set(thunkApi.getState().session.token);
      const res = await axios.get(
        `/api/transactions-summary${
          month && year ? `?month=${month}&year=${year}` : ""
        }`
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("");
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transactions",
  async (_, thunkApi) => {
    try {
      token.set(thunkApi.getState().session.token);
      const res = await axios.get(`/api/transactions`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("");
    }
  }
);

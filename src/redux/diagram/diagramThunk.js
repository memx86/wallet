import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = " https://wallet.goit.ua";

const tok =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5MDUyMjgzOC02Zjc0LTQ2ZTctYTZiOC05OTc4MDc1ZDZkMjIiLCJpYXQiOjE2NTIyMDY3NTcsImV4cCI6MTAwMDAwMDE2NTIyMDY3NTZ9.oYdHERVmSwPficoNnEVsp9B6aFBp7kRD8seA2_kuuu0";

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
      token.set(tok);
      const res = await axios.get("/api/transactions-summary");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("bad");
    }
  }
);

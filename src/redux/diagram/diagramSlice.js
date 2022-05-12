import { createSlice } from "@reduxjs/toolkit";
import { getTransactionSummary, getTransactions } from "./diagramThunk";

const initialState = {
  diagData: {},
  transactions: [],
  diagLoading: false,
};

export const diagramReducer = createSlice({
  name: "diagram",
  initialState,
  extraReducers: {
    [getTransactionSummary.pending]: (state, _) => {
      return { ...state, diagLoading: true };
    },
    [getTransactionSummary.rejected]: (state, _) => {
      return { ...state, diagLoading: false };
    },
    [getTransactionSummary.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        diagData: payload,
        diagLoading: false,
      };
    },
    [getTransactions.pending]: (state, _) => {
      return { ...state, diagLoading: true };
    },
    [getTransactions.rejected]: (state, _) => {
      return { ...state, diagLoading: false };
    },
    [getTransactions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        transactions: payload,
        diagLoading: false,
      };
    },
  },
});

export default diagramReducer.reducer;

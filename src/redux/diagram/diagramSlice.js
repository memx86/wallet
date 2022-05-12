import { createSlice } from "@reduxjs/toolkit";
import { getTransactionSummary } from "./diagramThunk";

const initialState = {
  diagData: {},
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
  },
});

export default diagramReducer.reducer;

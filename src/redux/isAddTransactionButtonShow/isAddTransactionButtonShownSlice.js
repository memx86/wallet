import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: true,
};
const isAddTransactionButtonShownSlice = createSlice({
  name: "isAddTransactionButtonShown",
  initialState,
  reducers: {
    isButtonShown(state, { payload }) {
      state.isShown = payload;
    },
  },
});

export const { isButtonShown } = isAddTransactionButtonShownSlice.actions;

export const isAddTransactionButtonReducer =
  isAddTransactionButtonShownSlice.reducer;

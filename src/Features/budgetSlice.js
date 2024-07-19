import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetData: [],
  userBudgetData: [],
  budgetLoading: false,
  budgetSuccess: null,
  budgetError: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    budgetReq: (state, action) => {
      state.budgetLoading = true;
      state.budgetSuccess = null;
      state.budgetError = null;
    },

    budgetFetch: (state, action) => {
      state.budgetLoading = false;
      state.budgetData = action.payload;
    },
    budgetById: (state, action) => {
      state.budgetLoading = false;
      state.userBudgetData = action.payload;
    },
    budgetSuccess: (state, action) => {
      state.budgetLoading = false;
      state.budgetSuccess = action.payload;
    },
    budgetFail: (state, action) => {
      state.budgetLoading = false;
      state.budgetSuccess = null;
      state.budgetError = action.payload;
    },
  },
});

export const { budgetReq, budgetById, budgetFetch, budgetSuccess, budgetFail } =
  budgetSlice.actions;
export default budgetSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitData: [],
  unitLoading: false,
  unitSuccess: null,
  unitError: null,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    unitReq: (state, action) => {
      state.unitLoading = true;
      state.unitSuccess = null;
      state.unitError = null;
    },

    unitFetch: (state, action) => {
      state.unitLoading = false;
      state.unitData = action.payload;
    },
    unitSuccess: (state, action) => {
      state.unitLoading = false;
      state.unitSuccess = action.payload;
    },
    unitFail: (state, action) => {
      state.unitLoading = false;
      state.unitSuccess = null;
      state.unitError = action.payload;
    },
  },
});

export const { unitReq, unitFetch, unitSuccess, unitFail } = unitSlice.actions;
export default unitSlice.reducer;

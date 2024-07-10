import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workTypeData: [],
  workTypeLoading: false,
  workTypeSuccess: null,
  workTypeError: null,
};

const workTypeSlice = createSlice({
  name: "workType",
  initialState,
  reducers: {
    workTypeReq: (state, action) => {
      state.workTypeLoading = true;
      state.workTypeSuccess = null;
      state.workTypeError = null;
    },

    workTypeFetch: (state, action) => {
      state.workTypeLoading = false;
      state.workTypeData = action.payload;
    },
    workTypeSuccess: (state, action) => {
      state.workTypeLoading = false;
      state.workTypeSuccess = action.payload;
    },
    workTypeFail: (state, action) => {
      state.workTypeLoading = false;
      state.workTypeSuccess = null;
      state.workTypeError = action.payload;
    },
  },
});

export const { workTypeReq, workTypeFetch, workTypeSuccess, workTypeFail } =
  workTypeSlice.actions;
export default workTypeSlice.reducer;

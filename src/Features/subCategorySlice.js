import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategoryData: [],
  subCategoryLoading: false,
  subCategorySuccess: null,
  subCategoryError: null,
  subCategoryIsActive: null,
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    subCategoryReq: (state, action) => {
      state.subCategoryLoading = true;
      state.subCategorySuccess = null;
      state.subCategoryError = null;
      state.subCategoryData = [];
    },

    subCategoryFetch: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategoryData = action.payload;
    },

    subCategorySuccess: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategorySuccess = action.payload;
    },
    subCategoryFail: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategorySuccess = null;
      state.subCategoryError = action.payload;
    },
    subCategoryIsActiveSuccess: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategoryIsActive = action.payload;
    },
  },
});

export const {
  subCategoryReq,
  subCategoryFetch,
  subCategorySuccess,
  subCategoryFail,
  subCategoryIsActiveSuccess,
} = subCategorySlice.actions;
export default subCategorySlice.reducer;

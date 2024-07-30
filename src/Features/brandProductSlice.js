import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandProductData: [],
  brandProductLoading: false,
  brandProductSuccess: null,
  brandProductError: null,
  brandProductIsActive: null,
};

const brandProductSlice = createSlice({
  name: "brandProduct",
  initialState,
  reducers: {
    brandProductReq: (state, action) => {
      state.brandProductLoading = true;
      state.brandProductSuccess = null;
      state.brandProductError = null;
    },

    brandProductFetch: (state, action) => {
      state.brandProductLoading = false;
      state.brandProductData = action.payload;
    },
    brandProductSuccess: (state, action) => {
      state.brandProductLoading = false;
      state.brandProductSuccess = action.payload;
    },
    brandProductFail: (state, action) => {
      state.brandProductLoading = false;
      state.brandProductSuccess = null;
      state.brandProductError = action.payload;
    },
    brandProductIsActiveSuccess: (state, action) => {
      state.brandProductLoading = false;
      state.brandProductIsActive = action.payload;
    },
  },
});

export const {
  brandProductReq,
  brandProductFetch,
  brandProductSuccess,
  brandProductFail,
  brandProductIsActiveSuccess,
} = brandProductSlice.actions;
export default brandProductSlice.reducer;

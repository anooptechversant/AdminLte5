import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  singleProductData: null,
  productLoading: false,
  productSuccess: null,
  prodImageSuccess:null,
  productError: null,
  productIsActive: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productReq: (state, action) => {
      state.productLoading = true;
      state.productSuccess = null;
      state.productError = null;
    },

    productFetch: (state, action) => {
      state.productLoading = false;
      state.productData = action.payload;
    },
    productById: (state, action) => {
      state.productLoading = false;
      state.singleProductData = action.payload;
    },
    productSuccess: (state, action) => {
      state.productLoading = false;
      state.productSuccess = action.payload;
    },
    prodImageSuccess: (state, action) => {
       state.productLoading = false;
       state.prodImageSuccess = action.payload;
    },
    productFail: (state, action) => {
      state.productLoading = false;
      state.productSuccess = null;
      state.productError = action.payload;
    },
    productIsActiveSuccess: (state, action) => {
      state.productLoading = false;
      state.productIsActive = action.payload;
    },
  },
});

export const {
  productReq,
  productById,
  productFetch,
  productSuccess,
  productFail,
  productIsActiveSuccess,
  prodImageSuccess,
} = productSlice.actions;
export default productSlice.reducer;

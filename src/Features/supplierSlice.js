import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplierData: [],
  singleSupplierData: null,
  supplierLoading: false,
  supplierSuccess: null,
  supplierError: null,
  supplierIsActive: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    supplierReq: (state, action) => {
      state.supplierLoading = true;
      state.supplierSuccess = null;
      state.supplierError = null;
    },

    supplierFetch: (state, action) => {
      state.supplierLoading = false;
      state.supplierData = action.payload;
    },
    supplierById: (state, action) => {
      state.supplierLoading = false;
      state.singleSupplierData = action.payload;
    },
    supplierSuccess: (state, action) => {
      state.supplierLoading = false;
      state.supplierSuccess = action.payload;
    },
    supplierFail: (state, action) => {
      state.supplierLoading = false;
      state.supplierSuccess = null;
      state.supplierError = action.payload;
    },
    supplierIsActiveSuccess: (state, action) => {
      state.supplierLoading = false;
      state.supplierIsActive = action.payload;
    },
  },
});

export const {
  supplierReq,
  supplierById,
  supplierFetch,
  supplierSuccess,
  supplierFail,
  supplierIsActiveSuccess,
} = supplierSlice.actions;
export default supplierSlice.reducer;

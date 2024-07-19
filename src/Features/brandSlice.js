import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandData: [],
  brandLoading: false,
  brandSuccess: null,
  brandError: null,
  brandIsActive: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    brandReq: (state, action) => {
      state.brandLoading = true;
      state.brandSuccess = null;
      state.brandError = null;
    },

    brandFetch: (state, action) => {
      state.brandLoading = false;
      state.brandData = action.payload;
    },
    brandSuccess: (state, action) => {
      state.brandLoading = false;
      state.brandSuccess = action.payload;
    },
    brandFail: (state, action) => {
      state.brandLoading = false;
      state.brandSuccess = null;
      state.brandError = action.payload;
    },
    isActiveSuccess: (state, action) =>{
      state.brandLoading = false;
      state.brandIsActive=action.payload
    }
  },
});

export const { brandReq, brandFetch, brandSuccess, brandFail, isActiveSuccess } =
  brandSlice.actions;
export default brandSlice.reducer;

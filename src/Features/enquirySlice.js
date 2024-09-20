import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enquiryData: [],
  enquiryLoading: false,
  enquirySuccess: null,
  enquiryError: null,
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    enquiryReq: (state, action) => {
      state.enquiryLoading = true;
      state.enquirySuccess = null;
      state.enquiryError = null;
    },

    enquiryFetch: (state, action) => {
      state.enquiryLoading = false;
      state.enquiryData = action.payload;
    },
    enquirySuccess: (state, action) => {
      state.enquiryLoading = false;
      state.enquirySuccess = action.payload;
    },
    enquiryFail: (state, action) => {
      state.enquiryLoading = false;
      state.enquirySuccess = null;
      state.enquiryError = action.payload;
    },
  },
});

export const { enquiryReq, enquiryFetch, enquirySuccess, enquiryFail } = enquirySlice.actions;
export default enquirySlice.reducer;

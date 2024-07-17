import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  educationData: [],
  educationLoading: false,
  educationSuccess: null,
  educationError: null,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    educationReq: (state, action) => {
      state.educationLoading = true;
      state.educationSuccess = null;
      state.educationError = null;
    },

    educationFetch: (state, action) => {
      state.educationLoading = false;
      state.educationData = action.payload;
    },
    educationSuccess: (state, action) => {
      state.educationLoading = false;
      state.educationSuccess = action.payload;
    },
    educationFail: (state, action) => {
      state.educationLoading = false;
      state.educationSuccess = null;
      state.educationError = action.payload;
    },
  },
});

export const { educationReq, educationFetch, educationSuccess, educationFail } =
  educationSlice.actions;
export default educationSlice.reducer;

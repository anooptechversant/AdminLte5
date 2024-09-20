import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationData: [],
  locationLoading: false,
  locationSuccess: null,
  locationError: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    locationReq: (state, action) => {
      state.locationLoading = true;
      state.locationSuccess = null;
      state.locationError = null;
    },
    locationFetch: (state, action) => {
      state.locationLoading = false;
      state.locationData = action.payload;
    },
    locationSuccess: (state, action) => {
      state.locationLoading = false;
      state.locationSuccess = action.payload;
    },
    locationFail: (state, action) => {
      state.locationLoading = false;
      state.locationSuccess = null;
      state.locationError = action.payload;
    },
  },
});

export const { locationReq, locationFetch, locationSuccess, locationFail } = locationSlice.actions;
export default locationSlice.reducer;

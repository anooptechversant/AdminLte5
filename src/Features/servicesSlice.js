import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicesData: [],
  servicesLoading: false,
  servicesSuccess: null,
  servicesError: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    servicesReq: (state, action) => {
      state.servicesLoading = true;
      state.servicesSuccess = null;
      state.servicesError = null;
    },

    servicesFetch: (state, action) => {
      state.servicesLoading = false;
      state.servicesData = action.payload;
    },
    servicesSuccess: (state, action) => {
      state.servicesLoading = false;
      state.servicesSuccess = action.payload;
    },
    servicesFail: (state, action) => {
      state.servicesLoading = false;
      state.servicesSuccess = null;
      state.servicesError = action.payload;
    },
  },
});

export const { servicesReq, servicesFetch, servicesSuccess, servicesFail } =
  servicesSlice.actions;
export default servicesSlice.reducer;

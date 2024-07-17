import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesData: [],
  rolesLoading: false,
  rolesSuccess: null,
  rolesError: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    rolesReq: (state, action) => {
      state.rolesLoading = true;
      state.rolesSuccess = null;
      state.rolesError = null;
    },

    rolesFetch: (state, action) => {
      state.rolesLoading = false;
      state.rolesData = action.payload;
    },
    rolesSuccess: (state, action) => {
      state.rolesLoading = false;
      state.rolesSuccess = action.payload;
    },
    rolesFail: (state, action) => {
      state.rolesLoading = false;
      state.rolesSuccess = null;
      state.rolesError = action.payload;
    },
  },
});

export const { rolesReq, rolesFetch, rolesSuccess, rolesFail } =
  rolesSlice.actions;
export default rolesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  singleUser: null,
  unapprovedUsers: [],
  userLoading: false,
  userSuccess: null,
  userError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReq: (state, action) => {
      state.userLoading = true;
      state.userSuccess = null;
      state.isApproveSuccess = null;
      state.userError = null;
    },
    userFetch: (state, action) => {
      state.userData = action.payload;
      state.userLoading = false;
    },
    unapprovedFetch: (state, action) => {
      state.unapprovedUsers = action.payload;
      state.userLoading = false;
    },
    userByID: (state, action) => {
      state.userLoading = false;
      state.singleUser = action.payload;
    },
    userSuccess: (state, action) => {
      state.userLoading = false;
      state.userSuccess = action.payload;
    },

    userFail: (state, action) => {
      state.userSuccess = null;
      state.isApproveSuccess = null;
      state.userError = action.payload;
      state.userLoading = false;
    },
  },
});

export const {
  userReq,
  userFetch,
  userByID,
  unapprovedFetch,
  userSuccess,
  userFail,
} = userSlice.actions;
export default userSlice.reducer;

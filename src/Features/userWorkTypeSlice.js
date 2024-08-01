import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userWorkTypeLoading: false,
  userWorkTypeSuccess: null,
  userWorkTypeError: null,
};

const userWorkTypeSlice = createSlice({
  name: "userWorkType",
  initialState,
  reducers: {
    userWorkTypeReq: (state, action) => {
      state.userWorkTypeLoading = true;
      state.userWorkTypeSuccess = null;
      state.userWorkTypeError = null;
    },

    userWorkTypeSuccess: (state, action) => {
      state.userWorkTypeLoading = false;
      state.userWorkTypeSuccess = action.payload;
    },

    userWorkTypeFail: (state, action) => {
      state.userWorkTypeLoading = false;
      state.userWorkTypeSuccess = null;
      state.userWorkTypeError = action.payload;
    },
  },
});

export const {
  userWorkTypeReq,
  userWorkTypeSuccess,
  userWorkTypeFail,
} = userWorkTypeSlice.actions;
export default userWorkTypeSlice.reducer;

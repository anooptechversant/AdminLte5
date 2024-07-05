import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  loginLoading: false,
  userInfo: null, 
  loginError: null,
};

const LogInSlice = createSlice({
  name: "LogIn",
  initialState: initialState,
  reducers: {
    LoginReq: (state, action) => {
      state.loginLoading = true;
    },
    LoginSuccess: (state, action) => {
      state.loginLoading = false;
      state.userInfo = action.payload;
    },
    LoginFail: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    Logout: (state, action) => {
      state.userInfo = null;
      state.loginError = null;
    },
  },
});

export const { LoginReq, LoginSuccess, LoginFail, Logout } = LogInSlice.actions;

export default LogInSlice.reducer;

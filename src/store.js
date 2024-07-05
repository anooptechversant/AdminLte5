import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/logInSlice.js";

const store = configureStore({
  reducer: {
    logIn: logInReducer,
  },
});

export default store;

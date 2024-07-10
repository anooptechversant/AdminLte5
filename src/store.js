import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/logInSlice.js";
import workTypeReducer from "./Features/workTypeSlice.js";

const store = configureStore({
  reducer: {
    logIn: logInReducer,
    workType: workTypeReducer,
  },
});

export default store;

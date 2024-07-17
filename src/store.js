import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/logInSlice.js";
import workTypeReducer from "./Features/workTypeSlice.js";
import educationReducer from "./Features/educationSlice.js";
import rolesReducer from "./Features/rolesSlice.js";

const store = configureStore({
  reducer: {
    logIn: logInReducer,
    workType: workTypeReducer,
    education: educationReducer,
    roles: rolesReducer,
  },
});

export default store;

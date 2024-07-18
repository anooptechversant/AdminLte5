import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/logInSlice.js";
import workTypeReducer from "./Features/workTypeSlice.js";
import educationReducer from "./Features/educationSlice.js";
import rolesReducer from "./Features/rolesSlice.js";
import unitsReducer from "./Features/unitsSlice.js";
import servicesReducer from "./Features/servicesSlice.js";

const store = configureStore({
  reducer: {
    logIn: logInReducer,
    workType: workTypeReducer,
    education: educationReducer,
    roles: rolesReducer,
    units: unitsReducer,
    services: servicesReducer,
  },
});

export default store;

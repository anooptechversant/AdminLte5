import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/logInSlice.js";
import workTypeReducer from "./Features/workTypeSlice.js";
import educationReducer from "./Features/educationSlice.js";
import rolesReducer from "./Features/rolesSlice.js";
import unitsReducer from "./Features/unitsSlice.js";
import servicesReducer from "./Features/servicesSlice.js";
import projectReducer from "./Features/projectSlice.js";
import budgetReducer from "./Features/budgetSlice.js";
import brandReducer from "./Features/brandSlice.js";
import categoryReducer from "./Features/categorySlice.js";

const store = configureStore({
  reducer: {
    logIn: logInReducer,
    workType: workTypeReducer,
    education: educationReducer,
    roles: rolesReducer,
    units: unitsReducer,
    services: servicesReducer,
    brand: brandReducer,
    project: projectReducer,
    budget: budgetReducer,
    category: categoryReducer,
  },
});

export default store;

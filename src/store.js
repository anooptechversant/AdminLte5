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
import subCategoryReducer from "./Features/subCategorySlice.js";
import supplierReducer from "./Features/supplierSlice.js";
import brandProductReducer from "./Features/brandProductSlice.js";
import productReducer from "./Features/ProductSlice.js";
import userWorkTypeReducer from "./Features/userWorkTypeSlice.js";
import userReducer from "./Features/userSlice.js";

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
    subCategory: subCategoryReducer,
    supplier: supplierReducer,
    brandProduct: brandProductReducer,
    product: productReducer,
    userWorkType: userWorkTypeReducer,
    user: userReducer,
  },
});

export default store;

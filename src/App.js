import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import WorkTypeComponent from "./Pages/WorkType/WorkTypeComponent";
import EducationComponent from "./Pages/Education/EducationComponent";
import RolesComponent from "./Pages/Roles/RolesComponent";
import UnitsComponent from "./Pages/Units/UnitsComponent";
import ServicesComponent from "./Pages/Services/ServicesComponent";
import BrandComponent from "./Pages/Brands/BrandComponent";
import BudgetComponent from "./Pages/Budget/BudgetComponent";
import ProjectComponent from "./Pages/Project/ProjectComponent";
import CategoryComponent from "./Pages/Category/CategoryComponent";
import SubCategoryComponent from "./Pages/SubCategory/SubCategoryComponent";
import SupplierComponent from "./Pages/Supplier/SupplierComponent";
import ProductComponent from "./Pages/Product/ProductComponent";
import UserComponent from "./Pages/User/UserComponent";
import UserTypeComponent from "./Pages/UserType/UserTypeComponent";

// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />{" "}
              <Route path='work-types' element={<WorkTypeComponent />}>
                <Route path='add-work-type' element={<WorkTypeComponent />} />
                <Route
                  path='edit-work-type/:id'
                  element={<WorkTypeComponent />}
                />
              </Route>
              <Route path='education' element={<EducationComponent />}>
                <Route path='add-education' element={<EducationComponent />} />
                <Route
                  path='edit-education/:id'
                  element={<EducationComponent />}
                />
              </Route>
              <Route path='roles' element={<RolesComponent />}>
                <Route path='edit-roles/:id' element={<RolesComponent />} />
                <Route path='add-roles' element={<RolesComponent />} />
              </Route>
              <Route path='units' element={<UnitsComponent />}>
                <Route path='edit-units/:id' element={<UnitsComponent />} />
                <Route path='add-units' element={<UnitsComponent />} />
              </Route>
              <Route path='services' element={<ServicesComponent />}>
                <Route
                  path='edit-services/:id'
                  element={<ServicesComponent />}
                />
                <Route path='add-services' element={<ServicesComponent />} />
              </Route>
              <Route path='brands' element={<BrandComponent />}>
                <Route path='edit-brand/:id' element={<BrandComponent />} />
                <Route path='add-brand' element={<BrandComponent />} />
              </Route>
              <Route path='budget' element={<BudgetComponent />}>
                <Route
                  path='user-budget/:user_id'
                  element={<BudgetComponent />}
                />{" "}
                <Route
                  path='add-budget/:user_id'
                  element={<BudgetComponent />}
                />
                <Route
                  path='edit-budget/:user_id/:budget_id'
                  element={<BudgetComponent />}
                />
              </Route>
              <Route path='project' element={<ProjectComponent />}>
                <Route
                  path='user-project/:user_id'
                  element={<ProjectComponent />}
                />
                <Route
                  path='add-project/:user_id'
                  element={<ProjectComponent />}
                />{" "}
                <Route
                  path='edit-project/:user_id/:project_id'
                  element={<ProjectComponent />}
                />
              </Route>
              <Route path='category' element={<CategoryComponent />}>
                <Route
                  path='edit-category/:id'
                  element={<CategoryComponent />}
                />
                <Route path='add-category' element={<CategoryComponent />} />
              </Route>
              <Route path='sub-category' element={<SubCategoryComponent />}>
                <Route
                  path='edit-sub-category/:id/:category_id'
                  element={<SubCategoryComponent />}
                />
                <Route
                  path='add-sub-category'
                  element={<SubCategoryComponent />}
                />
              </Route>
              <Route path='supplier' element={<SupplierComponent />}>
                <Route
                  path='view-supplier/:id'
                  element={<SupplierComponent />}
                />
                <Route path='add-supplier' element={<SupplierComponent />} />
                <Route
                  path='edit-supplier/:id'
                  element={<SupplierComponent />}
                />
                <Route
                  path='edit-supplier-address/:ref_id/address/:address_id/:user_type'
                  element={<SupplierComponent />}
                />
              </Route>
              <Route path='product' element={<ProductComponent />}>
                <Route
                  path='view-product/:prodId'
                  element={<ProductComponent />}
                />
                <Route
                  path='add-brand-product'
                  element={<ProductComponent />}
                />
                <Route
                  path='edit-brand-product/:brProdId'
                  element={<ProductComponent />}
                />
                <Route
                  path='add-product/:brProdId'
                  element={<ProductComponent />}
                />
                <Route
                  path='edit-product/:prodId'
                  element={<ProductComponent />}
                />
                <Route
                  path='edit-product-image/:prodId/:imageId'
                  element={<ProductComponent />}
                />{" "}
                <Route
                  path='add-product-image/:prodId'
                  element={<ProductComponent />}
                />
                <Route
                  path='add-brand-supplier/:prodId'
                  element={<ProductComponent />}
                />{" "}
                <Route
                  path='add-brand-supplier/:prodId/:add'
                  element={<ProductComponent />}
                />
              </Route>
              <Route path='users' element={<UserComponent />}>
                <Route path='view-user/:userId' element={<UserComponent />} />
                <Route
                  path='add-work-type/:userId'
                  element={<UserComponent />}
                />{" "}
                <Route
                  path='edit-work-type/:userId/:id'
                  element={<UserComponent />}
                />
                <Route path='user-role/:type' element={<UserComponent />} />
              </Route>
              <Route path='user-type' element={<UserTypeComponent />}>
                <Route path='user-role/:type' element={<UserTypeComponent />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

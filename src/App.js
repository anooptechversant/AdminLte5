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
import OrderComponent from "./Pages/Order/OrderComponent";

const routesConfig = [
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "work-types", element: <WorkTypeComponent /> },
      { path: "work-types/add-work-type", element: <WorkTypeComponent /> },
      { path: "work-types/edit-work-type/:id", element: <WorkTypeComponent /> },
      { path: "education", element: <EducationComponent /> },
      { path: "education/add-education", element: <EducationComponent /> },
      { path: "education/edit-education/:id", element: <EducationComponent /> },
      { path: "roles", element: <RolesComponent /> },
      { path: "roles/add-roles", element: <RolesComponent /> },
      { path: "roles/edit-roles/:id", element: <RolesComponent /> },
      { path: "units", element: <UnitsComponent /> },
      { path: "units/add-units", element: <UnitsComponent /> },
      { path: "units/edit-units/:id", element: <UnitsComponent /> },
      { path: "services", element: <ServicesComponent /> },
      { path: "services/add-services", element: <ServicesComponent /> },
      { path: "services/edit-services/:id", element: <ServicesComponent /> },
      { path: "brands", element: <BrandComponent /> },
      { path: "brands/add-brand", element: <BrandComponent /> },
      { path: "brands/edit-brand/:id", element: <BrandComponent /> },
      { path: "budget", element: <BudgetComponent /> },
      { path: "budget/user-budget/:user_id", element: <BudgetComponent /> },
      { path: "budget/add-budget/:user_id", element: <BudgetComponent /> },
      {
        path: "budget/edit-budget/:user_id/:budget_id",
        element: <BudgetComponent />,
      },
      { path: "project", element: <ProjectComponent /> },
      { path: "project/user-project/:user_id", element: <ProjectComponent /> },
      { path: "project/add-project/:user_id", element: <ProjectComponent /> },
      {
        path: "project/edit-project/:user_id/:project_id",
        element: <ProjectComponent />,
      },
      { path: "category", element: <CategoryComponent /> },
      { path: "category/add-category", element: <CategoryComponent /> },
      { path: "category/edit-category/:id", element: <CategoryComponent /> },
      { path: "sub-category", element: <SubCategoryComponent /> },
      {
        path: "sub-category/add-sub-category",
        element: <SubCategoryComponent />,
      },
      {
        path: "sub-category/edit-sub-category/:id/:category_id",
        element: <SubCategoryComponent />,
      },
      { path: "supplier", element: <SupplierComponent /> },
      { path: "supplier/add-supplier", element: <SupplierComponent /> },
      { path: "supplier/edit-supplier/:id", element: <SupplierComponent /> },
      { path: "supplier/view-supplier/:id", element: <SupplierComponent /> },
      {
        path: "supplier/edit-supplier-address/:ref_id/address/:address_id/:user_type",
        element: <SupplierComponent />,
      },
      { path: "product", element: <ProductComponent /> },
      { path: "product/view-product/:prodId", element: <ProductComponent /> },
      { path: "product/add-brand-product", element: <ProductComponent /> },
      {
        path: "product/edit-brand-product/:brProdId",
        element: <ProductComponent />,
      },
      { path: "product/add-product/:brProdId", element: <ProductComponent /> },
      { path: "product/edit-product/:prodId", element: <ProductComponent /> },
      {
        path: "product/edit-product-image/:prodId/:imageId",
        element: <ProductComponent />,
      },
      {
        path: "product/add-product-image/:prodId",
        element: <ProductComponent />,
      },
      {
        path: "product/add-brand-supplier/:prodId",
        element: <ProductComponent />,
      },
      {
        path: "product/add-brand-supplier/:prodId/:add",
        element: <ProductComponent />,
      },
      { path: "users", element: <UserComponent /> },
      { path: "users/view-user/:userId", element: <UserComponent /> },
      { path: "users/add-work-type/:userId", element: <UserComponent /> },
      { path: "users/edit-work-type/:userId/:id", element: <UserComponent /> },
      { path: "users/user-role/:type", element: <UserComponent /> },
      { path: "user-type", element: <UserTypeComponent /> },
      { path: "user-type/user-role/:type", element: <UserTypeComponent /> },
      { path: "orders", element: <OrderComponent /> },
      { path: "orders/view-order/:id", element: <OrderComponent /> },
      {
        path: "orders/update-order/:order_details_id/:track_id/:id",
        element: <OrderComponent />,
      },
    ],
  },
];

function renderRoutes(routes) {
  return routes.map((route, index) => {
    const { path, element, children } = route;

    if (children) {
      return (
        <Route key={index} path={path} element={element}>
          {renderRoutes(children)}
        </Route>
      );
    }

    return <Route key={index} path={path} element={element} />;
  });
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/ftest2'>
        <Routes>{renderRoutes(routesConfig)}</Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

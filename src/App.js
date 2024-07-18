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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

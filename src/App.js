import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import WorkTypeComponent from "./Pages/WorkType/WorkTypeComponent";
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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

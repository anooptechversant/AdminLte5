import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Utils/loginUtil";
function LoginOutlet() {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
     return <Navigate to='/login' />;
  }
}

export default LoginOutlet;

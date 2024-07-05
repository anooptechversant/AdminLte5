import { useSelector } from "react-redux";
import Header from "../Components/PageComponents/Header";
import Sidebar from "../Components/PageComponents/Sidebar";
import LoginOutlet from "../Outlets/LoginOutlet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../Utils/loginUtil";
import Loading from "../Components/Loader/Loading";

function Layout() {
   const data = useSelector((state) => state);
   const { loginLoading } = data.logIn;
   const navigate = useNavigate();

   useEffect(() => {
     if (!isLoggedIn()) {
       navigate("/login");
     }
   }, [navigate]);
  return (
    <div class='hold-transition sidebar-mini layout-fixed'>
      <div class='wrapper'>
        {loginLoading ? <Loading /> : null}

        <div class='preloader flex-column justify-content-center align-items-center'>
          <img
            class='animation__shake'
            src='dist/img/AdminLTELogo.png'
            alt='AdminLTELogo'
            height='60'
            width='60'
          />
        </div>
        <Header />

        <Sidebar />

        <div class='content-wrapper'>
          <LoginOutlet />
        </div>
        <footer class='main-footer'>
          <strong>
            Copyright &copy; 2014-2021{" "}
            <a href='https://adminlte.io'>AdminLTE.io</a>.
          </strong>
          All rights reserved.
          <div class='float-right d-none d-sm-inline-block'>
            <b>Version</b> 3.1.0
          </div>
        </footer>

        <aside class='control-sidebar control-sidebar-dark'></aside>
      </div>
    </div>
  );
}

export default Layout;

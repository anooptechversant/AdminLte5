import { useSelector } from "react-redux";
import Header from "../Components/PageComponents/Header";
import Sidebar from "../Components/PageComponents/Sidebar";
import LoginOutlet from "../Outlets/LoginOutlet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../Utils/loginUtil";
import Loading from "../Components/Loader/Loading";

function Layout() {
  //  const data = useSelector((state) => state);
  //  const { loginLoading } = data.logIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className='wrapper'>
      {/* {loginLoading ? <Loading /> : null} */}

      {/* <div className='preloader flex-column justify-content-center align-items-center'>
          <img
            className='animation__shake'
            src='dist/img/AdminLTELogo.png'
            alt='AdminLTELogo'
            height='60'
            width='60'
          />
        </div> */}
      <Header />

      <Sidebar />

      <div className='content-wrapper'>
        <LoginOutlet />
      </div>
      <aside className='control-sidebar control-sidebar-dark'></aside>
      <footer className='main-footer'>
        <strong>
          Copyright &copy; 2024{" "}
          <a href='https://adminlte.io'>Brickar</a>.
        </strong>
        All rights reserved.
        <div className='float-right d-none d-sm-inline-block'>
          <b>Version</b> 3.1.0
        </div>
      </footer>

      <aside className='control-sidebar control-sidebar-dark'></aside>
    </div>
  );
}

export default Layout;

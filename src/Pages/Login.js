import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../Actions/loginActions"; 
import Loading from "../Components/Loader/Loading";
import { isLoggedIn } from "../Utils/loginUtil";

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginLoading, LoginSuccess, loginError, userInfo } = useSelector(
    (state) => state.logIn
  );

  useEffect(() => {
    if (userInfo || isLoggedIn()) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(inputEmail, inputPassword));
  };

  return (
    <div className='hold-transition login-page'>
      {loginLoading ? <Loading /> : null}
      <div className='login-box'>
        <div className='card card-outline card-primary'>
          <div className='card-header text-center'>
            <a href='../../index2.html' className='h1'>
              <b>Admin</b>LTE
            </a>
          </div>
          <div className='card-body'>
            <p className='login-box-msg'>Sign in to start your session</p>
            <form onSubmit={onFormSubmit}>
              <div className='input-group mb-3'>
                <input
                  className='form-control'
                  placeholder='Email'
                  value={inputEmail}
                  onChange={handleEmailChange}
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope'></span>
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  value={inputPassword}
                  onChange={handlePasswordChange}
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock'></span>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  <div className='icheck-primary'>
                    <input type='checkbox' id='remember' />
                    <label htmlFor='remember'>Remember Me</label>
                  </div>
                </div>
                <div className='col-4'>
                  <button type='submit' className='btn btn-primary btn-block'>
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className='social-auth-links text-center mt-2 mb-3'>
              <a href='#' className='btn btn-block btn-primary'>
                <i className='fab fa-facebook mr-2'></i> Sign in using Facebook
              </a>
              <a href='#' className='btn btn-block btn-danger'>
                <i className='fab fa-google-plus mr-2'></i> Sign in using
                Google+
              </a>
            </div>

            <p className='mb-1'>
              <a href='forgot-password.html'>I forgot my password</a>
            </p>
            <p className='mb-0'>
              <a href='register.html' className='text-center'>
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

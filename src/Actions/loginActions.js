import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  LoginFail,
  LoginReq,
  LoginSuccess,
  Logout,
} from "../Features/logInSlice";
import saveUserInfo, {
  removeUserInfo,
  saveAccessToken,
} from "../Utils/loginUtil.js";

export const logIn = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-api-key": g.API_KEY,
      },
    };

    dispatch(LoginReq());

    const { data } = await axiosConfig.post(
      c.LOGIN_URL,
      {
        username: email,
        password: password,
      },
      config
    );
    dispatch(LoginSuccess(data));
    saveUserInfo(data);

    setTimeout(() => {
      dispatch(LoginSuccess(null));
    }, 5000);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(LoginFail(errorIs));
    setTimeout(() => {
      dispatch(LoginFail(null));
    }, 5000);
  }
};

export const logout = () => async (dispatch) => {
  removeUserInfo();
  dispatch(Logout());
};

export const getRefreshToken = () => async (dispatch) => {
  try {
    const reFreshConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.REFRESH_TOKEN}`,
      },
    };
    const { data } = await axiosConfig.post(c.RE_FRESH_URL, {}, reFreshConfig);
    saveAccessToken(data);
    // Dispatch action to update the store with the new access token
    dispatch(LoginSuccess(data));
  } catch (error) {
    // Handle any errors, e.g., dispatch an action to logout the user
    dispatch(Logout());
  }
};

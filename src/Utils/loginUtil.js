//Here we are saving the userinfo after loging
const saveUserInfo = (data) => {
  localStorage.setItem("userInfo", data.access_token);
  localStorage.setItem("refreshToken", data.refresh_token);
  localStorage.setItem("user_name", data.user_name);
  // window.location.href = "/";
};

//Here we are saving new access token after call refreshtoken api
const saveAccessToken = (data) => {
  localStorage.setItem("userInfo", data.access_token);
  // window.location.href = "/";
};

const removeUserInfo = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_name");
  // window.location.href = "Login";
};

//To check user is loggedin or not ...
const isLoggedIn = () => {
  try {
    const value = localStorage.getItem("userInfo");
    return !!value;
  } catch {
    return false;
  }
};

export { removeUserInfo, isLoggedIn, saveAccessToken };
export default saveUserInfo;

// loginActions.js
import axios from "axios";
import { useDispatch } from "react-redux";
import { getRefreshToken } from "../Actions/loginActions";
const instance = axios.create({
  baseURL: "https://tu6oq8usme.execute-api.ap-south-1.amazonaws.com/dev/",
});

let isRefreshing = false;
let failedQueue = [];

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const accessToken = localStorage.getItem("userInfo");
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return await axios(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (!isRefreshing) {
        isRefreshing = true;
        const dispatch = useDispatch();
        const refreshToken = localStorage.getItem("refreshToken");

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
          dispatch(getRefreshToken(refreshToken))
            .then((newAccessToken) => {
              failedQueue.forEach((item) => {
                item.resolve(newAccessToken);
              });
              failedQueue = [];
              resolve(instance(originalRequest));
            })
            .catch((error) => {
              failedQueue.forEach((item) => {
                item.reject(error);
              });
              failedQueue = [];
              reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

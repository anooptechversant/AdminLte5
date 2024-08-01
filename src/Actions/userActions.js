import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  unapprovedFetch,
  userByID,
  userFail,
  userFetch,
  userReq,
  userSuccess,
} from "../Features/userSlice";

export const getUserData = (arg, data, id, role_type) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(userReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(
        `${c.GET_USER_LIST_URL}?page=${id}&limit=${data}`,
        usersConfig
      );
      dispatch(userFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_USER_URL}${data}`,
        usersConfig
      );
      dispatch(userByID(response.data));
    } else if (arg === "unapproved") {
      const response = await axiosConfig.get(
        `${c.GET_USER_LIST_URL}unapproved/${role_type}/?page=${id}&limit=${data}`,
        usersConfig
      );
      dispatch(unapprovedFetch(response.data));
    } else if (arg === "update") {
      const response = await axiosConfig.patch(
        `${c.GET_USER_LIST_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(userSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_USER_LIST_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(userSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(userSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      userFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(userFail(null));
    }, 5000);
  }
};

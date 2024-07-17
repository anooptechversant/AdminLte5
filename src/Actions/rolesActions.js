import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  rolesFail,
  rolesFetch,
  rolesReq,
  rolesSuccess,
} from "../Features/rolesSlice";

export const getRolesData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(rolesReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(c.FETCH_ROLES_URL, usersConfig);
      dispatch(rolesFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_ROLES_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(rolesSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_ROLES_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(rolesSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_ROLES_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(rolesSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(rolesSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      rolesFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(rolesFail(null));
    }, 5000);
  }
};

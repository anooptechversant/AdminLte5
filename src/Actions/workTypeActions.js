import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  workTypeFail,
  workTypeFetch,
  workTypeReq,
  workTypeSuccess,
} from "../Features/workTypeSlice";

export const getWorkTypeData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(workTypeReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_WORK_TYPE_URL, usersConfig);
      dispatch(workTypeFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_WORK_TYPE_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(workTypeSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_WORK_TYPE_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(workTypeSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_WORK_TYPE_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(workTypeSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(workTypeSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      workTypeFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(workTypeFail(null));
    }, 5000);
  }
};

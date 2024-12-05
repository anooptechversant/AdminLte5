import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  categoryFail,
  categoryFetch,
  categoryIsActiveSuccess,
  categoryReq,
  categorySuccess,
} from "../Features/categorySlice";

export const getCategoryData = (arg, data, id) => async (dispatch) => {
  try {
    let contentType;

    if (arg === "deactivate" || arg === "activate" || arg === "priority") {
      contentType = "application/json";
    } else {
      contentType = "multipart/form-data";
    }
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": contentType,
      },
    };
    dispatch(categoryReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_CATEGORY_URL, usersConfig);
      dispatch(categoryFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_CATEGORY_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(categorySuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_CATEGORY_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(categorySuccess(response));
      }
    } else if (arg === "priority") {
      const response = await axiosConfig.put(
        `${c.GET_CATEGORY_URL}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(categorySuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(`${c.GET_CATEGORY_URL}${id}`, {
        data: data,
        headers: usersConfig.headers,
      });
      if (response.status === 204) {
        dispatch(categoryIsActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_CATEGORY_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(categoryIsActiveSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(categorySuccess(null));
      dispatch(categoryIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      categoryFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(categoryFail(null));
    }, 5000);
  }
};

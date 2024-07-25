import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  subCategoryFail,
  subCategoryFetch,
  subCategoryIsActiveSuccess,
  subCategoryReq,
  subCategorySuccess,
} from "../Features/subCategorySlice";

export const getSubCategoryData = (arg, data, id) => async (dispatch) => {
  try {
    let contentType;

    if (arg === "deactivate" || arg === "activate") {
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

    dispatch(subCategoryReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(
        `${c.GET_SUB_CATEGORY_URL}${data}`,
        usersConfig
      );
      dispatch(subCategoryFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_SUB_CATEGORY_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(subCategorySuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_SUB_CATEGORY_URL}${id}/`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategorySuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(
        `${c.GET_SUB_CATEGORY_URL}${id}/`,
        {
          data: data,
          headers: usersConfig.headers
        }
      );
      if (response.status === 204) {
        dispatch(subCategoryIsActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_SUB_CATEGORY_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategoryIsActiveSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(subCategorySuccess(null));
      dispatch(subCategoryIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      subCategoryFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(subCategoryFail(null));
    }, 5000);
  }
};

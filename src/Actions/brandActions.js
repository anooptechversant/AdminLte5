import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  brandFail,
  brandFetch,
  brandReq,
  brandSuccess,
  isActiveSuccess,
} from "../Features/brandSlice";

export const getBrandData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(brandReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_BRAND_URL, usersConfig);
      dispatch(brandFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_BRAND_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(brandSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_BRAND_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(brandSuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(`${c.GET_BRAND_URL}${id}`, {
        data: data,
        headers: usersConfig.headers,
      });
      if (response.status === 204) {
        dispatch(isActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_BRAND_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(isActiveSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(brandSuccess(null));
        dispatch(isActiveSuccess(null));

    }, 5000);
  } catch (error) {
    dispatch(
      brandFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(brandFail(null));
    }, 5000);
  }
};

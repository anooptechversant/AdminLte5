import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";

import {
  brandProductFail,
  brandProductFetch,
  brandProductReq,
  brandProductSuccess,
  brandProductIsActiveSuccess,
} from "../Features/brandProductSlice";

export const getBrandProductData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(brandProductReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(
        c.GET_BRAND_PRODUCT_URL,
        usersConfig
      );
      dispatch(brandProductFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_BRAND_PRODUCT_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(brandProductSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.patch(
        `${c.GET_BRAND_PRODUCT_URL}${id}/`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(brandProductSuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(
        `${c.GET_BRAND_PRODUCT_URL}${id}`,
        {
          data: data,
          headers: usersConfig.headers,
        }
      );
      if (response.status === 204) {
        dispatch(brandProductIsActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_BRAND_PRODUCT_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(brandProductIsActiveSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(brandProductSuccess(null));
      dispatch(brandProductIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      brandProductFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(brandProductFail(null));
    }, 5000);
  }
};

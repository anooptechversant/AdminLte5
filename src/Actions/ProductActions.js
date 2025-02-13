import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  productReq,
  productFetch,
  productSuccess,
  productById,
  productFail,
  productIsActiveSuccess,
  prodImageSuccess,
} from "../Features/ProductSlice";

export const getProductData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    dispatch(productReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(
        `${c.GET_PRODUCT_URL}?page=${id}&limit=${data}`,
        usersConfig
      );
      dispatch(productFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_PRODUCT_URL}${data}`,
        usersConfig
      );
      dispatch(productById(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_PRODUCT_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(productSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_PRODUCT_URL}${id}/`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(productSuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(`${c.GET_PRODUCT_URL}${id}/`, {
        data: data,
        headers: usersConfig.headers,
      });
      if (response.status === 204) {
        dispatch(productIsActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_PRODUCT_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(productIsActiveSuccess(response));
      }
    } else if (arg === "addSupplier") {
      const response = await axiosConfig.post(
        `${c.GET_BRAND_SUPPLIER_URL}`,
        data,
        usersConfig
      );
      console.log({ response });
      if (response.status === 201) {
        dispatch(productSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_BRAND_SUPPLIER_URL}${data}/`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(productSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(productSuccess(null));
      dispatch(productIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      productFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(productFail(null));
    }, 5000);
  }
};

export const getProdImage = (arg, data, id, prodId) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(productReq());
    if (arg === "insert") {
      const response = await axiosConfig.post(
        `${c.GET_PRODUCT_URL}images/${id}`,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(prodImageSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_PRODUCT_URL}images/${id}/?product_id=${prodId}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(prodImageSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(prodImageSuccess(null));
      dispatch(productIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      productFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(productFail(null));
    }, 5000);
  }
};

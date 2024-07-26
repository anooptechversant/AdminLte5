import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  supplierReq,
  supplierFetch,
  supplierSuccess,
  supplierById,
  supplierFail,
  supplierIsActiveSuccess,
} from "../Features/supplierSlice";

export const getSupplierData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    dispatch(supplierReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_SUPPLIER_URL, usersConfig);
      dispatch(supplierFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_SUPPLIER_URL}${data}`,
        usersConfig
      );
      dispatch(supplierById(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_SUPPLIER_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(supplierSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_SUPPLIER_URL}${id}/`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(supplierSuccess(response));
      }
    } else if (arg === "deactivate") {
      const response = await axiosConfig.delete(`${c.GET_SUPPLIER_URL}${id}/`, {
        data: data,
        headers: usersConfig.headers,
      });
      if (response.status === 204) {
        dispatch(supplierIsActiveSuccess(response));
      }
    } else if (arg === "activate") {
      const response = await axiosConfig.put(
        `${c.GET_SUPPLIER_URL}${id}/activate`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(supplierIsActiveSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(supplierSuccess(null));
      dispatch(supplierIsActiveSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      supplierFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(supplierFail(null));
    }, 5000);
  }
};

export const updateSupplierAddress =
  (refId, addressId, data, user_type) => async (dispatch) => {
    try {
      const usersConfig = {
        headers: {
          "x-api-key": g.API_KEY,
          Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        },
      };

      dispatch(supplierReq());

      const response = await axiosConfig.put(
        `${c.GET_SUPPLIER_URL}${refId}/address/${addressId}?user_type=${user_type}`,
        data,
        usersConfig
      );

      if (response.status === 200) {
        dispatch(supplierSuccess(response));
      }
      setTimeout(() => {
        dispatch(supplierSuccess(null));
      }, 5000);
    } catch (error) {
      dispatch(
        supplierFail(
          error.response ? error.response.data.message : "An error occurred"
        )
      );
      setTimeout(() => {
        dispatch(supplierFail(null));
      }, 5000);
    }
  };
  
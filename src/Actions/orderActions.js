import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  orderReq,
  orderFetch,
  orderSuccess,
  orderById,
  orderFail,
  deleteOrderSuccess,
  orderDetailsFetch,
} from "../Features/orderSlice";

export const getOrderData = (arg, data, id, status) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    dispatch(orderReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(
        `${c.GET_ORDER_URL}?order_status=${status}&page=${id}&limit=${data}`,
        usersConfig
      );
      dispatch(orderFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_ORDER_URL}${data}`,
        usersConfig
      );
      dispatch(orderById(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_TRACK_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(orderSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.patch(
        `${c.GET_TRACK_URL}${id}/${status}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(orderSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_TRACK_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(deleteOrderSuccess(response));
      }
    } else if (arg === "detailsFetch") {
      const response = await axiosConfig.get(
        `${c.GET_TRACK_URL}${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(orderDetailsFetch(response.data));
      }
    }
    setTimeout(() => {
      dispatch(orderSuccess(null));
      dispatch(deleteOrderSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      orderFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(orderFail(null));
    }, 5000);
  }
};

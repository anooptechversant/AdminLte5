import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  servicesFail,
  servicesFetch,
  servicesReq,
  servicesSuccess,
} from "../Features/servicesSlice"; 

export const getServicesData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(servicesReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(
        c.GET_SERVICES_URL, 
        usersConfig
      );
      dispatch(servicesFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_SERVICES_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(servicesSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_SERVICES_URL}${id}`, 
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(servicesSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_SERVICES_URL}${data}`, 
        usersConfig
      );
      if (response.status === 204) {
        dispatch(servicesSuccess(response));
      }
    }
      setTimeout(() => {
        dispatch(servicesSuccess(null));
      }, 5000);
  } catch (error) {
    dispatch(
      servicesFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(servicesFail(null));
    }, 5000);
  }
};

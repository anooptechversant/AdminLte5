import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  locationFail,
  locationFetch,
  locationReq,
  locationSuccess,
} from "../Features/locationSlice";

export const getLocationData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(locationReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_LOCATION_URL, usersConfig);
      dispatch(locationFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_LOCATION_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(locationSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_LOCATION_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(locationSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_LOCATION_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(locationSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(locationSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      locationFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(locationFail(null));
    }, 5000);
  }
};

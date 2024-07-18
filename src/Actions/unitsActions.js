import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  unitFail,
  unitFetch,
  unitReq,
  unitSuccess,
} from "../Features/unitsSlice";

export const getUnitData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(unitReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.FETCH_UNIT_URL, usersConfig);
      dispatch(unitFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_UNIT_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(unitSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_UNIT_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(unitSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_UNIT_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(unitSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(unitSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      unitFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(unitFail(null));
    }, 5000);
  }
};

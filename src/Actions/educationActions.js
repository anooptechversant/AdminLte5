import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  educationFail,
  educationFetch,
  educationReq,
  educationSuccess,
} from "../Features/educationSlice";

export const getEducationData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(educationReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(
        c.FETCH_EDUCATION_URL,
        usersConfig
      );
      dispatch(educationFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_EDUCATION_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(educationSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_EDUCATION_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(educationSuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_EDUCATION_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(educationSuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(educationSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      educationFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(educationFail(null));
    }, 5000);
  }
};

import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  userWorkTypeFail,
  userWorkTypeReq,
  userWorkTypeSuccess,
} from "../Features/userWorkTypeSlice";

export const getUserWorkTypeData =
  (arg, data, id) => async (dispatch) => {
    try {
      
      const usersConfig = {
        headers: {
          "x-api-key": g.API_KEY,
          Authorization: `Bearer ${g.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      };
      dispatch(userWorkTypeReq());
    if (arg === "delete") {
        const response = await axiosConfig.delete(
          `api/v1/admin/worktype/${data}/`,
          usersConfig
        );
        if (response.status === 204) {
          dispatch(userWorkTypeSuccess(response));
        }
      } else if (arg === "insert") {
        const response = await axiosConfig.post(
          `${c.GET_USER_URL}${id}/worktype`,
          data,
          usersConfig
        );
        if (response.status === 201) {
          dispatch(userWorkTypeSuccess(response));
        }
      } else if (arg === "update") {
        const response = await axiosConfig.put(
          `${c.GET_USER_URL}${id}/worktype/`,
          data,
          usersConfig
        );
        if (response.status === 200) {
          dispatch(userWorkTypeSuccess(response));
        }
      } 
      setTimeout(() => {
        dispatch(userWorkTypeSuccess(null));
      }, 5000);
    } catch (error) {
      dispatch(
        userWorkTypeFail(
          error.response ? error.response.data.message : "An error occurred"
        )
      );
      setTimeout(() => {
        dispatch(userWorkTypeFail(null));
      }, 5000);
    }
  };

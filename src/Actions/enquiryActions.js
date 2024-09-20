import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  enquiryFail,
  enquiryFetch,
  enquiryReq,
  enquirySuccess,
} from "../Features/enquirySlice";

export const getEnquiryData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    dispatch(enquiryReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_ENQUIRY_URL, usersConfig);
      dispatch(enquiryFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_ENQUIRY_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(enquirySuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_ENQUIRY_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(enquirySuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_ENQUIRY_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(enquirySuccess(response));
      }
    }
    setTimeout(() => {
      dispatch(enquirySuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      enquiryFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(enquiryFail(null));
    }, 5000);
  }
};

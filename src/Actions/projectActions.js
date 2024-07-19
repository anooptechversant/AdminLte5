import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  projectFail,
  projectFetch,
  projectReq,
  projectSuccess,
  fetchByUserID,
  projectMedia,
} from "../Features/projectSlice";

export const getProjectData = (arg, data, id, project_id) => async (dispatch) => {
  try {
     let contentType;

     if (arg === "img-insert") {
       contentType = "multipart/form-data";
     } else {
       contentType = "application/json";
     }
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": contentType,
      },
    };
    dispatch(projectReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_PROJECT_URL, usersConfig);
      dispatch(projectFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_USER_URL}${data}/project`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(fetchByUserID(response.data));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_PROJECT_URL}${data}/`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(projectSuccess(response));
      }
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        `${c.GET_USER_URL}${id}/project`,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(projectSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_USER_URL}${id}/project/${project_id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(projectSuccess(response));
      }
    } else if (arg === "img-delete") {
      const response = await axiosConfig.delete(
        `${c.GET_USER_URL}${data}/medias/${id}/`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(projectSuccess(response));
      }
    } else if (arg === "img-insert") {
      const response = await axiosConfig.post(
        `${c.GET_USER_URL}${id}/medias/`,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(projectMedia(response));
      }
      return response
    } 
    setTimeout(() => {
      dispatch(projectSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      projectFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(projectFail(null));
    }, 5000);
  }
};

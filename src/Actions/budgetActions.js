import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  budgetById,
  budgetFail,
  budgetFetch,
  budgetReq,
  budgetSuccess,
} from "../Features/budgetSlice";

export const getBudgetData = (arg, data, id, budget_id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    dispatch(budgetReq());

    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_BUDGET_URL, usersConfig);
      dispatch(budgetFetch(response.data));
    } else if (arg === "single") {
      const response = await axiosConfig.get(
        `${c.GET_USER_URL}${data}/budget`,
        usersConfig
      );
      dispatch(budgetById(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        `${c.GET_USER_URL}${id}/budget/`,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(budgetSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.patch(
        `${c.GET_USER_URL}${id}/budget/${budget_id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(budgetSuccess(response));
      }
    }else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_USER_URL}${data}/budget/${id}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(budgetSuccess(response));
      }}
    setTimeout(() => {
      dispatch(budgetSuccess(null));
    }, 5000);
  } catch (error) {
    dispatch(
      budgetFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
    setTimeout(() => {
      dispatch(budgetFail(null));
    }, 5000);
  }
};

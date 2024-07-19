import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBudgetData } from "../../Actions/budgetActions";
import Budget from "./Budget";
import AddBudget from "./AddBudget";
import { getServicesData } from "../../Actions/servicesActions";
import { getUnitData } from "../../Actions/unitsActions";

const BudgetComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const isBudgetRoute = location.pathname === "/budget";

  const isUserBudgetRoute = location.pathname.startsWith(
    "/budget/user-budget/"
  );
  const isAddBudgetRoute = location.pathname.startsWith("/budget/add-budget/");
  const isEditBudgetRoute = location.pathname.startsWith(
    "/budget/edit-budget/"
  );
  const data = useSelector((state) => state);
  const {
    budgetData,
    userBudgetData,
    budgetLoading,
    budgetSuccess,
    budgetError,
  } = data.budget;
  const { unitData } = data.units;
  const { servicesData } = data.services;

  useEffect(() => {
    dispatch(getBudgetData("fetch"));
    if (user_id) {
      dispatch(getBudgetData("single", user_id));
      dispatch(getServicesData("fetch"));
      dispatch(getUnitData("fetch"));
    }
  }, [dispatch, user_id, isUserBudgetRoute]);

  return (
    <>
      {isBudgetRoute || isUserBudgetRoute ? (
        <Budget
          Data={user_id ? userBudgetData : budgetData}
          Success={budgetSuccess}
          Error={budgetError}
          Loading={budgetLoading}
        />
      ) : isAddBudgetRoute || isEditBudgetRoute ? (
        <AddBudget
          Data={userBudgetData}
          Success={budgetSuccess}
          Error={budgetError}
          Loading={budgetLoading}
          UnitData={unitData}
          ServicesData={servicesData}
        />
      ) : null}
    </>
  );
};

export default BudgetComponent;

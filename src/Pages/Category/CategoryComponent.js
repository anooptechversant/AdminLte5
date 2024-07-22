import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../../Actions/categoryActions";
import AddCategory from "./AddCategory";
import Category from "./Category";

const CategoryComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isCategoryRoute = location.pathname === "/category";
  const isAddCategoryRoute = location.pathname === "/category/add-category";
  const isEditCategoryRoute = location.pathname.startsWith(
    "/category/edit-category/"
  );
  const data = useSelector((state) => state);
  const {
    categoryData,
    categorySuccess,
    categoryError,
    categoryLoading,
    categoryIsActive,
  } = data.category;
  useEffect(() => {
    dispatch(getCategoryData("fetch"));
  }, [dispatch, id, isCategoryRoute, categoryIsActive]);
  return (
    <>
      {isAddCategoryRoute || isEditCategoryRoute ? (
        <AddCategory
          Data={categoryData}
          Success={categorySuccess}
          Error={categoryError}
          Loading={categoryLoading}
        />
      ) : isCategoryRoute ? (
        <Category
          Data={categoryData}
          Success={categorySuccess}
          Error={categoryError}
          Loading={categoryLoading}
          isActiveData={categoryIsActive}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CategoryComponent;

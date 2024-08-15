import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoryData } from "../../Actions/subCategoryActions";
import SubCategory from "./SubCategory";
import AddSubCategory from "./AddSubCategory";
import { getCategoryData } from "../../Actions/categoryActions";

const SubCategoryComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { category_id } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const isSubCategoryRoute = location.pathname === "/sub-category";
  const isAddSubCategoryRoute =
    location.pathname === "/sub-category/add-sub-category";
  const isEditSubCategoryRoute = location.pathname.startsWith(
    "/sub-category/edit-sub-category/"
  );
  const {
    subCategoryData,
    subCategoryLoading,
    subCategorySuccess,
    subCategoryError,
    subCategoryIsActive,
  } = useSelector((state) => state.subCategory);
  const { categoryData } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryData("fetch"));
    if (category_id !== undefined) {
      dispatch(getSubCategoryData("fetch", category_id));
    }
  }, [dispatch, subCategoryIsActive, category_id]);
  const subCategoryFetch = (category_id) => {
    setCategoryId(category_id);
    dispatch(getSubCategoryData("fetch", category_id));
  };
  const dataSubCategory = subCategoryData.length > 0 ? subCategoryData : [];

  return (
    <>
      {isAddSubCategoryRoute || isEditSubCategoryRoute ? (
        <AddSubCategory
          Data={subCategoryData}
          Success={subCategorySuccess}
          Error={subCategoryError}
          Loading={subCategoryLoading}
          CategoryData={categoryData}
        />
      ) : isSubCategoryRoute ? (
        <>
          <SubCategory
            Data={dataSubCategory}
            Success={subCategorySuccess}
            Error={subCategoryError}
            Loading={subCategoryLoading}
            CategoryData={categoryData}
            Fetch={subCategoryFetch}
            category_id={categoryId}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SubCategoryComponent;

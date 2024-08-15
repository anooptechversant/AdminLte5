import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddBrand from "./AddBrand";
import Brand from "./Brand";
import { getBrandData } from "../../Actions/brandActions";

const BrandComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isBrandRoute = location.pathname === "/brands";
  const isAddBrandRoute = location.pathname === "/brands/add-brand";
  const isEditBrandRoute = location.pathname.startsWith("/brands/edit-brand/");

  // Select only the education slice from the state
  const { brandData, brandSuccess, brandError, brandLoading, brandIsActive } =
    useSelector((state) => state.brand);
    
  useEffect(() => {
    dispatch(getBrandData("fetch"));
  }, [dispatch, id, brandIsActive, isBrandRoute]);
  return (
    <>
      {isAddBrandRoute || isEditBrandRoute ? (
        <AddBrand
          Data={brandData}
          Success={brandSuccess}
          Error={brandError}
          Loading={brandLoading}
        />
      ) : isBrandRoute ? (
        <Brand
          Data={brandData}
          Success={brandSuccess}
          Error={brandError}
          Loading={brandLoading}
          isActiveData={brandIsActive}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default BrandComponent;

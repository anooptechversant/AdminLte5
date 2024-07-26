import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierData } from "../../Actions/supplierActions";
import AddSupplier from "./AddSupplier";
import Supplier from "./Supplier";
import ViewSupplier from "./ViewSupplier";

const SupplierComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, ref_id } = useParams();

  const isSupplierRoute = location.pathname === "/supplier";
  const isAddSupplierRoute = location.pathname === "/supplier/add-supplier";
  const isEditSupplierRoute = location.pathname.startsWith(
    "/supplier/edit-supplier/"
  );
  const isViewSupplierRoute = location.pathname.startsWith(
    "/supplier/view-supplier/"
  );
  const isAddressEditRoute = location.pathname.startsWith(
    "/supplier/edit-supplier-address/"
  );
  const data = useSelector((state) => state);
  const {
    supplierData,
    supplierSuccess,
    supplierError,
    supplierLoading,
    singleSupplierData,
    supplierIsActive,
  } = data.supplier;
  useEffect(() => {
    dispatch(getSupplierData("fetch"));
  }, [dispatch, id, isSupplierRoute, supplierIsActive]);
  useEffect(() => {
    if (ref_id) {
      dispatch(getSupplierData("single", ref_id));
    } else if (id) {
      dispatch(getSupplierData("single", id));
    }
  }, [dispatch, id, ref_id]);
  return (
    <>
      {isAddSupplierRoute || isEditSupplierRoute || isAddressEditRoute ? (
        <AddSupplier
          Data={supplierData}
          Success={supplierSuccess}
          Error={supplierError}
          Loading={supplierLoading}
          viewData={singleSupplierData}
        />
      ) : isSupplierRoute ? (
        <Supplier
          Data={supplierData}
          Success={supplierSuccess}
          Error={supplierError}
          Loading={supplierLoading}
          isActiveData={supplierIsActive}
        />
      ) : isViewSupplierRoute ? (
        <ViewSupplier
          viewData={singleSupplierData}
          Success={supplierSuccess}
          Error={supplierError}
          Loading={supplierLoading}
          isActiveData={supplierIsActive}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SupplierComponent;

import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "../../Actions/userActions";
import B2BUser from "./B2BUser";
import { getRolesData } from "../../Actions/rolesActions";
const UserTypeComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {  type } = useParams();
 
  const [unapprovedCurrPage, setUnapprovedCurrPage] = useState(1);
  const [unapprovedLimit, setUnapprovedLimit] = useState(8);
  const isUserRoute = location.pathname === "/user-type";
  const isB2BUserRoute = location.pathname.startsWith(
    "/user-type/user-role/B2B"
  );
   const { unapprovedUsers, singleUser, userLoading, userSuccess, userError } =
     useSelector((state) => state.user);
   const { rolesData } = useSelector((state) => state.roles);
 
 
  useEffect(() => {
     dispatch(getRolesData("fetch"));
    if (type)

      dispatch(
        getUserData("unapproved", unapprovedLimit, unapprovedCurrPage, type)
      );
  }, [dispatch, unapprovedCurrPage, unapprovedLimit, type]);
  if (userSuccess !== null)
    dispatch(
      getUserData("unapproved", unapprovedLimit, unapprovedCurrPage, "B2B")
    );

 

  const unapprovedCurrentPageChange = (currPage) => {
    setUnapprovedCurrPage(currPage);
  };
  const unapprovedLimitChange = (limit) => {
    setUnapprovedLimit(limit);
  };
  return (
    <>
      {isB2BUserRoute ? (
        <B2BUser
          unapprovedData={unapprovedUsers}
          RolesData={rolesData}
          Success={userSuccess}
          Error={userError}
          Loading={userLoading}
          unapprovedLimitChange={unapprovedLimitChange}
          unapprovedCurrentPageChange={unapprovedCurrentPageChange}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserTypeComponent;

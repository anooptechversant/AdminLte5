import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRolesData } from "../../Actions/rolesActions";
import AddRoles from "./AddRoles";
import Roles from "./Roles";

const RolesComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isRolesRoute = location.pathname === "/roles";
  const isAddRolesRoute = location.pathname === "/roles/add-roles";
  const isEditRolesRoute = location.pathname.startsWith("/roles/edit-roles/");
  const { rolesData, rolesSuccess, rolesError, rolesLoading } = useSelector(
    (state) => state.roles
  );

  useEffect(() => {
    dispatch(getRolesData("fetch"));
  }, [dispatch, id, isRolesRoute]);

  return (
    <>
      {isAddRolesRoute || isEditRolesRoute ? (
        <AddRoles
          Data={rolesData}
          Success={rolesSuccess}
          Error={rolesError}
          Loading={rolesLoading}
        />
      ) : isRolesRoute ? (
        <Roles
          Data={rolesData}
          Success={rolesSuccess}
          Error={rolesError}
          Loading={rolesLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default RolesComponent;

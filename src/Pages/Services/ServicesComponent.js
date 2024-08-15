import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddServices from "./AddServices";
import Services from "./Services";
import { getServicesData } from "../../Actions/servicesActions";
import { getRolesData } from "../../Actions/rolesActions";
const ServicesComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isServicesRoute = location.pathname === "/services";
  const isAddServicesRoute = location.pathname === "/services/add-services";
  const isEditServicesRoute = location.pathname.startsWith(
    "/services/edit-services/"
  );
   const { servicesData, servicesSuccess, servicesError, servicesLoading } = useSelector((state) => state.services);
const { rolesData } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getServicesData("fetch"));
    dispatch(getRolesData("fetch"));
  }, [dispatch, id, isServicesRoute]);

  return (
    <>
      {isAddServicesRoute || isEditServicesRoute ? (
        <AddServices
          Data={servicesData}
          Success={servicesSuccess}
          Error={servicesError}
          Loading={servicesLoading}
          RoleData={rolesData}
        />
      ) : isServicesRoute ? (
        <Services
          Data={servicesData}
          Success={servicesSuccess}
          Error={servicesError}
          Loading={servicesLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ServicesComponent;

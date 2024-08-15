import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddEducation from "./AddEducation";
import Education from "./Education";
import { getEducationData } from "../../Actions/educationActions";

const EducationComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Memoize the route checks to avoid recalculating on every render
  const isEducationRoute = useMemo(() => location.pathname === "/education", [location.pathname]);
  const isAddEducationRoute = useMemo(() => location.pathname === "/education/add-education", [location.pathname]);
  const isEditEducationRoute = useMemo(() => location.pathname.startsWith("/education/edit-education/"), [location.pathname]);

  // Select only the education slice from the state
  const { educationData, educationSuccess, educationError, educationLoading } = useSelector(
    (state) => state.education
  );

  // Always dispatch to get education data when the component mounts
  useEffect(() => {
    if (isEducationRoute || isAddEducationRoute || isEditEducationRoute) {
      dispatch(getEducationData("fetch"));
    }
  }, [dispatch, id, isEducationRoute, isAddEducationRoute, isEditEducationRoute]);

  // Determine which component to render
  const CurrentComponent = useMemo(() => {
    if (isAddEducationRoute || isEditEducationRoute) return AddEducation;
    if (isEducationRoute) return Education;
    return null;
  }, [isAddEducationRoute, isEditEducationRoute, isEducationRoute]);

  return (
    <>
      {CurrentComponent && (
        <CurrentComponent
          Data={educationData}
          Success={educationSuccess}
          Error={educationError}
          Loading={educationLoading}
        />
      )}
    </>
  );
};

export default EducationComponent;

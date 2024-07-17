import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddEducation from "./AddEducation";
import Education from "./Education";

import { getEducationData } from "../../Actions/educationActions";

const EducationComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEducationRoute = location.pathname === "/education";
  const isAddEducationRoute = location.pathname === "/education/add-education";
  const isEditEducationRoute = location.pathname.startsWith(
    "/education/edit-education/"
  );
  const data = useSelector((state) => state);
  const { educationData, educationSuccess, educationError, educationLoading } =
    data.education;
  useEffect(() => {
    dispatch(getEducationData("fetch"));
  }, [dispatch, id, isEducationRoute]);
  return (
    <>
      {isAddEducationRoute || isEditEducationRoute ? (
        <AddEducation
          Data={educationData}
          Success={educationSuccess}
          Error={educationError}
          Loading={educationLoading}
        />
      ) : isEducationRoute ? (
        <Education
          Data={educationData}
          Success={educationSuccess}
          Error={educationError}
          Loading={educationLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EducationComponent;

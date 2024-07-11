import React, { useEffect } from "react";
import WorkType from "./WorkType";
import AddWorkType from "./AddWorkType";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkTypeData } from "../../Actions/workTypeActions";

const WorkTypeComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isWorkTypeRoute = location.pathname === "/work-types";
  const isAddWorkTypeRoute = location.pathname === "/work-types/add-work-type";
  const isEditWorkTypeRoute = location.pathname.startsWith(
    "/work-types/edit-work-type/"
  );
  const data = useSelector((state) => state);
  const { workTypeData, workTypeSuccess, workTypeError, workTypeLoading } =
    data.workType;
  useEffect(() => {
    dispatch(getWorkTypeData("fetch"));
  }, [dispatch, id, isWorkTypeRoute]);
  return (
    <>
      {" "}
     
      {isAddWorkTypeRoute || isEditWorkTypeRoute ? (
        <AddWorkType
          Data={workTypeData}
          Success={workTypeSuccess}
          Error={workTypeError}
          Loading={workTypeLoading}
        />
      ) : isWorkTypeRoute ? (
        <WorkType
          Data={workTypeData}
          Success={workTypeSuccess}
          Error={workTypeError}
          Loading={workTypeLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default WorkTypeComponent;

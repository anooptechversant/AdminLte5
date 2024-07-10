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
  const isAddWorkTypeRoute = location.pathname === "/worktypes/add-worktype";
  const isEditWorkTypeRoute = location.pathname.startsWith(
    "/worktypes/edit-worktype/"
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
      <section class='content-header'>
        <div class='container-fluid'>
          <div class='row mb-2'>
            <div class='col-sm-6'>
              <h1>Work Type</h1>
            </div>
            <div class='col-sm-6'>
              <ol class='breadcrumb float-sm-right'>
                <li class='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li class='breadcrumb-item active'>Work Type</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
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

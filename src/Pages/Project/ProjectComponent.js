import React, { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../Actions/projectActions";
import Project from "./Project";
import AddProject from "./AddProject";
const ProjectComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const isProjectRoute = location.pathname === "/project";
  const isUserProjectRoute = location.pathname.startsWith(
    "/project/user-project/"
  );
  const isAddProjectRoute = location.pathname.startsWith(
    "/project/add-project/"
  );
  const isEditProjectRoute = location.pathname.startsWith(
    "/project/edit-project/"
  );
  const data = useSelector((state) => state);
  const {
    projectData,
    projectByUserID,
    projectSuccess,
    projectError,
    projectLoading,
  } = data.project;
  useEffect(() => {
    dispatch(getProjectData("fetch"));
    if (user_id) dispatch(getProjectData("single", user_id));
  }, [dispatch, user_id, isProjectRoute, isUserProjectRoute]);
  return (
    <>
      {isProjectRoute || isUserProjectRoute ? (
        <Project
          Data={user_id ? projectByUserID : projectData}
          Success={projectSuccess}
          Error={projectError}
          Loading={projectLoading}
        />
      ) : isAddProjectRoute || isEditProjectRoute ? (
        <AddProject
          Data={projectByUserID}
          Success={projectSuccess}
          Error={projectError}
          Loading={projectLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectComponent;

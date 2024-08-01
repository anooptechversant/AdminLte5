import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Users from "./Users";
import DetailedView from "./DetailedView";
import { getUserData } from "../../Actions/userActions";
import AddWorkType from "./AddWorkType";
const UserComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, userId } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const isUserRoute = location.pathname === "/users";
  const isViewUserRoute = location.pathname.startsWith("/users/view-user/");
  const isAddWorkTypeRoute = location.pathname.startsWith(
    "/users/add-work-type/"
  );
  const isEditWorkTypeRoute = location.pathname.startsWith(
    "/users/edit-work-type/"
  );
  const data = useSelector((state) => state);
  const { userData, singleUser, userLoading, userSuccess, userError } =
    data.user;
  const { userWorkTypeLoading, userWorkTypeSuccess, userWorkTypeError } =
    data.userWorkType;
  useEffect(() => {
    dispatch(getUserData("fetch", limit, currPage));
    if (userId) {
      dispatch(getUserData("single", userId));
    }
  }, [dispatch, currPage, limit, userId]);

  const currentPageChange = (currPage) => {
    setCurrPage(currPage);
  };
  const limitChange = (limit) => {
    setLimit(limit);
  };

  return (
    <>
      {isUserRoute ? (
        <Users
          Data={userData.records}
          Success={userSuccess}
          Error={userError}
          Loading={userLoading}
          currentPageChange={currentPageChange}
          limitChange={limitChange}
        />
      ) : isViewUserRoute ? (
        <DetailedView
          Data={singleUser}
          Success={userSuccess}
          Error={userError}
          Loading={userLoading}
        />
      ) : isAddWorkTypeRoute || isEditWorkTypeRoute ? (
        <AddWorkType
          Data={singleUser?.worktype?.types || []}
          Success={userWorkTypeSuccess}
          Error={userWorkTypeError}
          Loading={userWorkTypeLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserComponent;

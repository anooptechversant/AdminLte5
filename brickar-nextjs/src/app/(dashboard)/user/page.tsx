import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserList from "@/components/User/UserList";
import React from "react";

const User = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: "User" }]} />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="0">
        <UserList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default User;

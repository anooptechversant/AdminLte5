import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UnApprovedUserList from "@/components/User/UnApprovedUserList";
import React from "react";

const UnApproved = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: "UnApproved User" }]} />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="0">
        <UnApprovedUserList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default UnApproved;

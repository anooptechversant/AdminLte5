import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UnApprovedUserList from '@/components/User/UnApprovedUserList';

const UnApproved = async () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'UnApproved User' }]}
        title="UnApproved Users List"
      />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="flex flex-col gap-10">
        <UnApprovedUserList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default UnApproved;

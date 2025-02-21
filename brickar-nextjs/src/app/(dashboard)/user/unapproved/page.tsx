import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import UnApprovedUserList from '@/components/User/UnApprovedUserList';

const UnApproved = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'UnApproved User' }]}
        title="UnApproved Users List"
      />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <UnApprovedUserList
            page={searchParams.page}
            limit={searchParams.limit}
          />
        </div>
      </Suspense>
    </>
  );
};

export default UnApproved;

import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import UserList from '@/components/User/UserList';

const User = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  return (
    <>
      <Breadcrumb items={[{ label: 'User' }]} title="Users List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col gap-10">
          <UserList page={searchParams.page} limit={searchParams.limit} />
        </div>
      </Suspense>
    </>
  );
};

export default User;

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UserList from '@/components/User/UserList';
import React from 'react';

const User = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'User' }]} title="Users List" />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="flex flex-col gap-10">
        <UserList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default User;

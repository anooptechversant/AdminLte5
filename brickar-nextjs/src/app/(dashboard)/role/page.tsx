import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import RolesList from '@/components/Role/RolesList';

const Unit = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Role' }]} title="Roles List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <RolesList />
        </div>
      </Suspense>
    </>
  );
};

export default Unit;

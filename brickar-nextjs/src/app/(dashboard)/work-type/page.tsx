import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import WorkTypeList from '@/components/WorkType/WorkTypeList';

const WorkType = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Work Type' }]} title="Work Type List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <WorkTypeList />
        </div>
      </Suspense>
    </>
  );
};

export default WorkType;

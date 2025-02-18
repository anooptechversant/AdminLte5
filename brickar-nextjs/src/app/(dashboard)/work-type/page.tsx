import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import WorkTypeList from '@/components/WorkType/WorkTypeList';

const WorkType = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Work Type' }]} title="Work Type List" />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="flex flex-col gap-10">
        <WorkTypeList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default WorkType;

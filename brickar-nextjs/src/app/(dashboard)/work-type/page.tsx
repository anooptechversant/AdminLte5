import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import WorkTypeList from '@/components/WorkType/WorkTypeList';
import React from 'react';

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

import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import QualificationList from '@/components/Qualification/QualificationList';

const Qualification = async () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Qualification' }]}
        title="Qualification List"
      />
      {/* <Suspense fallback={<Loader />}> */}
      <div className="flex flex-col gap-10">
        <QualificationList />
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default Qualification;

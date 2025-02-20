import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import QualificationList from '@/components/Qualification/QualificationList';

const Qualification = async () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Qualification' }]}
        title="Qualification List"
      />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col gap-10">
          <QualificationList />
        </div>
      </Suspense>
    </>
  );
};

export default Qualification;

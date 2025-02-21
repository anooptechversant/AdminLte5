import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import UnitList from '@/components/Units/UnitList';

const Unit = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Unit' }]} title="Units List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <UnitList />
        </div>
      </Suspense>
    </>
  );
};

export default Unit;

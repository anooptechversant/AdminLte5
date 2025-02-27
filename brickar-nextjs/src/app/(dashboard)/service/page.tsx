import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import ServicesList from '@/components/Services/ServicesList';

const Unit = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Service' }]} title="Services List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <ServicesList />
        </div>
      </Suspense>
    </>
  );
};

export default Unit;

import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import LocationList from '@/components/Location/LocationList';

const Location = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Location' }]} title="Location List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <LocationList />
        </div>
      </Suspense>
    </>
  );
};

export default Location;

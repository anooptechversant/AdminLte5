import React, { Suspense } from 'react';

import BrandList from '@/components/Brand/BrandList';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';

const Brand = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Brand' }]} title="Brand List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <BrandList />
        </div>
      </Suspense>
    </>
  );
};

export default Brand;

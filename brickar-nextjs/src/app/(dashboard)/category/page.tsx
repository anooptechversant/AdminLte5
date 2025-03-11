import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CategoryList from '@/components/Category/CategoryList';
import Loader from '@/components/common/Loader';

const Unit = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Category' }]} title="Category List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <CategoryList />
        </div>
      </Suspense>
    </>
  );
};

export default Unit;

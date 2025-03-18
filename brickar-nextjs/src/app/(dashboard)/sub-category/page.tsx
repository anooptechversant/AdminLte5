import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import SubCategoryList from '@/components/SubCategory/SubCategoryList';

const SubCategory = async () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Sub Category' }]}
        title="Sub Category List"
      />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <SubCategoryList />
        </div>
      </Suspense>
    </>
  );
};

export default SubCategory;

import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import EnquiryList from '@/components/Enquiry/EnquiryList';

const Enquiry = async () => {
  return (
    <>
      <Breadcrumb items={[{ label: 'Enquiry' }]} title="Enquiry List" />
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col">
          <EnquiryList />
        </div>
      </Suspense>
    </>
  );
};

export default Enquiry;

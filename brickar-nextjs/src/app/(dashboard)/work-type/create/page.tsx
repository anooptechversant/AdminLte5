import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import WorkTypeForm from '@/components/WorkType/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Work Type  | Brickar`,
    description: `Add New Work Type  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Work Type', href: '/work-type' },
          { label: 'Add Work Type' },
        ]}
        title="Add Work Type"
      />

      {/* <Suspense fallback={<Loader />}> */}
      <WorkTypeForm />
      {/* </Suspense> */}
    </>
  );
};

export default Form;

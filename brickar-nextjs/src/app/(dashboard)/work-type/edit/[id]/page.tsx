import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import WorkTypeForm from '@/components/WorkType/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Work Type" | Brickar`,
    description: `"Edit Work Type" | Brickar`,
  };
}

const page = async ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Work Type', href: '/work-type' },
          { label: 'Edit Work Type' },
        ]}
        title="Edit Work Type"
      />

      <Suspense fallback={<Loader />}>
        <WorkTypeForm id={id} />
      </Suspense>
    </>
  );
};

export default page;

import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import UnitForm from '@/components/Units/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Units | Brickar`,
    description: `Edit Units | Brickar`,
  };
}

const Form = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Unit', href: '/qualification' },
          { label: 'Edit Unit' },
        ]}
        title="Edit Unit"
      />

      <Suspense fallback={<Loader />}>
        <UnitForm id={id} />
      </Suspense>
    </>
  );
};

export default Form;

import { Metadata } from 'next';
import { Suspense } from 'react';

import BrandForm from '@/components/Brand/Form';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Brand | Brickar`,
    description: `Edit Brand | Brickar`,
  };
}

const Form = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[{ label: 'Brand', href: '/brand' }, { label: 'Edit Brand' }]}
        title="Edit Brand"
      />

      <Suspense fallback={<Loader />}>
        <BrandForm id={id} />
      </Suspense>
    </>
  );
};

export default Form;

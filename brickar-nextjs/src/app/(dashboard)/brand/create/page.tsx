import { Metadata } from 'next';
import { Suspense } from 'react';

import BrandForm from '@/components/Brand/Form';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Brand  | Brickar`,
    description: `Add New Brand  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Brand', href: '/brand' }, { label: 'Add Brand' }]}
        title="Create Brand"
      />

      <Suspense fallback={<Loader />}>
        <BrandForm />
      </Suspense>
    </>
  );
};

export default Form;

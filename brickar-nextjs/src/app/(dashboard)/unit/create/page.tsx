import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import UnitForm from '@/components/Units/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Units  | Brickar`,
    description: `Add New Units  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Unit', href: '/units' }, { label: 'Add Unit' }]}
        title="Create Unit"
      />

      <Suspense fallback={<Loader />}>
        <UnitForm />
      </Suspense>
    </>
  );
};

export default Form;

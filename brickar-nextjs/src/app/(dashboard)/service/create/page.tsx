import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import ServiceForm from '@/components/Services/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Service  | Brickar`,
    description: `Add New Service  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Service', href: '/service' },
          { label: 'Add Service' },
        ]}
        title="Create Service"
      />

      <Suspense fallback={<Loader />}>
        <ServiceForm />
      </Suspense>
    </>
  );
};

export default Form;

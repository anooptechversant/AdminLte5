import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import ServiceForm from '@/components/Services/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Service | Brickar`,
    description: `Edit Service | Brickar`,
  };
}

const Form = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Service', href: '/service' },
          { label: 'Edit Service' },
        ]}
        title="Edit Service"
      />

      <Suspense fallback={<Loader />}>
        <ServiceForm id={id} />
      </Suspense>
    </>
  );
};

export default Form;

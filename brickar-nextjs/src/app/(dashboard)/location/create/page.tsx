import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import LocationForm from '@/components/Location/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Location  | Brickar`,
    description: `Add New Location  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Location', href: '/location' },
          { label: 'Add Location' },
        ]}
        title="Add Location"
      />

      <Suspense fallback={<Loader />}>
        <LocationForm />
      </Suspense>
    </>
  );
};

export default Form;

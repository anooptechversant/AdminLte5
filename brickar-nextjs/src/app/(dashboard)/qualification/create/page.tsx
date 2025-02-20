import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import QualificationForm from '@/components/Qualification/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Qualification  | Brickar`,
    description: `Add New Qualification  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Qualification', href: '/qualification' },
          { label: 'Add Qualification' },
        ]}
        title="Add Qualification"
      />

      <Suspense fallback={<Loader />}>
        <QualificationForm />
      </Suspense>
    </>
  );
};

export default Form;

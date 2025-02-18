import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import QualificationForm from '@/components/Qualification/Form';

export async function generateMetadata({
  searchParams: { id },
}: {
  searchParams: { id: string };
}): Promise<Metadata> {
  return {
    title: `Edit Qualification" | Brickar`,
    description: `"Edit Qualification" | Brickar`,
  };
}

const Form = ({ searchParams }: any) => {
  const { id } = searchParams;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Qualification', href: '/qualification' },
          { label: 'Edit Qualification' },
        ]}
        title="Edit Qualification"
      />

      {/* <Suspense fallback={<Loader />}> */}
      <QualificationForm id={id} />
      {/* </Suspense> */}
    </>
  );
};

export default Form;

import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CategoryForm from '@/components/Category/Form';
import Loader from '@/components/common/Loader';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Category | Brickar`,
    description: `Edit Category | Brickar`,
  };
}

const Form = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Category', href: '/sub-category' },
          { label: 'Edit Category' },
        ]}
        title="Edit Category"
      />

      <Suspense fallback={<Loader />}>
        <CategoryForm id={id} />
      </Suspense>
    </>
  );
};

export default Form;

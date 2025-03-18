import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import CategoryForm from '@/components/SubCategory/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Category  | Brickar`,
    description: `Add New Category  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Category', href: '/sub-category' },
          { label: 'Add Sub Category' },
        ]}
        title="Create Category"
      />

      <Suspense fallback={<Loader />}>
        <CategoryForm />
      </Suspense>
    </>
  );
};

export default Form;

import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CategoryForm from '@/components/Category/Form';
import Loader from '@/components/common/Loader';

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
          { label: 'Category', href: '/category' },
          { label: 'Add Category' },
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

import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import RoleForm from '@/components/Role/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Role | Brickar`,
    description: `Edit Role | Brickar`,
  };
}

const Form = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <Breadcrumb
        items={[{ label: 'Role', href: '/role' }, { label: 'Edit Role' }]}
        title="Edit Role"
      />

      <Suspense fallback={<Loader />}>
        <RoleForm id={id} />
      </Suspense>
    </>
  );
};

export default Form;

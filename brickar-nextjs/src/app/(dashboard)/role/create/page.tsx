import { Metadata } from 'next';
import { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import RoleForm from '@/components/Role/Form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Add New Role  | Brickar`,
    description: `Add New Role  | Brickar`,
  };
}

const Form = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Role', href: '/role' }, { label: 'Add Role' }]}
        title="Create Role"
      />

      <Suspense fallback={<Loader />}>
        <RoleForm />
      </Suspense>
    </>
  );
};

export default Form;

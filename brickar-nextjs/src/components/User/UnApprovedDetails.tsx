import Image from 'next/image';
import React from 'react';

import DetailsPage from '../common/Details/Details';

const UnApprovedDetails = ({ data, isError, isLoading }: any) => {
  const columns = [
    {
      title: true,
      label: 'User details',
    },
    {
      label: 'ID',
      accessorKey: 'id',
    },
    {
      label: 'Name',
      accessorKey: 'name',
    },
    {
      label: 'Company Name',
      accessorKey: 'profile.company',
    },
    {
      label: 'Email',
      accessorKey: 'email',
    },
    {
      label: 'Phone',
      accessorKey: 'phone',
      value: ({ row }: any) => <div>{row.phone_prefix + '-' + row.phone}</div>,
    },
    {
      label: 'Image',
      accessorKey: 'profile.image',
      value: ({ row }: any) => (
        <div>
          <Image
            src={row.profile.image}
            alt={row.profile.company}
            width={150}
            height={150}
          />
        </div>
      ),
    },
  ];
  return (
    <DetailsPage
      fields={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default UnApprovedDetails;

'use client';

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { getRequest } from '@/utils/api';

import CommonTable from '../common/Table';
import Eye from '../Svg/Eye';

const UserList = ({
  page = '1',
  limit = '10',
}: {
  page?: string;
  limit?: string;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(undefined);
        const response = await getRequest(
          `admin/user/?page=${page}&limit=${limit}`,
        );
        setData(response.records || []);
        setTotalPages(response.total_pages || 1);
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, limit]);

  const handleDetailedView = (id: string) => {
    console.log('View details for user ID:', id);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: 'User Name',
      accessorKey: 'name',
      cell: ({ row }) => <span>{row.original.name || 'N/A'}</span>,
    },
    {
      header: 'Company Name',
      accessorKey: 'profile.company',
      cell: ({ row }) => <span>{row.original.profile?.company || 'N/A'}</span>,
    },
    {
      header: 'Phone No.',
      accessorKey: 'phone',
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {row.original.phone_prefix + '-' + row.original.phone}
        </span>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => <span>{row.original.email || 'N/A'}</span>,
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center justify-end space-x-3.5">
          <div className="group relative">
            <button
              className="hover:text-primary"
              data-tooltip-id="view-tooltip"
              onClick={() => handleDetailedView(row.original.id)}
            >
              <Eye />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        error={errorMessage}
        isLoading={isLoading}
        totalPages={totalPages}
      />
      <Tooltip id="view-tooltip" place="top" content="View" />
    </>
  );
};

export default UserList;

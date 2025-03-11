'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { apiRequest, getRequest } from '@/utils/api';
import { stripHtml } from '@/utils/libs';

import CommonTable from '../common/Table';
import Check from '../Svg/Check';
import Close from '../Svg/Close';
import Edit from '../Svg/Edit';
import Plus from '../Svg/Plus';

const BrandList = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest(`admin/brands/`);

        if (Array.isArray(response)) {
          setData(response);
        } else {
          // Handle paginated API response
          setData(response.records || []);
        }
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to fetch brands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleProduct = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      const endpoint = newStatus
        ? `admin/brands/${id}/activate`
        : `admin/brands/${id}/`;

      await apiRequest({
        method: newStatus ? 'PUT' : 'DELETE',
        path: endpoint,
        data: { is_active: newStatus },
      });

      toast.success(
        newStatus
          ? 'Brand enabled successfully'
          : 'Brand disabled successfully',
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, is_active: newStatus } : item,
        ),
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/brand/edit/${id}`);
  };
  const columns: ColumnDef<any>[] = [
    {
      header: 'Brand Name',
      accessorKey: 'name',
      cell: ({ row }) => <span>{row.original.name || 'N/A'}</span>,
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: ({ row }) => (
        <span>
          {`${stripHtml(row.original.description).substring(0, 50)}...` ||
            'N/A'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center justify-end space-x-3.5">
          <div className="group relative">
            <button
              className="hover:text-primary"
              onClick={() => handleEdit(row.original.id)}
              data-tooltip-id="edit-tooltip"
            >
              <Edit />
            </button>
          </div>
          <div className="group relative flex items-center">
            <label
              htmlFor={`toggle-${row.original.id}`}
              className="flex cursor-pointer select-none items-center"
              data-tooltip-id={`delete-tooltip-${row.original.id}`}
              data-tooltip-content={
                row.original.is_active ? 'Disable Brand' : 'Enable Brand'
              }
            >
              <div className="group relative">
                <input
                  type="checkbox"
                  id={`toggle-${row.original.id}`}
                  className="sr-only"
                  onChange={() =>
                    toggleProduct(row.original.id, row.original.is_active)
                  }
                />
                <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                <div
                  className={`dot absolute !right-1 left-1 top-1 flex size-6 items-center justify-center rounded-full ${row.original.is_active ? '!translate-x-full !bg-primary' : ''} bg-white transition dark:!bg-white`}
                >
                  {row.original.is_active ? (
                    <span className=" text-white dark:text-bodydark">
                      <Check />
                    </span>
                  ) : (
                    <Close />
                  )}
                </div>
              </div>
            </label>
          </div>
          <Tooltip id={`delete-tooltip-${row.original.id}`} place="top" />
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
        customComponent={
          <Link href="/brand/create">
            <span className="flex items-center gap-2 whitespace-nowrap rounded bg-gray-800 px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              <Plus /> Add Brand
            </span>
          </Link>
        }
        title="brand"
      />
      <Tooltip id="edit-tooltip" place="top" content="Edit" />
    </>
  );
};

export default BrandList;

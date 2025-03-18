'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { apiRequest, getRequest } from '@/utils/api';

import CommonTable from '../common/Table';
import Check from '../Svg/Check';
import Close from '../Svg/Close';
import Edit from '../Svg/Edit';
import Plus from '../Svg/Plus';

const SubCategoryList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const category_id = Number(searchParams.get('category')) || null;
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(
        `admin/category/sub_category/${category_id || ''}`,
      );
      setData(Array.isArray(response) ? response : response.records || []);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch subcategories');
    } finally {
      setIsLoading(false);
    }
  }, [category_id]);
  useEffect(() => {
    fetchData();
    getRequest('admin/category/').then((response) =>
      setCategoryData(response.records || response || []),
    );
  }, [fetchData]);

  const toggleProduct = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await apiRequest({
        method: newStatus ? 'PUT' : 'DELETE',
        path: `admin/category/sub_category/${id}/${newStatus ? 'activate' : ''}`,
        data: { is_active: newStatus },
      });
      toast.success(
        `Sub category ${newStatus ? 'enabled' : 'disabled'} successfully`,
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

  const handleEdit = (id: string) => router.push(`/sub-category/edit/${id}`);
  const columns: ColumnDef<any>[] = [
    {
      header: 'Sub Category',
      accessorKey: 'name',
      cell: ({ row }) => <span>{row.original.name || 'N/A'}</span>,
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: ({ row }) => (
        <span>
          <Image
            alt={row.original.name}
            src={row.original.image}
            width={50}
            height={50}
            className="size-[40px] rounded-full object-cover"
          />
        </span>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category_name',
      cell: ({ row }) => <span>{row.original.category_name || 'N/A'}</span>,
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
                row.original.is_active ? 'Disable Category' : 'Enable Category'
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
  const handleChange = (newLimit: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newLimit.toString());
    params.set('page', '1');
    router.replace(`?${params.toString()}`);
  };
  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        error={errorMessage}
        isLoading={isLoading}
        customComponent={
          <div className="flex items-center justify-center gap-2">
            <span>
              <span className="mr-2 text-sm">Category:</span>
              <select
                className="rounded border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
                value={category_id || ''}
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="null">All</option>
                {categoryData.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </span>
            <Link href="/sub-category/create">
              <span className="flex items-center gap-2 whitespace-nowrap rounded bg-gray-800 px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
                <Plus /> Add Sub Category
              </span>
            </Link>
          </div>
        }
        title="sub category"
      />
      <Tooltip id="edit-tooltip" place="top" content="Edit" />
    </>
  );
};

export default SubCategoryList;

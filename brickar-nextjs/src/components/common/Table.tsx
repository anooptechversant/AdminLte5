'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from './Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { CommonTableProps } from '@/types/common';

const LIMIT_OPTIONS = [5, 10, 20, 50];

const CommonTable = <T,>({
  columns,
  data,
  error,
  isLoading,
  totalPages: TotalPages,
  dashBoard,
  customComponent,
}: CommonTableProps<T>) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams],
  );
  const limit = useMemo(
    () => Number(searchParams.get('limit')) || 10,
    [searchParams],
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const updatedColumns = useMemo(
    () => [
      {
        id: 'serialNo',
        header: '#',
        cell: ({ row }) => row.index + 1 + (currentPage - 1) * limit,
      },
      ...columns,
    ],
    [columns, currentPage, limit],
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to page 1 when limit changes
    router.replace(`?${params.toString()}`);
  };

  const paginatedData = useMemo(
    () =>
      TotalPages
        ? data
        : data.slice((currentPage - 1) * limit, currentPage * limit),
    [TotalPages, data, currentPage, limit],
  );

  const table = useReactTable({
    columns: updatedColumns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const totalPages = useMemo(
    () => TotalPages || Math.ceil(data?.length / limit),
    [TotalPages, data, limit],
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <ToastContainer />
      <div className="mb-2 flex items-center justify-between">
        <span>
          <span className="mr-2 text-sm">Rows per page:</span>
          <select
            className="rounded border bg-white p-1 text-black dark:bg-gray-800 dark:text-white"
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
        {customComponent && <div className="ml-4">{customComponent}</div>}
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[600px] table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-100 text-left dark:bg-meta-4"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`min-w-[50px] cursor-pointer whitespace-nowrap px-4 py-4 font-medium text-black dark:text-white ${
                      header.id === 'actions' ? 'text-right' : ''
                    }`}
                    // className="min-w-[50px] cursor-pointer whitespace-nowrap px-4 py-4 font-medium text-black dark:text-white"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(limit)].map((_, index) => (
                <tr key={index}>
                  {updatedColumns.map((_, i) => (
                    <td
                      key={i}
                      className="border-b border-[#eee] px-4 py-5 pl-5 dark:border-strokedark"
                    >
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b border-[#eee] px-4 py-5 pl-5 dark:border-strokedark"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-xl text-gray-500 dark:text-gray-400"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          totalItems={totalPages * limit}
          itemsPerPage={limit}
          dashBoard={dashBoard}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CommonTable;

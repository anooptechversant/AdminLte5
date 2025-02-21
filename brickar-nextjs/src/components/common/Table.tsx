'use client';

import 'react-loading-skeleton/dist/skeleton.css';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { toast, ToastContainer } from 'react-toastify';

import { CommonTableProps } from '@/types/common';

import NoData from './NoData';
import Pagination from './Pagination';

const LIMIT_OPTIONS = [5, 10, 20, 50];

const CommonTable = <T,>({
  columns,
  data,
  error,
  isLoading,
  totalPages: TotalPages,
  dashBoard,
  customComponent,
  title,
}: CommonTableProps<T>) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setLimit(Number(searchParams.get('limit')) || 10);
  }, [searchParams]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
    <>
      <div className="rounded-lg border border-stroke bg-white px-5  pt-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
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
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-100 text-left dark:bg-meta-4"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`min-w-[50px] cursor-pointer whitespace-nowrap p-4 font-medium text-black dark:text-white ${
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
                        className={`px-4 py-5 pl-5 dark:border-strokedark ${
                          index === limit - 1 ? '' : 'border-b border-[#eee]'
                        }`}
                      >
                        <Skeleton height={20} className="opacity-50" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, rowIndex, arr) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`overflow-x-hidden px-4 py-5 pl-5 dark:border-strokedark ${
                          rowIndex === arr.length - 1
                            ? ''
                            : 'border-b border-[#eee]'
                        }`}
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
                    colSpan={columns.length + 1}
                    className="w-full p-4 text-center text-xl text-gray-500 dark:text-gray-400"
                    // style={{
                    //   display: 'table-cell',
                    //   verticalAlign: 'middle', // Vertically center the content
                    //   textAlign: 'center', // Horizontally center the content
                    // }}
                  >
                    <div className="  ">
                      <NoData title={title} />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {!dashBoard && (
        <Pagination
          total={totalPages * limit || 1}
          currentPage={currentPage || 1}
          pageSize={limit || 1}
          onChange={handlePageChange}
          // displayTotal={true}
          onlyArrow={false}
          // className="flex justify-between"
        />
      )}
    </>
  );
};

export default CommonTable;

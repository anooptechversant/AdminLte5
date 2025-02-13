"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "./Pagination";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const LIMIT_OPTIONS = [5, 10, 20, 50];

type CommonTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  error?: string;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  dashBoard?: boolean;
  customComponent?: React.ReactNode;
};

const CommonTable = <T,>({
  columns,
  data,
  error,
  isLoading,
  totalPages,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  dashBoard,
  customComponent,
}: CommonTableProps<T>) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [sorting, setSorting] = useState<SortingState>([]);
  // Add Serial No. column dynamically
  const updatedColumns: ColumnDef<T>[] = [
    {
      id: "serialNo",
      header: "#",
      cell: ({ row }) => row.index + 1 + (currentPage - 1) * limit,
    },
    ...columns,
  ];

  const table = useReactTable({
    columns: updatedColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <ToastContainer />
      {limit && (
        <div className="mb-4 flex items-center justify-end">
          <span className="mr-2 text-sm">Rows per page:</span>
          <select
            className="rounded border p-1"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {customComponent && <div className="ml-4">{customComponent}</div>}
        </div>
      )}
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
                    className="min-w-[50px] cursor-pointer whitespace-nowrap px-4 py-4 font-medium text-black dark:text-white"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(limit || 10)].map((_, index) => (
                <tr key={index}>
                  {updatedColumns.map((_, i) => (
                    <td
                      key={i}
                      className="border-b border-[#eee] px-4 py-5 pl-5 dark:border-strokedark"
                    >
                      <Skeleton
                        height={20}
                        className="bg-red-500 text-red-600"
                      />
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
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
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
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CommonTable;

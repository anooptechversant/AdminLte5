"use client";
import React, { useEffect, useState } from "react";
import UserListTable from "../common/Table";
import { getRequest } from "@/utils/api";
import { ColumnDef } from "@tanstack/react-table";
import Eye from "../Svg/Eye";
import Tooltip from "../common/Tooltip";
import Pagination from "../common/Pagination";

const UserList = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest(
          `admin/user/?page=${currentPage}&limit=${limit}`,
        );
        setData(response.records || []);
        setTotalPages(response.total_pages || 1);
      } catch (error: any) {
        setErrorMessage(error.message || "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit]);

  const handleDetailedView = (id: string) => {
    console.log("View details for user ID:", id);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "User Name",
      accessorKey: "name",
      cell: ({ row }) => <span>{row.original.name || "N/A"}</span>,
    },
    {
      header: "Company Name",
      accessorKey: "profile.company",
      cell: ({ row }) => <span>{row.original.profile?.company || "N/A"}</span>,
    },
    {
      header: "Phone No.",
      accessorKey: "phone",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {row.original.phone_prefix + "-" + row.original.phone}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => <span>{row.original.email || "N/A"}</span>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <div className="group relative">
            <button
              className="hover:text-primary"
              onClick={() => handleDetailedView(row.original.id)}
            >
              <Eye />
            </button>
            <Tooltip content="View" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <UserListTable
        columns={columns}
        data={data}
        error={errorMessage}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
      />
    </>
  );
};

export default UserList;

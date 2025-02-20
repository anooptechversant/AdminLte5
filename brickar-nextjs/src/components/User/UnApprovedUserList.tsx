'use client';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { apiRequest, getRequest } from '@/utils/api';

import CommonTable from '../common/Table';
import Check from '../Svg/Check';
import Eye from '../Svg/Eye';
import Trash from '../Svg/Trash';

const UnApprovedUserList = ({
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
  const [modalType, setModalType] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleData, setRoleData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest(
          `admin/user/unapproved/B2B/?page=${page}&limit=${limit}`,
        );
        const roleResponse = await getRequest('common/roles/');
        setRoleData(roleResponse);
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

  const handleAction = (type: string, id: string) => {
    setModalType(type);
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedUserId) return;
    try {
      if (modalType === 'approve') {
        await apiRequest({
          method: 'PATCH',
          path: `admin/user/${selectedUserId}`,
          data: { is_approved: true },
        });
        toast.success('User approved successfully!');
      } else if (modalType === 'delete') {
        await apiRequest({
          method: 'DELETE',
          path: `admin/user/${selectedUserId}`,
        });
        toast.success('User deleted successfully!');
      }
      setData((prev) => prev.filter((user) => user.id !== selectedUserId));
    } catch (error: any) {
      setErrorMessage(error.message || 'Action failed');
    } finally {
      setIsModalOpen(false);
    }
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
      cell: ({ row }) => <span>{row.original.profile.company || 'N/A'}</span>,
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
          <div className="group relative flex items-center">
            <button
              className="hover:text-primary"
              onClick={() => console.log('View details for', row.original.id)}
              data-tooltip-id="view-tooltip"
            >
              <Eye />
            </button>
          </div>
          <div className="group relative flex items-center">
            <button
              className="hover:text-primary"
              onClick={() => handleAction('approve', row.original.id)}
              data-tooltip-id="approve-tooltip"
            >
              <Check />
            </button>
          </div>
          <div className="group relative flex items-center">
            <button
              className="hover:text-primary"
              onClick={() => handleAction('delete', row.original.id)}
              data-tooltip-id="delete-tooltip"
            >
              <Trash />
            </button>
          </div>
        </div>
      ),
    },
  ];
  // const roleArray = roleData
  //   .filter((role) => role.type === 'B2B')
  //   .map((role) => ({
  //     option: role.role,
  //     value: role.id,
  //   }));

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        error={errorMessage}
        isLoading={isLoading}
        totalPages={totalPages}

        // customComponent={
        //   <div>
        //     <select
        //       className="rounded border p-1"
        //       value={roleType}
        //       onChange={(e) => setRoleType(e.target.value)}
        //     >
        //       <option value="">Show all</option>

        //       {roleArray?.map((option) => (
        //         <option key={option.value} value={option.value}>
        //           {option.option}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        // }
      />
      <Tooltip id="view-tooltip" place="top" content="View" />
      <Tooltip id="approve-tooltip" place="top" content="Approve" />
      <Tooltip id="delete-tooltip" place="top" content="Delete" />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirmation</h2>
          <p className="mt-2">
            Are you sure you want to{' '}
            {modalType === 'approve' ? 'approve this user' : 'delete this user'}
            ?
          </p>
          <div className="mt-4 flex justify-around gap-10">
            <button
              className="flex-grow rounded bg-gray-400 p-2 font-medium text-white hover:bg-opacity-90"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`flex-grow rounded p-2 font-medium text-white hover:bg-opacity-90 ${modalType === 'approve' ? 'bg-green-500' : 'bg-red-500'}`}
              onClick={confirmAction}
            >
              {modalType === 'approve' ? 'Approve' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UnApprovedUserList;

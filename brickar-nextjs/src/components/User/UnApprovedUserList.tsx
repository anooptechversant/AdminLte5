'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { apiRequest, getRequest } from '@/utils/api';

import DetailsPage from '../common/Details/Details';
import CommonTable from '../common/Table';
import Check from '../Svg/Check';
import Eye from '../Svg/Eye';
import Trash from '../Svg/Trash';
import UnApprovedDetails from './UnApprovedDetails';

interface User {
  id: string;
  name: string;
  phone_prefix: string;
  phone: string;
  email: string;
  profile: { company: string };
  role: string;
}

interface Role {
  id: string;
  role: string;
  type: string;
}

const UnApprovedUserList = ({
  page = '1',
  limit = '10',
}: {
  page?: string;
  limit?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [modalType, setModalType] = useState<'approve' | 'delete' | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<any | null>(
    [],
  );
  const [roleData, setRoleData] = useState<Role[]>([]);

  const roleType = searchParams.get('role') || '';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userResponse, roleResponse] = await Promise.all([
          getRequest(`admin/user/unapproved/B2B/?page=${page}&limit=${limit}`),
          getRequest('common/roles/'),
        ]);
        setRoleData(roleResponse);
        setData(userResponse.records || []);
        setTotalPages(userResponse.total_pages || 1);
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, limit]);

  // Filtered data based on selected role
  const filteredData = useMemo(() => {
    return roleType ? data.filter((record) => record.role == roleType) : data;
  }, [data, roleType]);

  const handleAction = (type: 'approve' | 'delete', id: string) => {
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
      } else {
        await apiRequest({
          method: 'DELETE',
          path: `admin/user/${selectedUserId}`,
        });
        toast.success('User deleted successfully!');
      }
      setData((prev) => prev.filter((user) => user.id !== selectedUserId));
    } catch (error: any) {
      toast.error(error.message || 'Action failed');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const userDetails = data.filter((obj) => obj.id == id);
      setSelectedUserDetails(userDetails);
      setIsDetailModalOpen(true);
    } catch (error: any) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleRoleChange = (newRole: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('role', newRole);
    params.set('page', '1');
    router.replace(`?${params.toString()}`);
  };

  const columns: ColumnDef<User>[] = [
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
          {row.original.phone_prefix}-{row.original.phone}
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
          <button
            className="hover:text-primary"
            onClick={() => handleViewDetails(row.original.id)}
            data-tooltip-id="view-tooltip"
          >
            <Eye />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => handleAction('approve', row.original.id)}
            data-tooltip-id="approve-tooltip"
          >
            <Check />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => handleAction('delete', row.original.id)}
            data-tooltip-id="delete-tooltip"
          >
            <Trash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={filteredData}
        error={errorMessage}
        isLoading={isLoading}
        totalPages={totalPages}
        title="Unapproved User List"
        customComponent={
          <div>
            <span className="mr-2 text-sm">Roles:</span>
            <select
              className="rounded border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
              value={roleType || ''}
              onChange={(e) => handleRoleChange(e.target.value)}
            >
              <option value="">Show all</option>
              {roleData
                .filter((role) => role.type === 'B2B')
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
            </select>
          </div>
        }
      />
      <Tooltip id="view-tooltip" place="top" content="View" />
      <Tooltip id="approve-tooltip" place="top" content="Approve" />
      <Tooltip id="delete-tooltip" place="top" content="Delete" />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirmation</h2>
          <p>
            Are you sure you want to{' '}
            {modalType === 'approve' ? 'approve' : 'delete'} this user?
          </p>
          <div className="mt-4 flex justify-around gap-10">
            <button
              className="rounded bg-gray-400 p-2 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`rounded p-2 text-white ${modalType === 'approve' ? 'bg-green-500' : 'bg-red-500'}`}
              onClick={confirmAction}
            >
              {modalType === 'approve' ? 'Approve' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      >
        <div className="p-4">
          {/* <h2 className="text-lg font-bold">User Details</h2> */}
          {selectedUserDetails && (
            <div className="mt-2 w-95">
              <UnApprovedDetails
                data={{ data: selectedUserDetails[0] }}
                isLoading={isLoading}
                isError={!!errorMessage}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UnApprovedUserList;

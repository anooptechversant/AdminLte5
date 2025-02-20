'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { apiRequest, getRequest } from '@/utils/api';

import CommonTable from '../common/Table';
import Edit from '../Svg/Edit';
import Plus from '../Svg/Plus';
import Trash from '../Svg/Trash';

const QualificationList = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest(`common/education/`);

        if (Array.isArray(response)) {
          setData(response);
        } else {
          // Handle paginated API response
          setData(response.records || []);
        }
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to fetch qualification');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      await apiRequest({
        method: 'DELETE',
        path: `admin/education/${selectedId}`,
      });
      setData((prevData) => prevData.filter((item) => item.id !== selectedId));
      toast.success('Qualification deleted successfully!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to delete qualification');
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/qualification/edit${id}`);
  };
  const columns: ColumnDef<any>[] = [
    {
      header: 'Qualification',
      accessorKey: 'qualification',
      cell: ({ row }) => <span>{row.original.qualification || 'N/A'}</span>,
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
            <button
              className="hover:text-primary"
              onClick={() => handleDelete(row.original.id)}
              data-tooltip-id="delete-tooltip"
            >
              <Trash />
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
        customComponent={
          <Link href="/qualification/create">
            <span className="flex items-center gap-2 whitespace-nowrap rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              <Plus /> Add Qualification
            </span>
          </Link>
        }
      />
      <Tooltip id="edit-tooltip" place="top" content="Edit" />
      <Tooltip id="delete-tooltip" place="top" content="Delete" />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirmation</h2>
          <p className="mt-2">
            Are you sure you want to delete this qualification?
          </p>
          <div className="mt-4 flex justify-around gap-10">
            <button
              className="flex-grow rounded bg-gray-400 p-2 font-medium text-white hover:bg-opacity-90"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`flex-grow rounded bg-red-500 p-2 font-medium text-white hover:bg-opacity-90`}
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QualificationList;

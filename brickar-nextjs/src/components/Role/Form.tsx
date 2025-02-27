'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Role, RoleProps } from '@/types/role';
import { apiRequest, getRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = ({ id }: RoleProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<Role>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`common/roles/`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch roles');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        role: data[0]?.role || '',
        type: data[0]?.type || '',
        description: data[0]?.description || '',
      });
    }
  }, [data, reset]);
  const typeOption = [
    { label: 'B2B', value: 'B2B' },
    { label: 'B2C', value: 'B2C' },
  ];
  useEffect(() => {
    if (errorMessage) {
      toast.error(
        errorMessage || 'Something went wrong. Please try again later.',
      );
    }
  }, [errorMessage]);

  const onSubmit = async (data: Role) => {
    setIsLoading(true);
    const dataToSend = {
      ...data,
    };
    try {
      await apiRequest({
        method: id ? 'PUT' : 'POST',
        path: id ? `admin/role/${id}` : 'admin/role/',
        data: dataToSend,
      });

      toast.success(
        id ? 'Successfully updated role' : 'Successfully added role',
      );

      setTimeout(() => {
        router.push('/role');
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  };
  const descriptionModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['link', 'image', 'video'],
          [{ color: [] }, { background: [] }],
        ],
      },
      clipboard: { matchVisual: false },
    }),
    [],
  );
  const formFields = useMemo(
    () => [
      {
        name: 'role',
        label: 'Role Name',
        type: 'text',
        placeholder: 'Enter the unit name',
        // subLabel: 'You can add the ',
        validate: { required: 'Please enter a unit' },
      },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: typeOption,
        validate: { required: 'Please select type' },
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textEditor',
        placeholder: 'Enter messsage..',
        validate: { required: 'Please enter messsage' },
        quillModules: descriptionModules,
      },
    ],
    [typeOption],
  );
  return (
    <div className="flex flex-col">
      <CommonForm
        fields={formFields}
        form={form}
        onFinish={onSubmit}
        submitButtonLabel={id ? 'Update' : 'Save'}
        isLoading={isLoading || dataLoading}
      />
    </div>
  );
};

export default Form;

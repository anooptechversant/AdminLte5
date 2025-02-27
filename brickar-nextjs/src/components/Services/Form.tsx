'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Service, ServiceProps } from '@/types/service';
import { apiRequest, getRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = ({ id }: ServiceProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<Service>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`admin/service/`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch Services');
    } finally {
      setDataLoading(false);
    }
  };
  const fetchRoles = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`common/roles/`);

      setRoles(response);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch roles');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        role: data[0]?.role || '',
        service_name: data[0]?.service_name || '',
      });
    }
  }, [data, reset]);
  const roleOption = roles.map((role) => ({
    label: role.role,
    value: role.id,
  }));
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
        path: id ? `admin/service/${id}` : 'admin/service/',
        data: dataToSend,
      });

      toast.success(
        id ? 'Successfully updated service' : 'Successfully added service',
      );

      setTimeout(() => {
        router.push('/service');
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = useMemo(
    () => [
      {
        name: 'service_name',
        label: 'Service Name',
        type: 'text',
        placeholder: 'Enter the service name',
        // subLabel: 'You can add the ',
        validate: { required: 'Please enter a Service' },
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: roleOption,
        validate: { required: 'Please select role' },
      },
    ],
    [roleOption],
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

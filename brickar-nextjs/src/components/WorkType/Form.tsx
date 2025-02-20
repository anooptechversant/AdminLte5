'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { WorkType, WorkTypeProp } from '@/types/workType';
import { apiRequest, getRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = ({ id }: WorkTypeProp) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const form = useForm<WorkType>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`admin/worktype/common`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch work type');
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
        worktype: data[0]?.worktype || '',
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(
        errorMessage || 'Something went wrong. Please try again later.',
      );
    }
  }, [errorMessage]);

  const onSubmit = async (data: WorkType) => {
    setIsLoading(true);
    const dataToSend = {
      ...data,
    };
    try {
      await apiRequest({
        method: id ? 'PUT' : 'POST',
        path: id ? `admin/worktype/common/${id}` : 'admin/worktype/common',
        data: dataToSend,
      });

      toast.success(
        id ? 'Successfully updated Work Type' : 'Successfully added Work Type',
      );

      setTimeout(() => {
        router.push('/work-type');
        // router.refresh();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  };
  const formFields = [
    {
      name: 'worktype',
      label: 'Work Type',
      type: 'text',
      placeholder: 'Enter Work Type',
      subLabel: 'You can provide the company work type',
      validate: { required: 'Please enter work type' },
    },
  ];
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

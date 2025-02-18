'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { apiRequest, getRequest } from '@/utils/api';
import { CommonForm } from '../common/CommonForm';
import { Qualification, QualificationProp } from '@/types/qualification';

const Form = ({ id }: QualificationProp) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const form = useForm<Qualification>({
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const fetchData = async () => {
    try {
      const response = await getRequest(`admin/education/`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch qualification');
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        qualification: data[0]?.qualification || '',
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

  const onSubmit = async (data: Qualification) => {
    setIsLoading(true);
    const dataToSend = {
      ...data,
    };
    try {
      await apiRequest({
        method: id ? 'PUT' : 'POST',
        path: id ? `admin/education/${id}` : 'admin/education/',
        data: dataToSend,
      });

      toast.success(
        id
          ? 'Successfully updated Qualification'
          : 'Successfully added Qualification',
      );

      setTimeout(() => {
        router.push('/qualification');
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
      name: 'qualification',
      label: 'Qualification',
      type: 'text',
      placeholder: 'Enter Qualification',
      subLabel: 'You can add the user qualification',
      validate: { required: 'Please enter qualification' },
    },
  ];
  return (
    <div className="flex flex-col">
      <CommonForm
        fields={formFields}
        form={form}
        onFinish={onSubmit}
        submitButtonLabel={id ? 'Update' : 'Save'}
      />
    </div>
  );
};

export default Form;

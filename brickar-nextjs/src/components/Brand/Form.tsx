'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Brand, BrandProps } from '@/types/brand';
import { apiRequest, getRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = ({ id }: BrandProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<Brand>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`admin/brands/`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch brands');
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
        name: data[0]?.name || '',
        is_active: data[0]?.is_active || '',
        description: data[0]?.description || '',
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

  const onSubmit = async (formData: Brand) => {
    setIsLoading(true);
    const dataToSend = {
      ...formData,
      is_active: id ? formData.is_active : true,
    };
    try {
      await apiRequest({
        method: id ? 'PUT' : 'POST',
        path: id ? `admin/brands/${id}` : 'admin/brands/',
        data: dataToSend,
      });

      toast.success(
        id ? 'Successfully updated brand' : 'Successfully added brands',
      );

      setTimeout(() => {
        router.push('/brand');
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
          // [{ align: [] }],
          // [{ list: 'ordered' }, { list: 'bullet' }],
          // [{ indent: '-1' }, { indent: '+1' }],
          // [{ size: ['small', false, 'large', 'huge'] }],
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
          // ['link', 'image', 'video'],
          // [{ color: [] }, { background: [] }],
        ],
      },
      clipboard: { matchVisual: false },
    }),
    [],
  );
  const formFields = useMemo(
    () => [
      {
        name: 'name',
        label: 'Brand Name',
        type: 'text',
        placeholder: 'Enter the brand name',
        // subLabel: 'You can add the ',
        validate: { required: 'Please enter a brand' },
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textEditor',
        placeholder: 'Enter description..',
        validate: { required: 'Please enter description' },
        quillModules: descriptionModules,
      },
    ],
    [],
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

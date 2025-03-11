'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Category, CategoryProps } from '@/types/category';
import { apiRequest, getRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = ({ id }: CategoryProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<Category>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`admin/category/`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch category');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  useEffect(() => {
    if (data.length > 0) {
      reset({
        name: data[0]?.name || '',
        is_active: data[0]?.is_active || false,
        image: data[0]?.image
          ? [
              {
                fileId: data[0]?.id,
                name: data[0]?.name,
                url: data[0]?.image,
                type: 'Image',
              },
            ]
          : [],
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

  // const onSubmit = async (formData: any) => {
  //   setIsLoading(true);
  //   console.log({ data, formData });

  //   try {
  //     await apiRequest({
  //       method: id ? 'PUT' : 'POST',
  //       path: id ? `admin/category/${id}` : 'admin/category/',
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     toast.success(
  //       id ? 'Successfully updated category' : 'Successfully added category',
  //     );

  //     setTimeout(() => {
  //       router.push('/category');
  //     }, 1000);
  //   } catch (error: any) {
  //     toast.error(error.message || 'Something went wrong, try again later');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (formData: any) => {
    setIsLoading(true);

    try {
      const dataToSend = new FormData();

      // Filter changed data only
      const updatedFields = Object.keys(formData).filter((key) => {
        if (key === 'image') {
          return formData[key] && formData[key][0]?.file; // Only append if new image uploaded
        }
        return formData[key] !== data[0]?.[key]; // Append only changed fields
      });

      updatedFields.forEach((key) => {
        if (key === 'image') {
          dataToSend.append(key, formData[key][0].file);
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      await apiRequest({
        method: id ? 'PUT' : 'POST',
        path: id ? `admin/category/${id}` : 'admin/category/',
        data: dataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(
        id ? 'Successfully updated category' : 'Successfully added category',
      );

      setTimeout(() => {
        router.push('/category');
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const isActiveArray = [
    { label: 'Enable', value: true },
    { label: 'Disable', value: false },
  ];

  const formFields = useMemo(
    () => [
      {
        name: 'name',
        label: 'Category Name',
        type: 'text',
        placeholder: 'Enter the category name',
        // subLabel: 'You can add the ',
        validate: { required: 'Please enter a category' },
      },
      {
        name: 'is_active',
        label: 'Category (Enable/Disable)',
        type: 'select',
        placeholder: 'Please select an option',
        // validate: {
        //   validate: (value: any) =>
        //     value !== undefined || 'Please select an option',
        // },
        options: isActiveArray,
        // quillModules: descriptionModules,
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        validate: { required: 'Please upload an image' },
        Filetype: 'image',
        limit: 1048576,
        multiple: false,
        // quillModules: descriptionModules,
      },
    ],
    [isActiveArray],
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

'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CategoryProps, SubCategory } from '@/types/category';
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
  const [categoryData, setCategoryData] = useState<any[]>([]);

  const form = useForm<SubCategory>({
    mode: 'onChange',
  });
  const { reset } = form;
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await getRequest(`admin/category/sub_category`);

      setData(response.filter((obj: any) => obj.id == id));
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to fetch category');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getRequest('admin/category/').then((response) =>
      setCategoryData(response.records || response || []),
    );
    if (id) fetchData();
  }, [id]);
  useEffect(() => {
    if (data.length > 0) {
      reset({
        name: data[0]?.name || '',
        category_id: data[0]?.category_id || '',
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

  const onSubmit = async (formData: any) => {
    setIsLoading(true);

    try {
      const dataToSend = new FormData();

      // Filter changed data only
      const updatedFields = Object.keys(formData).filter((key) => {
        if (key === 'image') {
          return formData[key] && formData[key][0]?.file;
        }
        return formData[key] !== data[0]?.[key];
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
  const isCategoryArray = categoryData.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  // [
  //   { label: 'Enable', value: true },
  //   { label: 'Disable', value: false },
  // ];

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
        name: 'category_id',
        label: 'Category',
        type: 'select',
        placeholder: 'Please select a category',
        // validate: {
        //   validate: (value: any) =>
        //     value !== undefined || 'Please select an option',
        // },
        options: isCategoryArray,
        // quillModules: descriptionModules,
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

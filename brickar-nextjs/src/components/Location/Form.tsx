'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Location } from '@/types/location';
import { apiRequest } from '@/utils/api';

import { CommonForm } from '../common/CommonForm';

const Form = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Location>({
    mode: 'onChange',
  });

  const onSubmit = async (data: Location) => {
    setIsLoading(true);
    const dataToSend = {
      ...data,
    };
    try {
      await apiRequest({
        method: 'POST',
        path: 'admin/supported_location/',
        data: dataToSend,
      });

      toast.success('Successfully added Location');

      setTimeout(() => {
        router.push('/location');
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  };
  const formFields = [
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Enter Location',
      // subLabel: 'You can add the user location',
      validate: { required: 'Please enter location' },
    },
  ];
  return (
    <div className="flex flex-col">
      <CommonForm
        fields={formFields}
        form={form}
        onFinish={onSubmit}
        submitButtonLabel="Save"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Form;

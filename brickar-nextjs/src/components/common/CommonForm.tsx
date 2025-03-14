import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import { CommonFormProps, Field } from '@/types/form';

import Files from './Form/File';
import Form from './Form/Form';
import FormInput from './Form/FormInput';
import FormRow from './Form/FormRow';
import Select from './Form/Select';
import Loader from './Loader';

const QuillNoSSRWrapper = dynamic(
  () =>
    import('react-quill').then((mod) => {
      const Component = ({ forwardedRef, ...props }: any) => (
        <mod.default ref={forwardedRef} {...props} />
      );
      Component.displayName = 'QuillNoSSRWrapper';
      return Component;
    }),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export const CommonForm: FC<CommonFormProps> = ({
  fields,
  form,
  children,
  submitButtonLabel = 'Submit',
  formatData,
  onFinish,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = form;

  const onSubmit = async (values: any) => {
    try {
      let data = formatData ? formatData(values) : values;
      const formData = new FormData();
      let hasFiles = false;

      const uploadFields = fields
        .filter((field) => field.type === 'upload')
        .map((field) => field.name);

      Object.keys(data).forEach((key) => {
        if (uploadFields.includes(key)) {
          if (Array.isArray(data[key]) && data[key].length > 0) {
            data[key].forEach((file: any) => {
              if (file?.file) {
                formData.append(key, file.file);
                hasFiles = true;
              }
            });
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      if (hasFiles) {
        await onFinish(data);
      } else {
        await onFinish(data);
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  const renderField = (field: Field) => {
    const {
      name,
      label,
      type,
      options,
      validate,
      placeholder,
      addChildren,
      limit,
      quillModules,
      ...rest
    } = field;

    switch (type) {
      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            rules={validate}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <Select
                inputRef={ref}
                value={
                  options?.find((option) => option.value === value) || null
                }
                onChange={(selectedOption: any) =>
                  onChange(selectedOption?.value)
                }
                options={options || []}
                placeholder={placeholder || `Select ${label.toLowerCase()}...`}
                className="w-full"
                invalid={!!error}
                errorMessage={error?.message}
                {...rest}
              />
            )}
          />
        );
      case 'radio':
        return (
          <FormInput
            name={name}
            type="radio"
            values={options || []}
            form={form}
            {...rest}
          />
        );
      case 'upload':
        return (
          <Controller
            name={name}
            control={control}
            rules={validate}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Files
                form={form}
                fieldName={name}
                label={label}
                limit={limit}
                uploadedFile={value || []}
                setUploadedFile={(files: any) => onChange(files)}
                error={error?.message}
                {...rest}
              />
            )}
          />
        );
      case 'addChildren':
        return addChildren;
      case 'textEditor':
        return (
          <Controller
            name={name}
            control={control}
            rules={validate}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <div className={`quill-container ${error ? 'error' : ''}`}>
                  <QuillNoSSRWrapper
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={quillModules}
                    placeholder={
                      placeholder || `Enter ${label.toLowerCase()}...`
                    }
                    {...rest}
                  />
                </div>
                {error && (
                  <span className="text-sm text-red-500">{error.message}</span>
                )}
              </div>
            )}
          />
        );
      default:
        return (
          <FormInput
            {...register(name, { ...validate })}
            name={name}
            type={type}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            invalid={!!errors[name]}
            errorMessage={errors[name]?.message}
            form={form}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="rounded-lg border border-stroke bg-white px-5  py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:py-6">
      <ToastContainer />
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) =>
          field.type === 'upload' ? (
            <div key={field.name}>{renderField(field)}</div>
          ) : (
            <FormRow
              key={field.name}
              label={field.label}
              subLabel={field.subLabel}
              isVertical={field.isVertical}
            >
              {renderField(field)}
            </FormRow>
          ),
        )}
        {children}
        <FormRow hasButton hasBorder={false}>
          <button
            type="submit"
            className="flex w-1/6 justify-center rounded bg-gray-800 p-3 font-medium text-gray hover:bg-opacity-90"
            disabled={isSubmitting}
          >
            {submitButtonLabel}
          </button>
        </FormRow>
      </Form>
    </div>
  );
};

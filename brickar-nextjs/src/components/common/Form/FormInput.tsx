import { Eye, EyeOff } from '@untitled-ui/icons-react';
import classNames from 'classnames';
import React, { FC, useMemo, useState } from 'react';

// import { DateTimepicker } from '../DatePicker';
// import Radio from '../Radio';
import { FormInputProps } from '@/types/form';

const FormInput: FC<FormInputProps> = ({
  type = 'text',
  invalid,
  form,
  disabled,
  textArea,
  name,
  validate,
  style,
  label,
  hasWrapper,
  errorMessage,
  right,
  className,
  values,
  ...rest
}) => {
  const [pwInputType, setPwInputType] = useState<'password' | 'text'>(
    'password',
  );
  const isInvalid = useMemo(() => invalid ?? false, [form, invalid, name]);

  const inputDefaultClass = 'input';
  const inputClass = classNames(
    inputDefaultClass,
    disabled && 'input-disabled',
    isInvalid && 'input-invalid',
    textArea && 'input-textarea text-sm',
    !label ? 'mt-0' : 'mt-2',
  );

  const renderTextArea = (
    <textarea
      {...(form &&
        form.register(name, typeof validate === 'object' && validate))}
      style={style}
      className={inputClass}
      disabled={disabled}
      {...rest}
    />
  );

  const onPasswordVisibleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPwInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const renderInput = (
    <div className="relative">
      {type === 'date' ? (
        <>
          {/* <DateTimepicker
            className="mt-2"
            size="sm"
            placeholder={label}
            value={
              form?.watch(name) || form?.getValues(name)
                ? new Date(form.getValues(name) || form.watch(name))
                : null
            }
            onChange={(date) => {
              form.setValue(name, date);
              form.trigger(name);
            }}
          /> */}
        </>
      ) : type === 'radio' ? (
        <>
          {/* <Radio.Group
          name={name}
          disabled={disabled}
          value={form?.getValues(name)}
          className="mt-1 flex w-full flex-col gap-3"
          onChange={(e) => {
            form.setValue(name, e);
            form.trigger(name);
          }}
        >
          {values?.map((value, i) => (
            <Radio
              key={i}
              value={value?.value}
              className="flex w-full items-center justify-between rounded-lg border border-gray-100 p-4 text-sm"
            >
              <div className="flex w-full flex-col">
                <span className="font-medium text-gray-900">{value?.label}</span>
                <span className="font-medium text-gray-500">{value?.subLabel}</span>
              </div>
            </Radio>
          ))}
        </Radio.Group> */}
        </>
      ) : (
        <>
          <input
            disabled={disabled}
            type={type === 'password' ? pwInputType : type}
            className={`input input-sm h-10 ${inputClass} ${className}`}
            {...(form &&
              form.register(name, typeof validate === 'object' && validate))}
            {...rest}
          />
          {right && (
            <div
              className={`absolute ${isInvalid ? 'border-red-500' : 'border-gray-300'} inset-y-0 right-0 flex size-10 items-center justify-center rounded-r-md border-y border-r bg-gray-100 text-sm`}
            >
              {right}
            </div>
          )}
          {type === 'password' && (
            <span
              className="absolute right-4 top-4 cursor-pointer text-xl"
              onClick={onPasswordVisibleClick}
            >
              {pwInputType === 'password' ? <Eye /> : <EyeOff />}
            </span>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={`w-full ${hasWrapper && 'my-2'}`}>
      {label && (
        <label className="form-label text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      {textArea ? renderTextArea : renderInput}
      <div
        className={`h-fit text-sm text-red-500 ${errorMessage ? 'opacity-1' : 'opacity-0'} duration-300 ease-in-out`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default FormInput;

import { Plus, Trash01 } from '@untitled-ui/icons-react';
import React, { useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';

import { EVSEConnector } from '@/components/icons';
import Accordion from '@/components/shared/Accordion';

import Button from '../Buttons';
import FormInput from './FormInput';
import FormRow from './FormRow';
import Select from './Select';

const Multiple = ({
  fields,
  form,
  label,
  fieldName,
  child,
  placeholder,
  preventDelete,
  isAccordian,
  onRemove,
}) => {
  const { append, remove } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const renderChild = (data, i) =>
    child?.map((c) => {
      const { name, options, placeholder, required, unit } = c;
      const fieldValue = form.getValues(`${fieldName}[${i}].${name}`);
      const selectedOption = options?.find((item) => item.value === fieldValue);
      const { value, label } = selectedOption || {};
      return (
        <Controller
          key={name}
          name={`${fieldName}[${i}].${name}`}
          control={form.control}
          rules={required && { required: `Select ${placeholder}` }}
          render={(field) =>
            c.options ? (
              <Select
                {...field}
                label={isAccordian && placeholder}
                className="w-full"
                placeholder={`${placeholder}`}
                options={options}
                value={
                  value
                    ? { value, label }
                    : value === false
                      ? { value, label }
                      : null
                }
                onChange={(e) => {
                  form.setValue(`${fieldName}[${i}].${name}`, e.value);
                  form.trigger(`${fieldName}[${i}].${name}`);
                }}
                invalid={!!form.formState.errors?.[fieldName]?.[i]?.[name]}
                errorMessage={
                  form.formState.errors?.[fieldName]?.[i]?.[name]?.message
                }
              />
            ) : (
              <FormInput
                hasWrapper
                label={isAccordian && placeholder}
                autoComplete="off"
                name={`${fieldName}[${i}].${name}`}
                className={!isAccordian && 'mb-4'}
                placeholder={`Enter ${placeholder}`}
                type="text"
                form={form}
                invalid={!!form.formState.errors?.[fieldName]?.[i]?.[name]}
                right={unit && unit}
              />
            )
          }
        />
      );
    });

  useEffect(() => {
    if (fieldName === 'evseModelConnectors' && fields?.length === 0) {
      append(child.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {}));
    }
  }, [append, child, fields]);

  return (
    <div className="w-full">
      {isAccordian ? (
        <div>
          {fields?.map((data, i) => (
            <div className="flex w-full items-center" key={i}>
              <div className="relative w-full">
                <Accordion
                  header={
                    <div className="flex w-full items-center truncate text-sm font-semibold text-black">
                      <EVSEConnector connector={data?.connector} />{' '}
                      <span className="ml-2">
                        {data?.connector || placeholder}
                      </span>
                      <div className="absolute right-12">
                        <Button
                          type="button"
                          shape="circle"
                          className="flex h-full bg-black"
                          variant="plain"
                          size="xs"
                          disabled={
                            preventDelete?.length &&
                            preventDelete.includes(data.key)
                          }
                          onClick={() => onRemove(data.id, i)}
                        >
                          <Trash01 />
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <FormRow hasBorder={false} isVertical>
                    <div className="mb-5 w-full">{renderChild(data, i)}</div>
                  </FormRow>
                  <FormRow hasButton hasBorder={false} />
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {label && (
            <label className="form-label text-sm font-semibold text-gray-600">
              {label}
            </label>
          )}
          {fields?.map((data, i) => (
            <div className="my-1 flex basis-3/6 items-center gap-4" key={i}>
              {renderChild(data, i)}
              <Button
                type="button"
                shape="circle"
                className="mb-1 flex h-full w-11 bg-black !p-0"
                variant="plain"
                size="xs"
                disabled={
                  preventDelete?.length && preventDelete.includes(data.key)
                }
                onClick={() => remove(i)}
              >
                <Trash01 />
              </Button>
            </div>
          ))}
        </>
      )}

      <>
        <Button
          size="sm"
          variant="plain"
          type="button"
          className="my-3 !px-0 !pt-2 text-sm text-gray-700"
          onClick={() => {
            append(
              child.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {}),
            );
          }}
          icon={<Plus />}
        >
          Add a {placeholder}
        </Button>
      </>
    </div>
  );
};

export default Multiple;

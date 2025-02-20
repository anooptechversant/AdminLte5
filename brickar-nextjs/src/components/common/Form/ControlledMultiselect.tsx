import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import { Controller } from 'react-hook-form';

interface ControlledMultiselectProps {
  name: string;
  control: any;
  options: any[];
  selectedValues: any[];
  setSelectedValues: React.Dispatch<React.SetStateAction<any[]>>;
  displayValue?: string;
  rules?: any;
}

const ControlledMultiselect: React.FC<ControlledMultiselectProps> = ({
  name,
  control,
  options,
  selectedValues,
  setSelectedValues,
  displayValue = 'name',
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <div tabIndex={0} ref={field.ref} className="multiselect-wrapper">
          <Multiselect
            {...field}
            options={options}
            selectedValues={selectedValues}
            onSelect={(selectedList) => {
              setSelectedValues(selectedList);
              field.onChange(selectedList);
            }}
            onRemove={(selectedList) => {
              setSelectedValues(selectedList);
              field.onChange(selectedList);
            }}
            displayValue={displayValue}
            avoidHighlightFirstOption
            className="multiselect-container"
            style={{
              searchBox: {
                padding: '12px',
              },
            }}
          />
          {error && (
            <p className="errorMessage text-sm text-red">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default ControlledMultiselect;

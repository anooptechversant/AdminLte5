import { ChevronDown } from '@untitled-ui/icons-react';
import classNames from 'classnames';
import React from 'react';

import { SelectOption, SelectProps } from '@/types/form';

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  invalid,
  errorMessage,
  inputRef,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };

  const containerClass = classNames(
    'relative w-full',
    className,
    disabled && 'opacity-50 cursor-not-allowed',
  );

  const triggerClass = classNames(
    'flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md focus:outline-none',
    invalid ? 'border-red-500' : 'border-gray-300',
    !disabled && 'hover:border-gray-400',
    'cursor-pointer h-10',
  );

  const dropdownClass = classNames(
    'absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg',
    'max-h-60 overflow-auto',
  );

  const optionClass = (option: SelectOption) =>
    classNames(
      'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100',
      option.disabled && 'opacity-50 cursor-not-allowed',
      value?.value === option.value && 'bg-gray-100',
    );

  return (
    <div ref={selectRef} className="w-full">
      <div ref={inputRef} className={containerClass}>
        <div
          className={triggerClass}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {value ? value.label : placeholder || 'Select...'}
          </span>
          <ChevronDown
            className={`size-4 transition-transform ${
              isOpen ? 'rotate-180 transform' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className={dropdownClass}>
            {options.map((option, index) => (
              <div
                key={index}
                className={optionClass(option)}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default Select;

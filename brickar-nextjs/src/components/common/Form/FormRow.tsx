import { FormRowProps } from '@/types/form';
import classNames from 'classnames';
import React, { FC } from 'react';

const FormRow: FC<FormRowProps> = ({
  label,
  subLabel,
  title = false,
  hasBorder = true,
  hasBorderSlim = false,
  hasButton = false,
  isVertical = false,
  center,
  direction,
  align,
  hasEqualRowSize,
  hasBottomSpace,
  hideLabel,
  children,
}) => {
  return (
    <div
      className={`flex ${isVertical ? 'flex-col' : 'flex-col gap-5 sm:flex-row'}
        ${hasBorderSlim ? 'mb-1 border-b pb-1' : hasBorder ? 'mb-6 border-b pb-5' : hasBottomSpace ? 'pb-5' : ''}
        relative ${align ? 'items-center' : ''} ${hasEqualRowSize ? 'justify-between' : ''}`}
    >
      {!hideLabel && (
        <div
          className={`py-1 pr-1 ${hasEqualRowSize ? 'basis-3/5 overflow-hidden break-all' : 'basis-1/3 '}`}
        >
          {title ? (
            <>
              <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                {label}
              </h4>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {subLabel}
              </span>
            </>
          ) : (
            <>
              <h5
                className={`text-sm font-bold text-gray-700 dark:text-gray-300`}
              >
                {label}
              </h5>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {subLabel}
              </span>
            </>
          )}
        </div>
      )}
      <div
        className={`flex gap-5 py-1 ${hasEqualRowSize ? 'basis-2/5' : hasButton ? 'basis-full justify-end' : isVertical ? 'basis-full' : hideLabel ? 'w-full' : 'basis-1/2'}
          ${direction ? 'flex-col' : 'flex-row'} ${center ? 'items-center' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FormRow;

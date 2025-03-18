import Skeleton from 'react-loading-skeleton';

import NoData from '../NoData';

type RenderFieldProps = {
  isLoading: boolean;
  details: Record<string, any>;
  label?: string;
  accessorKey: string;
  value?: (params: { row: Record<string, any> }) => any;
  subLabel?: string;
  isVertical?: boolean;
  hasEqualRowSize?: boolean;
  title?: boolean;
  childs?: RenderFieldProps[];
  className?: string;
  type?: 'date' | 'number' | 'currency' | 'text';
  actionComponent?: React.ReactNode;
};

const getNestedValue = (obj: Record<string, any>, keyPath: string): any => {
  return keyPath
    .split('.')
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : '—'),
      obj,
    );
};

const RenderField: React.FC<RenderFieldProps> = ({
  isLoading,
  details,
  label,
  accessorKey,
  value,
  subLabel,
  isVertical,
  hasEqualRowSize,
  title,
  childs,
  className,
  type,
  actionComponent,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-between border-b border-gray-200 py-5 md:flex-row md:items-center">
        <div
          className={`pr-1 ${hasEqualRowSize ? 'basis-3/5 overflow-hidden break-all' : 'basis-1/3'}`}
        >
          {title ? (
            <>
              <h4 className="text-lg font-semibold text-gray-900">
                {label || accessorKey.replace(/_/g, ' ').toUpperCase()}
              </h4>
              {subLabel && (
                <span className="text-sm font-medium text-gray-600">
                  {subLabel}
                </span>
              )}
            </>
          ) : (
            <>
              <h5
                className={`text-sm font-semibold ${isVertical ? 'text-gray-700' : 'text-gray-900'}`}
              >
                {label || accessorKey.replace(/_/g, ' ').toUpperCase()}
              </h5>
              {subLabel && (
                <span className="text-sm font-medium text-gray-600">
                  {subLabel}
                </span>
              )}
            </>
          )}
        </div>
        {!title && (
          <div className="flex-2 text-left">
            {isLoading ? (
              <Skeleton className="h-4 w-1/2" />
            ) : (
              <span className={className ?? 'text-gray-800'}>
                {value
                  ? value({ row: details })
                  : getNestedValue(details, accessorKey)}
              </span>
            )}
          </div>
        )}
        {actionComponent && <div className="ml-5">{actionComponent}</div>}
      </div>

      {childs &&
        childs.map((child, index) => (
          <RenderField
            key={`${accessorKey}-child-${index}`}
            {...child}
            isLoading={isLoading}
            details={details}
          />
        ))}
    </>
  );
};

type DetailsPageProps = {
  data: any;
  isLoading: any;
  fields: any;
  errorText?: string;
  isError: any;
  actionComponent?: React.ComponentType<{ row: Record<string, any> }>;
};

const DetailsPage: React.FC<DetailsPageProps> = ({
  data,
  fields,
  errorText,
  isLoading,
  isError,
  actionComponent: ActionComponent,
}) => {
  const details = data?.data;
  const firstFieldIsTitle = fields.length > 0 && fields[0].title;

  return (
    <div className="bg-white">
      {!isError ? (
        <div className="space-y-4 md:space-y-5">
          {!firstFieldIsTitle && (
            <div className="flex items-center justify-between border-b border-gray-200 py-5">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Details</h4>
              </div>
              {ActionComponent && details && <ActionComponent row={details} />}
            </div>
          )}
          {fields.map((field: any, index: any) => (
            <RenderField
              key={`field-${index}`}
              isLoading={isLoading}
              details={details}
              actionComponent={
                firstFieldIsTitle &&
                index === 0 &&
                ActionComponent &&
                details ? (
                  <ActionComponent row={details} />
                ) : null
              }
              {...field}
            />
          ))}
        </div>
      ) : (
        <NoData title={errorText || 'No data found!'} />
      )}
    </div>
  );
};

export default DetailsPage;

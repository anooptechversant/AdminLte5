import { ColumnDef } from '@tanstack/react-table';

export type CommonTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  error?: string;
  isLoading: boolean;
  totalPages?: number;
  dashBoard?: boolean;
  customComponent?: React.ReactNode;
};

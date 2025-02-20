import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormRowProps = {
  label?: string;
  subLabel?: string;
  title?: boolean;
  hasBorder?: boolean;
  hasBorderSlim?: boolean;
  hasButton?: boolean;
  isVertical?: boolean;
  center?: boolean;
  direction?: boolean;
  align?: boolean;
  hasEqualRowSize?: boolean;
  hasBottomSpace?: boolean;
  hideLabel?: boolean;
  children: ReactNode;
};

export type FieldOption = {
  label: string;
  value: string | number;
};

export type Field = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'select'
    | 'radio'
    | 'upload'
    | 'addChildren'
    | 'textEditor'
    | any;
  options?: FieldOption[];
  validate?: any;
  placeholder?: string;
  addChildren?: ReactNode;
  limit?: number;
  quillModules?: any;
  subLabel?: string;
  isVertical?: boolean;
};

export type CommonFormProps = {
  fields: Field[];
  form: UseFormReturn<any>;
  children?: ReactNode;
  submitButtonLabel?: string;
  formatData?: (data: any) => any;
  onFinish: (data: any) => Promise<void>;
  isLoading?: boolean;
};

export type FormInputProps = {
  type?:
    | 'text'
    | 'button'
    | 'number'
    | 'hidden'
    | 'password'
    | 'email'
    | 'date'
    | 'radio';
  invalid?: boolean;
  form?: any;
  disabled?: boolean;
  textArea?: boolean;
  name: string;
  validate?: object;
  style?: React.CSSProperties;
  label?: string;
  hasWrapper?: boolean;
  errorMessage?: any;
  right?: React.ReactNode;
  className?: string;
  placeholder?: string;
  values?: { value: string; label: string; subLabel?: string }[] | any;
};

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  placeholder?: string;
  invalid?: boolean;
  errorMessage?: string;
  inputRef?: React.Ref<HTMLDivElement>;
  disabled?: boolean;
  className?: string;
};

export type FileType = {
  file: File;
  fileId: string;
  name: string;
  size: number;
  url: string;
  type: string;
};

export type FilesProps = {
  uploadedFile: FileType[];
  setUploadedFile: (files: FileType[]) => void;
  form: any;
  fieldName: string;
  label: string;
  Filetype?: 'image' | 'pdf' | any;
  limit: number | any;
  subLabel?: string;
  isFullWidth?: boolean;
  error?: string;
  maxWidth?: number;
  maxHeight?: number;
  multiple?: boolean;
};

export type FileUploadProps = {
  accept?: string;
  beforeUpload?: (
    newFiles: File[],
    files: File[],
  ) => Promise<boolean | string> | boolean | string | any;
  disabled?: boolean;
  draggable?: boolean;
  fileList: File[];
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  onFileRemove?: (files: File[]) => void;
  showList?: boolean;
  tip?: string | React.ReactNode;
  uploadLimit?: number;
  className?: string;
  limit?: number | any;
  position?: any;
  photoPosition?: any;
  children?: React.ReactNode;
};

import { Trash01 } from '@untitled-ui/icons-react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import FileItem from './FileItem';

interface FileUploadProps {
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
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
  const {
    accept,
    beforeUpload,
    disabled,
    draggable = false,
    fileList,
    multiple = true,
    onChange,
    onFileRemove,
    showList = true,
    tip,
    uploadLimit,
    className,
    limit,
    position,
    photoPosition,
    ...rest
  } = props;

  const fileInputField = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>(fileList);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setFiles(multiple ? fileList : fileList.slice(0, 1));
  }, [fileList, multiple]);

  const addNewFiles = (newFiles: File[]): File[] => {
    let updatedFiles = cloneDeep(files);

    if (!multiple) {
      updatedFiles = [newFiles[0]];
    } else {
      if (uploadLimit && updatedFiles.length >= uploadLimit) {
        updatedFiles = updatedFiles.slice(-uploadLimit + newFiles.length);
      }
      updatedFiles.push(...newFiles);
    }

    return updatedFiles;
  };

  const onNewFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const result = beforeUpload ? await beforeUpload(newFiles, files) : true;

    if (result === false || typeof result === 'string') {
      return;
    }

    const updatedFiles = addNewFiles(newFiles);
    onChange?.(updatedFiles);
  };

  const removeFile = (fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(updatedFiles);
    onFileRemove?.(updatedFiles);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    if (!disabled) fileInputField.current?.click();
    e.stopPropagation();
  };

  const handleDragLeave = useCallback(() => {
    if (draggable) setDragOver(false);
  }, [draggable]);

  const handleDragOver = useCallback(() => {
    if (draggable && !disabled) setDragOver(true);
  }, [draggable, disabled]);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (draggable && !disabled) {
        const newFiles = Array.from(event.dataTransfer.files);

        if (!multiple && newFiles.length > 1) return;

        onNewFileUpload({
          target: { files: newFiles },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      setDragOver(false);
    },
    [draggable, disabled, multiple],
  );

  return (
    <>
      <div
        ref={ref}
        className={classNames(
          'upload',
          draggable && 'upload-draggable',
          className,
          {
            'hover:border-blue-500': draggable && !disabled,
            'border-blue-500': dragOver && draggable,
            disabled: draggable && disabled,
          },
        )}
        {...(draggable
          ? {
              onDragLeave: handleDragLeave,
              onDragOver: handleDragOver,
              onDrop: handleDrop,
            }
          : { onClick: triggerUpload })}
        {...rest}
      >
        <input
          className="upload-input"
          type="file"
          ref={fileInputField}
          onChange={onNewFileUpload}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          title=""
          {...rest}
        />
      </div>
      {tip && <div className="upload-tip">{tip}</div>}
      {showList && (
        <div className="upload-file-list">
          {files.map((file, index) => (
            <FileItem key={file.name + index} file={file} limit={limit}>
              <Trash01
                onClick={() => removeFile(index)}
                className="mr-3 cursor-pointer"
              />
              {position && (
                <div className="mr-1 mt-1 flex size-10 items-center justify-center rounded-lg border border-gray-300">
                  {photoPosition + index}
                </div>
              )}
            </FileItem>
          ))}
        </div>
      )}
    </>
  );
});

FileUpload.displayName = 'FileUpload';
export default FileUpload;

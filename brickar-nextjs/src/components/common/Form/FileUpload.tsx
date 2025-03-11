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
import { toast } from 'react-toastify';

import FileItem from './FileItem';

interface FileUploadProps {
  accept?: string;
  beforeUpload?: (
    newFiles: File[],
    files: File[],
  ) => Promise<boolean | string> | boolean | string;
  disabled?: boolean;
  draggable?: boolean;
  fileList: any[];
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  onFileRemove?: (files: File[]) => void;
  showList?: boolean;
  tip?: string | React.ReactNode;
  uploadLimit?: number;
  className?: string;
  children?: React.ReactNode;
  limit?: number;
  position?: any;
  photoPosition?: any;
  field?: any;
  form?: any;
}

const filesToArray = (files: File[]) =>
  Object.keys(files).map((key) => files[parseInt(key, 10)]);

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
  const {
    accept,
    beforeUpload,
    disabled,
    draggable = false,
    fileList = [],
    multiple = true,
    onChange,
    onFileRemove,
    showList = true,
    tip,
    uploadLimit,
    children,
    className,
    field,
    limit = 10000,
    position,
    photoPosition,
    ...rest
  } = props;

  const fileInputField = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>(fileList);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!multiple && fileList.length > 1) {
      setFiles([fileList[0]]);
    } else {
      setFiles(fileList);
    }
  }, [fileList, multiple]);

  const triggerMessage = (msg: any) => {
    toast.error(msg || 'Upload Failed!');
  };

  const addNewFiles = (newFiles: File[]) => {
    let updatedFiles = cloneDeep(files);

    if (!multiple) {
      updatedFiles = [newFiles[0]];
    } else {
      if (uploadLimit && updatedFiles.length >= uploadLimit) {
        if (uploadLimit === 1) {
          updatedFiles.shift();
        } else {
          updatedFiles = updatedFiles.slice(-uploadLimit + newFiles.length);
        }
      }
      updatedFiles.push(...newFiles);
    }

    return filesToArray(updatedFiles);
  };

  const onNewFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    let result = beforeUpload ? await beforeUpload(newFiles, files) : true;

    if (result === false || typeof result === 'string') {
      triggerMessage(typeof result === 'string' ? result : undefined);
      return;
    }

    const updatedFiles = addNewFiles(newFiles);
    onChange?.(updatedFiles);

    // ✅ Reset file input
    if (fileInputField.current) {
      fileInputField.current.value = '';
    }
  };

  const removeFile = (fileIndex: number) => {
    const deletedFileList = files.filter((_, index) => index !== fileIndex);
    setFiles(deletedFileList);
    onFileRemove?.(deletedFileList);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    if (!disabled) {
      fileInputField.current?.click();
    }
    e.stopPropagation();
  };

  const renderChildren = () => {
    if (!draggable && !children) {
      return (
        <button disabled={disabled} onClick={(e) => e.preventDefault()}>
          Upload
        </button>
      );
    }

    if (draggable && !children) {
      return <span>Choose a file or drag and drop here</span>;
    }

    return children;
  };

  const handleDragLeave = useCallback(() => {
    if (draggable) {
      setDragOver(false);
    }
  }, [draggable]);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault(); // ✅ Prevent browser behavior
      if (draggable && !disabled) {
        setDragOver(true);
      }
    },
    [draggable, disabled],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (draggable && !disabled) {
        const newFiles = Array.from(event.dataTransfer.files);

        if (!multiple && newFiles.length > 1) {
          triggerMessage('Only one file is allowed at a time.');
          return;
        }

        onNewFileUpload({
          target: { files: newFiles },
        } as any);
      }

      setDragOver(false);
    },
    [draggable, disabled, multiple, onNewFileUpload],
  );

  const draggableProp = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  const uploadClass = classNames(
    'upload',
    draggable && 'upload-draggable',
    draggable && disabled && 'disabled',
    className,
  );

  const uploadInputClass = classNames('upload-input', draggable && 'draggable');

  return (
    <>
      <div
        ref={ref}
        className={uploadClass}
        {...(draggable ? draggableProp : { onClick: triggerUpload })}
        {...rest}
      >
        <input
          className={uploadInputClass}
          type="file"
          ref={fileInputField}
          onChange={onNewFileUpload}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          title=""
          value=""
          {...field}
          {...rest}
        />
        {renderChildren()}
      </div>
      {tip}
      {showList && (
        <div className="upload-file-list">
          {files.map((file, index) => (
            <FileItem
              file={file}
              // key={file.name + index}
              limit={limit}
              // position={position}
            >
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

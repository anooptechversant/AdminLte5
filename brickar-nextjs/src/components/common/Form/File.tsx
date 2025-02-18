import { UploadCloud02 } from '@untitled-ui/icons-react';
import React from 'react';
import FileUpload from './FileUpload';
import { FilesProps, FileType } from '@/types/form';

const Files: React.FC<FilesProps> = ({
  uploadedFile,
  setUploadedFile,
  form,
  fieldName,
  label,
  Filetype,
  limit,
  subLabel,
  isFullWidth,
  error,
  maxWidth,
  maxHeight,
  multiple,
}) => {
  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve(true);
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (
          maxWidth &&
          maxHeight &&
          (img.width !== maxWidth || img.height !== maxHeight)
        ) {
          reject(
            `Invalid dimensions. Expected ${maxWidth}x${maxHeight}, got ${img.width}x${img.height}.`,
          );
          return;
        }
        resolve(true);
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject('Failed to load image');
      };
    });
  };

  const onFileUpload = async (files: FileList) => {
    try {
      form.clearErrors(fieldName);
      const fileArray = Array.from(files);
      const newFiles: FileType[] = fileArray.map((file) => ({
        file,
        fileId: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        type: file.type,
      }));

      setUploadedFile(newFiles);
      form.setValue(fieldName, newFiles);
      await form.trigger(fieldName);
    } catch (error) {
      form.setError(fieldName, { message: 'Error uploading file' });
    }
  };

  const beforeUpload = async (fileList: FileList): Promise<boolean> => {
    try {
      const fileArray: File[] = Array.from(fileList);
      for (const file of fileArray) {
        if (Filetype === 'image' && !file.type.startsWith('image/')) {
          throw new Error('Only image files (JPG, PNG, etc.) are allowed.');
        }
        if (file.size > limit) {
          throw new Error(
            `File must not exceed ${Math.ceil(limit / 1024)} KB.`,
          );
        }
        await validateImageDimensions(file);
      }
      return true;
    } catch (error: any) {
      form.setError(fieldName, {
        message: error.message || 'Validation failed',
      });
      return false;
    }
  };

  return (
    <div
      className={`${isFullWidth ? 'my-1 w-full py-1' : 'relative mb-6 flex flex-col sm:flex-row'}`}
    >
      <div className="basis-1/3 pt-2">
        <h5 className="text-sm font-semibold text-gray-900">{label}</h5>
        {subLabel && (
          <span className="text-sm font-medium text-gray-600">{subLabel}</span>
        )}
      </div>
      <div className="flex basis-3/6 flex-col pt-2">
        <FileUpload
          draggable
          beforeUpload={beforeUpload}
          className="h-full w-full border-none"
          onChange={onFileUpload}
          limit={limit}
          multiple={multiple}
          fileList={uploadedFile}
        >
          <div
            className={`flex flex-col items-center justify-center py-4 ${error ? 'border-2 border-red-500' : 'border border-gray-200'}`}
          >
            <div className="flex h-8 w-8 items-center justify-center bg-gray-50">
              <UploadCloud02 className="bg-gray-100" />
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-semibold text-gray-900">
                Click to upload
              </p>
              <p className="text-sm text-gray-500">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {Filetype === 'image'
                ? `PNG, JPG (max. ${Math.ceil(limit / 1024)} KB ${maxWidth && maxHeight ? `, ${maxWidth}x${maxHeight}px` : ''})`
                : 'PDF'}
            </p>
          </div>
        </FileUpload>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default Files;

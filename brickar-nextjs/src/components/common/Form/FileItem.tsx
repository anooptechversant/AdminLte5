import React, { ReactNode } from 'react';
import { VscFile, VscFilePdf, VscFileZip } from 'react-icons/vsc';

const BYTE = 1000;
const getKB = (bytes: number) => Math.round(bytes / BYTE);

interface FileIconProps {
  children: ReactNode;
}

const FileIcon: React.FC<FileIconProps> = ({ children }) => {
  return <span className="text-4xl">{children}</span>;
};

interface FileItemProps {
  file: File & { url?: string; mime_type?: string };
  children?: ReactNode;
  limit: number;
}

const FileItem: React.FC<FileItemProps> = ({ file, children, limit }) => {
  const { type, name, size, url } = file;
  const _percent = (size / limit) * 100;

  const renderThumbnail = () => {
    const isImageFile =
      type?.split('/')[0] === 'image' ||
      file.mime_type?.split('/')[0] === 'image' ||
      url?.startsWith('http');

    if (isImageFile) {
      const imageUrl = url || URL.createObjectURL(file);
      return (
        <img className="upload-file-image" src={imageUrl} alt="file preview" />
      );
    }

    if (type === 'application/zip') {
      return (
        <FileIcon>
          <VscFileZip />
        </FileIcon>
      );
    }

    if (type === 'application/pdf') {
      return (
        <FileIcon>
          <VscFilePdf />
        </FileIcon>
      );
    }

    return (
      <FileIcon>
        <VscFile />
      </FileIcon>
    );
  };

  return (
    <div className="upload-file">
      <div className="flex w-full">
        <div className="upload-file-thumbnail">{renderThumbnail()}</div>
        <div className="upload-file-info mx-2 w-full py-1">
          <h6 className="upload-file-name">{name}</h6>
          {size && <span className="upload-file-size">{getKB(size)} kb</span>}
        </div>
      </div>
      {children}
    </div>
  );
};

FileItem.displayName = 'FileItem';

export default FileItem;

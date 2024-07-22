import React, { useState, useEffect } from "react";

export default function FileInput({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
}) {
  const [files, setFiles] = useState(propValue || []);
  const [validationError, setValidationError] = useState(propValidationError);
  useEffect(() => {
    setFiles(propValue || []);
  }, [propValue]);

  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    const updatedFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedFiles.push(reader.result);
        if (updatedFiles.length === selectedFiles.length) {
          setFiles(updatedFiles);
          propOnChange({ name: propAttributeValue, value: updatedFiles });
        }
      };
      reader.readAsDataURL(selectedFiles[i]);
    }
  };

  return (
    <div>
      {/* Display selected files */}
      {files.map((file, index) => (
        <img
          key={index}
          src={file}
          alt={`Imag Preview`}
          width={90}
          height={80}
        />
      ))}

      <input
        type='file'
        className='form-control form-control-user'
        id='exampleFileInput'
        onChange={handleFileInputChange}
        name={propAttributeValue}
        multiple // Enable multiple file selection
      />

      {validationError && (
        <span className='tooltiptext'>{validationError}</span>
      )}
    </div>
  );
}

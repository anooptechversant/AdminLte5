import React, { useState, useEffect } from "react";

export default function FileInput({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
}) {
  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState(propValidationError);
  useEffect(() => {
    setFile(propValue);
    propOnChange({ name: propAttributeValue, value: file });
  }, [propValue, propAttributeValue]);
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  const handleFileInputChange = (event) => {
    const newFile = event.target.files[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(newFile);
      //  setValidationError("");
      propOnChange({ name: propAttributeValue, value: newFile });
    } else {
      setFile(null);
      // setValidationError("Required Field");
      propOnChange({ name: propAttributeValue, value: null });
    }
  };

  return (
    <div>
      {/* Display only the new file if selected, otherwise display propValue */}
      {file ? (
        <img src={file} alt={`Imag Preview`} width={90} height={80} />
      ) : (
        propValue && (
          <img src={propValue} alt={`Imag Preview`} width={90} height={80} />
        )
      )}
      <div className='custom-file'>
        <input
          type='file'
          className={`custom-file-input  ${
            validationError ? "is-invalid" : ""
          } `}
          id={`exampleInput${propAttributeValue}`}
          onChange={handleFileInputChange}
          name={propAttributeValue}
        />
        <label className='custom-file-label' for='exampleInputFile'>
          Choose file
        </label>
        {/* <input
        type='file'
        className='form-control form-control-user'
        id='exampleFileInput'
        onChange={handleFileInputChange}
        name={propAttributeValue}
      /> */}

        {validationError && (
          <span className='invalid-feedback'>{validationError}</span>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function TextArea({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
  placeholder,
}) {
  const [textAreaValue, setTextAreaValue] = useState(propValue);
  const [validationError, setValidationError] = useState(propValidationError);

  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    setTextAreaValue(propValue);
    propOnChange({ name: propAttributeValue, value: textAreaValue });
  }, [propValue]);

  const handleTextAreaChange = (event) => {
    const newText = event.target.value;
    setTextAreaValue(newText);
    propOnChange({ name: event.target.name, value: newText });
  };

  return (
    <div>
      <textarea
        className={`form-control ${validationError ? "is-invalid" : ""}`}
        value={textAreaValue}
        id={`exampleInput${propAttributeValue}`}
        placeholder={placeholder}
        onChange={handleTextAreaChange}
        name={propAttributeValue}
      ></textarea>
      {validationError && (
        <span className='invalid-feedback'>{validationError}</span>
      )}
    </div>
  );
}

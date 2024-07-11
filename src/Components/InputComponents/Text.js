import React, { useState, useEffect } from "react";

const Text = ({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
  placeholder
}) => {
  const [inputText, setInputText] = useState(propValue);
  const [validationError, setValidationError] = useState(propValidationError);

  useEffect(() => {
    setInputText(propValue);
    propOnChange({ name: propAttributeValue, value: inputText });
  }, [propValue]);
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);
  const handleTextInputChange = (event) => {
    const newTextInput = event.target.value;
    setInputText(newTextInput);
    propOnChange({ name: event.target.name, value: newTextInput });
  };

  return (
    <div>
      <input
        type='text'
        className={`form-control  ${validationError ? "is-invalid" : ""} `}
        value={inputText}
        id={`exampleInput${propAttributeValue}`}
        placeholder={placeholder}
        onChange={handleTextInputChange}
        name={propAttributeValue}
      />
      {validationError && (
        <span className='invalid-feedback'>{validationError}</span>
      )}
    </div>
  );
};

export default Text;

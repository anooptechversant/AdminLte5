import React, { useState, useEffect } from "react";

const MultiText = ({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
}) => {
  // Initialize state with an array containing the initial value or an empty array
  const [inputTextArray, setInputTextArray] = useState(propValue || []);
  const [validationError, setValidationError] = useState(propValidationError);

  useEffect(() => {
    setInputTextArray(propValue || [""]);
  }, [propValue]);

  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  const handleTextInputChange = (index, newValue) => {
    const updatedTextArray = [...inputTextArray];
    updatedTextArray[index] = newValue;
    setInputTextArray(updatedTextArray);
    propOnChange({ name: propAttributeValue, value: updatedTextArray });
  };

  const addNewInput = () => {
    setInputTextArray([...inputTextArray, ""]);
  };

  const removeInput = (index) => {
    const updatedTextArray = [...inputTextArray];
    updatedTextArray.splice(index, 1);
    setInputTextArray(updatedTextArray);
    propOnChange({ name: propAttributeValue, value: updatedTextArray });
  };

  return (
    <div>
      {inputTextArray.map((text, index) => (
        <div key={index}>
          <input
            type='text'
            className={`form-control form-control-user ${
              validationError ? "input-error" : ""
            }`}
            value={text}
            id={`exampleInput${propAttributeValue}${index}`}
            placeholder=''
            onChange={(e) => handleTextInputChange(index, e.target.value)}
            name={`${propAttributeValue}[${index}]`}
          />
          {index > 0 && (
            <button onClick={() => removeInput(index)}>Remove</button>
          )}
          {validationError && index === inputTextArray.length - 1 && (
            <span className='tooltiptext'>{validationError}</span>
          )}
        </div>
      ))}
      {/* Display "Add New" button outside the map function */}

      <button
        className='btn btn-outline-primary rounded btn-sm'
        onClick={addNewInput}
      >
        {" "}
        <i className='fas fa-add add-icon'></i>
      </button>
    </div>
  );
};

export default MultiText;

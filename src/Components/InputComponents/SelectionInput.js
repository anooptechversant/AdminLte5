import React, { useState, useEffect } from "react";

export default function SelectionInput({
  propOnChange,
  propValidationError,
  propValue,
  propAttributeValue,
  firstOption,
  options, // An array of options to choose from
}) {
  const [selectedOption, setSelectedOption] = useState(propValue);
  const [validationError, setValidationError] = useState(propValidationError);
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    setSelectedOption(propValue);
    propOnChange({ name: propAttributeValue, value: selectedOption });
  }, [propValue]);

  const handleSelectionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);

    propOnChange({ name: event.target.name, value: newSelectedOption });
  };

  return (
    <div>
      <select
        className={`form-control  ${validationError ? "is-invalid" : ""} `}
        value={selectedOption}
        onChange={handleSelectionChange}
        name={propAttributeValue}
      >
        <option value=''>{firstOption || `Select an option`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
      {/* <div className='mr-0 input-group-append'>
          <span className='input-group-text'>
            <FontAwesomeIcon icon={faChevronDown}  size="sm"/>
          </span>
        </div> */}
      {validationError ? (
        <span className='invalid-feedback'>{validationError}</span>
      ) : (
        ""
      )}
    </div>
  );
}

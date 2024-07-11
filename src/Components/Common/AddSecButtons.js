import React, { useEffect, useState } from "react";
import "./addsecbutton.css";

function AddSecButtons({ handleSubmit, isNext, propAllErrorEmpty, propValue }) {
  const [allErrorsEmpty, setAllErrorsEmpty] = useState(false);

  useEffect(() => {
    setAllErrorsEmpty(propAllErrorEmpty);
  }, [propAllErrorEmpty]);

  const handleButtonClick = (type) => {
    handleSubmit(type);
  };

  const buttonText =
    propValue === undefined ? (isNext ? "Next" : "Save") : "Update";

  return (
    <div className='row button-margin'>
      <div className='col-md-6 button'>
        <button
          type='button'
          disabled={!allErrorsEmpty}
          className='btn btn-sm btn-primary btn-icon-split save-button'
          onClick={() =>
            handleButtonClick(propValue === undefined ? "save" : "update")
          }
        >
          <span className='icon text-white-50'>
            <i className='fas fa-save'></i>
          </span>
          <span className='text'>{buttonText}</span>
        </button>
        <button
          onClick={() => handleButtonClick("cancel")}
          className='btn btn-sm btn-danger btn-icon-split save-button'
        >
          <span className='icon text-white-50'>
            <i className='fas fa-stop'></i>
          </span>
          <span className='text'>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default AddSecButtons;

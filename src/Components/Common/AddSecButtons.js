import React, { useEffect, useState } from "react";

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
    <>
      <div class='card-footer'>
        
        <button
          type='button'
          disabled={!allErrorsEmpty}
          onClick={() =>
            handleButtonClick(propValue === undefined ? "save" : "update")
          }
          class='btn btn-primary mr-4'
        >
          {buttonText}
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick("cancel")}
          class='btn btn-danger'
        >
          Cancel
        </button>
      </div>
     
    </>
  );
}

export default AddSecButtons;

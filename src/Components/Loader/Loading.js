import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

function Loading() {
  return (
    <div className='loading-overlay'>
      <Spinner
        animation='border'
        className='custom-spinner'
        variant='secondary'
        style={{ width: "80px", height: "80px" }}
      />
    </div>
  );
}

export default Loading;

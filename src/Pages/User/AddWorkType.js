import React, { useState, useEffect } from "react";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getUserWorkTypeData } from "../../Actions/userWorkTypeActions";
import Text from "../../Components/InputComponents/Text";

function AddWorkType({ Data, Success, Error, Loading }) {
  const { id, userId } = useParams();
  const dispatch = useDispatch();
  const [inputWorkType, setInputWorkType] = useState({ type: [""] });
  const [validationErrors, setValidationErrors] = useState([]);
  const [editData, setEditData] = useState([]);
  const handleWorkTypeChange = (newValue, index) => {
    const updatedWorkTypes = [...inputWorkType.type];
    updatedWorkTypes[index] = newValue.value;
    setInputWorkType((prevState) => ({
      ...prevState,
      type: updatedWorkTypes,
    }));
    setValidationErrors((prevState) => {
      const updatedErrors = [...prevState];
      updatedErrors[index] = newValue.value !== "" ? "" : "Required Field";
      return updatedErrors;
    });
  };

  const handleAddWorkType = (type) => {
    if (type === "save") {
      // Perform validation here if needed
      dispatch(getUserWorkTypeData("insert", inputWorkType.type, userId));
    } else if (type === "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getUserWorkTypeData("update", inputWorkType.type, userId));
      }
    }
  };

  const handleAddField = () => {
    setInputWorkType((prevState) => ({
      ...prevState,
      type: [...prevState.type, ""],
    }));
    setValidationErrors((prevState) => [...prevState, ""]);
  };
  const handleDeleteField = (index) => {
    setInputWorkType((prevState) => ({
      ...prevState,
      type: prevState.type.filter((_, i) => i !== index),
    }));
    setValidationErrors((prevState) => prevState.filter((_, i) => i !== index));
  };
  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (id) {
      setInputWorkType({ type: Data });
    }
  }, [Data, id]);
  const pageTitle = {
    create: "Add Work Type",
    update: "Update Work Type",
  };

  const responseMessage = {
    insert: "Work type successfully added",
    update: "Work type Updated Successfully",
  };

  return (
    <div>
      {Loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <>
            <Toasts
              propResponseMessage={responseMessage}
              propStatusData={{
                successStatusData: Success,
                errorStatusData: Error,
              }}
              propActionType={id !== undefined ? "update" : "insert"}
            />
            <section className='content-header'>
              <div className='container-fluid'>
                <div className='row mb-2'>
                  <div className='col-sm-6'>
                    <h1>
                      {" "}
                      {id !== undefined ? pageTitle.update : pageTitle.create}
                    </h1>
                  </div>
                  <div className='col-sm-6'>
                    <ol className='breadcrumb float-sm-right'>
                      <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        {id !== undefined ? pageTitle.update : pageTitle.create}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
            <section className='content'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='card card-primary'>
                      <div className='card-header'>
                        <h3 className='card-title'>
                          <small>
                            {" "}
                            <span className='' onClick={goBack}>
                              <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                              <span className='add-label'> Back</span>
                            </span>
                          </small>
                        </h3>
                      </div>

                      <form id='quickForm'>
                        <div className='card-body'>
                          <div className='form-group'>
                            <label>
                              Work Types <span className='errorLabel'>*</span>
                            </label>
                            {inputWorkType.type.map((workType, index) => (
                              <div
                                key={index}
                                className='row mb-4 d-flex justify-content-between align-content-center'
                              >
                                <div className='col-md-10'>
                                  <Text
                                    propOnChange={(newValue) =>
                                      handleWorkTypeChange(newValue, index)
                                    }
                                    propValidationError={
                                      validationErrors[index]
                                    }
                                    propAttributeValue='type'
                                    propValue={workType}
                                  />
                                </div>
                                <div className='w-auto d-flex align-content-center flex-wrap'>
                                  <span
                                    className='btn btn-danger btn-circle btn-sm delete'
                                    onClick={() => handleDeleteField(index)}
                                  >
                                    <i className='fas fa-trash'></i>
                                  </span>
                                </div>
                              </div>
                            ))}
                            <hr />
                            <div className='row'>
                              <span
                                className='btn btn-primary rounded btn-sm py-2'
                                type='button'
                                onClick={handleAddField}
                              >
                                <i className='fas fa-add add-icon'></i> Add
                                WorkType
                              </span>
                            </div>
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddWorkType}
                          propAllErrorEmpty={validationErrors.every(
                            (error) => error === ""
                          )}
                          propValue={id}
                        />
                      </form>
                    </div>
                  </div>

                  <div className='col-md-6'></div>
                </div>
              </div>
            </section>
          </>
        </div>
      )}
    </div>
  );
}

export default AddWorkType;

import React, { useEffect, useState } from "react";
import Text from "../../Components/InputComponents/Text";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getEducationData } from "../../Actions/educationActions";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import AddSecButtons from "../../Components/Common/AddSecButtons";

function AddEducation({ Data, Success, Error, Loading }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputEducation, setInputEducation] = useState({ qualification: "" });
  const [validationError, setValidationError] = useState({ qualification: "" });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

  const handleEducationChange = (newEducation) => {
    setInputEducation((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value !== "" ? "" : "Required Field",
    }));
  };

  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);

  const handleAddEducation = (type) => {
    if (type === "save") {
      dispatch(getEducationData("insert", inputEducation, 0));
    } else if (type === "cancel") {
      window.history.back();
    } else if (id !== undefined) {
      dispatch(getEducationData("update", inputEducation, id));
      setEditData([{ qualification: inputEducation.qualification }]);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const filteredData = Data.filter((obj) => obj.id == id);
    setEditData(filteredData);
  }, [Data, id]);
  useEffect(() => {
    if (editData.length > 0) {
      setInputEducation((prev) => ({
        ...prev,
        qualification: editData[0].qualification,
      }));
      setValidationError((prev) => ({
        ...prev,
        qualification: editData[0].qualification !== "" ? "" : "Required Field",
      }));
    }
  }, [editData]);
  const pageTitle = {
    create: "Add Education",
    update: "Update Education",
  };

  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Education successfully added",
    update: "Education Updated Successfully",
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Toasts
            propResponseMessage={responseMessage}
            propActionType={id !== undefined ? "update" : "insert"}
            propStatusData={{ successStatusData, errorStatusData }}
          />
          <section className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-6'>
                  <h1>{editData[0] ? pageTitle.update : pageTitle.create}</h1>
                </div>
                <div className='col-sm-6'>
                  <ol className='breadcrumb float-sm-right'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                      {editData[0] ? pageTitle.update : pageTitle.create}
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
                          <label for='exampleInputEmail1'>Qualification</label>

                          <Text
                            propOnChange={handleEducationChange}
                            propValidationError={validationError.qualification}
                            propAttributeValue='qualification'
                            propValue={
                              editData[0] ? editData[0].qualification : ""
                            }
                            placeholder={""}
                          />
                        </div>
                      </div>
                      <AddSecButtons
                        handleSubmit={handleAddEducation}
                        propAllErrorEmpty={areAllErrorsEmpty}
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
      )}
    </div>
  );
}

export default AddEducation;

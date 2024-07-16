import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorkTypeData } from "../../Actions/workTypeActions";
import Text from "../../Components/InputComponents/Text";
import Spinner from "../../Components/Loader/Loading";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import Toasts from "../../Components/Common/Toasts";

function AddWorkType({ Data, Success, Error, Loading }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputWorkType, setInputWorkType] = useState({ worktype: "" });
  const [validationError, setValidationError] = useState({ worktype: "" });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

  const handleWorkTypeChange = (newWorkType) => {
    setInputWorkType((prevState) => ({
      ...prevState,
      [newWorkType.name]: newWorkType.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newWorkType.name]: newWorkType.value !== "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddWorkType = (type) => {
    if (type === "save") {
      dispatch(getWorkTypeData("insert", inputWorkType, 0));
    } else if (type === "cancel") {
      window.history.back();  
    } else {
      if (id !== undefined) {
        dispatch(getWorkTypeData("update", inputWorkType, id));
        setEditData([{ worktype: inputWorkType.worktype }]);
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    setEditData(Data.filter((obj) => obj.id == id));
  }, [Data, id]);
  useEffect(() => {
    if (editData.length > 0) {
      setInputWorkType({ worktype: editData[0].workType });
      setValidationError({ worktype: "" });
    }
  }, [editData]);

  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Toasts
            propResponseMessage={responseMessage}
            propStatusData={{ successStatusData, errorStatusData }}
            propActionType={id !== undefined ? "update" : "insert"}
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
                      <a href='#'>Home</a>
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
                          <label for='exampleInputEmail1'>Work type</label>

                          <Text
                            propOnChange={handleWorkTypeChange}
                            propValidationError={validationError.worktype}
                            propAttributeValue='worktype'
                            propValue={editData[0] ? editData[0].worktype : ""}
                            placeholder={""}
                          />
                        </div>
                      </div>

                      <AddSecButtons
                        handleSubmit={handleAddWorkType}
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

export default AddWorkType;

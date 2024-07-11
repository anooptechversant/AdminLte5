import React, { useState, useEffect } from "react";
// import Text from "../../../Components/InputComponents/Text";
// import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorkTypeData } from "../../Actions/workTypeActions";
import Text from "../../Components/InputComponents/Text";
import Spinner from "../../Components/Loader/Loading";
import AddSecButtons from "../../Components/Common/AddSecButtons";
// import { getWorkTypeData } from "../../../Actions/workTypeActions";
// import Spinner from "../../../Components/Loader/Loading";
// import Toasts from "../../../Components/CommonComponents/Toasts";

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
          {/* <Toasts
            propResponseMessage={responseMessage}
            propStatusData={{ successStatusData, errorStatusData }}
            propActionType={id !== undefined ? "update" : "insert"}
          /> */}
          <section class='content-header'>
            <div class='container-fluid'>
              <div class='row mb-2'>
                <div class='col-sm-6'>
                  <h1>Validation</h1>
                </div>
                <div class='col-sm-6'>
                  <ol class='breadcrumb float-sm-right'>
                    <li class='breadcrumb-item'>
                      <a href='#'>Home</a>
                    </li>
                    <li class='breadcrumb-item active'>Validation</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class='content'>
            <div class='container-fluid'>
              <div class='row'>
                <div class='col-md-12'>
                  <div class='card card-primary'>
                    <div class='card-header'>
                      <h3 class='card-title'>
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
                      <div class='card-body'>
                        <div class='form-group'>
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

                      <div class='card-footer'>
                        <button type='submit' class='btn btn-primary'>
                          Submit
                        </button>
                      </div>
                      <AddSecButtons
              handleSubmit={handleAddWorkType}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
                    </form>
                  </div>
                </div>

                <div class='col-md-6'></div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default AddWorkType;

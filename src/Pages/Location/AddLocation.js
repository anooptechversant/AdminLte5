import React, { useEffect, useState } from "react";
import Text from "../../Components/InputComponents/Text";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getLocationData } from "../../Actions/locationActions";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";

const AddLocation = ({ Data, Success, Error, Loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputLocation, setInputLocation] = useState({ location: "" });
  const [validationError, setValidationError] = useState({ location: "" });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

  const handleLocationChange = (newLocation) => {
    setInputLocation((prevState) => ({
      ...prevState,
      [newLocation.name]: newLocation.value,
    }));

    setValidationError((prevState) => ({
      ...prevState,
      [newLocation.name]: newLocation.value !== "" ? "" : "Required Field",
    }));
  };

  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);

  const handleAddLocation = (type) => {
    if (type === "save") {
      dispatch(getLocationData("insert", inputLocation, 0));
    } else if (type === "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getLocationData("update", inputLocation, id));
        setEditData([{ location: inputLocation.location }]);
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
      setInputLocation(editData[0].location);
      setValidationError({ location: "" });
    }
  }, [editData]);
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const pageTitle = {
    create: "Add Location",
    update: "Update Location",
  };

  const responseMessage = {
    insert: "Location successfully added",
    update: "Location Updated Successfully",
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
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
                      <Link href='/'>Home</Link>
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
                          <label for='exampleInputEmail1'>Location</label>
                          <Text
                            propOnChange={handleLocationChange}
                            propValidationError={validationError.location}
                            propAttributeValue='location'
                            propValue={editData[0] ? editData[0].location : ""}
                            placeholder={""}
                          />{" "}
                        </div>
                      </div>
                      <AddSecButtons
                        handleSubmit={handleAddLocation}
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
        </div>
      )}
    </div>
  );
};

export default AddLocation;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useParams } from "react-router-dom";
import TextArea from "../../Components/InputComponents/TextArea";
import { getBrandData } from "../../Actions/brandActions";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";

const AddBrand = ({ Data, Success, Error, Loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [inputBrand, setInputBrand] = useState({
    name: "",
    description: "",
  });
  const [validationError, setValidationError] = useState({
    name: "",
    description: "",
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

  const handleInputChange = (newValue, setterFunction) => {
    setterFunction((prevState) => ({
      ...prevState,
      [newValue.name]: newValue.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newValue.name]: newValue.value !== "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddBrand = (type) => {
    if (type === "save" || (type === "update" && id !== undefined)) {
      const inputData = {
        name: inputBrand.name,
        description: inputBrand.description,
        is_active: false,
      };
      const inputUpdateData = {
        name: inputBrand.name,
        description: inputBrand.description,
      };
      const argData =
        type === "save" ? inputData : type === "update" ? inputUpdateData : "";
      const argument =
        type === "save" ? "insert" : type === "update" ? "update" : "";
      dispatch(getBrandData(argument, argData, id));
      if (type === "update") {
        setEditData([inputData]);
      }
    } else if (type === "cancel") {
      window.history.back();
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
      const { name, description } = editData[0];
      setInputBrand({ name, description });
      setValidationError((prevState) => ({
        ...prevState,
        name: name === "" ? "Required Field" : "",
        description: description === "" ? "Required Field" : "",
      }));
    }
  }, [editData]);
  const pageTitle = {
    create: "Add Brand",
    update: "Update Brand",
  };
  const successStatusData = Success;
  const errorStatusData = Error;
  const loading = Loading;
  const responseMessage = {
    insert: "Brand successfully added",
    update: "Brand Updated Successfully",
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
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
                            <span className='user-select-auto' onClick={goBack}>
                              <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                              <span className='add-label'> Back</span>
                            </span>
                          </small>
                        </h3>
                      </div>

                      <form id='quickForm'>
                        <div className='card-body'>
                          <div className='form-group'>
                            <label for='exampleInputEmail1'>
                              Name of Brand
                            </label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputBrand)
                              }
                              propValidationError={validationError.name}
                              propAttributeValue='name'
                              propValue={editData[0] ? editData[0].name : ""}
                              placeholder={""}
                            />
                            <label>
                              Description <span className='errorLabel'>*</span>
                            </label>
                            <TextArea
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputBrand)
                              }
                              propValidationError={validationError.description}
                              propAttributeValue='description'
                              propValue={
                                editData[0] ? editData[0].description : ""
                              }
                              placeholder={""}
                            />
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddBrand}
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
        </div>
      )}
    </div>
  );
};

export default AddBrand;

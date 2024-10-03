import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Text from "../../Components/InputComponents/Text";
import { getRolesData } from "../../Actions/rolesActions";

import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import TextArea from "../../Components/InputComponents/TextArea";
import SelectionInput from "../../Components/InputComponents/SelectionInput";

const AddRoles = ({ Data, Success, Error, Loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputRoles, setInputRoles] = useState({
    role: "",
    type: "",
    description: "",
  });
  const [validationError, setValidationError] = useState({
    role: "",
    type: "",
    description: "",
  });

  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const typeArray = [
    { option: "B2B", value: "B2B" },
    { option: "B2C", value: "B2C" },
  ];

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

  const handleAddRoles = (type) => {
    if (type === "save" || (type === "update" && id !== undefined)) {
      const inputData = {
        role: inputRoles.role,
        description: inputRoles.description,
        type: inputRoles.type,
      };
      const argument =
        type === "save" ? "insert" : type === "update" ? "update" : "";
      dispatch(getRolesData(argument, inputData, id));
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
      const { role, description, type } = editData[0];
      setInputRoles({ role, description, type });
      setValidationError((prevState) => ({
        ...prevState,
        role: role !== "" ? "" : "Required Field",
        description: description !== "" ? "" : "Required Field",
        type: type !== "" ? "" : "Required Field",
      }));
    }
  }, [editData]);

  const pageTitle = {
    create: "Add Role",
    update: "Update Role",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Roles successfully added",
    update: "Roles Updated Successfully",
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
                            <label for='exampleInputEmail1'>Name of Role</label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputRoles)
                              }
                              propValidationError={validationError.role}
                              propAttributeValue='role'
                              propValue={editData[0] ? editData[0].role : ""}
                              placeholder={""}
                            />
                            <label>
                              Description <span className='errorLabel'>*</span>
                            </label>
                            <TextArea
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputRoles)
                              }
                              propValidationError={validationError.description}
                              propAttributeValue='description'
                              propValue={
                                editData[0] ? editData[0].description : ""
                              }
                            />
                            <label>
                              Type <span className='errorLabel'>*</span>
                            </label>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputRoles)
                              }
                              propValidationError={validationError.type}
                              propAttributeValue='type'
                              options={typeArray}
                              propValue={editData[0] ? editData[0].type : ""}
                            />{" "}
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddRoles}
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

export default AddRoles;

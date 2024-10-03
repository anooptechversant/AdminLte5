import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import { Link, useParams } from "react-router-dom";
import { getServicesData } from "../../Actions/servicesActions";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import AddSecButtons from "../../Components/Common/AddSecButtons";

const AddServices = ({ Data, Success, Error, Loading, RoleData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputService, setInputService] = useState({
    service_name: "",
    role: "",
  });
  const [validationError, setValidationError] = useState({
    service_name: "",
    role: "",
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const roleArray = RoleData.map((role) => ({
    option: role.role,
    value: role.id,
  }));

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

  const handleAddService = (type) => {
    if (type === "save" || (type === "update" && id !== undefined)) {
      const inputData = {
        service_name: inputService.service_name,
        role: inputService.role,
      };
      const argument =
        type === "save" ? "insert" : type === "update" ? "update" : "";
      dispatch(getServicesData(argument, inputData, id));
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
      const { service_name, role } = editData[0];
      setInputService((prev) => ({ ...prev, service_name, role }));
      setValidationError((prevState) => ({
        ...prevState,
        service_name: service_name !== "" ? "" : "Required Field",
        role: role !== "" ? "" : "Required Field",
      }));
    }
  }, [editData]);

  const pageTitle = {
    create: "Add Service",
    update: "Update Service",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;

  const responseMessage = {
    insert: "Service successfully added",
    update: "Service Updated Successfully",
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
                            <label for='exampleInputEmail1'>Service Name</label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputService)
                              }
                              propValidationError={validationError.service_name}
                              propAttributeValue='service_name'
                              propValue={
                                editData[0] ? editData[0].service_name : ""
                              }
                              placeholder={""}
                            />{" "}
                            <label>Role</label>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputService)
                              }
                              propValidationError={validationError.role}
                              propAttributeValue='role'
                              options={roleArray}
                              propValue={editData[0] ? editData[0].role : ""}
                            />{" "}
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddService}
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

export default AddServices;

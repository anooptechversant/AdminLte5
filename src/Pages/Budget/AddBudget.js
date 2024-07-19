import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBudgetData } from "../../Actions/budgetActions";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import Text from "../../Components/InputComponents/Text";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import AddSecButtons from "../../Components/Common/AddSecButtons";
const AddBudget = ({
  Data,
  Success,
  Error,
  Loading,
  UnitData,
  ServicesData,
}) => {
  const { user_id, budget_id } = useParams();
  const dispatch = useDispatch();
  const [inputBudget, setInputBudget] = useState({
    service_id: "",
    unit: "",
    price: "",
  });
  const [validationError, setValidationError] = useState({
    service_id: "",
    unit: "",
    price: "",
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const UnitArray = UnitData.map((unit) => ({
    option: unit.unit,
    value: unit.unit,
  }));
  const ServiceArray = ServicesData.map((service) => ({
    option: service.service_name,
    value: service.id,
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
  const handleAddBudget = (type) => {
    if (type === "save" || (type === "update" && budget_id !== undefined)) {
      const inputData = {
        service_id: inputBudget.service_id,
        unit: inputBudget.unit,
        price: inputBudget.price,
      };

      if (type === "save") {
        dispatch(getBudgetData("insert", inputData, user_id));
      } else if (type === "update") {
        dispatch(getBudgetData("update", inputData, user_id, budget_id));
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
    const filteredData = Data.filter((obj) => obj.id == budget_id);
    setEditData(filteredData);
  }, [Data, budget_id]);
  useEffect(() => {
    if (editData.length > 0) {
      const { service_id, unit, price } = editData[0];
      setInputBudget((prev) => ({ ...prev, service_id, unit, price }));
      setValidationError((prevState) => ({
        ...prevState,
        service_id: service_id !== "" ? "" : "Required Field",
        unit: unit !== "" ? "" : "Required Field",
        price: price !== "" ? "" : "Required Field",
      }));
    }
  }, [editData]);
  const pageTitle = {
    create: "Add Budget",
    update: "Update Budget",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;

  const responseMessage = {
    insert: "Budget successfully added",
    update: "Budget Updated Successfully",
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
              propActionType={budget_id !== undefined ? "update" : "insert"}
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
                            <label for='exampleInputEmail1'>Service</label>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputBudget)
                              }
                              propValidationError={validationError.service_id}
                              propAttributeValue='service_id'
                              options={ServiceArray}
                              propValue={
                                editData[0] ? editData[0].service_id : ""
                              }
                            />
                            <label>
                              Price <span className='errorLabel'>*</span>
                            </label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputBudget)
                              }
                              propValidationError={validationError.price}
                              propAttributeValue='price'
                              propValue={editData[0] ? editData[0].price : ""}
                            />
                            <label>
                              Unit <span className='errorLabel'>*</span>
                            </label>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputBudget)
                              }
                              propValidationError={validationError.service_id}
                              propAttributeValue='service_id'
                              options={ServiceArray}
                              propValue={
                                editData[0] ? editData[0].service_id : ""
                              }
                            />{" "}
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddBudget}
                          propAllErrorEmpty={areAllErrorsEmpty}
                          propValue={budget_id}
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

export default AddBudget;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useParams } from "react-router-dom";
import TextArea from "../../Components/InputComponents/TextArea";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getOrderData } from "../../Actions/orderActions";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css";
const UpdateTrackOrder = ({ Data, Success, Error, Loading }) => {
  const { id, order_details_id, track_id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = Data[0]?.order_details;
  const [inputOrder, setInputOrder] = useState({
    status: "",
    description: "",
    delivery_date: new Date(),
  });
  const [validationError, setValidationError] = useState({
    status: "",
    description: "",
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const [initialDeliveryDate, setInitialDeliveryDate] = useState("");
  useEffect(() => {
    if (editData?.length > 0 && editData[0]?.order_track?.length > 0) {
      const initialDate =
        editData[0]?.order_track[0]?.delivery_date || new Date();
      setInitialDeliveryDate(initialDate);
    }
  }, [editData]);

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
  const handleAddOrder = (type) => {
    if (
      type === "save" ||
      (type === "update" && order_details_id !== undefined)
    ) {
      const inputData = {
        status: inputOrder.status,
        description: inputOrder.description,
        delivery_date: inputOrder.delivery_date,
      };

      dispatch(getOrderData("update", inputData, order_details_id, track_id));
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
    if (orderDetails?.length > 0) {
      const filteredData = orderDetails?.filter(
        (obj) => obj.id == order_details_id
      );
      setEditData(filteredData);
    }
  }, [orderDetails, order_details_id]);
  const statusArray = [
    { option: "PENDING", value: "PENDING" },
    { option: "PLACED", value: "PLACED" },
    { option: "CONFIRMED", value: "CONFIRMED" },
    { option: "SHIPPED", value: "SHIPPED" },
    { option: "DELIVERED", value: "DELIVERED" },
    { option: "CANCELLED", value: "CANCELLED" },
    { option: "REFUNDED", value: "REFUNDED" },
    { option: "RETURNED", value: "RETURNED" },
  ];
  useEffect(() => {
    if (editData?.length > 0 && editData[0]?.order_track?.length > 0) {
      const { status, description, delivery_date } = editData[0].order_track[0];
      setInputOrder({ status, description, delivery_date });
      setValidationError((prevState) => ({
        ...prevState,
        status: status === "" ? "Required Field" : "",
        description: description === "" ? "Required Field" : "",
      }));
    }
  }, [editData]);
  const pageTitle = {
    update: "Update Order track",
  };
  const successStatusData = Success;
  const errorStatusData = Error;
  const loading = Loading;
  const responseMessage = {
    insert: "Order successfully added",
    update: "Order Updated Successfully",
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
                          <div className='row'>
                            <div className='col-md-6'>
                              <label className='d-flex mr-2'>
                                Order Status{" "}
                                <span className='errorLabel'>*</span>
                              </label>
                              <div className='w-100'>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputOrder)
                                  }
                                  propValidationError={validationError.status}
                                  propAttributeValue='status'
                                  options={statusArray}
                                  propValue={inputOrder.status || ""}
                                />
                              </div>
                              <label>
                                Description{" "}
                                <span className='errorLabel'>*</span>
                              </label>
                              <TextArea
                                propOnChange={(newValue) =>
                                  handleInputChange(newValue, setInputOrder)
                                }
                                propValidationError={
                                  validationError.description
                                }
                                propAttributeValue='description'
                                propValue={inputOrder.description || ""}
                              />
                            </div>
                            <div className='col-md-6'>
                              <div>
                                <label>
                                  Delivery Date{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                              </div>
                              <DatePicker
                                selected={initialDeliveryDate}
                                onChange={(date) => {
                                  setInputOrder((prevState) => ({
                                    ...prevState,
                                    delivery_date: date,
                                  }));
                                  setInitialDeliveryDate(date);
                                }}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <AddSecButtons
                        handleSubmit={handleAddOrder}
                        propAllErrorEmpty={areAllErrorsEmpty}
                        propValue={order_details_id}
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

export default UpdateTrackOrder;

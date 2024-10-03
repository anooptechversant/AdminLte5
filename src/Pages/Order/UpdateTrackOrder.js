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

  const [inputOrder, setInputOrder] = useState({
    status: "",
    description: "",
    delivery_date: new Date(),
  });

  const [validationError, setValidationError] = useState({
    status: "",
    description: "",
  });

  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(false);
  const [orderTrack, setOrderTrack] = useState(null);

  // Parse IDs to integers for type-safe comparisons
  const parsedOrderDetailsId = parseInt(order_details_id, 10);
  const parsedTrackId = parseInt(track_id, 10);

  // Extract order_details from Data
  const orderDetails = Data && Data.length > 0 ? Data[0].order_details : [];

  // Extract the specific order_track based on order_details_id and track_id
  useEffect(() => {
    if (orderDetails.length > 0 && parsedOrderDetailsId && parsedTrackId) {
      const selectedOrderDetail = orderDetails.find(
        (detail) => detail.id === parsedOrderDetailsId
      );

      if (selectedOrderDetail && selectedOrderDetail.order_track.length > 0) {
        const selectedOrderTrack = selectedOrderDetail.order_track.find(
          (track) => track.id === parsedTrackId
        );

        if (selectedOrderTrack) {
          setOrderTrack(selectedOrderTrack);
          setInputOrder({
            status: selectedOrderTrack.status || "",
            description: selectedOrderTrack.description || "",
            delivery_date: selectedOrderTrack.delivery_date
              ? new Date(selectedOrderTrack.delivery_date)
              : new Date(),
          });

          setValidationError({
            status: selectedOrderTrack.status === "" ? "Required Field" : "",
            description:
              selectedOrderTrack.description === "" ? "Required Field" : "",
          });
        }
      }
    }
  }, [Data, orderDetails, parsedOrderDetailsId, parsedTrackId]);

  // Handle input changes for status and description
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

  // Update error state to determine if all fields are valid
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => value === "")
    );
  }, [validationError]);

  // Handle form submission
  const handleAddOrder = (type) => {
    if (
      (type === "save" || type === "update") &&
      parsedOrderDetailsId &&
      parsedTrackId
    ) {
      const inputData = {
        status: inputOrder.status,
        description: inputOrder.description,
        delivery_date: inputOrder.delivery_date.toISOString(), // Ensure ISO string format
      };

      dispatch(
        getOrderData("update", inputData, parsedOrderDetailsId, parsedTrackId)
      );

      // Optionally, you can reset form fields or show a success message here
    } else if (type === "cancel") {
      window.history.back();
    }
  };

  const goBack = () => {
    window.history.back();
  };

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

  const pageTitle = {
    update: "Update Order Track",
    create: "Create Order Track",
  };

  const successStatusData = Success;
  const errorStatusData = Error;
  const loading = Loading;

  const responseMessage = {
    insert: "Order successfully added",
    update: "Order Updated Successfully",
  };

  if (loading || !orderTrack) {
    return <Spinner />;
  }

  // if (!orderTrack) {
  //   return (
  //     <div className='container-fluid'>
  //       <Toasts
  //         propResponseMessage={{
  //           insert: "Order successfully added",
  //           update: "Order Updated Successfully",
  //         }}
  //         propActionType={id !== undefined ? "update" : "insert"}
  //         propStatusData={{ successStatusData, errorStatusData }}
  //       />
  //       <section className='content-header'>
  //         <div className='container-fluid'>
  //           <div className='row mb-2'>
  //             <div className='col-sm-6'>
  //               <h1>{pageTitle.update}</h1>
  //             </div>
  //             <div className='col-sm-6'>
  //               <ol className='breadcrumb float-sm-right'>
  //                 <li className='breadcrumb-item'>
  //                   <Link to='/'>Home</Link>
  //                 </li>
  //                 <li className='breadcrumb-item active'>{pageTitle.update}</li>
  //               </ol>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       <section className='content'>
  //         <div className='container-fluid'>
  //           <div className='row'>
  //             <div className='col-md-12'>
  //               <div className='card card-primary'>
  //                 <div className='card-header'>
  //                   <h3 className='card-title'>
  //                     <small>
  //                       <span className='' onClick={goBack}>
  //                         <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
  //                         <span className='add-label'> Back</span>
  //                       </span>
  //                     </small>
  //                   </h3>
  //                 </div>
  //                 <div className='card-body'>
  //                   <p>Loading order details...</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  return (
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
              <h1>{pageTitle.update}</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>{pageTitle.update}</li>
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
                            Order Status <span className='errorLabel'>*</span>
                          </label>
                          <div className='w-100'>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputOrder)
                              }
                              propValidationError={validationError.status}
                              propAttributeValue='status'
                              options={statusArray}
                              propValue={inputOrder.status}
                            />
                          </div>
                          <label>
                            Description <span className='errorLabel'>*</span>
                          </label>
                          <TextArea
                            propOnChange={(newValue) =>
                              handleInputChange(newValue, setInputOrder)
                            }
                            propValidationError={validationError.description}
                            propAttributeValue='description'
                            propValue={inputOrder.description}
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
                            selected={inputOrder.delivery_date}
                            onChange={(date) => {
                              setInputOrder((prevState) => ({
                                ...prevState,
                                delivery_date: date,
                              }));
                              // Clear validation error if date is selected
                              setValidationError((prevState) => ({
                                ...prevState,
                                delivery_date:
                                  date !== null ? "" : "Required Field",
                              }));
                            }}
                            className='form-control'
                            dateFormat='yyyy-MM-dd'
                            placeholderText='Select a date'
                          />
                          {validationError.delivery_date && (
                            <span className='errorLabel'>
                              {validationError.delivery_date}
                            </span>
                          )}
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
  );
};

export default UpdateTrackOrder;

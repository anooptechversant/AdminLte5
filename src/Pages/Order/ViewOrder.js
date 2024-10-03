import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getOrderData } from "../../Actions/orderActions";
import "./View.css";

const ViewOrder = ({ viewData, Success, Error, Loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Destructure the first order from viewData for easier access
  const order = viewData && viewData.length > 0 ? viewData[0] : null;

  const successStatusData = Success;
  const errorStatusData = Error;

  const responseMessage = {
    success: "Data deleted successfully",
  };

  // Calculate subtotal using useMemo for performance optimization
  const subtotal = useMemo(() => {
    return (
      order?.order_details.reduce((acc, item) => {
        return acc + item.quantity * item.product_price;
      }, 0) || 0
    );
  }, [order]);

  const shippingCost = 0.0;
  const tax = 0.0;
  const total = subtotal + shippingCost + tax;

  // Handlers
  const handleUpdateOrder = (orderDetailsId, orderTrackId) => {
    navigate(
      `/orders/update-order/${orderDetailsId}/${orderTrackId}/${order.id}`
    );
  };

  const handleDelete = (trackId) => {
    dispatch(getOrderData("delete", trackId));
  };

  const goBack = () => {
    navigate(-1); // More React-friendly way to navigate back
  };

  // Define status options (if needed elsewhere)
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

  if (Loading || !order) {
    return <Spinner />;
  }

  // if (!order) {
  //   return (
  //     <div className='container-fluid'>
  //       <Toasts
  //         propResponseMessage={responseMessage}
  //         propActionType='success'
  //         propStatusData={{ successStatusData, errorStatusData }}
  //       />
  //       <section className='content-header'>
  //         <div className='container-fluid'>
  //           <div className='row mb-2'>
  //             <div className='col-sm-6'>
  //               <h1>Order Details</h1>
  //             </div>
  //             <div className='col-sm-6'>
  //               <ol className='breadcrumb float-sm-right'>
  //                 <li className='breadcrumb-item'>
  //                   <Link to='/'>Home</Link>
  //                 </li>
  //                 <li className='breadcrumb-item active'>Order Details</li>
  //               </ol>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       <section className='content'>
  //         <div className='container-fluid'>
  //           <div className='alert alert-info'>No order data available.</div>
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  // Destructure user and address for easier access
  const {
    user,
    address,
    order_details,
    payment_type,
    created_at,
    updated_at,
    id,
  } = order;

  return (
    <div className='container-fluid'>
      <Toasts
        propResponseMessage={responseMessage}
        propActionType='success'
        propStatusData={{ successStatusData, errorStatusData }}
      />
      <section className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1>Order</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>Order</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='invoice p-3 mb-3'>
                {/* Header */}
                <div className='row'>
                  <div className='col-12'>
                    <h4>
                      <small>
                        <span onClick={goBack} className='back-button'>
                          <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                          <span className='add-label'> Back</span>
                        </span>
                      </small>
                      {` Order ID : ${id}`}
                      <small className='float-right'>
                        {` Date: ${new Date(created_at).toLocaleString()}`}
                      </small>
                    </h4>
                  </div>
                </div>

                {/* Invoice Info */}
                <div className='row invoice-info'>
                  {/* User Info */}
                  <div className='col-sm-4 invoice-col'>
                    <h5>User Info</h5>
                    {user ? (
                      <address>
                        <strong>{user.name || "N/A"}</strong>
                        <br />
                        Longitude: {user.longitude || "N/A"}
                        <br />
                        Latitude: {user.latitude || "N/A"}
                        <br />
                        Phone:{" "}
                        {user.phone
                          ? `${user.phone_prefix}-${user.phone}`
                          : "N/A"}
                        <br />
                        Email: {user.email || "N/A"}
                      </address>
                    ) : (
                      <div className='alert alert-warning'>
                        No User Details Available.
                      </div>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className='col-sm-4 invoice-col'>
                    <h5>Delivery Address</h5>
                    {address ? (
                      <address>
                        <strong>{address.full_name || "N/A"}</strong>
                        <br />
                        {address.address_line1
                          ? `${address.address_line1}, ${
                              address.address_line2 || ""
                            }`
                          : "N/A"}
                        <br />
                        {address.city
                          ? `${address.city}, ${address.district || "N/A"}, ${
                              address.pin_code || "N/A"
                            }`
                          : "N/A"}
                        <br />
                        Phone: {address.contact_number || "N/A"}
                        <br />
                        Landmark: {address.landmark || "N/A"}
                      </address>
                    ) : (
                      <div className='alert alert-warning'>
                        No Address Details Available.
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className='col-sm-4 invoice-col'>
                    <h5>Order Summary</h5>
                    <p>
                      <strong>User Type:</strong> {address?.user_type || "N/A"}
                      <br />
                      <strong>Order Count:</strong> {order_details.length}
                      <br />
                      <strong>Payment Type:</strong> {payment_type || "N/A"}
                      <br />
                      <strong>Updated Time:</strong>{" "}
                      {new Date(updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Order Details Table */}
                <div className='row'>
                  <div className='col-12 table-responsive'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Status</th>
                          <th>Description</th>
                          <th className='text-nowrap'>Delivery Date</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order_details.map((item) => {
                          const track = item.order_track[0];
                          return (
                            <tr key={`${item.id}-${track.id}`}>
                              <td className='text-nowrap'>
                                {item.product_name.length > 50
                                  ? `${item.product_name.substring(0, 50)}...`
                                  : item.product_name}
                              </td>
                              <td className='text-nowrap'>
                                {track.status || "N/A"}
                              </td>
                              <td className='text-nowrap'>
                                {track.description || "N/A"}
                              </td>
                              <td className='text-nowrap'>
                                {track.delivery_date
                                  ? new Date(
                                      track.delivery_date
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className='text-nowrap'>
                                ₹ {item.product_price.toFixed(2)} /-
                              </td>
                              <td className='text-nowrap'>{item.quantity}</td>
                              <td className='text-nowrap'>
                                ₹{" "}
                                {(item.product_price * item.quantity).toFixed(
                                  2
                                )}{" "}
                                /-
                              </td>
                              <td>
                                <div className='d-flex justify-content-around align-items-center'>
                                  <span
                                    onClick={() =>
                                      handleUpdateOrder(item.id, track.id)
                                    }
                                    className='mx-2 align-item-center justify-content-center action-icon'
                                  >
                                    <i className='fas fa-edit edit-icon text-primary'></i>
                                  </span>
                                  <span
                                    className='delete action-icon'
                                    onClick={() => handleDelete(track.id)}
                                  >
                                    <i className='fas fa-trash text-danger'></i>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Methods and Details */}
                <div className='row'>
                  {/* Payment Methods */}
                  <div class='col-6'>
                    <p class='lead '>Payment Methods:</p>
                    <img src='../../dist/img/credit/visa.png' alt='Visa' />
                    <img
                      src='../../dist/img/credit/mastercard.png'
                      alt='Mastercard'
                    />
                    <img
                      src='../../dist/img/credit/american-express.png'
                      alt='American Express'
                    />
                    <img src='../../dist/img/credit/paypal2.png' alt='Paypal' />

                    {/* <p class='text-muted well well-sm shadow-none mt-3'>
                              Etsy doostang zoodles disqus groupon greplin oooj
                              voxy zoodles, weebly ning heekya handango imeem
                              plugg dopplr jibjab, movity jajah plickers sifteo
                              edmodo ifttt zimbra.
                            </p> */}
                  </div>

                  {/* Payment Details */}
                  <div className='col-6'>
                    <p className='lead'>Payment Details</p>
                    <div className='table-responsive'>
                      <table className='table'>
                        <tbody>
                          <tr>
                            <th style={{ width: "50%" }}>Subtotal:</th>
                            <td className='text-nowrap'>
                              ₹ {subtotal.toFixed(2)} /-
                            </td>
                          </tr>
                          <tr>
                            <th>Tax (0%)</th>
                            <td className='text-nowrap'>₹ {tax.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping:</th>
                            <td className='text-nowrap'>
                              ₹ {shippingCost.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <th>Total:</th>
                            <td className='text-nowrap'>
                              ₹ {total.toFixed(2)} /-
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Optional: Print and PDF Generation Buttons */}
                {/* <div className="row no-print">
                  <div className="col-12">
                    <a
                      href="invoice-print.html"
                      rel="noopener"
                      target="_blank"
                      className="btn btn-default"
                    >
                      <i className="fas fa-print"></i> Print
                    </a>
                    <button type="button" className="btn btn-success float-right">
                      <i className="far fa-credit-card"></i> Submit Payment
                    </button>
                    <button type="button" className="btn btn-primary float-right mr-3">
                      <i className="fas fa-download"></i> Generate PDF
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewOrder;

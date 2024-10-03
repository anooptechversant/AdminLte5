import React, { useMemo } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import "./View.css";
import { Link, useNavigate } from "react-router-dom";
import { getOrderData } from "../../Actions/orderActions";
import { useDispatch } from "react-redux";
const ViewOrder = ({ viewData, Success, Error, Loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successStatusData = Success;
  const errorStatusData = Error;
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const goBack = () => {
    window.history.back();
  };
  const subtotal = useMemo(() => {
    return viewData[0]?.order_details.reduce((acc, item) => {
      return acc + item.quantity * item.product_price;
    }, 0);
  }, [viewData]);

  const shippingCost = 0.0;
  const tax = 0.0;

  const total = subtotal + shippingCost + tax;

  const handleUpdateOrder = (order_details_id, order_track_id) => {
    navigate(
      `/orders/update-order/${order_details_id}/${order_track_id}/${viewData[0]?.id}`
    );
  };
  const handleDelete = (id) => {
    dispatch(getOrderData("delete", id));
  };
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <div>
            <Toasts
              propResponseMessage={responseMessage}
              propActionType={"success"}
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
            <section class='content'>
              <div class='container-fluid'>
                <div class='row'>
                  <div class='col-12'>
                    {/* <div class='callout callout-info'>
                      <h5>
                        <i class='fas fa-info'></i> Note:
                      </h5>
                      This page has been enhanced for printing. Click the print
                      button at the bottom of the invoice to test.
                    </div> */}

                    <div class='invoice p-3 mb-3'>
                      <div class='row'>
                        <div class='col-12'>
                          <h4>
                            <small>
                              {" "}
                              <span onClick={goBack}>
                                <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                                <span className='add-label'> Back</span>
                              </span>
                            </small>
                            {` Order ID : ${viewData[0]?.id}`}
                            <small class='float-right'>
                              {` Date: ${new Date(
                                viewData[0]?.created_at
                              ).toLocaleString()}`}
                            </small>
                          </h4>
                        </div>
                      </div>

                      <div class='row invoice-info'>
                        <div class='col-sm-4 invoice-col'>
                          User Info
                          {viewData[0]?.user !== null ? (
                            <address>
                              <strong>
                                {viewData[0]?.user?.name || "NILL"}
                              </strong>
                              <br />
                              Longitude: {viewData[0]?.user?.longitude}
                              <br />
                              Latitude: {viewData[0]?.user?.latitude}
                              <br />
                              {`Phone: ${
                                viewData[0]?.user?.phone
                                  ? viewData[0]?.user?.phone_prefix +
                                    "-" +
                                    viewData[0]?.user?.phone
                                  : "NILL"
                              }`}
                              <br />
                              Email: {viewData[0]?.user?.email || "NILL"}
                            </address>
                          ) : (
                            <div>
                              <strong>NO User Details </strong>
                            </div>
                          )}
                        </div>

                        <div class='col-sm-4 invoice-col'>
                          Delivery Address
                          <address>
                            <strong>{viewData[0]?.address?.full_name}</strong>
                            <br />
                            {`${viewData[0]?.address?.address_line1}, ${viewData[0]?.address?.address_line2} `}
                            <br />
                            {`${viewData[0]?.address?.city}, ${viewData[0]?.address?.district}, ${viewData[0]?.address?.pin_code}`}
                            <br />
                            Phone: {viewData[0]?.address.contact_number}
                            <br />
                            Landmark: {viewData[0]?.address.landmark || "NILL"}
                          </address>
                        </div>

                        <div class='col-sm-4 invoice-col'>
                          <b>
                            User Type:{" "}
                            {viewData[0]?.address.user_type || "NILL"}
                          </b>
                          <br />
                          <br />
                          <b>Order Count:</b>{" "}
                          {viewData[0]?.order_details?.length}
                          <br />
                          <b>Payment Type:</b>{" "}
                          {viewData[0]?.payment_type || "NILL"}
                          <br />
                          <b>Updated Time:</b>{" "}
                          {new Date(viewData[0]?.updated_at).toLocaleString()}
                        </div>
                      </div>

                      <div class='row'>
                        <div class='col-12 table-responsive'>
                          <table class='table table-striped'>
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Delivery Date</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {viewData[0]?.order_details.map((item, index) => (
                                <tr key={item.product_name + index}>
                                  <td className='text-nowrap'>
                                    {item.product_name.length > 50
                                      ? item.product_name.substring(0, 50) +
                                        "..."
                                      : item.product_name}
                                  </td>
                                  <td className='text-nowrap'>
                                    {item.order_track[0].status}
                                  </td>
                                  <td className='text-nowrap'>
                                    {item.order_track[0].description}
                                  </td>
                                  <td className='text-nowrap'>
                                    {new Date(
                                      item.order_track[0].delivery_date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className='text-nowrap'>
                                    ₹ {item.product_price} /-
                                  </td>
                                  <td className='text-nowrap'>
                                    {item.quantity}
                                  </td>
                                  <td className='text-nowrap'>
                                    ₹ {item.product_price * item.quantity} /-
                                  </td>
                                  <td>
                                    {" "}
                                    <div className='d-flex justify-content-around align-items-center'>
                                      <span
                                        onClick={() => {
                                          handleUpdateOrder(
                                            item.order_track[0]
                                              .order_details_id,
                                            item.order_track[0].id
                                          );
                                        }}
                                        className='mx-2 align-item-center justify-content-center'
                                      >
                                        <i className='fas fa-edit edit-icon text-primary'></i>
                                      </span>
                                      <span
                                        className='delete'
                                        onClick={() =>
                                          handleDelete(item.order_track[0].id)
                                        }
                                      >
                                        <i className='fas fa-trash text-danger'></i>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {/* <tr>
                                <td>1</td>
                                <td>Need for Speed IV</td>
                                <td>247-925-726</td>
                                <td>Wes Anderson umami biodiesel</td>
                                <td>$50.00</td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class='row'>
                        <div class='col-6'>
                          <p class='lead '>Payment Methods:</p>
                          <img
                            src='../../dist/img/credit/visa.png'
                            alt='Visa'
                          />
                          <img
                            src='../../dist/img/credit/mastercard.png'
                            alt='Mastercard'
                          />
                          <img
                            src='../../dist/img/credit/american-express.png'
                            alt='American Express'
                          />
                          <img
                            src='../../dist/img/credit/paypal2.png'
                            alt='Paypal'
                          />

                          {/* <p class='text-muted well well-sm shadow-none mt-3'>
                              Etsy doostang zoodles disqus groupon greplin oooj
                              voxy zoodles, weebly ning heekya handango imeem
                              plugg dopplr jibjab, movity jajah plickers sifteo
                              edmodo ifttt zimbra.
                            </p> */}
                        </div>

                        <div class='col-6'>
                          <p class='lead'>Payment Details</p>

                          <div class='table-responsive'>
                            <table class='table'>
                              <tr>
                                <th className='w-[50%]'>Subtotal:</th>
                                <td className='text-nowrap'>
                                  ₹ {subtotal || 0} /-
                                </td>
                              </tr>
                              <tr>
                                <th>Tax (0%)</th>
                                <td className='text-nowrap'>₹ {tax}</td>
                              </tr>
                              <tr>
                                <th>Shipping:</th>
                                <td className='text-nowrap'>
                                  ₹ {shippingCost}
                                </td>
                              </tr>
                              <tr>
                                <th>Total:</th>
                                <td className='text-nowrap'>
                                  ₹ {total || 0} /-
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* <div class='row no-print'>
                        <div class='col-12'>
                          <a
                            href='invoice-print.html'
                            rel='noopener'
                            target='_blank'
                            class='btn btn-default'
                          >
                            <i class='fas fa-print'></i> Print
                          </a>
                          <button
                            type='button'
                            class='btn btn-success float-right'
                          >
                            <i class='far fa-credit-card'></i> Submit Payment
                          </button>
                          <button
                            type='button'
                            class='btn btn-primary float-right mr-3'
                          >
                            <i class='fas fa-download'></i> Generate PDF
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrder;

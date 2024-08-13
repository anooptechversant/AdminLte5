import React from "react";
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
      {Loading && viewData.length > 0 ? (
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
                        <Link href='/'>Home</Link>
                      </li>
                      <li className='breadcrumb-item active'>Order</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
            <section className='content'>
              <div className='container-fluid'>
                {viewData ? (
                  <>
                    <Card className='text-center'>
                      <Toasts
                        propResponseMessage={responseMessage}
                        propActionType={"success"}
                        propStatusData={{ successStatusData, errorStatusData }}
                      />

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
                      </div>
                      <Card.Body className='bg-gray-100'>
                        <Card.Text>
                          <section id='content' className='container'>
                            <div className='page-heading'>
                              <div className='media row d-flex justify-content-center'>
                                {/* <div className='col-md-6 mt-5 media-left pr30'>
                            <img
                              className='media-object  img-fluid'
                              src={
                                Data.profile !== null
                                  ? Data.profile.image
                                  : profileImage
                              }
                              alt='...'
                              width={250}
                              height={250}
                            />
                          </div> */}
                                <div className='col-md-6 media-body mt-5'>
                                  <h1 className='media-heading'>
                                    <small> Order No - </small>

                                    {viewData[0]?.id}
                                  </h1>
                                  <p className='lead'>
                                    <>
                                      <h4 className='media-heading d-flex justify-content-between'>
                                        {" "}
                                        <span> Payment Type :</span>
                                        <strong>
                                          {" "}
                                          {viewData[0]?.payment_type !== null
                                            ? viewData[0]?.payment_type
                                            : "NILL"}
                                        </strong>
                                      </h4>
                                      {/* <h5 className='media-heading d-flex justify-content-between'>
                                  {" "}
                                  <span> Education :</span>
                                  <strong>
                                    {" "}
                                    {Data.profile !== null
                                      ? Data.profile.education
                                      : "NILL"}
                                  </strong>
                                </h5>
                                <h5 className='media-heading d-flex justify-content-between'>
                                  {" "}
                                  <span> Year Of experience :</span>
                                  <strong>
                                    {" "}
                                    {Data.profile !== null
                                      ? Data.profile.year_of_exp
                                      : "NILL"}{" "}
                                  </strong>
                                </h5> */}
                                    </>
                                  </p>
                                  <div className='media-links'>
                                    <ul className='list-inline list-unstyled '>
                                      {/* <li className=' d-flex justify-content-between'>
                                  <a href='#' title='phone link'>
                                    <span className='fa fa-phone-square fs35 text-system'></span>
                                  </a>
                                  <span className='ml-3'>
                                    {Data.phone_prefix + "-" + Data.phone}
                                  </span>
                                </li>
                                <li className=' d-flex justify-content-between'>
                                  <a href='#' title='email link'>
                                    <span className='fa fa-envelope-square fs35 text-muted'></span>
                                  </a>
                                  <span className='ml-3'>
                                    {Data.email || "NILL"}
                                  </span>
                                </li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <h2 className='mt-5'>Products</h2>
                              {viewData[0]?.order_details.map((item, index) => (
                                <div
                                  key={item.product_name + index}
                                  className='row justify-content-center '
                                >
                                  <div className='col-md-12'>
                                    <div className='card card-widget widget-user-2'>
                                      <div className='d-flex widget-user-header card-comments justify-content-between'>
                                        <div className='d-flex '>
                                          <span className='panel-icon'>
                                            <i className='fa fa-star'></i>
                                          </span>
                                          <strong className='panel-title text-primary'>
                                            {" "}
                                            {item.product_name.length > 70
                                              ? item.product_name.substring(
                                                  0,
                                                  70
                                                ) + "..."
                                              : item.product_name}
                                          </strong>
                                          <div>
                                            <strong className='panel-title ml-2'>
                                              - ₹ {item.product_price}
                                              <span className='text-danger'>
                                                {" "}
                                                (QNTY : {item.quantity})
                                              </span>
                                            </strong>
                                          </div>
                                        </div>
                                        <div className='d-flex justify-content-around align-items-center'>
                                          <span
                                            onClick={() => {
                                              handleUpdateOrder(
                                                item.order_track[0]
                                                  .order_details_id,
                                                item.order_track[0].id
                                              );
                                            }}
                                            className='mt-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                          >
                                            <i className='fas fa-edit edit-icon text-light'></i>
                                          </span>
                                          <span
                                            className='mt-2 btn btn-danger btn-circle btn-sm delete'
                                            onClick={() =>
                                              handleDelete(
                                                item.order_track[0].id
                                              )
                                            }
                                          >
                                            <i className='fas fa-trash'></i>
                                          </span>
                                        </div>
                                      </div>
                                      <div>
                                        <h4>Order Track Details</h4>
                                        <table className='table mbn tc-icon-1 tc-med-2 tc-bold-last'>
                                          {/* <thead>
                                      <tr className='hidden'>
                                        <th></th>
                                        <th>Action</th>
                                      </tr>
                                    </thead> */}
                                          <tbody>
                                            <tr>
                                              <td>
                                                <strong>Order Status</strong>
                                              </td>
                                              <td className='text-primary'>
                                                <h5>
                                                  <strong>
                                                    {item.order_track[0].status}
                                                  </strong>
                                                </h5>
                                              </td>
                                              <td>
                                                {/* <span
                                            className='btn btn-outline-primary rounded btn-sm'
                                            onClick={() => {
                                              handleProjectAdd();
                                            }}
                                          >
                                            <i className='fas fa-add add-icon'></i>
                                          </span> */}

                                                {/* <span
                                            onClick={() => {
                                              handleProjectView();
                                            }}
                                            className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                          >
                                            <i className='fas fa-eye eye-icon '></i>
                                          </span> */}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                {" "}
                                                <strong>Description</strong>
                                              </td>{" "}
                                              <td>
                                                {" "}
                                                <>
                                                  {" "}
                                                  {
                                                    item.order_track[0]
                                                      .description
                                                  }
                                                </>
                                              </td>
                                              <td>
                                                {/* <span
                                            className='btn btn-outline-primary rounded btn-sm'
                                            onClick={() => {
                                              handleBudgetAdd();
                                            }}
                                          >
                                            <i className='fas fa-add add-icon'></i>
                                          </span>
                                          <span
                                            onClick={() => {
                                              handleBudgetView();
                                            }}
                                            className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                          >
                                            <i className='fas fa-eye eye-icon '></i>
                                          </span> */}
                                              </td>
                                            </tr>{" "}
                                            <tr>
                                              <td>
                                                {" "}
                                                <strong>Delivery Date</strong>
                                              </td>{" "}
                                              <td>
                                                {" "}
                                                <>
                                                  {" "}
                                                  {/* {item.order_track[0].delivery_date} */}
                                                  {new Date(
                                                    item.order_track[0].delivery_date
                                                  ).toLocaleString()}
                                                </>
                                              </td>
                                              <td>
                                                {/* <span
                                            className='btn btn-outline-primary rounded btn-sm'
                                            onClick={() => {
                                              handleBudgetAdd();
                                            }}
                                          >
                                            <i className='fas fa-add add-icon'></i>
                                          </span>
                                          <span
                                            onClick={() => {
                                              handleBudgetView();
                                            }}
                                            className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                          >
                                            <i className='fas fa-eye eye-icon '></i>
                                          </span> */}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          </section>
                        </Card.Text>
                        <span className='d-flex justify-content-evenly '>
                          {/* <Button variant='primary'>
                      <i className='fas fa-edit edit-icon text-light'></i>
                      Edit
                    </Button> */}
                          {/* <Button
                    variant={viewData.product.is_active ? "danger" : "success"}
                    onClick={
                      viewData.product.is_active
                        ? handleProductDeactivate
                        : handleProductActivate
                    }
                  >
                    {viewData.product.is_active ? "Deactivate" : "Activate"}
                  </Button> */}
                        </span>
                      </Card.Body>
                      <Card.Footer className='text-muted'>
                        {/* Updated At: {viewData.product.updated_at}{" "} */}
                      </Card.Footer>
                    </Card>
                  </>
                ) : (
                  <div className=''>No Data Available</div>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrder;

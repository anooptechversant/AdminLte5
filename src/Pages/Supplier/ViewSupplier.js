import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSupplierData } from "../../Actions/supplierActions";

const ViewSupplier = ({ viewData, Success, Error, Loading, isActiveData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [resMsg, setResMsg] = useState(true);

  const successStatusData = Success || isActiveData;
  const errorStatusData = Error;
  const responseMessage = {
    success:
      resMsg === true
        ? "Supplier activated successfully"
        : "Supplier deactivated successfully",
  };

  const address_id = viewData?.address[0].id;
  const ref_id = viewData?.address[0].ref_id;
  const user_type = viewData?.address[0].user_type;

  const handleEdit = () => {
    navigate(`/supplier/edit-supplier/${id}`);
  };

  const handleEditAddress = () => {
    navigate(
      `/supplier/edit-supplier-address/${ref_id}/address/${address_id}/${user_type}`
    );
  };

  const supplierActivate = () => {
    const data = { is_active: true };
    setResMsg(true);
    dispatch(getSupplierData("activate", data, id));
  };

  const supplierDeactivate = () => {
    const data = { is_active: false };
    setResMsg(false);
    dispatch(getSupplierData("deactivate", data, id));
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <>
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
                      <h1>Supplier</h1>
                    </div>
                    <div className='col-sm-6'>
                      <ol className='breadcrumb float-sm-right'>
                        <li className='breadcrumb-item'>
                          <Link to='/'>Home</Link>
                        </li>
                        <li className='breadcrumb-item active'>Supplier</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
              <section className='content'>
                <div className='container-fluid'>
                  {viewData ? (
                    <Card className='text-center '>
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
                          <div className='card-tools'>
                            <button className='btn btn-tool pointer-event'>
                              {viewData.is_active
                                ? "Active Supplier"
                                : "Inactive Supplier"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Title>
                          <h1 className='h-3 mb-4 text-gray-800'>
                            {viewData.name}
                          </h1>
                        </Card.Title>
                        <Card.Text>
                          <strong>Phone:</strong> {viewData.phone}
                          <br />
                          <strong>Category:</strong> {viewData.category}
                          <br />
                          <strong>Contact Person:</strong>{" "}
                          {viewData.contact_person}
                          <br />
                          <strong>Longitude:</strong> {viewData.longitude}
                          <br />
                          <strong>Latitude:</strong> {viewData.latitude}
                          <br />
                          <strong>Delivery Distance:</strong>{" "}
                          {viewData.delivery_distance}
                          <br />
                          <div className='col-12 mt-4' id='accordion'>
                            <div className='card card-primary card-outline'>
                              <a
                                className='d-block w-100'
                                data-toggle='collapse'
                                href='#collapseTwo'
                              >
                                <div className='card-header'>
                                  <h4 className='card-title w-100'>Address</h4>
                                </div>
                              </a>
                              <div
                                id='collapseTwo'
                                className='collapse'
                                data-parent='#accordion'
                              >
                                <div className='card-body'>
                                  {viewData.address.map((address) => (
                                    <Card
                                      key={address.id}
                                      className={`text-center w-25 ${
                                        address.is_active
                                          ? "text-success"
                                          : "text-danger"
                                      }`}
                                    >
                                      <Card.Header className='d-flex justify-content-between'>
                                        {address.full_name}{" "}
                                        <i
                                          className='fas fa-edit edit-icon text-primary'
                                          onClick={handleEditAddress}
                                        ></i>
                                      </Card.Header>
                                      <Card.Body>
                                        <Card.Text>
                                          {address.address_line1},
                                          {address.address_line2}, <br />
                                          {address.city},{address.district},{" "}
                                          {address.state} - <br />
                                          Ph: {address.contact_number}
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Text>
                        <span className='d-flex justify-content-between '>
                          <Button variant='primary' onClick={handleEdit}>
                            <i className='fas fa-edit edit-icon text-light'></i>
                            Edit
                          </Button>
                          <Button
                            variant={viewData.is_active ? "danger" : "success"}
                            onClick={
                              viewData.is_active
                                ? supplierDeactivate
                                : supplierActivate
                            }
                          >
                            {viewData.is_active ? "Deactivate" : "Activate"}
                          </Button>
                        </span>
                      </Card.Body>
                      <Card.Footer className='text-muted'>
                        Updated At: {viewData.updated_at}{" "}
                      </Card.Footer>
                    </Card>
                  ) : (
                    <div className=''>No Data Available</div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewSupplier;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { useNavigate, useParams } from "react-router-dom";
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
          {Loading && <Spinner />}
      {viewData ? (
        <Card className='text-center m-4 shadow-sm'>
          <Toasts
            propResponseMessage={responseMessage}
            propActionType={"success"}
            propStatusData={{ successStatusData, errorStatusData }}
          />
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <span className='btn' onClick={goBack}>
              <i className='fa fa-chevron-left m-0 font-weight-bold '></i>
              <span className='add-label'> Back</span>
            </span>
            {viewData.is_active ? "Active Supplier" : "Inactive Supplier"}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <h1 className='h3 mb-4 text-gray-800'>{viewData.name}</h1>
            </Card.Title>
            <Card.Text>
              <strong>Phone:</strong> {viewData.phone}
              <br />
              <strong>Category:</strong> {viewData.category}
              <br />
              <strong>Contact Person:</strong> {viewData.contact_person}
              <br />
              <strong>Longitude:</strong> {viewData.longitude}
              <br />
              <strong>Latitude:</strong> {viewData.lattitude}
              <br />
              <strong>Delivery Distance:</strong> {viewData.delivery_distance}
              <br />
              <Accordion>
                {/* <Accordion.Item eventKey='0'>
                  <Accordion.Header>Brands</Accordion.Header>
                  <Accordion.Body className='d-flex justify-content-evenly'>
                    {viewData.brands.map((brand) => (
                      <Card
                        key={brand.id}
                        className={`text-center w-25 ${
                          brand.is_active ? "text-success" : "text-danger"
                        }`}
                      >
                        <Card.Header className='d-flex justify-content-between'>
                          <div>{brand.name} </div>
                          <div
                            className={`${
                              brand.is_active ? "bg-success" : "bg-danger"
                            } rounded-circle mx-2`}
                            style={{ width: "15px", height: "15px" }}
                          ></div>{" "}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>{brand.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Accordion.Body>
                </Accordion.Item> */}
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Address</Accordion.Header>
                  <Accordion.Body className='d-flex justify-content-evenly'>
                    {viewData.address.map((address) => (
                      <Card
                        key={address.id}
                        className={`text-center w-25 ${
                          address.is_active ? "text-success" : "text-danger"
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
                            {address.address_line1},{address.address_line2},{" "}
                            <br />
                            {address.city},{address.district}, {address.state} -{" "}
                            <br />
                            Ph: {address.contact_number}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Text>
            <span className='d-flex justify-content-evenly '>
              <Button variant='primary' onClick={handleEdit}>
                <i className='fas fa-edit edit-icon text-light'></i>
                Edit
              </Button>
              <Button
                variant={viewData.is_active ? "danger" : "success"}
                onClick={
                  viewData.is_active ? supplierDeactivate : supplierActivate
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
    </>
  );
};

export default ViewSupplier;

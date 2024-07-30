import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { useNavigate, useParams } from "react-router-dom";
import { getProductData } from "../../Actions/ProductActions";

const ProductView = ({ viewData, Success, Error, Loading, isActiveData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { prodId } = useParams();
  const [resMsg, setResMsg] = useState(true);

  const successStatusData = Success || isActiveData;
  const errorStatusData = Error;
  const responseMessage = {
    success:
      resMsg === true
        ? isActiveData
          ? "Product activated successfully"
          : "Supplier deleted successfully"
        : "Product deactivated successfully",
  };
  const handleEdit = () => {
    navigate(`/product/edit-product/${prodId}`);
  };
  const handleProductActivate = () => {
    const data = { is_active: true };
    setResMsg(true);

    dispatch(getProductData("activate", data, prodId));
  };
  const handleProductDeactivate = () => {
    const data = { is_active: false };
    setResMsg(false);
    dispatch(getProductData("deactivate", data, prodId));
  };
  const AddImageHandler = () => {
    navigate(`/product/add-product-image/${prodId}`);
  };
  const AddSupplierHandler = () => {
    navigate(`/product/add-brand-supplier/${prodId}/add`);
  };
  const BrandID = viewData?.brand_product?.id;
  const EditBrandHandler = () => {
    navigate(`/product/edit-brand-product/${BrandID}`);
  };
  const handleEditImage = (imageID) => {
    navigate(`/product/edit-product-image/${prodId}/${imageID}`);
  };
  const handleDeleteSupplier = (id) => {
    dispatch(getProductData("delete", id));
  };
  if (Success) {
    setTimeout(() => {
      dispatch(getProductData("single", prodId));
    }, [1500]);
  }
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <>
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
                <span>
                  <span className='add-label '>Edit Brand Product</span>
                  <span
                    className='btn btn-primary rounded btn-sm'
                    onClick={EditBrandHandler}
                  >
                    <i className='fas fa-edit edit-icon text-light'></i>
                  </span>
                </span>
                {/* {viewData.brand_product.is_active
              ? "Active Product"
              : "Inactive Product"} */}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className='h3 mb-4 text-gray-800'>
                    {viewData.brand_product.product_name}
                  </h1>
                </Card.Title>
                <Card.Text>
                  <strong> Description:</strong>{" "}
                  {viewData.brand_product.description}
                  <br />
                  <strong>Selling Price: </strong>₹ {viewData.selling_price}
                  <br />
                  <strong>Market Price: </strong>₹{" "}
                  <del>{viewData.market_price}</del>
                  <br />
                  <strong>Min Purchase Quantity:</strong>{" "}
                  {viewData.min_purchase_quantity}
                  <br />
                  <strong>Weight:</strong>{" "}
                  {viewData.weight_value +
                    " " +
                    viewData.weight_unit +
                    " / " +
                    viewData.weight_description}
                  <br />
                  <Accordion defaultActiveKey='0' className='my-2'>
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>
                        <div className='container'>
                          <div className='row'>
                            <div className='col-md-8'>Product Images</div>
                            <div className='col-md-4 text-end'>
                              <span className='add-label'>Add Image</span>
                              <span
                                className='btn btn-primary rounded btn-sm'
                                onClick={AddImageHandler}
                              >
                                <i className='fas fa-add add-icon'></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className='d-flex justify-content-evenly row'>
                        {viewData.product_images.map((image) => (
                          <Card
                            key={image.id}
                            className={`text-center  mb-4 col-md-3 ${
                              image.is_active ? "text-success" : "text-danger"
                            }`}
                          >
                            <Card.Header className='d-flex justify-content-between'>
                              {image.tag}{" "}
                              <i
                                className='fas fa-edit edit-icon text-primary'
                                onClick={() => handleEditImage(image.id)}
                              ></i>
                            </Card.Header>
                            <Card.Body>
                              {" "}
                              <img
                                src={image.media}
                                alt={image.tag}
                                className='img-fluid object-fit-contain'
                              />
                            </Card.Body>
                          </Card>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion defaultActiveKey='1' className='my-2'>
                    <Accordion.Item eventKey='1'>
                      <Accordion.Header>
                        <div className='container'>
                          <div className='row'>
                            <div className='col-md-8'>Suppliers</div>
                            <div className='col-md-4 text-end'>
                              <span className='add-label'>Add Supplier</span>
                              <span
                                className='btn btn-primary rounded btn-sm'
                                onClick={AddSupplierHandler}
                              >
                                <i className='fas fa-add add-icon'></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className='d-flex justify-content-evenly row'>
                        {viewData.brand_supplier.map((supplier) => (
                          <Card
                            key={supplier.id}
                            className={`text-center mb-4 col-md-3 ${
                              supplier.supplier.is_active
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            <Card.Header className='d-flex justify-content-between  align-items-center'>
                              {supplier.supplier.name}{" "}
                              <span
                                className='btn btn-danger btn-circle btn-sm delete'
                                onClick={() =>
                                  handleDeleteSupplier(supplier.id)
                                }
                              >
                                <i className='fas fa-trash '></i>
                              </span>
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                <strong> Contact Person:</strong>{" "}
                                {supplier.supplier.contact_person}
                                <br />
                                <strong>Phone: </strong>{" "}
                                {supplier.supplier.phone}
                                <br />
                                <strong>Delivery Distance:</strong>{" "}
                                {supplier.supplier.delivery_distance} Km
                                <br />
                                <strong>Category:</strong>{" "}
                                {supplier.supplier.category}
                                <br />
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
                      viewData.is_active
                        ? handleProductDeactivate
                        : handleProductActivate
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
      )}
    </>
  );
};

export default ProductView;

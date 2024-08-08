import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getProductData } from "../../Actions/productActions";
import { getUnitData } from "../../Actions/unitsActions";
import { getSupplierData } from "../../Actions/supplierActions";

const AddProduct = ({ Data, Success, Error, Loading }) => {
  const { brProdId, add, prodId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { supplierData, supplierLoading } = data.supplier;
  console.log(Success);
  const [inputProduct, setInputProduct] = useState({
    supplier_id: "",
  });
  const [validationError, setValidationError] = useState({
    supplier_id: "",
  });
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

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

  const supplier_idArray = supplierData?.map((supplier) => ({
    option: supplier.name,
    value: supplier.id,
  }));
  const handleAddBrand = (type) => {
    if (type === "save") {
      const inputData = {
        supplier_id: Number(inputProduct.supplier_id),
        products_id: Number(prodId),
      };

      dispatch(getProductData("addSupplier", inputData));
    } else if (type === "cancel") {
      window.history.back();
    }
  };
  if (!add && Success && Success.data && Success.data.id) {
    navigate(`/product/add-product-image/${prodId}`);
  }
  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    dispatch(getSupplierData("fetch"));
  }, [dispatch, Data, prodId]);

  const successStatusData = Success;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Successfully added",
    update: "Updated Successfully",
  };

  return (
    <div>
      {supplierLoading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <>
            <Toasts
              propResponseMessage={responseMessage}
              propActionType={"insert"}
              propStatusData={{ successStatusData, errorStatusData }}
            />
            <section className='content-header'>
              <div className='container-fluid'>
                <div className='row mb-2'>
                  <div className='col-sm-6'>
                    <h1>Add Brand Supplier</h1>
                  </div>
                  <div className='col-sm-6'>
                    <ol className='breadcrumb float-sm-right'>
                      <li className='breadcrumb-item'>
                        <Link href='/'>Home</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        Add Brand Supplier
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
                            <label>
                              Supplier
                              <span className='errorLabel'>*</span>
                            </label>
                            <SelectionInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputProduct)
                              }
                              propValidationError={validationError.supplier_id}
                              propAttributeValue='supplier_id'
                              options={supplier_idArray}
                              propValue={""}
                            />
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddBrand}
                          isNext={add ? false : true}
                          propAllErrorEmpty={areAllErrorsEmpty}
                          propValue={brProdId}
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

export default AddProduct;

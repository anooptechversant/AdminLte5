import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import {
  getSupplierData,
  updateSupplierAddress,
} from "../../Actions/supplierActions";

const AddSupplier = ({ Data, viewData, Success, Error, Loading }) => {
  const { id, ref_id, address_id, user_type } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Supplier",
    update: "Update Supplier",
    address: "Update Address",
  };

  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;

  const [inputSupplier, setInputSupplier] = useState({
    name: "",
    contact_person: "",
    phone: "",
    delivery_distance: "",
    category: "",
    longitude: "",
    lattitude: "",
  });
  const [inputAddress, setInputAddress] = useState({
    full_name: "",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    district: "",
    state: "",
    landmark: "",
    pin_code: "",
  });

  const [validationError, setValidationError] = useState({
    name: "",
    contact_person: "",
    phone: "",
    delivery_distance: "",
    category: "",
    longitude: "",
    lattitude: "",
    full_name: "",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    district: "",
    state: "",
    landmark: "",
    pin_code: "",
  });

  const responseMessage = {
    insert: " Successfully Added",
    update: " Updated Successfully",
  };

  const propStatusData = { successStatusData, errorStatusData };

  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

  const [editData, setEditData] = useState([]);
  const [editAddress, setEditAddress] = useState([]);

  const handleInputChange = (newValue, setterFunction, inputType) => {
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

  const handleAddSupplier = (type) => {
    if (type === "save") {
      const inputData = {
        is_active: true,
        name: inputSupplier.name,
        contact_person: inputSupplier.contact_person,
        phone: inputSupplier.phone,
        delivery_distance: inputSupplier.delivery_distance,
        category: inputSupplier.category,
        longitude: inputSupplier.longitude,
        lattitude: inputSupplier.lattitude,

        address: {
          full_name: inputAddress.full_name,
          contact_number: inputAddress.contact_number,
          address_line1: inputAddress.address_line1,
          address_line2: inputAddress.address_line2,
          city: inputAddress.city,
          district: inputAddress.district,
          state: inputAddress.state,
          landmark: inputAddress.landmark,
          pin_code: inputAddress.pin_code,
          is_active: true,
          is_primary: true,
        },
      };
      dispatch(getSupplierData("insert", inputData, 0));
    } else if (type === "cancel") {
      window.history.back();
    } else if (type === "update") {
      const supplierData = {
        name: inputSupplier.name,
        contact_person: inputSupplier.contact_person,
        phone: inputSupplier.phone,
        delivery_distance: inputSupplier.delivery_distance,
        category: inputSupplier.category,
        longitude: inputSupplier.longitude,
        lattitude: inputSupplier.lattitude,
      };
      const addressData = {
        full_name: inputAddress.full_name,
        contact_number: inputAddress.contact_number,
        address_line1: inputAddress.address_line1,
        address_line2: inputAddress.address_line2,
        city: inputAddress.city,
        district: inputAddress.district,
        state: inputAddress.state,
        landmark: inputAddress.landmark,
        pin_code: inputAddress.pin_code,
        is_active: true,
        is_primary: true,
      };
      editAddress[0]
        ? dispatch(
            updateSupplierAddress(ref_id, address_id, addressData, user_type)
          )
        : dispatch(getSupplierData("update", supplierData, id));
    }
  };

  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    const supplierData = Data;
    const singleSupplierData = viewData;

    // Set Edit Data
    setEditData(supplierData.filter((obj) => obj.id == id));
    // Set Edit Address if singleSupplierData is available
    if (singleSupplierData && singleSupplierData.address) {
      setEditAddress(
        singleSupplierData.address.filter((obj) => obj.id == address_id)
      );
    }
  }, [Data, viewData, id, address_id]);

  useEffect(() => {
    // Set Input Supplier if editData is available
    if (editData.length > 0) {
      const {
        is_active,
        name,
        phone,
        delivery_distance,
        category,
        longitude,
        lattitude,
      } = editData[0];

      setInputSupplier({
        is_active,
        name,
        phone,
        delivery_distance,
        category,
        longitude,
        lattitude,
      });
      setValidationError({
        name: "",
        contact_person: "",
        phone: "",
        delivery_distance: "",
        category: "",
        longitude: "",
        lattitude: "",
        full_name: "",
        contact_number: "",
        address_line1: "",
        address_line2: "",
        city: "",
        district: "",
        state: "",
        landmark: "",
        pin_code: "",
      });
    }

    // Set Input Address if editAddress is available
    if (editAddress.length > 0) {
      const {
        full_name,
        contact_number,
        address_line1,
        address_line2,
        city,
        district,
        state,
        landmark,
        pin_code,
      } = editAddress[0];

      setInputAddress({
        full_name,
        contact_number,
        address_line1,
        address_line2,
        city,
        district,
        state,
        landmark,
        pin_code,
      });
      setValidationError({
        name: "",
        contact_person: "",
        phone: "",
        delivery_distance: "",
        category: "",
        longitude: "",
        lattitude: "",
        full_name: "",
        contact_number: "",
        address_line1: "",
        address_line2: "",
        city: "",
        district: "",
        state: "",
        landmark: "",
        pin_code: "",
      });
    }
  }, [editData, editAddress]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <Toasts
            propResponseMessage={responseMessage}
            propActionType={id !== undefined ? "update" : "insert"}
            propStatusData={propStatusData}
          />
          <section className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-6'>
                  <h1>
                    {" "}
                    {editAddress[0]
                      ? pageTitle.address
                      : editData[0]
                      ? pageTitle.update
                      : pageTitle.create}
                  </h1>
                </div>
                <div className='col-sm-6'>
                  <ol className='breadcrumb float-sm-right'>
                    <li className='breadcrumb-item'>
                      <Link href='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                      {editAddress[0]
                        ? pageTitle.address
                        : editData[0]
                        ? pageTitle.update
                        : pageTitle.create}
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
                          {editAddress[0] ? null : (
                            <div className='row'>
                              <div className='col-md-4'>
                                <label>
                                  Name of Supplier{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={validationError.name}
                                  propAttributeValue='name'
                                  propValue={
                                    editData[0] ? editData[0].name : ""
                                  }
                                />
                                <label>
                                  Contact Person{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={
                                    validationError.contact_person
                                  }
                                  propAttributeValue='contact_person'
                                  propValue={
                                    editData[0]
                                      ? editData[0].contact_person
                                      : ""
                                  }
                                />
                                <label>
                                  Latitude <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={
                                    validationError.lattitude
                                  }
                                  propAttributeValue='lattitude'
                                  propValue={
                                    editData[0] ? editData[0].lattitude : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Phone No <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={validationError.phone}
                                  propAttributeValue='phone'
                                  propValue={
                                    editData[0] ? editData[0].phone : ""
                                  }
                                />
                                <label>
                                  Delivery Distance{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={
                                    validationError.delivery_distance
                                  }
                                  propAttributeValue='delivery_distance'
                                  propValue={
                                    editData[0]
                                      ? editData[0].delivery_distance
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Category <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={validationError.category}
                                  propAttributeValue='category'
                                  propValue={
                                    editData[0] ? editData[0].category : ""
                                  }
                                />
                                <label>
                                  Longitude{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSupplier
                                    )
                                  }
                                  propValidationError={
                                    validationError.longitude
                                  }
                                  propAttributeValue='longitude'
                                  propValue={
                                    editData[0] ? editData[0].longitude : ""
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {editData[0] ? null : (
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Address</h4>
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Full Name{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={
                                    validationError.full_name
                                  }
                                  propAttributeValue='full_name'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].full_name
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Contact Number{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={
                                    validationError.contact_number
                                  }
                                  propAttributeValue='contact_number'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].contact_number
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Address Line 1{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={
                                    validationError.address_line1
                                  }
                                  propAttributeValue='address_line1'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].address_line1
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Address Line 2{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={
                                    validationError.address_line2
                                  }
                                  propAttributeValue='address_line2'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].address_line2
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  City <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={validationError.city}
                                  propAttributeValue='city'
                                  propValue={
                                    editAddress[0] ? editAddress[0].city : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  District <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={validationError.district}
                                  propAttributeValue='district'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].district
                                      : ""
                                  }
                                />
                              </div>

                              <div className='col-md-4'>
                                <label>
                                  State <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={validationError.state}
                                  propAttributeValue='state'
                                  propValue={
                                    editAddress[0] ? editAddress[0].state : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Landmark <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={validationError.landmark}
                                  propAttributeValue='landmark'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].landmark
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>
                                  Pin Code <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputAddress)
                                  }
                                  propValidationError={validationError.pin_code}
                                  propAttributeValue='pin_code'
                                  propValue={
                                    editAddress[0]
                                      ? editAddress[0].pin_code
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <AddSecButtons
                        handleSubmit={handleAddSupplier}
                        propAllErrorEmpty={areAllErrorsEmpty}
                        propValue={editAddress[0] ? address_id : id}
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

export default AddSupplier;

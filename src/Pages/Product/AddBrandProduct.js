import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getBrandProductData } from "../../Actions/brandProductActions";
import TextArea from "../../Components/InputComponents/TextArea";
import { getSubCategoryData } from "../../Actions/subCategoryActions";

const AddBrandProduct = ({
  Data,
  Success,
  Error,
  Loading,
  categoryData,
  BrandData,
}) => {
  const { brProdId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputBrandProd, setInputBrandProd] = useState({
    product_name: "",
    description: "",
    brand_id: "",
    subcategory_id: "",
    is_active: "",
  });
  const [validationError, setValidationError] = useState({
    product_name: "",
    description: "",
    brand_id: "",
    subcategory_id: "",
    is_active: "",
  });
  const [inputCategory, setInputCategory] = useState({
    name: "",
  });
  const [editData, setEditData] = useState({});
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const handleCategoryChange = (newValue) => {
    setInputCategory((prevState) => ({
      ...prevState,
      name: newValue.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      name: newValue.value !== "" ? "" : "Select Category",
    }));
  };
  const data = useSelector((state) => state);
  const { subCategoryData } = data.subCategory;
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
  const categoryArray = categoryData?.map((category) => ({
    option: category.name,
    value: category.id,
  }));
  const subCategoryArray = subCategoryData?.map((category) => ({
    option: category.name,
    value: category.id,
  }));
  const brandArray = BrandData?.map((brand) => ({
    option: brand.name,
    value: brand.id,
  }));
  const is_activeArray = [
    { option: "True", value: true },
    { option: "False", value: false },
  ];
  const handleAddBrand = async (type) => {
    if (type === "save" || (type === "update" && brProdId !== undefined)) {
      const inputData = {
        product_name: inputBrandProd.product_name,
        brand_id: inputBrandProd.brand_id,
        subcategory_id: inputBrandProd.subcategory_id,
        description: inputBrandProd.description,
        is_active: inputBrandProd.is_active,
      };
      const inputUpdateData = {
        product_name: inputBrandProd.product_name,
        brand_id: inputBrandProd.brand_id,
        subcategory_id: inputBrandProd.subcategory_id,
        description: inputBrandProd.description,
      };
      const argData =
        type === "save" ? inputData : type === "update" ? inputUpdateData : "";
      const argument =
        type === "save" ? "insert" : type === "update" ? "update" : "";
      await dispatch(getBrandProductData(argument, argData, brProdId));
      if (type === "update") {
        setEditData([inputData]);
      }
    } else if (type === "cancel") {
      window.history.back();
    }
  };
  if (!brProdId && Success && Success.data && Success.data.id) {
    navigate(`/product/add-product/${Success.data.id}`);
  }
  const goBack = () => {
    window.history.back();
  };
  console.log(Data);
  useEffect(() => {
    if (brProdId !== undefined) {
      setEditData(Data);
    } else {
      setEditData({});
    }
  }, [Data, brProdId]);
  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      const { product_name, description, brand_id, subcategory_id, is_active } =
        editData;
      setInputBrandProd({
        product_name,
        description,
        brand_id,
        subcategory_id,
        is_active,
      });
      setValidationError((prevState) => ({
        ...prevState,
        product_name: product_name === "" ? "Required Field" : "",
        brand_id: brand_id === "" ? "Required Field" : "",
        subcategory_id: subcategory_id === "" ? "Required Field" : "",
        is_active: is_active === "" ? "Required Field" : "",
        description: description === "" ? "Required Field" : "",
      }));
    }
  }, [editData]);

  const handleSubCategoryFetch = useCallback(() => {
    if (inputCategory.name !== "") {
      dispatch(getSubCategoryData("fetch", inputCategory.name));
    }
  }, [dispatch, inputCategory.name]);

  useEffect(() => {
    handleSubCategoryFetch();
  }, [handleSubCategoryFetch, inputCategory.name]);
  const pageTitle = {
    create: "Add Brand Product",
    update: "Update Brand Product",
  };
  const successStatusData = Success;
  const errorStatusData = Error;
  const loading = Loading;
  const responseMessage = {
    insert: "Successfully added",
    update: "Updated Successfully",
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <>
            <Toasts
              propResponseMessage={responseMessage}
              propActionType={brProdId !== undefined ? "update" : "insert"}
              propStatusData={{ successStatusData, errorStatusData }}
            />
            <section className='content-header'>
              <div className='container-fluid'>
                <div className='row mb-2'>
                  <div className='col-sm-6'>
                    <h1>
                      {" "}
                      {editData && Object.keys(editData).length > 0
                        ? pageTitle.update
                        : pageTitle.create}
                    </h1>
                  </div>
                  <div className='col-sm-6'>
                    <ol className='breadcrumb float-sm-right'>
                      <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        {editData && Object.keys(editData).length > 0
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
                            <div className='row'>
                              <div className='col-md-6'>
                                <label>
                                  Name of Brand Product{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputBrandProd
                                    )
                                  }
                                  propValidationError={
                                    validationError.product_name
                                  }
                                  propAttributeValue='product_name'
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData.product_name
                                      : ""
                                  }
                                />{" "}
                                <label>
                                  Brand <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputBrandProd
                                    )
                                  }
                                  propValidationError={validationError.brand_id}
                                  propAttributeValue='brand_id'
                                  options={brandArray}
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData.brand_id
                                      : ""
                                  }
                                />
                                <label>
                                  Description{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <TextArea
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputBrandProd
                                    )
                                  }
                                  propValidationError={
                                    validationError.description
                                  }
                                  propAttributeValue='description'
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData.description
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-6'>
                                {editData &&
                                Object.keys(editData).length > 0 ? null : (
                                  <>
                                    <label>
                                      IsActive{" "}
                                      <span className='errorLabel'>*</span>
                                    </label>
                                    <SelectionInput
                                      propOnChange={(newValue) =>
                                        handleInputChange(
                                          newValue,
                                          setInputBrandProd
                                        )
                                      }
                                      propValidationError={
                                        validationError.is_active
                                      }
                                      propAttributeValue='is_active'
                                      options={is_activeArray}
                                      propValue={
                                        editData &&
                                        Object.keys(editData).length > 0
                                          ? editData.is_active
                                          : ""
                                      }
                                    />
                                  </>
                                )}
                                <label>
                                  Category <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={handleCategoryChange}
                                  propValidationError={validationError.name}
                                  propAttributeValue='name'
                                  options={categoryArray}
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? categoryArray.find(
                                          (item) =>
                                            item.value ===
                                            editData.subcategory?.category?.id
                                        )?.value
                                      : inputCategory.name
                                  }
                                />

                                {subCategoryData.length > 0 ||
                                (editData &&
                                  Object.keys(editData).length > 0) ? (
                                  <>
                                    <label>
                                      Sub Category{" "}
                                      <span className='errorLabel'>*</span>
                                    </label>
                                    <SelectionInput
                                      propOnChange={(newValue) =>
                                        handleInputChange(
                                          newValue,
                                          setInputBrandProd
                                        )
                                      }
                                      propValidationError={
                                        validationError.subcategory_id
                                      }
                                      propAttributeValue='subcategory_id'
                                      options={subCategoryArray}
                                      propValue={
                                        editData &&
                                        Object.keys(editData).length > 0
                                          ? editData.subcategory_id
                                          : ""
                                      }
                                    />{" "}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddBrand}
                          isNext={true}
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

export default AddBrandProduct;

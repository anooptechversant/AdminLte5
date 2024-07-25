import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { getSubCategoryData } from "../../Actions/subCategoryActions";
import FileInput from "../../Components/InputComponents/FileInput";

const AddSubCategory = ({ Data, Success, Error, Loading, CategoryData }) => {
  const { id, category_id } = useParams();
  const dispatch = useDispatch();
  const [inputSubCategory, setInputSubCategory] = useState({
    is_active: "",
    category_id: "",
    name: "",
    image: null,
  });
  const [validationError, setValidationError] = useState({
    is_active: "",
    category_id: "",
    name: "",
    image: null,
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const categoryArray = CategoryData?.map((category) => ({
    option: category.name,
    value: category.id,
  }));
  const is_activeArray = [
    { option: "True", value: true },
    { option: "False", value: false },
  ];
  const handleInputChange = (newValue, setterFunction) => {
    setterFunction((prevState) => ({
      ...prevState,
      [newValue.name]: newValue.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newValue.name]:
        newValue.value === ""
          ? "Required Field"
          : newValue.value === null
          ? "Choose Image"
          : "",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);

  useEffect(() => {
    const filteredData = Data.filter((obj) => obj.id == id);
    setEditData(filteredData);
  }, [Data, id]);
  useEffect(() => {
    if (editData.length > 0) {
      const { is_active, category_id, name, image } = editData[0];
      setInputSubCategory((prev) => ({
        ...prev,
        category_id,
        is_active,
        name,
        image,
      }));
      setValidationError((prevState) => ({
        ...prevState,
        is_active: is_active !== "" ? "" : "Required Field",
        category_id: category_id !== "" ? "" : "Required Field",
        name: name !== "" ? "" : "Required Field",
        image: image === null ? "Choose Image" : "",
      }));
    }
  }, [editData]);
  const handleAddCategory = (type) => {
    if (type === "save") {
      const formData = new FormData();
      formData.append("name", inputSubCategory.name);
      formData.append("is_active", inputSubCategory.is_active);
      formData.append("category_id", inputSubCategory.category_id);
      formData.append("image", inputSubCategory.image);

      dispatch(getSubCategoryData("insert", formData, id));
    } else if (type === "update" && category_id !== undefined) {
      const formData = new FormData();
      formData.append("name", inputSubCategory.name);
      // formData.append("is_active", inputSubCategory.is_active);
      if (inputSubCategory.image && inputSubCategory.image instanceof File) {
        formData.append("image", inputSubCategory.image);
        setEditData([
          {
            name: inputSubCategory.name,
            is_active: inputSubCategory.is_active,
            category_id: inputSubCategory.category_id,
            image: URL.createObjectURL(inputSubCategory.image),
          },
        ]);
      } else {
        setEditData([
          {
            name: inputSubCategory.name,
            is_active: inputSubCategory.is_active,
            category_id: inputSubCategory.category_id,
            image: inputSubCategory.image,
          },
        ]);
      }
      dispatch(getSubCategoryData("update", formData, id));
    } else if (type === "cancel") {
      window.history.back();
    }
  };

  const goBack = () => {
    window.history.back();
  };
  const pageTitle = {
    create: "Add Sub Category",
    update: "Update Sub Category",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Sub Category successfully added",
    update: "Sub Category Updated Successfully",
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <>
            <Toasts
              propResponseMessage={responseMessage}
              propActionType={id !== undefined ? "update" : "insert"}
              propStatusData={{ successStatusData, errorStatusData }}
            />
            <section className='content-header'>
              <div className='container-fluid'>
                <div className='row mb-2'>
                  <div className='col-sm-6'>
                    <h1>{editData[0] ? pageTitle.update : pageTitle.create}</h1>
                  </div>
                  <div className='col-sm-6'>
                    <ol className='breadcrumb float-sm-right'>
                      <li className='breadcrumb-item'>
                        <Link href='/'>Home</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        {editData[0] ? pageTitle.update : pageTitle.create}
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
                              Name of Sub Category{" "}
                              <span className='errorLabel'>*</span>
                            </label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputSubCategory)
                              }
                              propValidationError={validationError.name}
                              propAttributeValue='name'
                              propValue={editData[0] ? editData[0].name : ""}
                              placeholder={""}
                            />
                            <label>
                              Image <span className='errorLabel'>*</span>
                            </label>
                            <FileInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputSubCategory)
                              }
                              propValidationError={validationError.image}
                              propAttributeValue='image'
                              propValue={editData[0] ? editData[0].image : ""}
                            />
                            {editData[0] ? (
                              ""
                            ) : (
                              <>
                                <label>
                                  IsActive <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSubCategory
                                    )
                                  }
                                  propValidationError={
                                    validationError.is_active
                                  }
                                  propAttributeValue='is_active'
                                  options={is_activeArray}
                                  propValue={
                                    editData[0] ? editData[0].is_active : ""
                                  }
                                />{" "}
                                <label>
                                  Category <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputSubCategory
                                    )
                                  }
                                  propValidationError={
                                    validationError.category_id
                                  }
                                  propAttributeValue='category_id'
                                  options={categoryArray}
                                  propValue={
                                    editData[0] ? editData[0].category_id : ""
                                  }
                                />{" "}
                              </>
                            )}
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddCategory}
                          propAllErrorEmpty={areAllErrorsEmpty}
                          propValue={id}
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
    </>
  );
};

export default AddSubCategory;

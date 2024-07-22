import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";

import { Link, useParams } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import FileInput from "../../Components/InputComponents/FileInput";
import { getCategoryData } from "../../Actions/categoryActions";

import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import AddSecButtons from "../../Components/Common/AddSecButtons";
const AddCategory = ({ Data, Success, Error, Loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [inputCategory, setInputCategory] = useState({
    name: "",
    is_active: "",
    image: null,
  });
  const [validationError, setValidationError] = useState({
    name: "",
    is_active: "",
    image: null,
  });
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const [editData, setEditData] = useState([]);

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
      const { name, is_active, image } = editData[0];
      setInputCategory({ name, is_active, image });
      setValidationError((prevState) => ({
        ...prevState,
        name: name === "" ? "Required Field" : "",
        is_active: is_active === "" ? "Required Field" : "",
        image: image === null ? "Choose Image" : "",
      }));
    }
  }, [editData]);
  const handleAddCategory = (type) => {
    if (type === "save") {
      const formData = new FormData();
      formData.append("name", inputCategory.name);
      formData.append("is_active", inputCategory.is_active);
      formData.append("image", inputCategory.image);

      dispatch(getCategoryData("insert", formData, id));
    } else if (type === "update" && id !== undefined) {
      const formData = new FormData();
      formData.append("name", inputCategory.name);
      // formData.append("is_active", inputCategory.is_active);

      if (inputCategory.image && inputCategory.image instanceof File) {
        formData.append("image", inputCategory.image);
        setEditData([
          {
            name: inputCategory.name,
            is_active: inputCategory.is_active,
            image: URL.createObjectURL(inputCategory.image),
          },
        ]);
      } else {
        setEditData([
          {
            name: inputCategory.name,
            is_active: inputCategory.is_active,
            image: inputCategory.image,
          },
        ]);
      }
      dispatch(getCategoryData("update", formData, id));
    } else if (type === "cancel") {
      window.history.back();
    }
  };
  const goBack = () => {
    window.history.back();
  };

  const pageTitle = {
    create: "Add Category",
    update: "Update Category",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Category successfully added",
    update: "Category Updated Successfully",
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
                            <label for='exampleInputEmail1'>
                              {" "}
                              Name of Category{" "}
                            </label>
                            <Text
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputCategory)
                              }
                              propValidationError={validationError.name}
                              propAttributeValue='name'
                              propValue={editData[0] ? editData[0].name : ""}
                              placeholder={""}
                            />

                            {editData[0] ? (
                              ""
                            ) : (
                              <>
                                <label>IsActive</label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputCategory
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
                              </>
                            )}
                            <label>Image</label>
                            <FileInput
                              propOnChange={(newValue) =>
                                handleInputChange(newValue, setInputCategory)
                              }
                              propValidationError={validationError.image}
                              propAttributeValue='image'
                              propValue={editData[0] ? editData[0].image : ""}
                            />
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
    </div>
  );
};

export default AddCategory;

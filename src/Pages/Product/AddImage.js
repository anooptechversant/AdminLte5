import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import FileInput from "../../Components/InputComponents/FileInput";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import { getProdImage } from "../../Actions/productActions";
const AddImage = ({ Data, Success, Error, Loading }) => {
  const { prodId, imageId } = useParams();
  const dispatch = useDispatch();
  const [inputProdImage, setInputProdImage] = useState({
    is_active: "",
    media: null,
    tag: "",
  });
  const [validationError, setValidationError] = useState({
    is_active: "",
    media: null,
    tag: "",
  });
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const [editData, setEditData] = useState([]);
  const is_activeArray = [
    { option: "True", value: true },
    { option: "False", value: false },
  ];
  const tagArray = [
    { option: "FRONT VIEW", value: "FRONT VIEW" },
    { option: "SIDE VIEW", value: "SIDE VIEW" },
    { option: "CLOSE UP", value: "CLOSE UP" },
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
    if (imageId !== undefined) {
      const filteredData = Data?.filter((obj) => obj.id == imageId);
      setEditData(filteredData);
    }
  }, [Data, imageId]);
  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      const { is_active, media, tag } = editData[0];
      setInputProdImage({ is_active, media, tag });
      setValidationError((prevState) => ({
        ...prevState,
        is_active: is_active === "" ? "Required Field" : "",
        media: media === null ? "Choose Image" : "",
        tag: tag === "" ? "Required Field" : "",
      }));
    }
  }, [editData]);
  const handleAddCategory = (type) => {
    if (type === "save") {
      const formData = new FormData();
      formData.append("is_active", inputProdImage.is_active);
      formData.append("image", inputProdImage.media);
      formData.append("tag", inputProdImage.tag);
      dispatch(getProdImage("insert", formData, prodId));
    } else if (type === "update" && imageId !== undefined) {
      const formData = new FormData();
      formData.append("name", inputProdImage.tag);
      // formData.append("is_active", inputProdImage.is_active);

      if (inputProdImage.media && inputProdImage.media instanceof File) {
        formData.append("image", inputProdImage.media);
        setEditData([
          {
            is_active: inputProdImage.is_active,
            media: URL.createObjectURL(inputProdImage.media),
            tag: inputProdImage.tag,
          },
        ]);
      } else {
        setEditData([
          {
            is_active: inputProdImage.is_active,
            media: inputProdImage.media,
            tag: inputProdImage.tag,
          },
        ]);
      }
      dispatch(getProdImage("update", formData, imageId));
    } else if (type === "cancel") {
      window.history.back();
    }
  };
  const goBack = () => {
    window.history.back();
  };

  const pageTitle = {
    create: "Add Image",
    update: "Update Image",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Image successfully added",
    update: "Image Updated Successfully",
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
              propActionType={imageId !== undefined ? "update" : "insert"}
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
                        <Link href='/'>Home</Link>
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
                                  IsActive <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputProdImage
                                    )
                                  }
                                  propValidationError={
                                    validationError.is_active
                                  }
                                  propAttributeValue='is_active'
                                  options={is_activeArray}
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData[0].is_active
                                      : ""
                                  }
                                />
                                <label>
                                  Image <span className='errorLabel'>*</span>
                                </label>
                                <FileInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputProdImage
                                    )
                                  }
                                  propValidationError={validationError.media}
                                  propAttributeValue='media'
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData[0].media
                                      : ""
                                  }
                                />
                              </div>
                              <div className='col-md-6'>
                                <label>
                                  Tag <span className='errorLabel'>*</span>
                                </label>
                                <SelectionInput
                                  propOnChange={(newValue) =>
                                    handleInputChange(
                                      newValue,
                                      setInputProdImage
                                    )
                                  }
                                  propValidationError={validationError.tag}
                                  propAttributeValue='tag'
                                  options={tagArray}
                                  propValue={
                                    editData && Object.keys(editData).length > 0
                                      ? editData[0].tag
                                      : ""
                                  }
                                />{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddCategory}
                          propAllErrorEmpty={areAllErrorsEmpty}
                          propValue={imageId}
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

export default AddImage;

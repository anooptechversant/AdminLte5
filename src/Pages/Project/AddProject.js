import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../Components/InputComponents/Text";
import AddSecButtons from "../../Components/Common/AddSecButtons";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";
import FileInput from "../../Components/InputComponents/FileInput";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
import { getProjectData } from "../../Actions/projectActions";

const AddProject = ({ Data, Success, Error, Loading }) => {
  // const data = useSelector((state) => state);
  // const { projectMedia } = data.project;

  const { user_id, project_id } = useParams();
  const dispatch = useDispatch();
  const [inputProject, setInputProject] = useState({
    name: "",
    description: "",
  });
  const [validationError, setValidationError] = useState({
    name: "",
    description: "",
  });
  const [editData, setEditData] = useState([]);
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);
  const [imageArray, setImageArray] = useState([{ id: 0 }]);
  const [inputMedia, setInputMedia] = useState([
    {
      media: null,
      type: "",
      image_tags: "",
    },
  ]);
  const [mediaValidationErrors, setMediaValidationErrors] = useState([
    {
      media: null,
      type: "",
      image_tags: "",
    },
  ]);
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
  const handleMediaInputChange = (newValue, index) => {
    const updatedInputMedia = [...inputMedia];
    updatedInputMedia[index] = {
      ...updatedInputMedia[index],
      [newValue.name]: newValue.value,
    };
    setInputMedia(updatedInputMedia);

    setMediaValidationErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [newValue.name]:
          newValue.value === ""
            ? "Required Field"
            : newValue.value === null
            ? "Choose Image"
            : "",
      };
      return updatedErrors;
    });
  };
  const handleMediaInputChange1 = (newValue, index) => {
    setInputMedia((prevState) => {
      const updatedInputMedia = [...prevState];
      updatedInputMedia[index] = {
        ...updatedInputMedia[index],
        [newValue.name]: newValue.value,
      };
      return updatedInputMedia;
    });
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
    const allErrors = mediaValidationErrors.filter((errors) =>
      Object.values(errors).some((error) => !!error)
    );
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value) &&
        allErrors.length === 0
    );
  }, [validationError, mediaValidationErrors]);
  useEffect(() => {
    const filteredData = Data.filter((obj) => obj.id == project_id);
    setEditData(filteredData);
  }, [Data, project_id]);
  useEffect(() => {
    if (editData.length > 0) {
      const { name, description, medias } = editData[0];
      setInputProject((prev) => ({
        ...prev,
        name,
        description,
      }));
      setValidationError((prevState) => ({
        ...prevState,
        name: name !== "" ? "" : "Required Field",
        description: description !== "" ? "" : "Required Field",
      }));

      // Setting up media validation errors
      if (medias && medias.length > 0) {
        const mediaErrors = medias.map((media, index) => ({
          media: media.url ? "" : "Choose Image",
          type: media.type ? "" : "Required Field",
          image_tags: media.tags ? "" : "Required Field",
        }));
        setMediaValidationErrors(mediaErrors);
      }
    }
  }, [editData]);

  const typeArray = [
    { option: "PROJECT", value: "PROJECT" },
    { option: "PROFILE", value: "PROFILE" },
    { option: "FEED", value: "FEED" },
  ];
  const handleAddProject = async (type) => {
    if (type === "save" || (type === "update" && user_id !== undefined)) {
      const imageIds = [];

      const uploadImage = async (imageObj) => {
        const formData = new FormData();
        formData.append("media", imageObj.media);
        formData.append("image_tags", imageObj.image_tags);
        formData.append("type", imageObj.type);

        const resp = await dispatch(
          getProjectData("img-insert", formData, user_id)
        );

        if (resp && resp.data.id) {
          imageIds.push(resp.data.id);
        }
      };

      await Promise.all(inputMedia.map(uploadImage));
      if (type === "save") {
        const projectData = { ...inputProject, image_ids: imageIds };
        if (imageIds.length !== 0)
          dispatch(getProjectData("insert", projectData, user_id));
      } else if (type === "update") {
        const projectData = { ...inputProject, image_ids: imageIds };
        dispatch(getProjectData("update", projectData, user_id));
      }
    } else if (type === "cancel") {
      window.history.back();
    }
  };
  const handleAddImage = () => {
    const newImageArray = [...imageArray];
    const newId = newImageArray.length + 1;
    newImageArray.push({ id: newId });
    setImageArray(newImageArray);
  };

  const handleDeleteImage = (index) => {
    const newImageArray = [...imageArray];
    newImageArray.splice(index, 1);
    setImageArray(newImageArray);
  };
  const goBack = () => {
    window.history.back();
  };
  const pageTitle = {
    create: "Add Project",
    update: "Update Project",
  };
  const successStatusData = Success;
  const loading = Loading;
  const errorStatusData = Error;
  const responseMessage = {
    insert: "Project successfully added",
    update: "Project Updated Successfully",
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
              propActionType={user_id !== undefined ? "update" : "insert"}
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
                            <div className='row'>
                              <div className='col-md-6'>
                                <label>
                                  Name of Project{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputProject)
                                  }
                                  propValidationError={validationError.name}
                                  propAttributeValue='name'
                                  propValue={
                                    editData[0] ? editData[0].name : ""
                                  }
                                />{" "}
                              </div>
                              <div className='col-md-6'>
                                <label>
                                  Description{" "}
                                  <span className='errorLabel'>*</span>
                                </label>
                                <Text
                                  propOnChange={(newValue) =>
                                    handleInputChange(newValue, setInputProject)
                                  }
                                  propValidationError={
                                    validationError.description
                                  }
                                  propAttributeValue='description'
                                  propValue={
                                    editData[0] ? editData[0].description : ""
                                  }
                                />{" "}
                              </div>
                            </div>
                            {imageArray.map((image, index) => (
                              <div key={image.id}>
                                <hr />
                                <section className='row d-flex justify-content-between'>
                                  <div className='col-md-4'>
                                    {" "}
                                    <label>
                                      Image{" "}
                                      <span className='errorLabel'>*</span>
                                    </label>
                                    <FileInput
                                      propOnChange={(newValue) =>
                                        handleMediaInputChange(newValue, index)
                                      }
                                      propValidationError={
                                        mediaValidationErrors[index]?.media
                                      }
                                      propAttributeValue='media'
                                      propValue={
                                        editData[0]?.medias &&
                                        editData[0]?.medias[0]
                                          ? editData[0].medias[index].url
                                          : null
                                      }
                                    />
                                  </div>
                                  <div className='col-md-3'>
                                    <label>
                                      Type <span className='errorLabel'>*</span>
                                    </label>
                                    <SelectionInput
                                      propOnChange={(newValue) =>
                                        handleMediaInputChange(newValue, index)
                                      }
                                      propValidationError={
                                        mediaValidationErrors[index]?.type
                                      }
                                      propAttributeValue='type'
                                      options={typeArray}
                                      propValue={
                                        editData[0]?.medias &&
                                        editData[0]?.medias[0]
                                          ? editData[0].medias[index].type
                                          : ""
                                      }
                                    />{" "}
                                  </div>
                                  <div className='col-md-4'>
                                    {" "}
                                    <label>
                                      Image Tags{" "}
                                      <span className='errorLabel'>*</span>
                                    </label>
                                    <Text
                                      propOnChange={(newValue) =>
                                        handleMediaInputChange(newValue, index)
                                      }
                                      propValidationError={
                                        mediaValidationErrors[index]?.image_tags
                                      }
                                      propAttributeValue='image_tags'
                                      propValue={
                                        editData[0]?.medias &&
                                        editData[0]?.medias[0]
                                          ? editData[0].medias[index].tags
                                          : ""
                                      }
                                    />{" "}
                                  </div>
                                  {index === 0 && (
                                    <div className='w-auto d-flex align-content-center flex-wrap'>
                                      <span className=' btn-circle btn-sm delete'></span>
                                    </div>
                                  )}
                                  {index > 0 && (
                                    <div className='w-auto d-flex align-content-center flex-wrap'>
                                      <span
                                        className='btn btn-danger btn-circle btn-sm delete'
                                        onClick={() => handleDeleteImage(index)}
                                      >
                                        <i className='fas fa-trash'></i>
                                      </span>
                                    </div>
                                  )}
                                </section>
                              </div>
                            ))}
                            <hr />
                            <div className='row'>
                              <span
                                className='btn btn-primary rounded btn-sm py-2'
                                type='button'
                                onClick={handleAddImage}
                              >
                                <i className='fas fa-add add-icon'></i> Add
                                Image
                              </span>
                            </div>
                          </div>
                        </div>
                        <AddSecButtons
                          handleSubmit={handleAddProject}
                          propAllErrorEmpty={areAllErrorsEmpty}
                          propValue={project_id}
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

export default AddProject;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SubCategoryTable from "../../Components/Common/Table";
import { useNavigate } from "react-router-dom";
import { getSubCategoryData } from "../../Actions/subCategoryActions";
import SelectionInput from "../../Components/InputComponents/SelectionInput";

const SubCategory = (props) => {
  const { Data, CategoryData, Success, Error, Loading, Fetch, category_id } =
    props;
  const [tableData, setTableData] = useState(Data || []);
  const [inputCategory, setInputCategory] = useState({
    name: "",
  });
  const [validationError, setValidationError] = useState({
    name: "",
  });
  const [resMsg, setResMsg] = useState(true);
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const successStatusData = Success;
  const errorStatusData = Error;
  const pageTitle = "Sub Category";
  const tableTitle = "Sub Category";
  const addTableTitle = "Add Sub Category";
  const deleteConfirmMessage =
    "Are you sure you want to delete this Sub Category?";
  const responseMessage = {
    success:
      resMsg === true
        ? "Category activated successfully"
        : "Category deactivated successfully",
  };

  const subCategoryColumns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Sub Category Name" },
    { key: "image", name: "Image" },
    { key: "category_id", name: "Category" },
    // Add more columns as needed
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubCategoryActivate = (id) => {
    dispatch(getSubCategoryData("activate", { is_active: true }, id));
    setResMsg(true);
  };

  const handleSubCategoryDeactivate = (id) => {
    dispatch(getSubCategoryData("deactivate", { is_active: false }, id));
    setResMsg(false);
  };

  const handleSubCategoryEdit = (id) => {
    navigate(`/sub-category/edit-sub-category/${id}/${category_id}`);
  };

  const handleSubCategoryFetch = useCallback(() => {
    if (inputCategory.name !== "") {
      Fetch(inputCategory.name);
      // dispatch(getSubCategoryData("fetch", inputCategory.name));
    }
  }, [dispatch, inputCategory]);

  const handleSubCategoryAdd = () => {
    navigate("/sub-category/add-sub-category");
  };
  const handleSwitchChange = (id, isActive) => {
    if (isActive) {
      handleSubCategoryDeactivate(id);
    } else {
      handleSubCategoryActivate(id);
    }
  };
  const categoryArray =
    CategoryData?.map((category) => ({
      option: category.name,
      value: category.id,
    })) || [];

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

  useEffect(() => {
    handleSubCategoryFetch();
  }, [handleSubCategoryFetch, inputCategory]);

  const columns = [
    {
      header: "#",
      key: "SL.No",
      cell: (row, i) => <>{i + 1}</>,
      tdClassName: "",
      thClassName: "w-1",
    },

    {
      header: "Category Name",
      key: "name",
      cell: (row) => <>{row?.name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Image",
      key: "image",
      cell: (row) => (
        <>
          <img alt={row?.name} className='table-avatar' src={row?.image} />
        </>
      ),
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Category",
      key: "category_id",
      cell: (row) => <>{row?.name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <div className='d-flex justify-content-around'>
          <button
            className='btn btn-info btn-sm'
            onClick={() => handleSubCategoryEdit(row.id)}
          >
            <i className='fas fa-pencil-alt'></i>
          </button>
          <div
            className={`custom-control custom-switch x  ${
              row.is_active
                ? " custom-switch-on-success"
                : "custom-switch-off-danger"
            } `}
          >
            <input
              type='checkbox'
              className='custom-control-input'
              id={`customSwitch-${row.id}`}
              checked={row.is_active}
              onChange={() => {
                handleSwitchChange(row.id, row.is_active);
              }}
            />
            <label
              className={`custom-control-label ${
                row.is_active ? "text-success" : "text-danger"
              } `}
              htmlFor={`customSwitch-${row.id}`}
            >
              {row.is_active ? "Active" : "Inactive"}
            </label>
          </div>
        </div>
      ),
      tdClassName: "project-actions text-center",
      thClassName: "text-center",
    },
  ];
  return (
    <>
      {" "}
      <section className='content-header'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6'></div>
            <div className='col-md-6 '>
              <div className='mb-4 d-flex justify-content-center'>
                <label className='d-flex mr-2'>
                  Category <span className='errorLabel'>*</span>
                </label>
                <div className='w-100'>
                  <SelectionInput
                    propOnChange={handleCategoryChange}
                    propValidationError={validationError.name}
                    propAttributeValue='name'
                    options={categoryArray}
                    propValue={inputCategory?.name || ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1>{pageTitle}</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>{pageTitle}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>{tableTitle}</h3>

              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleSubCategoryAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <SubCategoryTable
              Columns={columns}
              Data={tableData}
              loading={Loading}
              Error={Error}
              ErrorText={"No data available"}
              ResponseMessage={responseMessage}
              StatusData={{ successStatusData, errorStatusData }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SubCategory;

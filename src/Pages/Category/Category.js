import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryTable from "../../Components/Common/Table";
import { useNavigate } from "react-router-dom";
import { getCategoryData } from "../../Actions/categoryActions";
const Category = ({ Data, Success, Error, Loading, isActiveData }) => {
  const [resMsg, setResMsg] = useState(true);
  const [tableData, setTableData] = useState(Data || []);
  const successStatusData = Success || isActiveData;
  const errorStatusData = Error;
  const responseMessage = {
    success:
      resMsg === true
        ? "Category activated successfully"
        : "Category deactivated successfully",
  };

  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryActivate = (id) => {
    const data = { is_active: true };
    setResMsg(true);
    dispatch(getCategoryData("activate", data, id));
  };
  const handleCategoryDeactivate = (id) => {
    const data = { is_active: false };
    setResMsg(false);
    dispatch(getCategoryData("deactivate", data, id));
  };
  const handleSwitchChange = (id, isActive) => {
    if (isActive) {
      handleCategoryDeactivate(id);
    } else {
      handleCategoryActivate(id);
    }
  };
  const handleCategoryEdit = (id) => {
    navigate(`/category/edit-category/${id}`);
  };

  const handleCategoryAdd = () => {
    navigate("/category/add-category");
  };

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
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <div className='d-flex justify-content-around'>
          <button
            className='btn btn-info btn-sm'
            onClick={() => handleCategoryEdit(row.id)}
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
              id='customSwitch3'
              checked={row.is_active}
              onChange={() => {
                handleSwitchChange(row.id, row.is_active);
              }}
            />
            <label
              className={`custom-control-label ${
                row.is_active ? "text-success" : "text-danger"
              } `}
              for='customSwitch3'
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
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1>Category</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Category</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Category</h3>

              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleCategoryAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <CategoryTable
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

export default Category;

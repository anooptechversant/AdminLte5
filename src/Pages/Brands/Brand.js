import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BrandTable from "../../Components/Common/Table";
import { useNavigate } from "react-router-dom";
import { getBrandData } from "../../Actions/brandActions";

const Brand = ({ Data, Success, Error, Loading, isActiveData }) => {
  const [resMsg, setResMsg] = useState(true);
  const [tableData, setTableData] = useState(Data || []);
  const successStatusData = Success || isActiveData;
  const errorStatusData = Error;
  const responseMessage = {
    success:
      resMsg === true
        ? "Brand activated successfully"
        : "Brand deactivated successfully",
  };

  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBrandActivate = (id) => {
    const data = { is_active: true };
    setResMsg(true);
    dispatch(getBrandData("activate", data, id));
  };
  const handleBrandDeactivate = (id) => {
    const data = { is_active: false };
    setResMsg(false);
    dispatch(getBrandData("deactivate", data, id));
  };
  const handleSwitchChange = (id, isActive) => {
    console.log("object is deactivated", id, isActive);
    if (isActive) {
      handleBrandDeactivate(id);
    } else {
      handleBrandActivate(id);
    }
  };
  const handleBrandEdit = (id) => {
    navigate(`/brands/edit-brand/${id}`);
  };

  const handleBrandAdd = () => {
    navigate("/brands/add-brand");
  };

  const columns = [
    {
      header: "Brand Name",
      key: "name",
      cell: (row) => <>{row?.name}</>,
      tdClassName: "text-nowrap",
      thClassName: "text-nowrap",
    },
    {
      header: "Description",
      key: "description",
      cell: (row) => (
        <>
          {row?.description.length > 50
            ? `${row?.description.substring(0, 50)}...`
            : row?.description}
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
            onClick={() => handleBrandEdit(row.id)}
          >
            <i className='fas fa-pencil-alt'></i>
          </button>
          {/* <button
           className='btn btn-danger btn-sm'
           onClick={() => handleDelete(row.id)}
         >
           <i className='fas fa-trash'></i>
           Delete
         </button> */}
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
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1>Brand</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Brand</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Brand</h3>

              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleBrandAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <BrandTable
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

export default Brand;

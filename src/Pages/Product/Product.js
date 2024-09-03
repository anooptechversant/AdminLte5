import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductTable from "../../Components/Common/Table";
import { Link, useNavigate } from "react-router-dom";
import { getProductData } from "../../Actions/ProductActions";
import SelectionInput from "../../Components/InputComponents/SelectionInput";

const Product = ({
  Data,
  Success,
  Error,
  Loading,
  propTotalPages,
  propCurrentPage,
  currentPageChange,
  limitChange,
}) => {
  const [resMsg, setResMsg] = useState(true);
  const [tableData, setTableData] = useState(Data || []);
  const [inputLimit, setInputLimit] = useState({
    limit: 8,
  });
  const successStatusData = Success;
  const errorStatusData = Error;
  const pageTitle = "Product";
  const tableTitle = "Product";
  const responseMessage = {
    success:
      resMsg === true
        ? "Product activated successfully"
        : "Product deactivated successfully",
  };
 
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductActivate = (id) => {
    const data = { is_active: true };
    setResMsg(true);

    dispatch(getProductData("activate", data, id));
  };
  const handleProductDeactivate = (id) => {
    const data = { is_active: false };
    setResMsg(false);

    dispatch(getProductData("deactivate", data, id));
  };


  const handleProductView = (id) => {
    navigate(`/product/view-product/${id}`);
  };

  const handleProductAdd = () => {
    navigate("/product/add-brand-product");
  };
  const handleSwitchChange = (id, isActive) => {
    if (isActive) {
      handleProductDeactivate(id);
    } else {
      handleProductActivate(id);
    }
  };
  const limitArray = [
    { option: "5", value: 5 },
    { option: "8", value: 8 },
    { option: "10", value: 10 },
    { option: "20", value: 20 },
    { option: "50", value: 50 },
    { option: "100", value: 100 },
  ];
  const handleInputChange = (newValue, setterFunction) => {
    setterFunction((prevState) => ({
      ...prevState,
      [newValue.name]: newValue.value,
    }));
    if (limitChange) {
      limitChange(newValue.value);
    }
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
      header: "Product Name",
      key: "brand_product.product_name",
      cell: (row) => <div style={{maxWidth:"20rem"}}>{row?.brand_product.product_name}</div>,
      tdClassName: "mw-75",
      thClassName: "",
    },
    {
      header: "Brand",
      key: "brand_product.brand.name",
      cell: (row) => <>{row?.brand_product.brand.name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Market Price",
      key: "market_price",
      cell: (row) => <>{row?.market_price}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Selling Price",
      key: "selling_price",
      cell: (row) => <>{row?.selling_price}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <div className='d-flex justify-content-around'>
          <button
            className='btn btn-info btn-sm text-nowrap'
            onClick={() => handleProductView(row.id)}
          >
            <i className='fas fa-solid fa-eye'></i>
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
              <h1>{pageTitle}</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <Link href='/'>Home</Link>
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

              <div className='card-tools d-flex justify-content-end'>
                <span
                  className='mr-4'
                  style={{ maxWidth: "30%", minWidth: "10%" }}
                >
                  <SelectionInput
                    propOnChange={(newValue) =>
                      handleInputChange(newValue, setInputLimit)
                    }
                    propValidationError={""}
                    propAttributeValue='limit'
                    options={limitArray}
                    propValue={inputLimit.limit}
                  />
                </span>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleProductAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <ProductTable
              Columns={columns}
              Data={tableData}
              loading={Loading}
              Error={Error}
              CurrentPage={propCurrentPage}
              currentPageChange={currentPageChange}
              TotalPages={propTotalPages}
              // itemsPerPage={limitChange}
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

export default Product;

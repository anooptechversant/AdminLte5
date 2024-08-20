import React, { useEffect, useState } from "react";
import OrderTable from "../../Components/Common/Table";
import { Link, useNavigate } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";

const Order = ({
  Data,
  Success,
  Error,
  Loading,
  propTotalPages,
  propCurrentPage,
  currentPageChange,
  limitChange,
  setOrderStatus,
}) => {
  const [inputStatus, setInputStatus] = useState({
    order_status: "",
  });
  const [tableData, setTableData] = useState(Data || []);
  const [inputLimit, setInputLimit] = useState({
    limit: 8,
  });

  const successStatusData = Success;
  const errorStatusData = Error;
  const pageTitle = "Orders";
  const tableTitle = "Orders";
 
  const navigate = useNavigate();
  const handleProductView = (id) => {
    navigate(`/orders/view-order/${id}`);
  };
  const handleStatusChange = (newValue) => {
    setInputStatus((prevState) => ({
      ...prevState,
      order_status: newValue.value,
    }));
  };
  useEffect(() => {
    // Call the API when inputStatus.order_status changes
    if (inputStatus.order_status !== "") {
      setOrderStatus(inputStatus.order_status);
    }
  }, [inputStatus.order_status, setOrderStatus]);

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
  const statusArray = [
    { option: "PENDING", value: "PENDING" },
    { option: "PLACED", value: "PLACED" },
    { option: "CONFIRMED", value: "CONFIRMED" },
    { option: "SHIPPED", value: "SHIPPED" },
    { option: "DELIVERED", value: "DELIVERED" },
    { option: "CANCELLED", value: "CANCELLED" },
    { option: "REFUNDED", value: "REFUNDED" },
    { option: "RETURNED", value: "RETURNED" },
  ];
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const columns = [
    {
      header: "#",
      key: "SL.No",
      cell: (row, i) => <>{i + 1}</>,
      tdClassName: "",
      thClassName: "w-1",
    },

    {
      header: "Order Status",
      key: "order_status",
      cell: (row) => <>{row?.order_status}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Delivery Date",
      key: "delivery_date",
      cell: (row) => <>{row?.delivery_date}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Payment Method",
      key: "payment_type",
      cell: (row) => <>{row?.payment_type}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Product Name",
      key: "product_name",
      cell: (row) => <>{row?.product_name}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Product Quantity",
      key: "quantity",
      cell: (row) => <>{row?.quantity}</>,
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

              <div className='card-tools d-flex justify-content-around'>
                <label className='d-flex mr-2'>
                  Status <span className='errorLabel'>*</span>
                </label>
                {/* <div className='w-100'> */}

                <SelectionInput
                  propOnChange={handleStatusChange}
                  propValidationError={""}
                  propAttributeValue='order_status'
                  firstOption={statusArray[0].value}
                  options={statusArray}
                  propValue={inputStatus.order_status}
                />
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
                {/* <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleProductAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button> */}
              </div>
            </div>
            <OrderTable
              Columns={columns}
              Data={tableData}
              loading={Loading}
              Error={Error}
              CurrentPage={propCurrentPage}
              currentPageChange={currentPageChange}
              TotalPages={propTotalPages}
              ErrorText={"No data available"}
              ResponseMessage={"responseMessage is empty"}
              StatusData={{ successStatusData, errorStatusData }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;

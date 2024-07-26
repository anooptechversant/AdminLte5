import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SupplierTable from "../../Components/Common/Table";
import { useNavigate } from "react-router-dom";
import { getSupplierData } from "../../Actions/supplierActions";
const Supplier = ({ Data, Success, Error, Loading }) => {
  const [tableData, setTableData] = useState(Data || []);

  const successStatusData = Success;
  const errorStatusData = Error;
  const loadingSupplier = Loading;
  const pageTitle = "Supplier";
  const tableTitle = "Supplier";
  const addTableTitle = "Add Supplier";
  const deleteConfirmMessage = "Are you sure you want to delete this Supplier?";
  const responseMessage = {
    success: "Supplier deleted successfully",
  };

  const supplierColumns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Supplier Name" },
    { key: "phone", name: "Phone NO:" },
    { key: "category", name: "Category:" },
    { key: "contact_person", name: "Contact Person" },

    // Add more columns as needed
  ];
  
 useEffect(() => {
   setTableData(Data);
 }, [Data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSupplierActivate = (id) => {
    const data = { is_active: true };
    dispatch(getSupplierData("activate", data, id));
  };
  const handleSupplierDeactivate = (id) => {
    const data = { is_active: false };

    dispatch(getSupplierData("deactivate", data, id));
  };


  const handleSupplierView = (id) => {
    navigate(`/supplier/view-supplier/${id}`);
  };

  const handleSupplierAdd = () => {
    navigate("/supplier/add-supplier");
  };
  const handleSwitchChange = (id, isActive) => {
    if (isActive) {
      handleSupplierDeactivate(id);
    } else {
      handleSupplierActivate(id);
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
     header: "Supplier Name",
     key: "name",
     cell: (row) => <>{row?.name}</>,
     tdClassName: "",
     thClassName: "",
   },
   {
     header: "Phone No",
     key: "phone",
     cell: (row) => <>{row?.phone}</>,
     tdClassName: "",
     thClassName: "",
   },
   {
     header: "Category",
     key: "category",
     cell: (row) => <>{row?.category}</>,
     tdClassName: "",
     thClassName: "",
   },
   {
     header: "Contact Person",
     key: "contact_person",
     cell: (row) => <>{row?.contact_person}</>,
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
           onClick={() => handleSupplierView(row.id)}
         >
           <i class='fas fa-solid fa-eye'></i>
           view
         </button>
         <div
           class={`custom-control custom-switch x  ${
             row.is_active
               ? " custom-switch-on-success"
               : "custom-switch-off-danger"
           } `}
         >
           <input
             type='checkbox'
             class='custom-control-input'
             id='customSwitch3'
             checked={row.is_active}
             onChange={() => {
               handleSwitchChange(row.id, row.is_active);
             }}
           />
           <label
             class={`custom-control-label ${
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
                  onClick={() => handleSupplierAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <SupplierTable
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
export default Supplier;

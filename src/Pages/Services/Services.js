import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ServicesTable from "../../Components/Common/Table";
import { useNavigate } from "react-router-dom";
import { getServicesData } from "../../Actions/servicesActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Services = ({ Data, Success, Error, Loading }) => {
  const [tableData, setTableData] = useState(Data || []);
  const [show, setShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const successStatusData = Success;
  const errorStatusData = Error;
  const deleteConfirmMessage = "Are you sure you want to delete this Service?";
  const responseMessage = {
    success: "Service deleted successfully",
  };


  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleServiceDelete = (id) => {
    dispatch(getServicesData("delete", id));
  };

  const handleServiceEdit = (id) => {
    navigate(`/services/edit-services/${id}`);
  };

  const handleServiceAdd = () => {
    navigate("/services/add-services");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const confirmDelete = () => {
    handleServiceDelete(itemToDelete);
    setTableData(tableData.filter((obj) => obj.id !== itemToDelete));
    handleClose();
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
      header: "Service Name",
      key: "service_name",
      cell: (row) => <>{row?.service_name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Role",
      key: "role_name",
      cell: (row) => <>{row?.role_name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Type",
      key: "type",
      cell: (row) => <>{row?.type}</>,
      tdClassName: "",
      thClassName: "",
    },

    {
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <>
          <button
            className='btn btn-info btn-sm'
            onClick={() => handleServiceEdit(row.id)}
          >
            <i className='fas fa-pencil-alt'></i>
            Edit
          </button>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => handleDelete(row.id)}
          >
            <i className='fas fa-trash'></i>
            Delete
          </button>
        </>
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
              <h1>Services</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Services</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Services</h3>

              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleServiceAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <ServicesTable
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deleteConfirmMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Services;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import WorkTypeTable from "../../Components/Common/Table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWorkTypeData } from "../../Actions/workTypeActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function WorkType({ Data, Success, Error, Loading }) {
  const [tableData, setTableData] = useState(Data || []);

  const [show, setShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const successStatusData = Success;
  const errorStatusData = Error;
  const deleteConfirmMessage =
    "Are you sure you want to delete this work type?";
  const responseMessage = {
    success: "Work type deleted successfully",
  };
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const navigate = useNavigate();
  const handleWorkTypeDelete = (id) => {
    dispatch(getWorkTypeData("delete", id));
  };
  const handleWorkTypeEdit = (id) => {
    navigate(`/work-types/edit-work-type/${id}`);
  };
  const handleWorkTypeAdd = () => {
    navigate("/work-types/add-work-type");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };
  const confirmDelete = () => {
    handleWorkTypeDelete(itemToDelete);
    setTableData(tableData.filter((obj) => obj.id !== itemToDelete));
    handleClose();
  };
  const columns = [
    {
      header: "Work Type",
      key: "worktype",
      cell: (row) => <>{row?.worktype}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <div className='d-flex justify-content-around'>
          <a
            className='btn btn-info btn-sm'
            onClick={() => handleWorkTypeEdit(row.id)}
          >
            <i className='fas fa-pencil-alt'></i>
          </a>
          <a
            className='btn btn-danger btn-sm'
            onClick={() => handleDelete(row.id)}
          >
            <i className='fas fa-trash'></i>
          </a>
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
              <h1>Work Type</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Work Type</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Work Type</h3>

              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleWorkTypeAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <WorkTypeTable
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
}

export default WorkType;

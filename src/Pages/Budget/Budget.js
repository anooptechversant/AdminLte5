import React, { useEffect, useState } from "react";
import BudgetTable from "../../Components/Common/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBudgetData } from "../../Actions/budgetActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Budget = ({ Data, Success, Error, Loading }) => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(Data || []);
  const [show, setShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const successStatusData = Success;
  const errorStatusData = Error;
 
  const handleBudgetDelete = (id) => {
    dispatch(getBudgetData("delete", user_id, id));
  };
  const deleteConfirmMessage = "Are you sure you want to delete this Budget?";
  const responseMessage = {
    success: "Budget deleted successfully",
  };
  // const handleBudgetView = (id) => {
  //   setModalShow(true);
  //   const filteredData = Data.filter((obj) => obj.id == id);
  //   setShowData(filteredData);
  // };
  const handleBudgetEdit = (budget_id) => {
    navigate(`/budget/edit-budget/${user_id}/${budget_id}`);
  };
  const handleBudgetAdd = () => {
    navigate(`/budget/add-budget/${user_id}`);
  };
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const confirmDelete = () => {
    handleBudgetDelete(itemToDelete);
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
      header: "Price",
      key: "price",
      cell: (row) => <>{row?.price}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Unit",
      key: "unit",
      cell: (row) => <>{row?.unit}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: <span>Actions</span>,
      key: "",
      cell: (row) => (
        <div className='d-flex justify-content-around'>
          {user_id && (
            <button
              className='btn btn-info btn-sm'
              onClick={() => handleBudgetEdit(row.id)}
            >
              <i className='fas fa-pencil-alt'></i>
              Edit
            </button>
          )}
          <button
            className='btn btn-danger btn-sm'
            onClick={() => handleDelete(row.id)}
          >
            <i className='fas fa-trash'></i>
            Delete
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
              <h1>Budget</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Budget</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Budget</h3>

              {user_id && (
                <div className='card-tools'>
                  <button
                    className='btn btn-tool pointer-event'
                    onClick={() => handleBudgetAdd()}
                  >
                    <i className='fa fa-plus'></i> Add
                  </button>
                </div>
              )}
            </div>
            <BudgetTable
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

export default Budget;

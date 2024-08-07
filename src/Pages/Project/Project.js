import React, { useEffect, useState } from "react";
import ProjectTable from "../../Components/Common/Table";
import { useDispatch } from "react-redux";
import { getProjectData } from "../../Actions/projectActions";
import ViewProject from "./ViewProject";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Project = ({ Data, Success, Error, Loading }) => {
  const [tableData, setTableData] = useState(Data || []);
  const [show, setShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [showData, setShowData] = useState([]);
  const successStatusData = Success;
  const errorStatusData = Error;
  const loadingWorkType = Loading;
  const pageTitle = "Projects";
  const tableTitle = "Projects";
  const deleteConfirmMessage = "Are you sure you want to delete this Project?";
  const responseMessage = {
    success: "Project deleted successfully",
  };
  useEffect(() => {
    setTableData(Data);
  }, [Data]);
  const projectColumns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
  ];
  const handleProjectDelete = (id) => {
    dispatch(getProjectData("delete", id));
  };
  const handleProjectView = (id) => {
    setModalShow(true);
    const filteredData = Data.filter((obj) => obj.id == id);
    setShowData(filteredData);
  };
  const handleProjectAdd = () => {
    navigate(`/project/add-project/${user_id}`);
  };

  const handleProjectEdit = (id) => {
    navigate(`/project/edit-project/${user_id}/${id}`);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const confirmDelete = () => {
    handleProjectDelete(itemToDelete);
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
      header: "Name",
      key: "name",
      cell: (row) => <>{row?.name}</>,
      tdClassName: "",
      thClassName: "",
    },

    {
      header: "Description",
      key: "description",
      cell: (row) => <>{row?.description}</>,
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
            onClick={() => handleProjectView(row.id)}
          >
            <i class='fas fa-solid fa-eye'></i>
          </button>
          {user_id && (
            <button
              className='btn btn-info btn-sm'
              onClick={() => handleProjectEdit(row.id)}
            >
              <i className='fas fa-pencil-alt'></i>
            </button>
          )}
          <button
            className='btn btn-danger btn-sm'
            onClick={() => handleDelete(row.id)}
          >
            <i className='fas fa-trash'></i>
          </button>
        </div>
      ),
      tdClassName: "project-actions text-center",
      thClassName: "text-center",
    },
  ];
  return (
    <>
      <ViewProject
        Data={showData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <>
        {" "}
        <section className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                <h1>Projects</h1>
              </div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'>
                    <a href='/'>Home</a>
                  </li>
                  <li className='breadcrumb-item active'>Projects</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className='content'>
          <div className='container-fluid'>
            <div className='card'>
              <div className='card-header'>
                <h3 className='card-title'>Projects</h3>

                {user_id && (
                  <div className='card-tools'>
                    <button
                      className='btn btn-tool pointer-event'
                      onClick={() => handleProjectAdd()}
                    >
                      <i className='fa fa-plus'></i> Add
                    </button>
                  </div>
                )}
              </div>
              <ProjectTable
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
    </>
  );
};

export default Project;

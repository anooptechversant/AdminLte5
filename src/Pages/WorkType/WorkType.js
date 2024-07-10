/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import WorkTypeTable from "../../Components/Common/Table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWorkTypeData } from "../../Actions/workTypeActions";
function WorkType({ Data, Success, Error, Loading }) {
  const dispatch = useDispatch();

  // const deleteConfirmMessage =
  //   "Are you sure you want to delete this work type?";
  // const responseMessage = {
  //   success: "Work type deleted successfully",
  // };
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
  const columns = [
    {
      header: "#",
      key: "SL.No",
      cell: (row, i) => <>{i + 1}</>,
      tdClassName: "",
      thClassName: "w-1",
    },

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
        <span>
          <a
            className='btn btn-info btn-sm'
            onClick={() => handleWorkTypeEdit(row.id)}
          >
            <i class='fas fa-pencil-alt'></i>
            Edit
          </a>
          <a
            className='btn btn-danger btn-sm'
            onClick={() => handleWorkTypeDelete(row.id)}
          >
            <i class='fas fa-trash'></i>
            Delete
          </a>
        </span>
      ),
      tdClassName: "project-actions text-center",
      thClassName: "project-actions text-center",
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          {/* <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1> */}
        </div>
      </div>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Work Type</h3>

          <div className='card-tools'>
            <button className='btn btn-tool' onClick={() => handleWorkTypeAdd()}>
              <i class='fa fa-plus'></i> Add
            </button>
          </div>
        </div>
        <WorkTypeTable
          Columns={columns}
          Data={Data}
          loading={Loading}
          Error={Error}
          ErrorText={"No data available"}
        />
      </div>
    </div>
  );
}

export default WorkType;

import { useEffect, useState } from "react";
import B2BUserTable from "../../Components/Common/Table";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Actions/userActions";

import ViewUser from "../User/ViewUser";
import { Link, useNavigate } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";

const B2BUser = (props) => {
  const {
    RolesData,
    unapprovedData,
    Success,
    Error,
    Loading,
    unapprovedCurrentPageChange,
    unapprovedLimitChange,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resMsg, setResMsg] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [showData, setShowData] = useState([]);
  const [data, setData] = useState(unapprovedData.records);
  const [inputLimit, setInputLimit] = useState({
    limit: 8,
  });
  const [inputRole, setInputRole] = useState({
    role: "",
  });
  const [validationError, setValidationError] = useState({
    role: "",
  });

  const unapprovedRecords = unapprovedData.records;
  const unapprovedCurrentPage = unapprovedData.current_page;
  const unapprovedTotalPages = unapprovedData.total_pages;
  const successStatusData = Success;
  const errorStatusData = Error;
  const pageTitle = "B2B User";
  const tableTitle = "UnApproved Users";
  const deleteConfirmMessage = "Are you sure you want to delete this User?";

  const responseMessage = {
    success:
      resMsg === true
        ? "User deleted successfully"
        : "User approved successfully",
  };
  const productColumns = [
    { key: "id", name: "Prod.ID" },
    { key: "name", name: "User Name" },
    // { key: "phone_prefix", name: "Country code" },
    { key: "phone", name: "Phone No:" },
    { key: "email", name: "Email" },
    // { key: "role", name: "Role" },

    // Add more columns as needed
  ];

  const handleApprove = (id) => {
    setResMsg(false);
    const data = {
      is_approved: true,
    };
    dispatch(getUserData("update", data, id));
  };

  const handleRolesDelete = (id) => {
    setResMsg(true);
    dispatch(getUserData("delete", id));
  };
  const handleUserView = (id) => {
    setModalShow(true);
    const filteredData = unapprovedRecords.filter((obj) => obj.id == id);
    setShowData(filteredData);
  };
  const handleDetailedView = (id) => {
    navigate(`/users/view-user/${id}`);
  };
  const roleArray = RolesData.filter((role) => role.type === "B2B") // Filter roles with type B2B
    .map((role) => ({
      option: role.role,
      value: role.id,
    }));

  const handleRoleChange = (newValue) => {
    setInputRole((prevState) => ({
      ...prevState,
      role: newValue.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      role: newValue.value !== "" ? "" : "Select Role",
    }));
  };
  // Function to sort data based on the selected role
  const sortDataByRole = (roleID) => {
    return unapprovedRecords.filter((record) => record.role == roleID);
  };
  useEffect(() => {
    if (inputRole.role) {
      const sortedData = sortDataByRole(inputRole.role);
      // Update state with sorted data
      setData(sortedData);
    } else {
      // If no option is selected, return the initial data
      setData(unapprovedRecords);
    }
  }, [inputRole.role, unapprovedRecords]);

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
    if (unapprovedLimitChange) {
      unapprovedLimitChange(newValue.value);
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
      header: "User Name",
      key: "name",
      cell: (row) => <>{row?.name}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Country code",
      key: "phone_prefix",
      cell: (row) => <>{row?.phone_prefix}</>,
      tdClassName: "",
      thClassName: "",
    },
    {
      header: "Phone No.",
      key: "phone",
      cell: (row) => <>{row?.phone}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
    },
    {
      header: "Email",
      key: "email",
      cell: (row) => <>{row?.email}</>,
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
            onClick={() => handleUserView(row.id)}
          >
            <i class='fas fa-solid fa-eye'></i>
          </button>
          <button
            className='btn btn-warning btn-sm text-nowrap'
            onClick={() => handleApprove(row.id)}
          >
            <i class='fas fa-check'></i>
          </button>{" "}
          <button
            className='btn btn-danger btn-sm'
            onClick={() => handleRolesDelete(row.id)}
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
    <div className='container-fluid'>
      <ViewUser
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
                    Role <span className='errorLabel'>*</span>
                  </label>
                  {/* <div className='w-100'> */}
                  <SelectionInput
                    propOnChange={handleRoleChange}
                    propValidationError={""}
                    propAttributeValue='role'
                    firstOption='Show All'
                    options={roleArray}
                    propValue={inputRole?.role}
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
              <B2BUserTable
                Columns={columns}
                Data={data}
                loading={Loading}
                Error={Error}
                CurrentPage={unapprovedCurrentPage}
                currentPageChange={unapprovedCurrentPageChange}
                TotalPages={unapprovedTotalPages}
                ErrorText={"No data available"}
                ResponseMessage={responseMessage}
                StatusData={{ successStatusData, errorStatusData }}
              />
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default B2BUser;

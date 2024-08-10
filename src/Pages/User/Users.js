import { useEffect, useState } from "react";
import UserTable from "../../Components/Common/Table";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import SelectionInput from "../../Components/InputComponents/SelectionInput";
export default function Users(props) {
  const { Data, Success, Error, Loading, currentPageChange, limitChange } =
    props;
  const records = Data.records;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resMsg, setResMsg] = useState(true);
  const [tableData, setTableData] = useState(records || []);
  const [inputLimit, setInputLimit] = useState({
    limit: 8,
  });
  const currentPage = Data.current_page;
  const totalPages = Data.total_pages;

  const successStatusData = Success;
  const errorStatusData = Error;
  const pageTitle = "User List";
  const tableTitle = "User";

  const responseMessage = {
    success:
      resMsg === true
        ? "User deleted successfully"
        : "User approved successfully",
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

  const handleRolesDelete = (id) => {
    setResMsg(true);
    dispatch(getUserData("delete", id));
  };

  const handleDetailedView = (id) => {
    navigate(`/users/view-user/${id}`);
  };

  useEffect(() => {
    setTableData(records);
  }, [records]);
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
      thClassName: "text-nowrap",
    },
    {
      header: "Country code",
      key: "phone_prefix",
      cell: (row) => <>{row?.phone_prefix}</>,
      tdClassName: "",
      thClassName: "text-nowrap",
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
            onClick={() => handleDetailedView(row.id)}
          >
            <i class='fas fa-solid fa-eye'></i>
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
                {/* <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleProductAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button> */}
              </div>
            </div>
            <UserTable
              Columns={columns}
              Data={tableData}
              loading={Loading}
              Error={Error}
              CurrentPage={currentPage}
              currentPageChange={currentPageChange}
              TotalPages={totalPages}
              ErrorText={"No data available"}
              ResponseMessage={responseMessage}
              StatusData={{ successStatusData, errorStatusData }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

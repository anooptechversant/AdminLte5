import React, { Fragment, useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import Pagination from "react-bootstrap/Pagination";
import Toasts from "./Toasts";

const Table = ({
  Data,
  Columns,
  Error,
  loading,
  ErrorText,
  CurrentPage,
  currentPageChange,
  TotalPages,
  itemsPerPage = 10,
  ResponseMessage,
  StatusData,
}) => {
  const [currentPage, setCurrentPage] = useState(CurrentPage || 1);
  const totalPages = TotalPages || Math.ceil(Data?.length / itemsPerPage);

  useEffect(() => {
    if (currentPageChange) currentPageChange(currentPage);
  }, [currentPage, currentPageChange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const getPageRange = () => {
    const pageRange = [];
    const visiblePages = 5; // Number of pagination buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageRange.push(page);
    }

    return pageRange;
  };

  const pageRange = getPageRange();

  const paginatedData = CurrentPage
    ? Data
    : Data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const modifiedColumns = [
    {
      header: "#",
      key: "serialNumber",
      cell: (row, rowIndex) => (
        <>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</>
      ),
      tdClassName: "",
      thClassName: "w-1 ",
    },
    ...Columns,
  ];
  return (
    <>
      {loading && <Loading />}
      <Toasts
        propResponseMessage={ResponseMessage}
        propActionType={"success"}
        propStatusData={StatusData}
      />
      <div className='card-body p-0 table-responsive'>
        <table className='table table-striped projects'>
          <thead>
            <tr>
              {modifiedColumns.map((column, index) => (
                <th key={index} className={column.thClassName}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading && (Error || Data?.length === 0) && (
              <tr className='h-[57px]'>
                <td colSpan={100} className='px-6 py-4 text-gray-400 text-xs'>
                  {ErrorText}
                </td>
              </tr>
            )}
            {paginatedData &&
              paginatedData.map((row, rowIndex) => (
                <tr key={`expandRow-${rowIndex}`}>
                  {modifiedColumns.map((column, colIndex) => (
                    <td
                      key={`expandCol-${colIndex}`}
                      className={column.tdClassName}
                    >
                      {column.cell
                        ? column.cell(row, rowIndex)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-end card-header p-3'>
        <Pagination>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {pageRange[0] > 1 && (
            <Pagination.Ellipsis
              onClick={() => setCurrentPage(pageRange[0] - 1)}
            />
          )}
          {pageRange.map((page) => (
            <Pagination.Item
              key={page}
              active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          {pageRange[pageRange.length - 1] < totalPages && (
            <Pagination.Ellipsis
              onClick={() =>
                setCurrentPage(pageRange[pageRange.length - 1] + 1)
              }
            />
          )}
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      </div>
    </>
  );
};

export default Table;

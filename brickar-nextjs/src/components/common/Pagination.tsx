import 'react-responsive-pagination/themes/classic.css';
import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  dashBoard?: boolean;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  dashBoard,
  currentPage,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    !dashBoard && (
      <div className="mb-3 mt-6">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="rounded border px-2 py-1 disabled:opacity-50"
          >
            First
          </button>

          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
            maxWidth={3}
          />

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded border px-2 py-1 disabled:opacity-50"
          >
            Last
          </button>
        </div>

        {!dashBoard && (
          <div className="mt-2 text-center">
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    )
  );
};

export default Pagination;

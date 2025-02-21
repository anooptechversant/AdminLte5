import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HiChevronDoubleRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';

interface PaginationProps {
  total: number;
  displayTotal?: boolean;
  pageSize?: number;
  className?: string;
  currentPage?: number;
  onChange?: (page: number) => void;
  onlyArrow?: boolean;
}

interface PagerProps {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
  pagerClass: {
    default: string;
    inactive: string;
    active: string;
    disabled: string;
  };
}

const PAGER_COUNT = 7;

const NextMore: React.FC<{
  className: string;
  onArrow: (arrow: string) => void;
}> = ({ className, onArrow }) => {
  const [quickNextArrowIcon, setQuickNextArrowIcon] = useState(false);

  return (
    <li
      className={className}
      onMouseEnter={() => setQuickNextArrowIcon(true)}
      onMouseLeave={() => setQuickNextArrowIcon(false)}
      onClick={() => onArrow('nextMore')}
    >
      {quickNextArrowIcon ? (
        <HiChevronDoubleRight />
      ) : (
        <HiOutlineDotsHorizontal />
      )}
    </li>
  );
};

const PrevMore: React.FC<{
  className: string;
  onArrow: (arrow: string) => void;
}> = ({ className, onArrow }) => {
  const [quickPrevArrowIcon, setQuickPrevArrowIcon] = useState(false);

  return (
    <li
      className={className}
      onMouseEnter={() => setQuickPrevArrowIcon(true)}
      onMouseLeave={() => setQuickPrevArrowIcon(false)}
      onClick={() => onArrow('prevMore')}
    >
      {quickPrevArrowIcon ? (
        <HiOutlineChevronDoubleLeft />
      ) : (
        <HiOutlineDotsHorizontal />
      )}
    </li>
  );
};

const Pagers: React.FC<PagerProps> = ({
  pageCount,
  currentPage,
  onChange,
  pagerClass,
}) => {
  const [showPrevMore, setShowPrevMore] = useState(false);
  const [showNextMore, setShowNextMore] = useState(false);

  useEffect(() => {
    if (pageCount > PAGER_COUNT) {
      setShowPrevMore(currentPage > PAGER_COUNT - 2);
      setShowNextMore(currentPage < pageCount - 2);
    } else {
      setShowPrevMore(false);
      setShowNextMore(false);
    }
  }, [currentPage, pageCount]);

  const onPagerClick = (value: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newPage = Math.max(1, Math.min(value, pageCount));
    if (newPage !== currentPage) {
      onChange(newPage);
    }
  };

  const onArrowClick = useCallback(
    (arrow: string) => {
      let newPage = currentPage;
      if (arrow === 'nextMore') newPage += 5;
      if (arrow === 'prevMore') newPage -= 5;
      onChange(Math.max(1, Math.min(newPage, pageCount)));
    },
    [currentPage, onChange, pageCount],
  );

  const getPages = useMemo(() => {
    const pagerArray: number[] = [];
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (PAGER_COUNT - 2);
      for (let i = startPage; i < pageCount; i++) pagerArray.push(i);
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < PAGER_COUNT; i++) pagerArray.push(i);
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(PAGER_COUNT / 2) - 1;
      for (let i = currentPage - offset; i <= currentPage + offset; i++)
        pagerArray.push(i);
    } else {
      for (let i = 2; i < pageCount; i++) pagerArray.push(i);
    }
    return pagerArray.length > PAGER_COUNT - 2 ? [] : pagerArray;
  }, [showPrevMore, showNextMore, currentPage, pageCount]);

  const getPagerClass = (index: number) => {
    return classNames(
      pagerClass.default,
      currentPage === index ? pagerClass.active : pagerClass.inactive,
    );
  };

  return (
    <ul>
      {pageCount > 0 && (
        <li
          className={getPagerClass(1)}
          onClick={(e) => onPagerClick(1, e)}
          tabIndex={0}
        >
          1
        </li>
      )}
      {showPrevMore && (
        <PrevMore
          onArrow={onArrowClick}
          className={classNames(pagerClass.default, pagerClass.inactive)}
        />
      )}
      {getPages.map((pager) => (
        <li
          key={pager}
          className={getPagerClass(pager)}
          onClick={(e) => onPagerClick(pager, e)}
          tabIndex={0}
        >
          {pager}
        </li>
      ))}
      {showNextMore && (
        <NextMore
          onArrow={onArrowClick}
          className={classNames(pagerClass.default, pagerClass.inactive)}
        />
      )}
      {pageCount > 1 && (
        <li
          className={getPagerClass(pageCount)}
          onClick={(e) => onPagerClick(pageCount, e)}
          tabIndex={0}
        >
          {pageCount}
        </li>
      )}
    </ul>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  displayTotal = false,
  pageSize = 10,
  className,
  currentPage = 1,
  onChange,
  onlyArrow = false,
}) => {
  const [paginationTotal, setPaginationTotal] = useState(total);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);

  const getInternalPageCount = useMemo(() => {
    return Math.ceil(paginationTotal / internalPageSize);
  }, [paginationTotal, internalPageSize]);

  const getValidCurrentPage = useCallback(
    (count: number) => {
      const value = parseInt(count.toString(), 10);
      const internalPageCount = getInternalPageCount;
      let resetValue;
      if (value < 1) resetValue = 1;
      if (value > internalPageCount) resetValue = internalPageCount;
      return resetValue ?? value;
    },
    [getInternalPageCount],
  );

  useEffect(() => {
    setPaginationTotal(total);
    setInternalPageSize(pageSize);
    setInternalCurrentPage(getValidCurrentPage(currentPage));
  }, [total, pageSize, currentPage, getValidCurrentPage]);

  const onPaginationChange = (val: number) => {
    const newPage = getValidCurrentPage(val);
    setInternalCurrentPage(newPage);
    onChange?.(newPage);
  };

  const onPrev = useCallback(() => {
    const newPage = internalCurrentPage - 1;
    onPaginationChange(newPage);
  }, [internalCurrentPage]);

  const onNext = useCallback(() => {
    const newPage = internalCurrentPage + 1;
    onPaginationChange(newPage);
  }, [internalCurrentPage]);

  const pagerClass = {
    default: 'pagination-pager',
    inactive: 'pagination-pager-inactive',
    active: 'pagination-pager-active',
    disabled: 'pagination-pager-disabled',
  };

  const paginationClass = classNames('pagination', className);

  return (
    <div className={paginationClass}>
      {displayTotal && (
        <div className="pagination-total">
          Total <span>{total}</span> Items
        </div>
      )}
      <div
        className={`relative box-border flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2 overflow-hidden ${
          internalCurrentPage <= 1
            ? 'cursor-not-allowed opacity-75'
            : 'cursor-pointer'
        }`}
        onClick={onPrev}
      >
        <ArrowLeft />
        {!onlyArrow && (
          <p className="flex-shrink-0 flex-grow-0 whitespace-pre-wrap text-left text-sm font-semibold leading-5 text-gray-600 dark:text-gray-200">
            Previous
          </p>
        )}
      </div>
      <Pagers
        onChange={onPaginationChange}
        pageCount={getInternalPageCount}
        currentPage={internalCurrentPage}
        pagerClass={pagerClass}
      />
      <div
        className={`relative box-border flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2 overflow-hidden ${
          internalCurrentPage === getInternalPageCount
            ? 'cursor-not-allowed opacity-75'
            : 'cursor-pointer'
        }`}
        onClick={onNext}
      >
        {!onlyArrow && (
          <p className="flex-shrink-0 flex-grow-0 whitespace-pre-wrap text-left text-sm font-semibold leading-5 text-gray-600 dark:text-gray-200">
            Next
          </p>
        )}
        <ArrowRight />
      </div>
    </div>
  );
};

export default Pagination;

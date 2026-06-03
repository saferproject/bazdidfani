import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const usePaginationFilter = ({
  initialSearchTerm = { paginate: 1 },
  type = "urlSearchParams",
  setValue,
  addFilter,
  removeFilter,
  filters,
  debounceDelay = 500, // اضافه کردم - قابل تنظیم
}) => {
  const [pagination, setPagination] = useState({ lastPage: 0, curPage: 1 });
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams(initialSearchTerm);
  
  // اضافه کردم برای debounce
  const debounceRef = useRef(null);

  const filterHandler = (
    name,
    value,
    filterName,
    filterValue,
    shouldDebounce = true, // اضافه کردم - برای کنترل debounce
    isResetPaginate = true,
  ) => {
    // setValue باید فوری اجرا بشه تا input responsive باشه
    setValue && setValue(name, value);
    
    // اگر debounce نیاز نیست (مثل pagination)، فوری اجرا کن
    if (!shouldDebounce) {
      executeFilter(name, value, filterName, filterValue, isResetPaginate);
      return;
    }

    // پاک کردن timeout قبلی
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // تنظیم timeout جدید
    debounceRef.current = setTimeout(() => {
      executeFilter(name, value, filterName, filterValue, isResetPaginate);
    }, debounceDelay);
  };

  // تابع اصلی فیلتر که قبلا filterHandler بود
  const executeFilter = (
    name,
    value,
    filterName,
    filterValue,
    isResetPaginate = true
  ) => {
    isResetPaginate && resetPaginate();
    
    if (type === "state") {
      if (filterValue || filterValue === 0)
        setSearchTerm((preState) => ({
          ...preState,
          [filterName]: filterValue,
        }));
      else {
        const newState = { ...searchTerm };
        delete newState[filterName];
        setSearchTerm(newState);
      }
    } else if (type === "urlSearchParams") {
      if (filterValue || filterValue === 0) {
        searchParams.set(filterName, filterValue);
      } else {
        searchParams.delete(filterName);
      }
      setSearchParams(searchParams);
    }
  };

  const pageChangeHandler = (target, pageNumber) => {
    setPagination((preState) => ({
      ...preState,
      curPage: pageNumber,
    }));
    // pagination نباید debounce بشه - shouldDebounce: false
    filterHandler("page", pageNumber, "page", pageNumber, false, false);
  };

  const resetPaginate = () => {
    setPagination((preState) => ({
      ...preState,
      curPage: 1,
    }));
    if (type === "urlSearchParams") {
      filterHandler("page", 1, "page", 1, false, false); // pagination بدون debounce
    } else if (type === "state") {
      setSearchTerm((preState) => ({
        ...preState,
        page: 1,
      }));
    }
  };

  const updateLastPage = (lastPage) => {
    setPagination((preState) => ({
      ...preState,
      lastPage: lastPage,
    }));
  };

  // Helper function برای ساخت URLSearchParams
  const getSearchParams = () => {
    return new URLSearchParams(searchTerm);
  };

  // اضافه کردم - برای پاک کردن pending timeouts
  const clearPendingFilters = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };

  // cleanup در useEffect
  useEffect(() => {
    if (
      ((filters && Object?.keys(filters || {})?.length === 0) || !filters) &&
      type !== "state"
    )
      setSearchParams("", { replace: false });
    
    // cleanup function
    return () => {
      clearPendingFilters();
    };
  }, []);

  return {
    // States
    pagination,
    searchTerm,

    // Functions
    filterHandler,
    pageChangeHandler,
    resetPaginate,
    updateLastPage,
    getSearchParams,
    clearPendingFilters, // اضافه کردم

    // Direct setters (اگر نیاز به کنترل مستقیم باشد)
    setPagination,
    setSearchTerm,
  };
};

export default usePaginationFilter;
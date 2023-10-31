import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  actionGetJobOpeningCandidates,
  actionGetJobOpeningVacancies,
} from "../../../../../actions/JobOpeningDetail.action";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const totalShow = 10;
const useVacancyList = ({ jobId }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const { isVacanciesFetching, vacancies } = useSelector(
    (state) => state.job_opening_detail
  );
  const [rejectDialog, setRejectDialog] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [ids, setIds] = useState(null);
  const [empDetail, setEmpDetail]=useState(null);

  useEffect(() => {
    dispatch(actionGetJobOpeningVacancies(jobId));
  }, []);

  
  useEffect(() => {
    setData(vacancies);
  }, [vacancies]);

  useEffect(() => {
    _processData();
  }, [data, currentPage]);

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.EMPLOYEE_DETAIL}${data?.employee?.emp_code}`
    );
  }, []);

  const _processData = useCallback(() => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;
    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  }, [setCurrentData, currentPage, data, totalShow]);

  const handlePageChange = useCallback(
    (type) => {
      if (Math.ceil(data.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, data]
  );

  const handleSortOrderChange = (row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  };

  const handleRowSize = (page) => {
    console.log(page);
  };

  const queryFilter = useCallback((key, value) => {
    console.log("_queryFilter", key, value);
  }, []);

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
      if (value) {
        const tempData = vacancies.filter((val) => {
          if (
            val?.employee?.name?.match(new RegExp(value, "ig")) ||
            val?.designation?.match(new RegExp(value, "ig"))
          ) {
            return val;
          }
        });
        setData(tempData);
      } else {
        setData(vacancies);
      }
    },
    [queryFilter, _processData, data, setData, vacancies]
  );

  const toggleRejectDialog = useCallback(
    (data) => {
      setIds(data?.id);
      setRejectDialog((e) => !e);
    },
    [rejectDialog]
  );

  const toggleIsOpenDialog = useCallback(
    (data) => {
    
      setEmpDetail(data)
      setIsOpenDialog((e) => !e);
    },
    [isOpenDialog]
  );

  return {
    handlePageChange,
    // handleCellClick,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isVacanciesFetching,
    data: vacancies,
    currentData,
    currentPage,
    handleViewDetails,
    rejectDialog,
    toggleRejectDialog,
    ids,
    toggleIsOpenDialog,
    isOpenDialog,
    empDetail
  };
};

export default useVacancyList;

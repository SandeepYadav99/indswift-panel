import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogUtils from "../../../../../libs/LogUtils";
import {  actionGetJobOpeningVacancies } from "../../../../../actions/ImprestApprovalDetail.action copy";

const totalShow = 10;

const useOtherTable = ({ jobId ,Claimtype}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const { isVacanciesFetching, vacancies } = useSelector(
    (state) => state.imprest_detail
  );
  useEffect(() => {
    if (jobId) {
      dispatch(actionGetJobOpeningVacancies(jobId, Claimtype));
    }
  }, [jobId]);

  useEffect(() => {
    setData(vacancies);
  }, [vacancies,jobId]);

  useEffect(() => {
    _processData();
  }, [data,currentPage,jobId]);
  
  const _processData = useCallback(() => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;
    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  }, [setCurrentData, currentPage, data, totalShow,jobId]);

  const handlePageChange = useCallback(
    (type) => {
      if (Math.ceil(data?.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData()
      }
    },
    [_processData, setCurrentPage, data,jobId]
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

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isVacanciesFetching,
    data: vacancies,
    currentData,
    currentPage,
  };
};

export default useOtherTable;

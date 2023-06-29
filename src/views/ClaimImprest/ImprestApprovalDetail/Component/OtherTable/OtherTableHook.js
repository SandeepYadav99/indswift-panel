import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogUtils from "../../../../../libs/LogUtils";
import {  actionGetJobOpeningVacancies } from "../../../../../actions/ImprestApprovalDetail.action copy";

const totalShow = 20;

const useOtherTable = ({ jobId ,Claimtype}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
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
    _processData();
  }, [vacancies]);

  const _processData = useCallback(() => {
    const data = vacancies;
    const from = (currentPage + 1) * totalShow - totalShow;
    let to = (currentPage + 1) * totalShow;
    LogUtils.log("from", from, to);
    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  }, [setCurrentData, currentPage, vacancies]);

  const handlePageChange = useCallback(
    (type) => {
      const data = vacancies;
      if (Math.ceil(data.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, vacancies]
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
    },
    [queryFilter]
  );

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isVacanciesFetching,
    currentData,
    data: vacancies,
    currentPage,
  };
};

export default useOtherTable;

import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  actionGetJobOpeningCandidates,
  actionGetJobOpeningVacancies
} from "../../../../../actions/JobOpeningDetail.action";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const totalShow = 10;
const useVacancyList = ({ jobId }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const {isVacanciesFetching, vacancies } = useSelector(state => state.job_opening_detail);

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
    historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data?.candidate_id}`); //+data.id
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
        // setCurrentPage(type + 1);
        // _processData()
      }
    },
    [_processData, setCurrentPage, data]
  );

  const handlePreviousPageClick = () => {
    console.log("handlePreviousPageClick", "PREV");
  };

  const handleNextPageClick = () => {
    console.log("handleNextPageClick", "NEXT");
  };

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
            val?.candidate?.name?.match(new RegExp(value, "ig")) ||
            val?.candidate?.email?.match(new RegExp(value, "ig"))
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

  const _handleDateChange = (date) => {
    // this.setState({
    //     selectedDate: date,
    // });
  };

  const _handleWarehouseChange = (e, data) => {
    console.log("handleWarehouseChange", e.target.value);
    const batchId = e.target.value;
  };

  return {
    handlePageChange,
    // handleCellClick,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,
    isVacanciesFetching,
    currentData,
    data: vacancies,
    currentPage,
    handleViewDetails,
  };
};

export default useVacancyList;

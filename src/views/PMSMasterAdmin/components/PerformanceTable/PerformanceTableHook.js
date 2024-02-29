import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { actionGetJobOpeningVacancies } from "../../../../actions/JobOpeningDetail.action";
import { serviceGetVacancies } from "../../../../services/Vacancy.service";
import { Snackbar } from "@material-ui/core";

const totalShow = 10;
const usePerformanceTable = ({ jobId }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [ids, setIds] = useState(null);

  useEffect(() => {
    let req = serviceGetVacancies({ job_id: "641ae2d493013aa185f8ea69" });
    req.then((res) => {
      if (!res?.error) {
        setData(res?.data);
      } else {
        Snackbar.error(res?.error);
      }
    });
  }, []);

  useEffect(() => {
    _processData();
  }, [data, currentPage]);

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

  return {
    handlePageChange,
    handleRowSize,
    handleSortOrderChange,
    data,
    currentData,
    currentPage,
    ids,
  };
};

export default usePerformanceTable;

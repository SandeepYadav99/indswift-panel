import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { serviceCreatePmsBatchAdmin } from "../../../../services/PmsMaster.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const totalShow = 10;
const usePerformanceTable = ({ Renderdata, getPmsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (Renderdata?.length > 0) {
      setData(Renderdata);
    }
  }, [Renderdata]);

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

  const handleCreateBatch = useCallback(() => {
    if (year && type) {
      console.log(year, type);
      serviceCreatePmsBatchAdmin({
        batch: type,
        year: year,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Approved");
          getPmsList();
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    } else {
      SnackbarUtils.error("Please select year and Batch");
    }
  }, [year, type, getPmsList]);

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
    year,
    type,
    setType,
    setYear,
    handleCreateBatch,
  };
};

export default usePerformanceTable;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  serviceCreatePmsBatchType,
  servicePmsBatchFreeze,
} from "../../../../services/PmsMaster.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const totalShow = 10;
const useReviewerTable = ({ Renderdata, getPmsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFrezzing, setIsFrezzing] = useState(false);

  useEffect(() => {
    if (Renderdata?.length > 0) {
      const filteredData = Renderdata?.filter(
        (item) => item?.reviewer_batch?.is_created
      );
      setData(filteredData ? filteredData : []);
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
    if (endDate && startDate) {
      const isStartDateGreaterThanEndDate = new Date(startDate) > new Date(endDate);
      if(isStartDateGreaterThanEndDate){
        SnackbarUtils.error("End Date cannot be smaller than Start Date")
        return true
      }
      setIsLoading(true);
      serviceCreatePmsBatchType({
        start_date: startDate,
        end_date: endDate,
        batch_type: "reviewer_batch",
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Created successfully");
          getPmsList();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsLoading(false)
      });
    } else {
      SnackbarUtils.error("Please select Start Date and End Date");
    }
  }, [endDate, startDate, getPmsList,isLoading,setIsLoading]);


  const handleFreeze = useCallback(() => {
    setIsFrezzing(true)
    servicePmsBatchFreeze({
      batch_type: "reviewer_batch",
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Freeze successfully");
        getPmsList();
      } else {
        SnackbarUtils.error(res?.message);
      }
      setIsFrezzing(false)
    });
  }, [endDate, startDate, getPmsList,isFrezzing,setIsFrezzing]);

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
    endDate,
    startDate,
    setStartDate,
    setEndDate,
    handleCreateBatch,
    handleFreeze,
    isFrezzing,
    isLoading
  };
};

export default useReviewerTable;

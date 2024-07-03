import  { useCallback, useEffect, useMemo, useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import { serviceGetEmployeeTaxList } from "../../../../../services/TaxList.service";

const totalShow = 10;
const useEmployeeTaxList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    let req = serviceGetEmployeeTaxList({ index: 1 });
    req.then((data) => {
      setData(data?.data);
    });
  }, []);

  useEffect(() => {
    _processData();
  }, [data, currentPage]);

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.EMPLOYEE_TAX_DETAILS}${data?.id}`);
  }, []);

  const handleViewUpdate = useCallback(() => {
    historyUtils.push(`${RouteName.CLAIMS_TAX}`);
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
  return {
    handlePageChange,
    handleRowSize,
    handleSortOrderChange,
    data,
    currentData,
    currentPage,
    handleViewDetails,
    handleViewUpdate
  };
};

export default useEmployeeTaxList;

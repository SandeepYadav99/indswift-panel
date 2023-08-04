import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchEmployeeLoanList,
  actionSetPageEmployeeLoanList,
} from "../../../../../actions/EmployeeLoanList.action";
import historyUtils from "../../../../../libs/history.utils";
import LogUtils from "../../../../../libs/LogUtils";
import RouteName from "../../../../../routes/Route.name";

const useEmployeeLoanList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.emp_loanList);
  useEffect(() => {
    dispatch(
      actionFetchEmployeeLoanList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEmployeeLoanList(type));
  }, []);

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      // dispatch(actionSetPageEmployeeLoanList(1));
      dispatch(
        actionFetchEmployeeLoanList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EMPLOYEE_LOAN_DETAILS}${data?.id}`); //+data.id
  }, []);


  return {
    handlePageChange,
    handleRowSize,
    handleSortOrderChange,
    handleViewDetails,
    isCalling,
  };
};

export default useEmployeeLoanList;

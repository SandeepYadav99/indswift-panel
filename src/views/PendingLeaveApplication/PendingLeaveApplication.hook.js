import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { actionLeaveList } from "../../actions/LeaveModule.action";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  actionCreateEmployee,
  actionFetchEmployee,
  actionSetPageEmployeeRequests,
  actionUpdateEmployee,
} from "../../actions/Employee.action";
import { actionLeavesListData } from "../../actions/LeaveModule.action.js";
import { serviceGetList } from "../../services/Common.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import { useMemo } from "react";
import constants from "../../config/constants";

function usePendingLeaveApplication() {
  const dispatch = useDispatch();
 
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
    JOINING_CANDIDATES: [],
    TRAINEE_EMPLOYEES: [],
  });
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.employee);

  let LeaveParameters = {
    index: 1,
    row: "createdAt",
    order: "desc",
    query: "",
    query_data: null,
  };

  const initData = useCallback(() => {
    dispatch(
      actionFetchEmployee(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    dispatch(actionLeavesListData(LeaveParameters));
    dispatch(actionLeaveList(LeaveParameters));
  }, []);



  useEffect(() => {
    initData();
    isMountRef.current = true;
    serviceGetList([
      "LOCATIONS",
      "GRADES",
      "DEPARTMENTS",
      "JOINING_CANDIDATES",
      "TRAINEE_EMPLOYEES",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageEmployeeRequests(type));
  }, []);
 


  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchEmployee(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(
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

 
  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "claimObj.status",
        type: "select",
        fields: [
          "REJECTED",
          "PENDING",
          "APPROVED",
          "PROCESSED",
          "RECRUITER_APPROVED",
          "CORPORATE_AUDIT_2_APPROVED",
        ],
      },
    ];
  }, [listData]);
 

  const { id } = useParams();

  return {
    id,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSortOrderChange, 
    configFilter,
    listData,
  };
}

export default usePendingLeaveApplication;

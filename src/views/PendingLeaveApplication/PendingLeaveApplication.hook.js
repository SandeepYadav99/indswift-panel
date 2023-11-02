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
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [ischangeDialog, setIschangeDialog] = useState(false);
  const history = useHistory();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isCsvDialog, setIsCsvDialog] = useState(false);
  const [isCPCDialog, setIsCPCDialog] = useState(false);
  const [isExtendDialog, setIsExtendDialog] = useState(false);
  const [isTraineeDialog, setIsTraineeDialog] = useState(false);
  const [createDD, setCreateDD] = useState(null);
  const { role } = useSelector((state) => state.auth);
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
  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.EMPLOYEE_CREATE); //+
  }, []);
  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEmployee(data));
      } else {
        dispatch(actionUpdateEmployee(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEmployeeRequests(1));
      dispatch(
        actionFetchEmployee(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchEmployee(1, sortingData))
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
      console.log("_handleSearchValueChange", value);
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
      ...(role === constants.ROLES.CORPORATE_HR
        ? [
            {
              label: "Location",
              name: "location_id",
              type: "selectObject",
              custom: { extract: { id: "id", title: "name" } },
              fields: listData?.LOCATIONS,
            },
          ]
        : []),
      {
        label: "Grade",
        name: "grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
      {
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Created Date",
        options: { maxDate: new Date() },
        name: "createdAt",
        type: "date",
      },
    ];
  }, [listData, role]);

 

  const handleLeaveApplicationForm = () => {
    history.push("form");
    window.location.reload();
  };

  const { id } = useParams();

  return {
    id,
    employeeDetail,
    approveDialog,
    ischangeDialog,
    rejectDialog,
    handleLeaveApplicationForm,
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSortOrderChange, 
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,    
    isExtendDialog,
    isTraineeDialog,
    listData,
  };
}

export default usePendingLeaveApplication;
